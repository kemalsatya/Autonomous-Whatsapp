FROM node:22-alpine

# Install Chromium dan dependensinya (dibutuhkan oleh whatsapp-web.js / Puppeteer)
# Alpine memerlukan Chromium bawaan OS agar berjalan ringan dan kompatibel
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont

# Beritahu Puppeteer untuk TIDAK mendownload Chromium sendiri, melainkan pakai yang kita install di atas
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Mount Volume di dokploy -> /usr/src/app/wa-session
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependensi (hanya production untuk menghemat RAM dan ukuran image)
RUN HUSKY=0 npm install --omit=dev

# Copy seluruh file project
COPY . .

# Expose port (opsional, sebagai dokumentasi port yang digunakan)
EXPOSE 3000

# Jalankan perintah start dari package.json
CMD ["npm", "start"]
