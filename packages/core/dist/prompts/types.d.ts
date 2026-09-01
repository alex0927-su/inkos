import { z } from "zod";
export declare const PromptPackManifestSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    prompts: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    source: z.ZodDefault<z.ZodEnum<["builtin", "project", "user", "external"]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    source: "user" | "builtin" | "project" | "external";
    description: string;
    prompts: string[];
}, {
    id: string;
    title: string;
    description: string;
    source?: "user" | "builtin" | "project" | "external" | undefined;
    prompts?: string[] | undefined;
}>;
export type PromptPackManifest = z.infer<typeof PromptPackManifestSchema>;
//# sourceMappingURL=types.d.ts.map