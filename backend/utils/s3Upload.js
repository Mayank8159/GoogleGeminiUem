import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const bucketName = process.env.AWS_S3_BUCKET;
const region = process.env.AWS_REGION;

let s3Client;

const getS3Client = () => {
  if (!region) {
    throw new Error("AWS_REGION is required for serverless uploads");
  }

  if (!s3Client) {
    s3Client = new S3Client({ region });
  }

  return s3Client;
};

const sanitizeFileName = (fileName) => fileName.replace(/[^a-zA-Z0-9._-]/g, "_");

export const uploadImageToS3 = async (file, folder) => {
  if (!bucketName) {
    throw new Error("AWS_S3_BUCKET is required for serverless uploads");
  }

  if (!file?.buffer) {
    throw new Error("Uploaded file buffer is missing");
  }

  const key = `${folder}/${Date.now()}-${sanitizeFileName(file.originalname)}`;

  await getS3Client().send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    })
  );

  return {
    key,
    url: `https://${bucketName}.s3.${region}.amazonaws.com/${key}`,
  };
};

export const deleteImageFromS3 = async (key) => {
  if (!bucketName || !key) {
    return;
  }

  await getS3Client().send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );
};

export const getS3KeyFromUrl = (url) => {
  if (!url || !url.startsWith("http")) {
    return "";
  }

  try {
    const parsed = new URL(url);
    return decodeURIComponent(parsed.pathname.replace(/^\//, ""));
  } catch {
    return "";
  }
};