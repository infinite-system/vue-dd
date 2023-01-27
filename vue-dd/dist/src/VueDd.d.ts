declare const _sfc_main: import("vue").DefineComponent<{
    /**
     * modelValue
     */
    modelValue: {
        type: undefined;
        required: true;
    };
    id: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    openLevel: {
        type: (ArrayConstructor | StringConstructor | NumberConstructor)[];
        default: number;
    };
    openSpecific: {
        type: ArrayConstructor;
        default: () => never[];
    };
    focus: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    focusOffsetX: {
        type: NumberConstructor;
        default: number;
    };
    focusOffsetY: {
        type: NumberConstructor;
        default: number;
    };
    focusDelay: {
        type: NumberConstructor;
        default: number;
    };
    preview: {
        type: (NumberConstructor | BooleanConstructor)[];
        default: number;
    };
    previewInitial: {
        type: BooleanConstructor;
        default: boolean;
    };
    escapeQuotes: {
        type: BooleanConstructor;
        default: boolean;
    };
    longText: {
        type: NumberConstructor;
        default: number;
    };
    delimiter: {
        type: StringConstructor;
        default: string;
    };
    more: {
        type: StringConstructor;
        default: string;
    };
    arrow: {
        type: StringConstructor;
        default: string;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    fontFamily: {
        type: StringConstructor;
        default: string;
    };
    fontSize: {
        type: StringConstructor;
        default: string;
    };
    lineHeight: {
        type: StringConstructor;
        default: string;
    };
    paddingLeft: {
        type: StringConstructor;
        default: string;
    };
    maxHeight: {
        type: StringConstructor;
        default: string;
    };
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
    save: {
        type: BooleanConstructor;
        default: boolean;
    };
    saveFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    storage: {
        type: StringConstructor;
        default: string;
    };
    watch: {
        type: BooleanConstructor;
        default: boolean;
    };
    deep: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, {
    rootId: any;
    openClass: boolean;
    css: Function;
    useOpenSpecific: unknown[];
    useOpenLevel: number | unknown[];
    memory: null;
    shared: {
        hiddenPointers: {};
    };
    useFocus: null;
}, {
    cssVars(): {
        '--vue-dd-fontFamily': string;
        '--vue-dd-fontSize': string;
        '--vue-dd-lineHeight': string;
        '--vue-dd-paddingLeft': string;
        '--vue-dd-maxHeight': string;
        '--vue-dd-maxWidth': string;
    };
    unwrapSpecific(): any;
    type(): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array" | "null";
    primitive(): boolean;
    isSet(): boolean;
    isRef(): boolean;
}, {
    forget(): void;
    setFocus(): void;
    getElement(pointer: any): HTMLElement | null;
    getFocus(): string | number;
    initMemory(): void;
    getOpenSpecific(): unknown[];
    baseOpenSpecific(): unknown[];
    focusEmit(setup: any): void;
    open(setup: any): void;
    toggle(setup: any): void;
    store(): {
        get: () => any;
        set: (value: any) => any;
    };
    getTypeFn(value: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array" | "null";
    isPrimitiveFn(type: any): boolean;
    escapeQuotesFn(text: any): any;
    unwrapSpecificFn(openSpecific: any): any;
    emitFn(vm: any, name: any, ...args: any[]): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("open" | "toggle" | "focus")[], "open" | "toggle" | "focus", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * modelValue
     */
    modelValue: {
        type: undefined;
        required: true;
    };
    id: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    openLevel: {
        type: (ArrayConstructor | StringConstructor | NumberConstructor)[];
        default: number;
    };
    openSpecific: {
        type: ArrayConstructor;
        default: () => never[];
    };
    focus: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    focusOffsetX: {
        type: NumberConstructor;
        default: number;
    };
    focusOffsetY: {
        type: NumberConstructor;
        default: number;
    };
    focusDelay: {
        type: NumberConstructor;
        default: number;
    };
    preview: {
        type: (NumberConstructor | BooleanConstructor)[];
        default: number;
    };
    previewInitial: {
        type: BooleanConstructor;
        default: boolean;
    };
    escapeQuotes: {
        type: BooleanConstructor;
        default: boolean;
    };
    longText: {
        type: NumberConstructor;
        default: number;
    };
    delimiter: {
        type: StringConstructor;
        default: string;
    };
    more: {
        type: StringConstructor;
        default: string;
    };
    arrow: {
        type: StringConstructor;
        default: string;
    };
    inline: {
        type: BooleanConstructor;
        default: boolean;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    fontFamily: {
        type: StringConstructor;
        default: string;
    };
    fontSize: {
        type: StringConstructor;
        default: string;
    };
    lineHeight: {
        type: StringConstructor;
        default: string;
    };
    paddingLeft: {
        type: StringConstructor;
        default: string;
    };
    maxHeight: {
        type: StringConstructor;
        default: string;
    };
    maxWidth: {
        type: StringConstructor;
        default: string;
    };
    save: {
        type: BooleanConstructor;
        default: boolean;
    };
    saveFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    storage: {
        type: StringConstructor;
        default: string;
    };
    watch: {
        type: BooleanConstructor;
        default: boolean;
    };
    deep: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onOpen?: ((...args: any[]) => any) | undefined;
    onToggle?: ((...args: any[]) => any) | undefined;
    onFocus?: ((...args: any[]) => any) | undefined;
}, {
    focus: string | number;
    name: string;
    escapeQuotes: boolean;
    save: boolean;
    saveFocus: boolean;
    delimiter: string;
    openLevel: string | number | unknown[];
    openSpecific: unknown[];
    previewInitial: boolean;
    preview: number | boolean;
    longText: number;
    watch: boolean;
    id: string | number;
    focusOffsetX: number;
    focusOffsetY: number;
    focusDelay: number;
    more: string;
    arrow: string;
    inline: boolean;
    dark: boolean;
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
    paddingLeft: string;
    maxHeight: string;
    maxWidth: string;
    storage: string;
    deep: boolean;
}>;
export default _sfc_main;