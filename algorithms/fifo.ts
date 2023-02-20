import { SimulationRecord } from "../types";

const increaseIndex = (index: number, limit: number) => {
    return (index + 1) % limit;
};

export const fifo = (
    referenceString: number[],
    frameCount: number
): SimulationRecord[] => {
    console.log(`FIFO, Frame Count: ${frameCount}`);
    const frames: number[] = new Array<number>(frameCount);
    const outputs: SimulationRecord[] = [];

    let nextReplaceIndex: number = 0;
    let pageFaultCounter: number = 0;

    for (let i = 0; i < referenceString.length; ++i) {
        const pageNumber = referenceString[i];
        const pageFault = !frames.includes(pageNumber);

        if (pageFault) {
            pageFaultCounter++;
            if (frameCount > 0) {
                frames[nextReplaceIndex] = pageNumber;
                nextReplaceIndex = increaseIndex(nextReplaceIndex, frameCount);
            }
        }

        const output: SimulationRecord = {
            index: i,
            pageNumber,
            frames: [...frames],
            pageFault,
            pageFaultCounter,
        };

        outputs.push(output);
    }

    console.log(
        `Total Page Faults: ${outputs[outputs.length - 1].pageFaultCounter}\n`
    );

    return outputs;
};
