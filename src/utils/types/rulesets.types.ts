import { z } from "zod";

export type TRulesets = {
  id: number;
  url: string;
  uploadExtensions: string[];
  downloadExtensions: string[];
  blockUpload: boolean;
  blockDownload: boolean;
  enabled: boolean;
};

export const SRulesets = z.object({
  url: z
    .string()
    .url()
    .transform((url) => url.trim()),
  uploadExtensions: z.array(z.string().transform((ext) => ext.trim())),
  downloadExtensions: z.array(z.string().transform((ext) => ext.trim())),
  blockUpload: z.boolean().default(true),
  blockDownload: z.boolean().default(false),
  enabled: z.boolean().default(true),
});
