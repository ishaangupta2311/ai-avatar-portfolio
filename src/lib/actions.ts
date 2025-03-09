// src/lib/actions.ts

"use server";

import { auth } from "@clerk/nextjs/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import crypto from "crypto";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

// const allowedFileTypes = [
//   "application/pdf", // PDF
//   "application/msword", // DOC
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
// ];


// const maxFileSize = 1024 * 1024 * 10; // 10MB

// const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

export async function getSignedURL() {
// export async function getSignedURL(type:string, size:number, checksum:string) {
  
  const { userId, sessionClaims } = auth();

  if (!userId && !sessionClaims) {
    return { failure: "You must be logged in to upload a file"}
  }

  // if( !allowedFileTypes.includes(type) ) {
  //   return { failure: "File type not allowed"}
  // }
  // if(size > maxFileSize) {
  //   return { failure: "File size too large"}
  // }


  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: 'test-file',
    // Key: generateFileName(),
    // ContentType: type,
    // ContentLength: size,
    // ChecksumSHA256: checksum,
    // Metadata: {
    //   userId: userId,
    // },
  });

  const signedURL = await getSignedUrl(s3, putObjectCommand, 
    { expiresIn: 60 }
  );

  return { success: {url: signedURL}} 
}