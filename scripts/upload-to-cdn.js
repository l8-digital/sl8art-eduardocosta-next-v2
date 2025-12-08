require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs-extra");
const path = require("path");

const {
  NEXT_AWS_ACCESS_KEY_ID,
  NEXT_AWS_SECRET_ACCESS_KEY,
  NEXT_AWS_DEFAULT_REGION,
  NEXT_AWS_BUCKET_NAME,
  NEXT_PUBLIC_ASSET_URL, // ex: https://build.l8.digital
  NEXT_API_CLIENT_ID,
} = process.env;

if (!NEXT_AWS_ACCESS_KEY_ID || !NEXT_AWS_SECRET_ACCESS_KEY || !NEXT_AWS_DEFAULT_REGION || !NEXT_AWS_BUCKET_NAME) {
  throw new Error("⚠️ Variáveis AWS não configuradas corretamente");
}

const s3 = new S3Client({
  region: NEXT_AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: NEXT_AWS_ACCESS_KEY_ID,
    secretAccessKey: NEXT_AWS_SECRET_ACCESS_KEY,
  },
});

const publicPath = path.join(process.cwd(), "public");

// --------------------------
// UPLOAD RECURSIVO
// --------------------------
async function uploadDir(dir, prefix = "") {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await uploadDir(filePath, path.join(prefix, file));
    } else {
      await uploadFile(filePath, path.join(prefix, file));
    }
  }
}

// --------------------------
// ENVIO CORRIGIDO PARA S3
// --------------------------
async function uploadFile(filePath, relativeKey) {
  const fileContent = await fs.readFile(filePath);

  const s3Key = `site/${NEXT_API_CLIENT_ID}/build/assets/${relativeKey}`.replace(/\\/g, "/");

  const command = new PutObjectCommand({
    Bucket: NEXT_AWS_BUCKET_NAME,
    Key: s3Key,
    Body: fileContent,
    ContentType: getContentType(filePath),
  });


  await s3.send(command);

  const finalUrl = `${NEXT_PUBLIC_ASSET_URL.replace(/\/$/, "")}/${s3Key}`;

  console.log(`✅ Upload concluído: ${finalUrl}`);
}

// --------------------------
// TIPOS DE ARQUIVOS
// --------------------------
function getContentType(filename) {
  if (filename.endsWith(".png")) return "image/png";
  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
  if (filename.endsWith(".gif")) return "image/gif";
  if (filename.endsWith(".webp")) return "image/webp";
  if (filename.endsWith(".svg")) return "image/svg+xml";
  if (filename.endsWith(".avif")) return "image/avif";
  if (filename.endsWith(".css")) return "text/css";
  if (filename.endsWith(".js")) return "application/javascript";
  if (filename.endsWith(".woff")) return "font/woff";
  if (filename.endsWith(".woff2")) return "font/woff2";
  if (filename.endsWith(".ttf")) return "font/ttf";
  return "application/octet-stream";
}

(async () => {
  try {
    await uploadDir(publicPath);
    console.log("🚀 Upload de toda a pasta public/ finalizado com sucesso!");
  } catch (err) {
    console.error("❌ Erro no upload:", err);
  }
})();
