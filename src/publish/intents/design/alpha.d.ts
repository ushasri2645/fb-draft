/**
 * @alpha
 * {@link PublishDesignError} indicating custom error occurred in the app's implementation.
 * This can be used to indicate specific issues that are not covered by other error types.
 */
export declare type AppError = {
  /**
   * A custom error occurred in your app.
   *
   * Return this for application-specific errors that don't fit
   * the other categories. Include a descriptive message explaining
   * the error to the user.
   */
  status: "app_error";
  /**
   * Optional message explaining the error.
   */
  message?: string;
};

/**
 * @alpha
 * Base file requirement interface.
 */
declare interface BaseFileRequirement {
  format: PublishFileFormat;
  maxFileSizeMb?: number;
}

/**
 * @alpha
 * Base output file interface.
 */
export declare interface BaseOutputFile {
  format: PublishFileFormat;
  url: string;
}

/**
 * @alpha
 * Base preview interface.
 */
export declare interface BasePreview {
  id: string;
  kind: PreviewKind;
  status: PreviewStatus;
  widthPx: number;
  heightPx: number;
}

/**
 * @public
 *
 * Main interface for implementing the DesignEditor intent.
 *
 * Implementing the DesignEditor Intent enables apps to assist users in editing designs,
 * by presenting interactive and creative tooling alongside the Canva design surface.
 */
export declare type DesignEditorIntent = {
  /**
   * Renders the UI containing the app’s functionality.
   *
   * @example
   * ```tsx
   * function render() {
   *   // render your UI using your preferred framework
   * }
   * ```
   */
  render: () => void;
};

/**
 * @alpha
 * Main interface for implementing the DesignPublisher intent.
 *
 * Implementing the DesignPublisher intent enables apps to publish designs to external platforms.
 * This allows users to set publish settings, export their designs and share with others.
 */
export declare type DesignPublisherIntent = {
  /**
   * Renders a user interface for configuring publish settings.
   *
   * @param request - Configuration and callbacks for the publish settings UI.
   */
  renderSettingsUi: (request: RenderSettingsUiRequest) => void;
  /**
   * Publishes the design to a third-party platform.
   *
   * @param request - Parameters for the publish operation.
   * @returns A promise resolving to either a successful result with the published result or an error.
   */
  publishDesign: (
    request: PublishDesignRequest,
  ) => Promise<PublishDesignResponse>;
  /**
   * Renders a user interface for previewing the design.
   *
   * @param request - Configuration and callbacks for the preview UI.
   */
  renderPreviewUi: (request: RenderPreviewUiRequest) => void;
  /**
   * Provides the output types that the 3rd-party platform supports.
   *
   * @returns A promise resolving to the output types.
   */
  getOutputTypes: () => Promise<GetOutputTypesResponse>;
};

/**
 * @alpha
 * A function that can be called to dispose of a callback.
 */
export declare type Disposer = () => void;

/**
 * @alpha
 * Successful response from getting output types.
 */
export declare type GetOutputTypesCompleted = {
  status: "completed";
  outputTypes: OutputType[];
};

/**
 * @alpha
 * Error response from getting output types.
 */
export declare type GetOutputTypesError = AppError;

/**
 * @alpha
 * Response from getting output types.
 */
export declare type GetOutputTypesResponse =
  | GetOutputTypesCompleted
  | GetOutputTypesError;

/**
 * @alpha
 * Image output file interface.
 */
export declare interface ImageOutputFile extends BaseOutputFile {
  widthPx: number;
  heightPx: number;
}

/**
 * @alpha
 * Image preview union type.
 */
export declare type ImagePreview =
  | ImagePreviewLoading
  | ImagePreviewReady
  | ImagePreviewError;

/**
 * @alpha
 * Error image preview interface.
 */
export declare interface ImagePreviewError extends BasePreview {
  kind: "image";
  status: "error";
}

/**
 * @alpha
 * Loading image preview interface.
 */
export declare interface ImagePreviewLoading extends BasePreview {
  kind: "image";
  status: "loading";
}

/**
 * @alpha
 * Ready image preview interface.
 */
export declare interface ImagePreviewReady extends BasePreview {
  kind: "image";
  status: "ready";
  format: "png" | "jpg";
  url: string;
}

/**
 * @alpha
 * Image requirement configuration.
 */
export declare interface ImageRequirement extends BaseFileRequirement {
  format: "png" | "jpg";
  aspectRatio?: ValueRange;
}

/**
 * @alpha
 * Media slot configuration.
 */
