import { Command } from "commander";
export declare const forecastCommand: Command;
export declare function parseForecastShowArgs(args: ReadonlyArray<string>): {
    readonly bookIdArg?: string;
    readonly forecastId: string;
};
export declare function parseForecastSelectArgs(args: ReadonlyArray<string>): {
    readonly bookIdArg?: string;
    readonly forecastId: string;
    readonly branchId: string;
};
//# sourceMappingURL=forecast.d.ts.map