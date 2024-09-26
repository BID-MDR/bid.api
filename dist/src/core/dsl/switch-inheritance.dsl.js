"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchInheritance = switchInheritance;
function switchInheritance(obj) {
    const actions = {
        ofType(ObjType) {
            return {
                do(fn) {
                    if (obj instanceof ObjType) {
                        fn(obj);
                    }
                    return actions;
                },
            };
        },
    };
    return actions;
}
//# sourceMappingURL=switch-inheritance.dsl.js.map