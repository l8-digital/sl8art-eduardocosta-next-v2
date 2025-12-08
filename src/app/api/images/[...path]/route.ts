import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { NextRequest } from "next/server";

const s3 = new S3Client({
  region: process.env.NEXT_AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest, context: unknown) {
  const { params } = context as { params: { path: string[] } };

  const key = params.path.join("/");

  const command = new GetObjectCommand({
    Bucket: "prd-image-l8digital-sites",
    Key: key,
  });

  const signed = await getSignedUrl(s3, command, { expiresIn: 600 });

  return Response.redirect(signed, 302);
}
