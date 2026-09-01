import type { StoryGraph, StoryNode } from "./graph-schema.js";
export declare function emotionScore(word: string): number;
export declare function nodeEmotion(node: StoryNode): number;
export declare function analyzeEmotionalArcs(graph: StoryGraph): {
    arcs: {
        endingId: string | null;
        points: {
            nodeId: string;
            score: number;
        }[];
    }[];
    truncated: boolean;
};
export declare function analyzePathDistribution(graph: StoryGraph): {
    total: number;
    truncated: boolean;
    byEnding: Record<string, number>;
    lengthHistogram: Record<number, number>;
};
//# sourceMappingURL=emotion.d.ts.map