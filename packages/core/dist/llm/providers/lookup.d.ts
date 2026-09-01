import type { InkosModel } from "./types.js";
/**
 * 两层 lookup：
 * - Layer 1: 已知 provider 精确查（整串比较，不拆斜线）
 * - Layer 2: 全局扫所有 provider 的 models，按 provider id 优先级取第一条
 * - 都 miss: 返回 undefined，调用方走保守默认
 *
 * 不做斜线前缀拆分。lobe 的 processModelList 证实了"靠调用入口带 provider 消歧"
 * 是对的做法，斜线拆分对 PPIO / SiliconCloud 原生命名会误匹配。
 */
export declare function lookupModel(serviceId: string, modelId: string): InkosModel | undefined;
/** 某 service 下可用（enabled !== false）的模型列表 */
export declare function listEnabledModels(serviceId: string): InkosModel[];
export declare function isActiveTextModel(model: InkosModel): boolean;
export declare function listActiveTextModels(serviceId: string): InkosModel[];
//# sourceMappingURL=lookup.d.ts.map