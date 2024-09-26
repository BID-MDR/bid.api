interface ConstructorOf<CLASS> {
    new (...args: ReadonlyArray<never>): CLASS;
}
export declare function switchInheritance<O>(obj: O): {
    ofType<T extends O>(ObjType: ConstructorOf<T>): {
        do(fn: (obj: T) => void): any;
    };
};
export {};
