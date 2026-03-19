/**
 * Extracts the file ID from a standard Google Drive share link.
 * Handles formats like /file/d/ID/view or ?id=ID
 */
export function extractDriveFileId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // Match /file/d/ID/view
    const pathMatch = parsedUrl.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (pathMatch && pathMatch[1]) {
      return pathMatch[1];
    }

    // Match ?id=ID
    const idParam = parsedUrl.searchParams.get("id");
    if (idParam) {
      return idParam;
    }

    return null;
  } catch (error) {
    // Invalid URL format
    return null;
  }
}

/**
 * Converts a standard Google Drive share link into a direct view/hosting link.
 */
export function generateDirectDriveLink(url: string): string | null {
  const fileId = extractDriveFileId(url);
  if (!fileId) return null;

  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}
