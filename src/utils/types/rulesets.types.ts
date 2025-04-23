import { z } from "zod";

export type TRuleset = {
  id: string;
  url: string;
  uploadExtensions: string[];
  downloadExtensions: string[];
  enabled: boolean;
};

export const SRuleset = z.object({
  url: z
    .string()
    .url()
    .transform((url) => url.trim()),
  uploadExtensions: z.string().array(),
  downloadExtensions: z.string().array(),
  enabled: z.boolean(),
});
