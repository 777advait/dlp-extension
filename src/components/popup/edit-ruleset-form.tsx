import * as FormComponent from "@/components/ui/form";
import { useChromeStorage } from "@/utils/hooks/useChromeStorage";
import { SRuleset, TRuleset } from "@/utils/types/rulesets.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import React from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { createExtensionHandlers } from "@/utils/ruleset-form-utils";
import { Button } from "../ui/button";
import * as TabsComponent from "@/components/ui/tabs";
import { Switch } from "../ui/switch";

export default function EditRulesetForm({
  ruleId,
  setOpenDialog,
}: {
  ruleId: string;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, setItem } = useChromeStorage<TRuleset[]>("rulesets");
  const ruleset = data?.find((r) => r.id === ruleId);
  const [extensionInput, setExtensionInput] = React.useState("");

  const form = useForm<z.infer<typeof SRuleset>>({
    defaultValues: {
      url: "",
      uploadExtensions: [],
      downloadExtensions: [],
      enabled: true,
    },
    resolver: zodResolver(SRuleset),
  });

  React.useEffect(() => {
    if (ruleset) {
      form.reset({
        url: ruleset.url,
        uploadExtensions: ruleset.uploadExtensions,
        downloadExtensions: ruleset.downloadExtensions,
        enabled: ruleset.enabled,
      });
    }
  }, [ruleset, form]);

  const { setValue, getValues, watch } = form;
  const uploadExtensions = watch("uploadExtensions");
  const downloadExtensions = watch("downloadExtensions");

  const { handleAddExtension, handleRemoveExtension, handleKeyDown } =
    createExtensionHandlers(
      getValues,
      setValue,
      extensionInput,
      setExtensionInput,
    );

  const onSubmit = async (values: z.infer<typeof SRuleset>) => {
    const updatedRulesets = data?.filter((r) => r.id !== ruleId) ?? [];
    const updatedRuleset = {
      id: ruleId,
      ...values,
    };
    await setItem([...updatedRulesets, updatedRuleset]);
    setOpenDialog(false);
  };

  return (
    <FormComponent.Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <TabsComponent.Tabs defaultValue="url">
          <TabsComponent.TabsList className="grid w-full grid-cols-3">
            <TabsComponent.TabsTrigger value="url">
              URL
            </TabsComponent.TabsTrigger>
            <TabsComponent.TabsTrigger value="uploads">
              Uploads
            </TabsComponent.TabsTrigger>
            <TabsComponent.TabsTrigger value="downloads">
              Downloads
            </TabsComponent.TabsTrigger>
          </TabsComponent.TabsList>
          <TabsComponent.TabsContent value="url">
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
          </TabsComponent.TabsContent>
          <TabsComponent.TabsContent value="uploads">
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
          </TabsComponent.TabsContent>
          <TabsComponent.TabsContent value="downloads">
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
          </TabsComponent.TabsContent>
        </TabsComponent.Tabs>
        <div className="flex justify-between pt-2">
          <FormComponent.FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormComponent.FormItem className="flex items-center space-x-1">
                <FormComponent.FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormComponent.FormControl>
                <div className="">
                  <FormComponent.FormLabel>Enabled</FormComponent.FormLabel>
                </div>
              </FormComponent.FormItem>
            )}
          />

          <div>
            <Button>Save</Button>
          </div>
        </div>
      </form>
    </FormComponent.Form>
  );
}
