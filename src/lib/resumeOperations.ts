// utils/resumeOperations.ts

// Upload or update resume
export async function upsertResume(
  userId: string,
  file: File,
  fileType: "PDF" | "DOCX"
) {
  // Upload to S3
  const s3Url = await uploadToS3(file);

  // Upsert in database (update if exists, create if doesn't)
  const resume = await prisma.resume.upsert({
    where: {
      userId: userId,
    },
    update: {
      fileName: file.name,
      fileUrl: s3Url,
      fileType: fileType,
      fileSize: file.size,
      uploadedAt: new Date(),
    },
    create: {
      fileName: file.name,
      fileUrl: s3Url,
      fileType: fileType,
      fileSize: file.size,
      userId: userId,
    },
  });

  return resume;
}

// Get user's resume
export async function getUserResume(userId: string) {
  const resume = await prisma.user.findUnique({
    where: { id: userId },
    include: { resume: true },
  });

  return resume?.resume || null;
}

// Delete resume
export async function deleteResume(userId: string) {
  // Delete from S3 first
  const resume = await prisma.resume.findUnique({
    where: { userId: userId },
  });

  if (resume) {
    await deleteFromS3(resume.fileUrl);

    await prisma.resume.delete({
      where: { userId: userId },
    });
  }
}
