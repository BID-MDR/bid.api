"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonPropertyTransfer = commonPropertyTransfer;
function commonPropertyTransfer(from, to) {
    for (const key in from) {
        if (from.hasOwnProperty(key) && !from[key]) {
            const element = from[key];
            if (to.hasOwnProperty(key)) {
                to[key] = element;
            }
        }
    }
    return to;
}
//# sourceMappingURL=common-property-transfer.util.js.map