import {
  prepareDesignPublisher,
  type PublishDesignResponse,
} from "@canva/intents/design";
import { createRoot } from "react-dom/client";
import "@canva/app-ui-kit/styles.css";
import { AppUiProvider } from "@canva/app-ui-kit";
import { PublishSettingView, PreviewUi } from "./components";

const root = createRoot(document.getElementById("root") as Element);

prepareDesignPublisher({
  renderSettingsUi: ({
    updatePublishSettings,
    registerOnSettingsUiContextChange,
  }) => {
    root.render(
      <AppUiProvider>
        <PublishSettingView
          updatePublishSettings={updatePublishSettings}
          registerOnSettingsUiContextChange={registerOnSettingsUiContextChange}
        />
      </AppUiProvider>,
    );
  },
  renderPreviewUi: ({ requestPreviewUpgrade, registerOnPreviewChange }) => {
    root.render(
      <AppUiProvider>
        <PreviewUi
          requestPreviewUpgrade={requestPreviewUpgrade}
          registerOnPreviewChange={registerOnPreviewChange}
        />
      </AppUiProvider>,
    );
  },
  getOutputTypes: async () => {
    return {
      status: "completed",
      outputTypes: [
        {
          id: "post",
          displayName: "Post",
          mediaSlots: [
            {
              id: "media",
              displayName: "Media",
              required: true,
              fileCount: { min: 1, max: 2 },
              accepts: {
                image: {
                  format: "png",
                  aspectRatio: { exact: 1 },
                  // aspectRatio: { exact: 1920 / 1080 },
                  // aspectRatio: { min: 4 / 5, max: 1.91 / 1 },
                },
                video: { format: "mp4" },
              },
            },
          ],
        },
        {
          id: "reel",
          displayName: "Reel",
          mediaSlots: [
            {
              id: "video",
              displayName: "Video",
              required: true,
              maxFileCount: 1,
              fileCount: { max: 1 },
              accepts: { video: { format: "mp4" } },
            },
            {
              id: "cover-image",
              displayName: "Cover image",
              required: true,
              maxFileCount: 1,
              fileCount: { max: 1 },
              accepts: { image: { format: "png" } },
            },
          ],
        },
      ],
    };
  },
  publishDesign: async (params) => {
    // eslint-disable-next-line no-console
    console.log("publishDesign called with params:", JSON.stringify(params));
    // Implement the logic to publish the design
    return {
      status: "completed",
      externalId: "1234567890",
      externalUrl: "http://localhost:3000/post/1234567890",
    } as PublishDesignResponse;
  },
});
