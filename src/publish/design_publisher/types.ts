import type { Preview } from "@canva/intents/design";

// Type guards for different preview types
export function isImagePreviewReady(preview: Preview): preview is Preview & {
  kind: "image";
  status: "ready";
  url: string;
} {
  return (
    preview.kind === "image" && preview.status === "ready" && "url" in preview
  );
}

export function isVideoPreviewWithThumbnail(
  preview: Preview,
): preview is Preview & {
  kind: "video";
  thumbnailUrl: string;
} {
  return preview.kind === "video" && "thumbnailUrl" in preview;
}

// Type for parsed publish settings
export interface PublishSettings {
  caption?: string;
  tags?: string;
  raw?: string;
}

// Utility function to safely parse publish settings
export function parsePublishSettings(
  publishRef?: string,
): PublishSettings | undefined {
  if (!publishRef) return undefined;

  try {
    return JSON.parse(publishRef) as PublishSettings;
  } catch {
    // Handle non-JSON publish ref
    return { raw: publishRef };
  }
}
