import { z } from "zod";
export const PromptPackManifestSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    prompts: z.array(z.string().min(1)).default([]),
    source: z.enum(["builtin", "project", "user", "external"]).default("builtin"),
});
//# sourceMappingURL=types.js.map