import type { NotifyFormat } from "./format.js";
export interface FeishuConfig {
    readonly webhookUrl: string;
}
export declare function sendFeishu(config: FeishuConfig, title: string, content: string, format?: NotifyFormat): Promise<void>;
//# sourceMappingURL=feishu.d.ts.map