/**
 * 阿里云百炼（DashScope）— Anthropic 通道
 *
 * - 控制台：https://bailian.console.aliyun.com/
 * - API key：https://bailian.console.aliyun.com/?tab=model#/api-key
 * - 模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
 * - Anthropic 兼容接入：https://help.aliyun.com/zh/model-studio/developer-reference/use-anthropic-sdk
 *
 * inkos 用 /apps/anthropic 接入（agent 场景工具调用更稳）。
 *
 * **重要**：百炼有两条通道，模型清单**不完全对等**：
 *   - OpenAI 兼容（/compatible-mode/v1）：全量 236+ 模型（qwen3.6、kimi-k2.6、deepseek-v3.2 等）
 *   - Anthropic 兼容（/apps/anthropic）：精选 20+ 模型，主要是 qwen 主力 + 少数代理（kimi-k2.5、
 *     kimi-k2-thinking、MiniMax-M2.5/2.1、glm-5/5.1/4.7/4.6）
 *
 * 下面的清单是 2026-04-23 对 /apps/anthropic 通道逐一 live 验证过的子集，
 * 不能从 OpenAI 通道的 /models 清单直接抄——kimi-k2.6、deepseek-v3.2、
 * qwen3-235b / qwen3-32b 等 OpenAI 通道支持的 id，Anthropic 通道会 400。
 *
 * 同理：不设 modelsBaseUrl 让 live /models probe 走 OpenAI 通道，那会拉到
 * 大量 Anthropic 通道不支持的 id，用户选了就 400。这里宁可只用 bank 兜底。
 */
import type { InkosEndpoint } from "../types.js";
export declare const BAILIAN: InkosEndpoint;
//# sourceMappingURL=bailian.d.ts.map