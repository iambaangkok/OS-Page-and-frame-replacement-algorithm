import { SimulationRecord } from "../types";

const findFurtestPageIndex = (
    currentIndex: number,
    referenceString: number[],
    frames: number[]
) => {
    let maxLength = 0;
    let maxPage = frames[0];
    let maxIndex = 0;

    for (let i = 0; i < frames.length; ++i) {
        const indexOfPage = referenceString.indexOf(
            frames[i],
            currentIndex + 1
        );
        if (indexOfPage == -1) {
            maxLength = indexOfPage;
            maxPage = frames[i];
            maxIndex = i;
            break;
        } else if (indexOfPage > maxLength) {
            maxLength = indexOfPage;
            maxPage = frames[i];
            maxIndex = i;
        }
    }

    return maxIndex;
};

export const optimal = (
    referenceString: number[],
    frameCount: number
): SimulationRecord[] => {
    console.log(`Optimal, Frame Count: ${frameCount}`);
    const frames: number[] = new Array<number>(frameCount);
    const outputs: SimulationRecord[] = [];

    let pageFaultCounter: number = 0;

    for (let i = 0; i < referenceString.length; ++i) {
        const pageNumber = referenceString[i];
        const pageFault = !frames.includes(pageNumber);

        if (pageFault) {
            pageFaultCounter++;
            if (frameCount > 0) {
                // find the page number that will not be used for longest period of time
                let replaceIndex = findFurtestPageIndex(
                    i,
                    referenceString,
                    frames
                );

                // replace frame with that page with new page
                frames[replaceIndex] = pageNumber;
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
