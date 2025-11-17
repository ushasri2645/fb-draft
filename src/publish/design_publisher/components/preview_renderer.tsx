import type { Preview } from "@canva/intents/design";
import { ImageCard, Box, Text, VideoCard } from "@canva/app-ui-kit";
import { isImagePreviewReady, isVideoPreviewWithThumbnail } from "../types";

interface PreviewRendererProps {
  preview: Preview;
  requestPreviewUpgrade: (previewIds: string[]) => void;
}

export const PreviewRenderer = ({
  preview,
  requestPreviewUpgrade,
}: PreviewRendererProps) => {
  // Handle different preview states
  if (preview.status === "loading") {
    return <ImageStatusText text="Loading..." />;
  }

  if (preview.status === "error") {
    return <ImageStatusText text="Error loading preview" />;
  }

  // Handle image previews (ready status)
  if (isImagePreviewReady(preview)) {
    return (
      <ImageCard
        alt={`Image preview ${preview.id}`}
        thumbnailUrl={preview.url}
      />
    );
  }

  if (preview.status === "upgrading") {
    return (
      <>
        <ImageCard
          alt={`Video preview ${preview.id}`}
          thumbnailUrl={preview.thumbnailUrl}
        />
        <OverlayText text="Loading video..." />
      </>
    );
  }

  // Handle video previews (thumbnail, upgrading, ready)
  if (isVideoPreviewWithThumbnail(preview)) {
    const needsUpgrade = preview.status === "thumbnail";

    if (!needsUpgrade) {
      return (
        <VideoCard
          mimeType="video/mp4"
          thumbnailUrl={preview.thumbnailUrl}
          videoPreviewUrl={preview.url}
        />
      );
    }

    const upgrade = () => {
      requestPreviewUpgrade([preview.id]);
    };
    return (
      <>
        <ImageCard
          alt={`Video preview ${preview.id} ${needsUpgrade ? "(click to upgrade)" : ""}`}
          thumbnailUrl={preview.thumbnailUrl}
          onClick={upgrade}
        />
        <OverlayText onClick={upgrade} text="Click to upgrade to video" />
      </>
    );
  }

  // Fallback for unknown preview types
  return <ImageStatusText text="Preview not available" />;
};

const ImageStatusText = ({ text }: { text: string }) => (
  <Box
    width="full"
    height="full"
    padding="2u"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Text size="medium" tone="tertiary" alignment="center">
      {text}
    </Text>
  </Box>
);

const OverlayText = ({
  onClick,
  text,
}: {
  onClick?: () => void;
  text: string;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      <Text size="large" tone="tertiary" alignment="center">
        {text}
      </Text>
    </div>
  );
};
