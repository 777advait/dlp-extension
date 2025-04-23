import { useForm } from "react-hook-form";
import * as FormComponent from "../ui/form";
import { z } from "zod";
import { SRulesets } from "@/utils/types/rulesets.types";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

export default function RulesetForm() {
  const form = useForm<z.infer<typeof SRulesets>>({
    defaultValues: {
      url: "",
      uploadExtensions: [],
      downloadExtensions: [],
      blockUpload: true,
      blockDownload: false,
      enabled: true,
    },
  });

  async function handleSubmit(values: z.infer<typeof SRulesets>) {
    console.log(values);
  }

  return (
    <FormComponent.Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormComponent.FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormComponent.FormItem className="">
              <FormComponent.FormLabel>Website URL</FormComponent.FormLabel>
              <FormComponent.FormControl>
                <Input {...field} placeholder="https://google.com" />
              </FormComponent.FormControl>
            </FormComponent.FormItem>
          )}
        />
        <FormComponent.FormField
          name="uploadExtensions"
          control={form.control}
          render={({ field }) => (
            <FormComponent.FormItem className="">
              <FormComponent.FormLabel>Extensions</FormComponent.FormLabel>
              <FormComponent.FormControl>
                <Input {...field} placeholder="https://google.com" />
              </FormComponent.FormControl>
            </FormComponent.FormItem>
          )}
        />
        <FormComponent.FormField
          name="blockUpload"
          control={form.control}
          render={({ field }) => (
            <FormComponent.FormItem className="flex items-center">
              <FormComponent.FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormComponent.FormControl>
              <div className="">
                <FormComponent.FormLabel>Block uploads</FormComponent.FormLabel>
              </div>
            </FormComponent.FormItem>
          )}
        />
        <FormComponent.FormField
          name="blockDownload"
          control={form.control}
          render={({ field }) => (
            <FormComponent.FormItem className="flex items-center">
              <FormComponent.FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormComponent.FormControl>
              <div className="">
                <FormComponent.FormLabel>
                  Block downloads
                </FormComponent.FormLabel>
              </div>
            </FormComponent.FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </FormComponent.Form>
  );
}
