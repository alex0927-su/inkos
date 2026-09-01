/**
 * 讯飞星辰 Astron Coding Plan
 *
 * - 官网：https://training.xfyun.cn/maas
 * - 控制台 / 订阅入口：https://training.xfyun.cn/maas/coding
 * - API 文档：https://www.xfyun.cn/doc/spark/CodingPlan.html
 * - OpenAI 协议 baseUrl：https://maas-coding-api.cn-huabei-1.xf-yun.com/v2
 * - Anthropic 协议 baseUrl：https://maas-coding-api.cn-huabei-1.xf-yun.com/anthropic
 *
 * 讯飞星辰 MaaS 针对编程场景的订阅套餐。订阅包里的底层模型由用户在控制台切换，
 * 对外统一 id 是 astron-code-latest（无需根据底层模型改配置）。
 * inkos 走 Anthropic 协议接入（和 Claude Code 一致），agent 场景工具调用更稳。
 */
import type { InkosEndpoint } from "../types.js";
export declare const ASTRON_CODING_PLAN: InkosEndpoint;
//# sourceMappingURL=astronCodingPlan.d.ts.map