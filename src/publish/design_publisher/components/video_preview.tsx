import type {
  PreviewMedia,
  VideoPreviewThumbnail,
} from "@canva/intents/design";
import {
  Box,
  Text,
  Rows,
  Columns,
  StarIcon,
  Column,
  Avatar,
  Placeholder,
  TextPlaceholder,
  VideoCard,
  ImageCard,
} from "@canva/app-ui-kit";
import type { PublishSettings } from "../types";
import * as styles from "./video_preview.css";

interface PreviewProps {
  previewMedia: PreviewMedia[] | undefined;
  settings: PublishSettings | undefined;
  requestPreviewUpgrade: (previewIds: string[]) => void;
}

const username = "username"; // TODO

export const VideoPreview = ({
  previewMedia,
  settings,
  requestPreviewUpgrade,
}: PreviewProps) => {
  const video = previewMedia?.find((m) => m.mediaSlotId === "video");
  const videoUrl =
    video && video?.previews[0].status === "ready"
      ? video?.previews[0].url
      : undefined;
  const videoThumbnail =
    video && video?.previews[0].status === "thumbnail"
      ? video?.previews[0]
      : undefined;
  const videoThumbnailUrl =
    video && video?.previews[0].status === "thumbnail"
      ? video?.previews[0].thumbnailUrl
      : undefined;

  const showZeroState = !previewMedia || !video?.previews.length;

  const coverImage = previewMedia?.find((m) => m.mediaSlotId === "cover-image");
  const thumbnailUrl =
    coverImage && coverImage?.previews[0].status === "ready"
      ? coverImage?.previews[0].url
      : videoThumbnailUrl;

  const caption = settings?.caption;

  return (
    <Box className={styles.wrapper} borderRadius="standard">
      <Box className={styles.aspectRatio}>
        <MediaContainer
          showZeroState={showZeroState}
          videoUrl={videoUrl}
          thumbnailUrl={thumbnailUrl}
          videoThumbnailUrl={videoThumbnailUrl}
          videoThumbnail={videoThumbnail}
          requestPreviewUpgrade={requestPreviewUpgrade}
        />

        <OverlayUI isLoading={showZeroState} caption={caption} />
      </Box>
    </Box>
  );
};

const OverlayUI = ({
  isLoading,
  caption,
}: {
  isLoading: boolean;
  caption: string | undefined;
}) => {
  return (
    <Box className={styles.footer} padding="2u">
      <Columns spacing="1.5u" align="spaceBetween" alignY="end">
        <Column>
          <Rows spacing="1u">
            <UserInfo isLoading={isLoading} />

            <Caption isLoading={isLoading} caption={caption} />
          </Rows>
        </Column>
        <Column width="content">
          <Rows spacing="2u">
            {[StarIcon, StarIcon, StarIcon].map((Icon, i) => {
              return isLoading ? (
                <Box key={i} className={styles.iconPlaceholder}>
                  <Placeholder shape="circle" />
                </Box>
              ) : (
                <Icon key={i} />
              );
            })}
          </Rows>
        </Column>
      </Columns>
    </Box>
  );
};

const UserInfo = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className={styles.user}>
      <Box className={styles.avatar}>
        <Avatar name={username} />
      </Box>
      {isLoading ? (
        <div className={styles.textPlaceholder}>
          <TextPlaceholder size="medium" />
        </div>
      ) : (
        <Text size="small" variant="bold">
          {username}
        </Text>
      )}
    </div>
  );
};

const Caption = ({
  isLoading,
  caption,
}: {
  isLoading: boolean;
  caption: string | undefined;
}) => {
  return (
    <>
      {isLoading ? (
        <div className={styles.textPlaceholder}>
          <TextPlaceholder size="medium" />
        </div>
      ) : caption ? (
        <Text size="small" lineClamp={1}>
          {caption}
        </Text>
      ) : null}
    </>
  );
};

const MediaContainer = ({
  showZeroState,
  videoUrl,
  thumbnailUrl,
  videoThumbnailUrl,
  videoThumbnail,
  requestPreviewUpgrade,
}: {
  showZeroState: boolean;
  videoUrl: string | undefined;
  thumbnailUrl: string | undefined;
  videoThumbnailUrl: string | undefined;
  videoThumbnail: VideoPreviewThumbnail | undefined;
  requestPreviewUpgrade: (previewIds: string[]) => void;
}) => {
  return (
    <Box className={styles.imageContainer}>
      {showZeroState ? (
        <div className={styles.imagePlaceholder}>
          <Placeholder shape="rectangle" />
        </div>
      ) : null}

      {videoUrl && thumbnailUrl ? (
        <VideoCard
          // className={styles.video}
          mimeType="video/mp4"
          videoPreviewUrl={videoUrl}
          thumbnailUrl={thumbnailUrl}
          loading={showZeroState}
          ariaLabel="Preview video of the post"
        />
      ) : videoThumbnailUrl ? (
        <ImageCard
          // className={styles.image}
          thumbnailUrl={videoThumbnailUrl}
          alt="Preview thumbnail of the post"
          onClick={
            videoThumbnail?.id
              ? () => requestPreviewUpgrade([videoThumbnail?.id])
              : undefined
          }
        />
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};
