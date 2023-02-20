import { SimulationRecord } from "../types";

const initFrameAge = (frameCount: number) => {
    const frameAges: number[] = new Array<number>(frameCount);
    for (let i = 0; i < frameCount; ++i) frameAges[i] = 2000000;

    return frameAges;
};

const countUpFrameAge = (frames: number[], frameAges: number[]) => {
    for (let i = 0; i < frameAges.length; ++i) {
        if (frames[i] != null) {
            frameAges[i]++;
        }
    }
};

const findLeastUsedPageIndex = (frames: number[], frameAges: number[]) => {
    let maxIndex = 0;

    const maxAge = Math.max(...frameAges);

    maxIndex = frameAges.indexOf(maxAge);

    return maxIndex;
};

export const lru = (
    referenceString: number[],
    frameCount: number
): SimulationRecord[] => {
    console.log(`LRU, Frame Count: ${frameCount}`);
    const frames: number[] = new Array<number>(frameCount);
    const frameAges: number[] = initFrameAge(frameCount);

    const outputs: SimulationRecord[] = [];

    let pageFaultCounter: number = 0;

    for (let i = 0; i < referenceString.length; ++i) {
        const pageNumber = referenceString[i];
        const pageFault = !frames.includes(pageNumber);

        if (pageFault) {
            pageFaultCounter++;

            if (frameCount > 0) {
                // find least used frame
                let replaceIndex = findLeastUsedPageIndex(frames, frameAges);

                frameAges[replaceIndex] = 0;

                // replace frame with that page with new page
                frames[replaceIndex] = pageNumber;
            }
        } else {
            frameAges[frames.indexOf(pageNumber)] = 0;
        }

        countUpFrameAge(frames, frameAges);

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
