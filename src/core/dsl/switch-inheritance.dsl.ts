interface ConstructorOf<CLASS> {
    new (...args: ReadonlyArray<never>): CLASS;
}

export function switchInheritance<O>(obj: O) {
    const actions = {
        ofType<T extends O>(ObjType: ConstructorOf<T>) {
            return {
                do(fn: (obj: T) => void) {
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
