export interface dispatchType {
    type: string;
    payload: string | number | boolean | Record<string, any> | null;
}

export interface activeDispatch {
    (action: dispatchType): void;
}

export interface toolBarType {
    toolBar: string[];
    filter: (predicate: (item: string) => boolean) => string[];
    includes: (item: string) => boolean;
    [Symbol.iterator]: () => IterableIterator<string>;
};


