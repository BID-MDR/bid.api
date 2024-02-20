export function commonPropertyTransfer<T>(from: object, to: T) {
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
