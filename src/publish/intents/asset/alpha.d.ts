/**
 * @alpha
 * Union of all supported asset types.
 */
export declare type Asset =
  | ImageAsset
  | VideoAsset
  | AudioAsset
  | DocumentAsset
  | SheetAsset
  | GenericAsset;

/**
 * @alpha
 * Main interface for implementing the Asset Picker intent.
 * The Asset Picker intent enables users to choose assets from apps for further processing
 * such as being uploaded.
 */
export declare type AssetPickerIntent = {
  /**
   * Gets assets based on the provided parameters.
   * @param request - Parameters for getting assets.
   * @returns A promise resolving to either a successful result with the assets or an error result.
   */
  getAssets: (request: GetAssetsRequest) => Promise<GetAssetsResponse>;
};

/**
 * @alpha
 * Reference to an asset. Used as a unique identifier.
 */
export declare type AssetRef = string & {
  __assetRef: never;
};

/**
 * @alpha
 * Audio asset result structure.
 */
export declare type AudioAsset = BaseAsset & {
  type: "audio";
  mimeType:
    | "audio/mpeg"
    | "audio/mp4"
    | "audio/x-m4a"
    | "audio/mp3"
    | "audio/ogg"
    | "audio/wav"
    | "audio/x-wav"
    | "audio/x-pn-wav"
    | "audio/wave"
    | "audio/vnd.wave"
    | "audio/webm";
};

/**
 * @alpha
 * Base structure for an asset result.
 */
export declare type BaseAsset = {
  name: string;
  url: string;
};

/**
 * @alpha
 * Represents a container, such as a folder or grouping.
 */
export declare type Container = {
  id: string;
  name: string;
  type: "container";
};

/**
 * @alpha
 * Document asset result structure.
 */
export declare type DocumentAsset = BaseAsset & {
  type: "document";
  parentRef?: AssetRef;
  mimeType: DocumentMimeType;
};

/**
 * @alpha
 * Supported mimetype for document assets.
 */
export declare type DocumentMimeType =
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "text/plain"
  | "text/markdown";

/**
 * @alpha
 * Request parameters for URL expansion.
 */
export declare type ExpandUrlRequest = {
  url: string;
  requestConnection: () => Promise<void>;
};

/**
 * @alpha
 * Response from URL expansion operation.
 */
export declare type ExpandUrlResponse =
  | {
      status: "completed";
      result: ExpandUrlResult;
    }
  | {
      status: "not_found";
    };

/**
 * @alpha
 * Result of completed URL expansion.
 */
export declare type ExpandUrlResult = {
  ref: UrlExpanderAssetRef;
};

/**
 * @alpha
 * Generic asset result structure.
 * A generic asset is any file that is not already covered by other asset types such as ImageAsset etc.
 * It is an error to pass a mime type that is covered by another asset type.
 */
export declare type GenericAsset = BaseAsset & {
  type: "generic";
  mimeType: string;
};

/**
 * @alpha
 * Successful result of an asset query.
 */
export declare type GetAssetsCompleted = {
  status: "completed";
  /** List of results returned by the query */
  results: GetAssetsResult[];
  /**
   * A continuation reference used for pagination.
   *
   * If this is provided, Canva may call `getAssets` again using this string
   * to continue pagination. If no more results are available, omit this field.
   *
   * The token must be less than 1024 characters.
   */
  continuation?: string;
};

/**
 * @alpha
 * Error result of a getting assets.
 */
export declare type GetAssetsError =
  | {
      status: "authentication_request_failed";
    }
  | {
      status: "app_error";
      message?: string;
    };

/**
 * @alpha
 * Parameters for getting assets.
 */
