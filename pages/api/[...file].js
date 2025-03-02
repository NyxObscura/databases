import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

export default function handler(req, res) {
  // Ambil parameter dinamis dari URL
  const { file } = req.query;

  // Bangun path file di sistem
  const filePath = path.join(process.cwd(), 'public', ...file);

  // Cek apakah file ada
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      message: "The requested resource could not be found.",
      visit: "https://obscuraworks.com/contact"
    });
  }

  // Baca file
  const fileContent = fs.readFileSync(filePath);

  // Tentukan tipe MIME file
  const mimeType = mime.lookup(filePath);

  // Set header Content-Type
  res.setHeader('Content-Type', mimeType || 'application/octet-stream');

  // Kirim file sebagai respons
  res.send(fileContent);
}