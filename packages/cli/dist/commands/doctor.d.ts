import { Command } from "commander";
export declare function buildDoctorModelCandidates(preferredModel: string | undefined, discoveredModels: Array<{
    id: string;
    name: string;
}>): string[];
export declare function resolveDoctorModelsBaseUrl(service: string | undefined, baseUrl: string, resolveServiceModelsBaseUrl: (service: string) => string | undefined): string;
export declare const doctorCommand: Command;
//# sourceMappingURL=doctor.d.ts.map