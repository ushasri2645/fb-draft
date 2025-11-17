import type {
  RenderSettingsUiRequest,
  SettingsUiContext,
} from "@canva/intents/design";
import {
  Button,
  ColorSelector,
  FormField,
  Rows,
  Text,
  TextInput,
} from "@canva/app-ui-kit";
import { useEffect, useState } from "react";
import * as styles from "styles/components.css";
import type { Font } from "@canva/asset";
import { requestFontSelection } from "@canva/asset";

type PublishRefDetails = {
  caption: string;
  tags: string;
};

const validatePublishRef = (publishRef: PublishRefDetails) => {
  // caption is required
  if (publishRef.caption.length === 0) {
    return "invalid_missing_required_fields";
  }
  return "valid";
};

export const PublishSettingView = ({
  updatePublishSettings,
  registerOnSettingsUiContextChange,
}: RenderSettingsUiRequest) => {
  const [settings, setSettings] = useState<PublishRefDetails>({
    caption: "",
    tags: "",
  });
  const [settingsUiContext, setSettingsUiContext] =
    useState<SettingsUiContext | null>(null);

  useEffect(() => {
    const dispose = registerOnSettingsUiContextChange((context) => {
      setSettingsUiContext(context);
    });
    return dispose;
  }, [registerOnSettingsUiContextChange]);

  useEffect(() => {
    updatePublishSettings({
      publishRef: JSON.stringify(settings),
      validityState: validatePublishRef(settings),
    });
  }, [settings, updatePublishSettings]);

  const [color, setColor] = useState<string>("#ffffff");

  const [font, setFont] = useState<Font | undefined>(undefined);

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>{settingsUiContext?.outputType.displayName}</Text>
        <FormField
          label="Caption"
          control={(props) => (
            <TextInput
              {...props}
              value={settings.caption}
              onChange={(caption) =>
                setSettings((prev) => ({ ...prev, caption }))
              }
            />
          )}
        />

        <FormField
          label="Tags"
          control={(props) => (
            <TextInput
              {...props}
              value={settings.tags}
              onChange={(tags) => setSettings((prev) => ({ ...prev, tags }))}
            />
          )}
        />

        <FormField
          label="Color"
          control={(props) => (
            <ColorSelector {...props} color={color} onChange={setColor} />
          )}
        />

        <FormField
          label="Choose a font"
          control={(props) => (
            <Button
              {...props}
              variant="secondary"
              onClick={async () => {
                const response = await requestFontSelection();
                setFont(
                  response.type === "completed" ? response.font : undefined,
                );
              }}
            >
              {font ? font.name : "Choose a font"}
            </Button>
          )}
        />
      </Rows>
    </div>
  );
};
