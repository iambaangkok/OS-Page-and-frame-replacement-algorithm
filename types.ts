export interface SimulationRecord {
    index: number;
    pageNumber: number;
    frames: number[];
    pageFault: boolean;
    pageFaultCounter: number;
}

export interface GraphRecord {
    x: number;
    y: number;
}
