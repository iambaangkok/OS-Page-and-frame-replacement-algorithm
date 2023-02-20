import { printTable } from "console-table-printer";

import { fifo } from "./algorithms/fifo";
import { lru } from "./algorithms/lru";
import { optimal } from "./algorithms/optimal";
import { referenceString100, referenceString30, referenceString50 } from "./data";
import { GraphRecord } from "./types";

const main = () => {
    const referenceString = referenceString100;

    console.log(`Reference String: ${referenceString}`);

    const minFrame = 6;
    const maxFrame = 6;
    const len = referenceString.length;

    const fifoPageFaults: GraphRecord[] = [];
    const optimalPageFaults: GraphRecord[] = [];
    const lruPageFaults: GraphRecord[] = [];

    for (let i = minFrame; i <= maxFrame; ++i) {
        const fifoOutputs = fifo(referenceString, i);
        const optimalOutputs = optimal(referenceString, i);
        const lruOutputs = lru(referenceString, i);

        fifoPageFaults.push({ x: i, y: fifoOutputs[len - 1].pageFaultCounter });
        optimalPageFaults.push({
            x: i,
            y: optimalOutputs[len - 1].pageFaultCounter,
        });
        lruPageFaults.push({ x: i, y: lruOutputs[len - 1].pageFaultCounter });

        printTable(fifoOutputs);
        printTable(optimalOutputs);
        printTable(lruOutputs);
    }

    console.log(fifoPageFaults);
    console.log(optimalPageFaults);
    console.log(lruPageFaults);
};

main();
