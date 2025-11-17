import type { PreviewMedia } from "@canva/intents/design";
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
} from "@canva/app-ui-kit";
import type { PublishSettings } from "../types";
import { PreviewRenderer } from "./preview_renderer";
import * as styles from "./post_preview.css";

interface PreviewProps {
  previewMedia: PreviewMedia[] | undefined;
  settings: PublishSettings | undefined;
  requestPreviewUpgrade: (previewIds: string[]) => void;
}

const username = "username"; // TODO

const IMAGE_WIDTH = 400;

export const PostPreview = ({
  previewMedia,
  settings,
  requestPreviewUpgrade,
}: PreviewProps) => {
  const isLoading = !previewMedia;

  const caption = settings?.caption;

  return (
    <Box
      className={styles.wrapper}
      background="surface"
      borderRadius="large"
      padding="2u"
      border="standard"
    >
      <Rows spacing="2u">
        <UserInfo isLoading={isLoading} />

        <MediaCarousel
          previewMedia={previewMedia}
          requestPreviewUpgrade={requestPreviewUpgrade}
        />

        <ActionRow isLoading={isLoading} />

        <Caption isLoading={isLoading} caption={caption} />
      </Rows>
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

const ActionRow = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Columns spacing="1u" align="spaceBetween">
      <Column>
        <Columns spacing="3u">
          <Column width="content">
            {isLoading ? <IconPlaceholder /> : <StarIcon />}
          </Column>
          <Column width="content">
            {isLoading ? <IconPlaceholder /> : <StarIcon />}
          </Column>
          <Column width="content">
            {isLoading ? <IconPlaceholder /> : <StarIcon />}
          </Column>
        </Columns>
      </Column>
      <Column width="content">
        {isLoading ? <IconPlaceholder /> : <StarIcon />}
      </Column>
    </Columns>
  );
};

const IconPlaceholder = () => {
  return (
    <Box className={styles.iconPlaceholder}>
      <Placeholder shape="circle" />
    </Box>
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
      ) : (
        caption && (
          <Text lineClamp={2} size="small">
            <strong>{username}</strong> {caption}
          </Text>
        )
      )}
    </>
  );
};

const MediaCarousel = ({
  previewMedia,
  requestPreviewUpgrade,
}: {
  previewMedia: PreviewMedia[] | undefined;
  requestPreviewUpgrade: (previewIds: string[]) => void;
}) => {
  const isLoading = !previewMedia;
  const media = previewMedia?.find((media) => media.mediaSlotId === "media");
  const fullWidth = (media?.previews.length ?? 1) * IMAGE_WIDTH;

  return (
    <Box borderRadius="large" className={styles.imageContainer}>
      {isLoading || !media?.previews.length ? (
        <div className={styles.imagePlaceholder}>
          <Placeholder shape="rectangle" />
        </div>
      ) : (
        <div className={styles.imageScroll}>
          <div className={styles.imageRow} style={{ width: fullWidth }}>
            {media?.previews.map((p) => {
              return (
                <div key={p.id} className={styles.image}>
                  <PreviewRenderer
                    preview={p}
                    requestPreviewUpgrade={requestPreviewUpgrade}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Box>
  );
};
