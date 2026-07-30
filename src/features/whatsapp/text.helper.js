export const helpReplyText = `Template: <instruksi> <data>
--------------------------------
instruksi:
!help           Menampilkan panduan
!template       Menampilkan template <!data>
!daftar         Mendaftarkan Data Person
!tambah         Menambahkan Data Kehadiran
!pindah         Menghapus Data Person karena Pindah Sambung

data:
!daftar     -- nama person, kelompok
!tambah     -- nama person, kelompok, tipe kehadiran
!pindah     -- nama person, kelompok (saat masih di Jatiwaringin)
`;

const tempRegisterInstructions = `*Format Pendaftaran:* __hapus line di atas !instruksi__
!daftar
laki-laki
- [nama] [kelompok]

perempuan
- [nama] [kelompok]`;
const tempAttendanceInstructions = `*Format Kehadiran:* __hapus line di atas !instruksi__
!tambah
tanggal [angka]
[hadir/izin/absen/sakit]
laki-laki
- [nama] [kelompok]

[hadir/izin/absen/sakit]
perempuan
- [nama] [kelompok]`;

const tempMovingInstructions = `*Format Pindah:* __hapus line di atas !instruksi__
!pindah
laki-laki
- [nama] [kelompok]

perempuan
- [nama] [kelompok]`;

export const tempInstructions = {
  tempRegisterInstructions,
  tempAttendanceInstructions,
  tempMovingInstructions,
};
