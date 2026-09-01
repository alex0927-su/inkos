import type { NotifyFormat } from "./format.js";
export interface TelegramConfig {
    readonly botToken: string;
    readonly chatId: string;
}
export declare function sendTelegram(config: TelegramConfig, message: string, format?: NotifyFormat): Promise<void>;
//# sourceMappingURL=telegram.d.ts.map