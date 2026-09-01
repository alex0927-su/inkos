import type { NotifyFormat } from "./format.js";
export interface WechatWorkConfig {
    readonly webhookUrl: string;
}
export declare function sendWechatWork(config: WechatWorkConfig, content: string, format?: NotifyFormat): Promise<void>;
//# sourceMappingURL=wechat-work.d.ts.map