export declare type GetAssetsRequest = {
  /**
   * The query specifies the assets to retrieve.
   */
  query: {
    /**
     * Optional search string to filter assets by name. The provider may choose how to process the
     * search string e.g. some search providers may support fuzzy matching but others may not.
     *
     * If this is provided, the search is performed globally if there is no containerId.
     */
    search?: string;
    /**
     * Types of results to include in the response.
     */
    include: ResultType[];
  };
  /**
   * The maximum number of results to return.
   */
  limit: number;
  /**
   * Container to search for assets in.
   * Container IDs are developer specified strings from previous getAssets calls.
   * If this is omitted, search globally if there is a search string or within the root container if there is not.
   *
   * The container ID must be less than 500 characters.
   */
  containerId?: string;
  /**
   * Developer-specified string returned from the previous request used for continuation.
   * For example, this may be a page cursor or an offset.
   *
   * The token must be less than 1024 characters.
   **/
  continuation?: string;
};

/**
 * @alpha
 * Response of getting assets.
 */
export declare type GetAssetsResponse = GetAssetsCompleted | GetAssetsError;

/**
 * @alpha
 * Possible results of getting assets.
 */
export declare type GetAssetsResult = Asset | Container;

/**
 * @alpha
 * Completed response from content retrieval operation.
 */
export declare type GetContentCompletedResponse = {
  status: "completed";
  result: {
    type: "asset";
    asset: Asset;
  };
};

/**
 * @alpha
 * Error response from content retrieval operation.
 */
export declare type GetContentErrorResponse = {
  status: "app_error";
  message: string;
};

/**
 * @alpha
 * Request parameters for content retrieval.
 */
export declare type GetContentRequest = {
  ref: UrlExpanderAssetRef;
  requestConnection: () => Promise<void>;
};

/**
 * @alpha
 * Response from content retrieval operation.
 */
export declare type GetContentResponse =
  | GetContentCompletedResponse
  | GetContentErrorResponse;

/**
 * @alpha
 * Image asset result structure.
 */
export declare type ImageAsset = BaseAsset & {
  type: "image";
  thumbnailUrl: string;
  parentRef?: AssetRef;
  mimeType:
    | "image/heic"
    | "image/jpeg"
    | "image/png"
    | "image/svg+xml"
    | "image/tiff"
    | "image/webp";
};

/**
 * @alpha
 *
 * Prepares the `AssetPickerIntent`.
 */
export declare const prepareAssetPicker: (
  implementation: AssetPickerIntent,
) => void;

/**
 * @alpha
 *
 * Prepares the `UrlExpanderIntent`.
 */
export declare const prepareUrlExpander: (
  implementation: UrlExpanderIntent,
) => void;

/**
 * @alpha
 * Type of result e.g. container, image, video, audio, etc.
 */
export declare type ResultType = GetAssetsResult["type"];

/**
 * @alpha
 * Sheet asset result structure.
 */
export declare type SheetAsset = BaseAsset & {
  type: "sheet";
  parentRef?: AssetRef;
  mimeType: SheetMimeType;
};

/**
 * @alpha
 * Supported mimetype for sheet assets.
 */
export declare type SheetMimeType =
  | "text/csv"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

/**
 * @alpha
 * Reference to an asset with metadata.
 */
export declare type UrlExpanderAssetRef = {
  type: "asset";
  id: string;
  name: string;
  iconUrl?: string;
  description?: string;
};

/**
 * @alpha
 * Intent interface for URL expansion and content retrieval operations.
 */
export declare type UrlExpanderIntent = {
  expandUrl(request: ExpandUrlRequest): Promise<ExpandUrlResponse>;
  getContent(request: GetContentRequest): Promise<GetContentResponse>;
};

/**
 * @alpha
 * Video asset result structure.
 */
export declare type VideoAsset = BaseAsset & {
  type: "video";
  thumbnailImageUrl: string;
  parentRef?: AssetRef;
  mimeType:
    | "video/avi"
    | "video/x-msvideo"
    | "image/gif"
    | "video/x-m4v"
    | "video/x-matroska"
    | "video/quicktime"
    | "video/mp4"
    | "video/mpeg"
    | "video/webm";
};

export {};
