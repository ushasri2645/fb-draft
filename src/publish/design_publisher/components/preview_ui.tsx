import type { OutputType, PreviewMedia } from "@canva/intents/design";
import { useEffect, useState } from "react";
import { parsePublishSettings } from "../types";
import { PostPreview } from "./post_preview";
import { VideoPreview } from "./video_preview";
import * as styles from "./preview_ui.css";

interface PreviewUiProps {
  registerOnPreviewChange: (
    callback: (opts: {
      previewMedia: PreviewMedia[];
      outputType: OutputType;
      publishRef?: string;
    }) => void,
  ) => () => void;
  requestPreviewUpgrade: (previewIds: string[]) => void;
}

export const PreviewUi = ({
  registerOnPreviewChange,
  requestPreviewUpgrade,
}: PreviewUiProps) => {
  const [previewData, setPreviewData] = useState<{
    previewMedia: PreviewMedia[];
    outputType: OutputType;
    publishRef?: string;
  } | null>(null);

  useEffect(() => {
    const dispose = registerOnPreviewChange((data) => {
      setPreviewData(data);
    });
    return dispose;
  }, [registerOnPreviewChange]);

  const { previewMedia, publishRef, outputType } = previewData ?? {};
  const publishSettings = parsePublishSettings(publishRef);

  return (
    <div className={styles.container}>
      {outputType?.id === "post" && (
        <PostPreview
          previewMedia={previewMedia}
          settings={publishSettings}
          requestPreviewUpgrade={requestPreviewUpgrade}
        />
      )}
      {outputType?.id === "reel" && (
        <VideoPreview
          previewMedia={previewMedia}
          settings={publishSettings}
          requestPreviewUpgrade={requestPreviewUpgrade}
        />
      )}
    </div>
  );
};