export declare type MediaSlot = {
  id: string;
  displayName: string;
  required: boolean;
  fileCount?: ValueRange;
  /**
   * @deprecated
   * Use {@link fileCount} instead.
   */
  maxFileCount?: number;
  accepts: {
    image?: ImageRequirement;
    video?: VideoRequirement;
  };
};

/**
 * @alpha
 * Output file union type.
 */
export declare type OutputFile = ImageOutputFile | VideoOutputFile;

/**
 * @alpha
 * Output media configuration.
 */
export declare type OutputMedia = {
  mediaSlotId: string;
  files: OutputFile[];
};

/**
 * @alpha
 * Output type configuration.
 */
export declare type OutputType = {
  id: string;
  displayName: string;
  mediaSlots: MediaSlot[];
};

/**
 * @alpha
 * Action to be taken after publishing.
 */
export declare type PostPublishAction = PostPublishActionRedirect;

/**
 * @alpha
 * Redirect action after publishing.
 */
export declare type PostPublishActionRedirect = {
  type: "redirect";
  url: string;
};

/**
 * @public
 *
 * Prepares a {@link DesignEditorIntent|DesignEditor Intent}.
 *
 * @example
 * ```tsx
 * import { prepareDesignEditor } from '@canva/intents/design';
 *
 * prepareDesignEditor({
 *  render: async () => {
 *    // TODO: Implement the logic to render your app's UI
 *  },
 * });
 * ```
 */
export declare const prepareDesignEditor: (
  implementation: DesignEditorIntent,
) => void;

/**
 * @alpha
 *
 * Prepares a {@link DesignPublisherIntent|Design Publisher Intent}.
 *
 * @example
 * ```tsx
 * import { prepareDesignPublisher } from "@canva/intents/design";
 *
 * prepareDesignPublisher({
 *  renderPublishSettingsUi: (params) => {
 *    // Implement the UI for the publish settings
 *  },
 *  publishDesign: async (params) => {
 *    // Implement the logic to publish the design
 *  },
 * });
 * ```
 */
export declare const prepareDesignPublisher: (
  implementation: DesignPublisherIntent,
) => void;

/**
 * @alpha
 * Preview union type.
 */
export declare type Preview = ImagePreview | VideoPreview;

/**
 * @alpha
 * Preview kind type.
 */
export declare type PreviewKind = "image" | "video";

/**
 * @alpha
 * Preview media configuration.
 */
export declare type PreviewMedia = {
  mediaSlotId: string;
  previews: Preview[];
};

/**
 * @alpha
 * Preview status type.
 */
export declare type PreviewStatus =
  | "loading"
  | "thumbnail"
  | "upgrading"
  | "ready"
  | "error";

/**
 * @alpha
 * Successful response from publishing a design.
 */
export declare type PublishDesignCompleted = {
  status: "completed";
  /**
   * ID returned from the external platform.
   * Can be used for downstream user flow and fetching insights data.
   */
  externalId?: string;
  /**
   * URL returned from the external platform.
   * Can be used to link directly to the published content.
   */
  externalUrl?: string;
  /**
   * Action to be taken after publishing.
   */
  postPublishAction?: PostPublishAction;
};

/**
 * @alpha
 * Error response from publishing a design.
 *
 * Can be either a remote request failure or an app error.
 */
export declare type PublishDesignError = RemoteRequestFailedError | AppError;

/**
 * @alpha
 * Parameters required for publishing a design.
 */
export declare type PublishDesignRequest = {
  /** The platform-specific settings reference for publishing */
  publishRef?: string;
  /** The output type that the publish request is for */
  outputType: OutputType;
  /** The exported files to be published */
  outputMedia: OutputMedia[];
};

/**
 * @alpha
 * Response from a publish design operation.
 *
 * This can be either a successful completion or an error response.
 */
export declare type PublishDesignResponse =
  | PublishDesignCompleted
  | PublishDesignError;

/**
 * @alpha
 * Supported publish file formats.
 */
export declare type PublishFileFormat = "png" | "jpg" | "mp4";

/**
 * @alpha
 * The validity of the publishRef.
 */
export declare type PublishRefValidityState =
  | "valid"
  | "invalid_missing_required_fields";

/**
 * @alpha
 * Configuration for publish settings.
 */
export declare type PublishSettings = {
  /**
   * The platform-specific settings reference for publishing.
   *
   * This settings reference should contain all the information your app needs to
   * publish the design to the external platform later.
   *
   * Maximum size: 5KB
   */
  publishRef?: string;
  /**
   * The validity of the publish settings.
   */
  validityState: PublishRefValidityState;
};

