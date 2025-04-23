import { useForm } from "react-hook-form";
import * as FormComponent from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useChromeStorage } from "@/utils/hooks/useChromeStorage";
import { SRuleset, TRuleset } from "@/utils/types/rulesets.types";
import { generateUUID } from "@/utils/gen-uuid";
import { toast } from "sonner";

export default function RulesetForm({
  setIsDialogOpen,
}: {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [step, setStep] = React.useState<"URL" | "UPLOAD" | "DOWNLOAD">("URL");
  const [extensionInput, setExtensionInput] = React.useState("");
  const { data: existingRulesets, setItem } =
    useChromeStorage<TRuleset[]>("rulesets");

  const form = useForm<z.infer<typeof SRuleset>>({
    defaultValues: {
      url: "",
      uploadExtensions: [],
      downloadExtensions: [],
      enabled: true,
    },
    resolver: zodResolver(SRuleset),
  });

  const { setValue, getValues, watch } = form;
  const uploadExtensions = watch("uploadExtensions");
  const downloadExtensions = watch("downloadExtensions");

  const handleAddExtension = (
    type: "uploadExtensions" | "downloadExtensions",
  ) => {
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

  const handleRemoveExtension = (
    type: "uploadExtensions" | "downloadExtensions",
    ext: string,
  ) => {
    const currentExtensions = getValues(type);
    setValue(
      type,
      currentExtensions.filter((e) => e !== ext),
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    type: "uploadExtensions" | "downloadExtensions",
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddExtension(type);
    }
  };

  async function handleSubmit(values: z.infer<typeof SRuleset>) {
    switch (step) {
      case "URL":
        setStep("UPLOAD");
        break;
      case "UPLOAD":
        setStep("DOWNLOAD");
        break;
      case "DOWNLOAD":
        try {
          const newRuleset: TRuleset = {
            id: generateUUID(),
            ...values,
          };

          await setItem([...(existingRulesets ?? []), newRuleset]);
          toast("Ruleset saved successfully");
        } catch (error) {
          toast.error("Failed to save ruleset");
        }
        setIsDialogOpen(false);
        break;
    }
  }

  const getButtonText = () => {
    switch (step) {
      case "URL":
        return "Next";
      case "UPLOAD":
        return "Next";
      case "DOWNLOAD":
        return "Save Rule";
    }
  };

  return (
    <div className="py-4">
      <FormComponent.Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {step === "URL" && (
            <FormComponent.FormField
              name="url"
              control={form.control}
              render={({ field }) => (
                <FormComponent.FormItem>
                  <FormComponent.FormLabel>Website URL</FormComponent.FormLabel>
                  <FormComponent.FormControl>
                    <Input {...field} placeholder="https://example.com" />
                  </FormComponent.FormControl>
                  <FormComponent.FormMessage />
                </FormComponent.FormItem>
              )}
            />
          )}

          {step === "UPLOAD" && (
            <FormComponent.FormField
              name="uploadExtensions"
              control={form.control}
              render={() => (
                <FormComponent.FormItem>
                  <FormComponent.FormLabel>
                    Upload Extensions
                  </FormComponent.FormLabel>
                  <FormComponent.FormControl>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <Input
                          value={extensionInput}
                          onChange={(e) => setExtensionInput(e.target.value)}
                          onKeyDown={(e) =>
                            handleKeyDown(e, "uploadExtensions")
                          }
                          placeholder=".pdf, .docx, .xlsx"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => handleAddExtension("uploadExtensions")}
                        >
                          Add
                        </Button>
                      </div>

                      {uploadExtensions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {uploadExtensions.map((ext) => (
                            <Badge
                              key={ext}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {ext}
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveExtension("uploadExtensions", ext)
                                }
                                className="hover:bg-muted ml-1 rounded-full"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormComponent.FormControl>
                  <FormComponent.FormDescription>
                    File extensions that will be blocked from uploading
                  </FormComponent.FormDescription>
                  <FormComponent.FormMessage />
                </FormComponent.FormItem>
              )}
            />
          )}

          {step === "DOWNLOAD" && (
            <FormComponent.FormField
              name="downloadExtensions"
              control={form.control}
              render={() => (
                <FormComponent.FormItem>
                  <FormComponent.FormLabel>
                    Download Extensions
                  </FormComponent.FormLabel>
                  <FormComponent.FormControl>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <Input
                          value={extensionInput}
                          onChange={(e) => setExtensionInput(e.target.value)}
                          onKeyDown={(e) =>
                            handleKeyDown(e, "downloadExtensions")
                          }
                          placeholder=".pdf, .docx, .xlsx"
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() =>
                            handleAddExtension("downloadExtensions")
                          }
                        >
                          Add
                        </Button>
                      </div>

                      {downloadExtensions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {downloadExtensions.map((ext) => (
                            <Badge
                              key={ext}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {ext}
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveExtension(
                                    "downloadExtensions",
                                    ext,
                                  )
                                }
                                className="hover:bg-muted ml-1 rounded-full"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormComponent.FormControl>
                  <FormComponent.FormDescription>
                    File extensions that will be blocked from downloading
                  </FormComponent.FormDescription>
                  <FormComponent.FormMessage />
                </FormComponent.FormItem>
              )}
            />
          )}

          <div className="flex justify-between pt-2">
            {step !== "URL" && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step === "DOWNLOAD" ? "UPLOAD" : "URL")}
              >
                Back
              </Button>
            )}
            <div className={step === "URL" ? "ml-auto" : ""}>
              <Button type="submit">{getButtonText()}</Button>
            </div>
          </div>
        </form>
      </FormComponent.Form>
    </div>
  );
}
