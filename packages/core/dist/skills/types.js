import { z } from "zod";
export const AgentSkillSchema = z.object({
    id: z.string().min(1).max(64),
    name: z.string().min(1).max(64),
    description: z.string().min(1).max(1024),
    body: z.string().default(""),
    source: z.enum(["builtin", "project", "user", "external"]).default("external"),
    baseDir: z.string().min(1).optional(),
}).strict();
//# sourceMappingURL=types.js.map