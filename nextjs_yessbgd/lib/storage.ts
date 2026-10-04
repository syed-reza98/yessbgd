import path from "path";
import fs from "fs/promises";

// Upload Directories
const MEDIA_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "media");
const RESUME_STORAGE_DIR = path.join(process.cwd(), "storage", "resumes");

/**
 * Saves a media file into the public directory for static serving.
 * Public URL: /uploads/media/<folder>/<filename>
 */
export async function saveMediaFile(
  file: File,
  folder: string = "general"
): Promise<{
  url: string;
  path: string;
  fileName: string;
  sizeBytes: number;
  mimeType: string;
}> {
  const sanitizedFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "") || "general";
  const targetDir = path.join(MEDIA_UPLOAD_DIR, sanitizedFolder);
  await fs.mkdir(targetDir, { recursive: true });

  const ext = path.extname(file.name) || "";
  const randomSuffix = Math.random().toString(36).substring(2, 9);
  const baseName = path
    .basename(file.name, ext)
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .substring(0, 40);
  const fileName = `${Date.now()}_${baseName}_${randomSuffix}${ext}`;
  const targetPath = path.join(targetDir, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(targetPath, buffer);

  const relativePath = `uploads/media/${sanitizedFolder}/${fileName}`;
  const publicUrl = `/${relativePath}`;

  return {
    url: publicUrl,
    path: relativePath,
    fileName: file.name,
    sizeBytes: file.size,
    mimeType: file.type,
  };
}

/**
 * Saves a candidate resume in protected server storage (not directly web-accessible).
 * Stored at: storage/resumes/<referenceNumber>/<filename>
 */
export async function saveResumeFile(
  file: File,
  referenceNumber: string
): Promise<{
  filePath: string;
  fileName: string;
  sizeBytes: number;
  mimeType: string;
}> {
  const sanitizedRef = referenceNumber.replace(/[^a-zA-Z0-9_-]/g, "_");
  const targetDir = path.join(RESUME_STORAGE_DIR, sanitizedRef);
  await fs.mkdir(targetDir, { recursive: true });

  const ext = path.extname(file.name) || "";
  const baseName = path
    .basename(file.name, ext)
    .replace(/[^a-zA-Z0-9._-]/g, "_");
  const cleanFileName = `${baseName}${ext}`;
  const targetPath = path.join(targetDir, cleanFileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(targetPath, buffer);

  const relativeFilePath = `storage/resumes/${sanitizedRef}/${cleanFileName}`;

  return {
    filePath: relativeFilePath,
    fileName: file.name,
    sizeBytes: file.size,
    mimeType: file.type || "application/pdf",
  };
}

/**
 * Safely resolves a resume file path on disk, preventing path traversal.
 */
export function resolveResumePath(relativePath: string): string | null {
  if (!relativePath || relativePath.includes("..")) return null;
  const cleanRelative = relativePath.replace(/^(\/)?(storage\/resumes\/)?/, "");
  const fullPath = path.join(RESUME_STORAGE_DIR, cleanRelative);
  if (!fullPath.startsWith(RESUME_STORAGE_DIR)) {
    return null;
  }
  return fullPath;
}

/**
 * Deletes a media file if present on disk.
 */
export async function deleteMediaFile(relativePath: string): Promise<boolean> {
  try {
    if (!relativePath || relativePath.includes("..")) return false;
    const fullPath = path.join(process.cwd(), "public", relativePath);
    if (!fullPath.startsWith(path.resolve(MEDIA_UPLOAD_DIR))) return false;
    await fs.unlink(fullPath);
    return true;
  } catch {
    return false;
  }
}