/**
 * @alpha
 * {@link PublishDesignError} indicating failure of the remote request to the external platform.
 *
 * Return this error for network issues, API failures, or other
 * connectivity problems that prevent publishing.
 */
export declare type RemoteRequestFailedError = {
  status: "remote_request_failed";
};

/**
 * @alpha
 * Configuration required for rendering the preview UI.
 */
export declare type RenderPreviewUiRequest = {
  /**
   * Function to upgrade the thumbnail preview ids to full preview media.
   */
  requestPreviewUpgrade: (previewIds: string[]) => void;
  /**
   * Registers a callback to be called when the preview data is updated.
   * @param callback - The callback to be called when the preview data is updated.
   * @returns A disposer function that cleans up the registered callback.
   */
  registerOnPreviewChange: (
    callback: (opts: {
      previewMedia: PreviewMedia[];
      /** The output type that the preview data is for */
      outputType: OutputType;
      publishRef?: string;
    }) => void,
  ) => Disposer;
};

/**
 * @alpha
 * Configuration for the publish settings UI.
 *
 * This type provides the necessary callbacks and configuration for rendering
 * a custom publish settings interface.
 */
export declare type RenderSettingsUiRequest = {
  /**
   * Callback function to update the publish settings.
   *
   * @param settings - The new publish settings to apply
   * @returns A promise that resolves when the settings update is complete
   */
  updatePublishSettings: (
    publishSettings: PublishSettings,
  ) => Promise<UpdatePublishSettingsResponse>;
  /**
   * Registers a callback to be called when the settings UI context is changed.
   * @param callback - The callback to be called when the settings UI context is changed.
   * @returns A disposer function that cleans up the registered callback.
   */
  registerOnSettingsUiContextChange: (
    callback: (context: SettingsUiContext) => void,
  ) => Disposer;
};

/**
 * @alpha
 * Context for the publish settings UI.
 */
export declare type SettingsUiContext = {
  outputType: OutputType;
};

/**
 * @alpha
 * Successful response from updating the publish settings.
 */
export declare type UpdatePublishSettingsCompleted = {
  status: "completed";
};

/**
 * @alpha
 * Response from updating the publish settings.
 */
export declare type UpdatePublishSettingsResponse =
  UpdatePublishSettingsCompleted;

/**
 * @alpha
 * Value range configuration.
 */
export declare type ValueRange =
  | {
      exact: number;
    }
  | {
      min: number;
    }
  | {
      max: number;
    }
  | {
      min: number;
      max: number;
    };

/**
 * @alpha
 * Video output file interface.
 */
export declare interface VideoOutputFile extends BaseOutputFile {
  widthPx: number;
  heightPx: number;
}

/**
 * @alpha
 * Video preview union type.
 */
export declare type VideoPreview =
  | VideoPreviewLoading
  | VideoPreviewThumbnail
  | VideoPreviewUpgrading
  | VideoPreviewReady
  | VideoPreviewError;

/**
 * @alpha
 * Error video preview interface.
 */
export declare interface VideoPreviewError extends BasePreview {
  kind: "video";
  status: "error";
}

/**
 * @alpha
 * Loading video preview interface.
 */
export declare interface VideoPreviewLoading extends BasePreview {
  kind: "video";
  status: "loading";
}

/**
 * @alpha
 * Ready video preview interface.
 */
export declare interface VideoPreviewReady extends BasePreview {
  kind: "video";
  status: "ready";
  format: "mp4";
  url: string;
  thumbnailFormat: "png" | "jpg";
  thumbnailUrl: string;
}

/**
 * @alpha
 * Thumbnail video preview interface.
 */
export declare interface VideoPreviewThumbnail extends BasePreview {
  kind: "video";
  status: "thumbnail";
  thumbnailFormat: "png" | "jpg";
  thumbnailUrl: string;
}

/**
 * @alpha
 * Upgrading video preview interface.
 */
export declare interface VideoPreviewUpgrading extends BasePreview {
  kind: "video";
  status: "upgrading";
  thumbnailFormat: "png" | "jpg";
  thumbnailUrl: string;
}

/**
 * @alpha
 * Video requirement configuration.
 */
export declare interface VideoRequirement extends BaseFileRequirement {
  format: "mp4";
  aspectRatio?: ValueRange;
  duration?: ValueRange;
}

export {};
