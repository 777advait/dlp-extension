import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { SRuleset } from "@/utils/types/rulesets.types";

type ExtensionType = "uploadExtensions" | "downloadExtensions";

export const createExtensionHandlers = (
  getValues: UseFormGetValues<z.infer<typeof SRuleset>>,
  setValue: UseFormSetValue<z.infer<typeof SRuleset>>,
  extensionInput: string,
  setExtensionInput: React.Dispatch<React.SetStateAction<string>>,
) => {
  const handleAddExtension = (type: ExtensionType) => {
    if (!extensionInput.trim()) return;

    // Ensure extension starts with a dot
    let ext = extensionInput.trim();
    if (!ext.startsWith(".")) ext = `.${ext}`;

    const currentExtensions = getValues(type);
    if (!currentExtensions.includes(ext)) {
      setValue(type, [...currentExtensions, ext]);
    }
    setExtensionInput("");
  };

  const handleRemoveExtension = (type: ExtensionType, ext: string) => {
    const currentExtensions = getValues(type);
    setValue(
      type,
      currentExtensions.filter((e) => e !== ext),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: ExtensionType) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddExtension(type);
    }
  };

  return {
    handleAddExtension,
    handleRemoveExtension,
    handleKeyDown,
  };
};
