import { DashboardService } from "./dashboard.service";
export declare class DashboardController {
    private service;
    private readonly _logger;
    constructor(service: DashboardService);
    list(): Promise<{
        demands: number;
        vistory: number;
        construction: number;
        constructionConcluded: number;
    }>;
    userData(month: number): Promise<{
        beneficiario: number;
        agent: number;
        demands: number;
        constructions: number;
        help: number;
        inconsistency: number;
    }>;
}
