export default _sfc_main;
declare namespace _sfc_main {
    export const name: string;
    export const inheritAttrs: boolean;
    export const emits: string[];
    export namespace props {
        export const root: undefined;
        export const rootId: (StringConstructor | NumberConstructor)[];
        export const modelValue: undefined;
        const name_1: (StringConstructor | NumberConstructor)[];
        export { name_1 as name };
        export const openLevel: (ArrayConstructor | NumberConstructor)[];
        export const openSpecific: ArrayConstructor;
        export const longText: NumberConstructor;
        export const escapeQuotes: BooleanConstructor;
        export const deep: BooleanConstructor;
        export const watch: BooleanConstructor;
        export const preview: (NumberConstructor | BooleanConstructor)[];
        export const previewInitial: BooleanConstructor;
        export const focus: (StringConstructor | NumberConstructor)[];
        export const arrow: StringConstructor;
        export const delimiter: StringConstructor;
        export const more: StringConstructor;
        export const save: BooleanConstructor;
        export const saveFocus: BooleanConstructor;
        export const shared: ObjectConstructor;
        export const type: StringConstructor;
        export const parentType: StringConstructor;
        export const parentOpen: BooleanConstructor;
        export namespace pointer {
            const type_1: (StringConstructor | NumberConstructor)[];
            export { type_1 as type };
            const _default: string;
            export { _default as default };
        }
        export namespace level {
            const type_2: NumberConstructor;
            export { type_2 as type };
            const _default_1: number;
            export { _default_1 as default };
        }
        export const size: NumberConstructor;
        export const position: NumberConstructor;
        export const escapeQuotesFn: FunctionConstructor;
        export const isPrimitiveFn: FunctionConstructor;
        export const getTypeFn: FunctionConstructor;
        export const unwrapSpecificFn: FunctionConstructor;
        export const emitFn: FunctionConstructor;
    }
    export function data(): {
        id: any;
        hideTimes: number;
        open: boolean;
        expanded: boolean;
        items: never[];
        getMapSet: {};
        getSize: number;
        useOpenLevel: any;
        useOpenSpecific: any;
        originalOpenLevel: any;
        askForget: boolean;
        cleared: boolean;
        hover: boolean;
        unwatch: () => void;
    };
    export function data(): {
        id: any;
        hideTimes: number;
        open: boolean;
        expanded: boolean;
        items: never[];
        getMapSet: {};
        getSize: number;
        useOpenLevel: any;
        useOpenSpecific: any;
        originalOpenLevel: any;
        askForget: boolean;
        cleared: boolean;
        hover: boolean;
        unwatch: () => void;
    };
    export function mounted(): void;
    export function mounted(): void;
    export function created(): void;
    export function created(): void;
    export namespace methods {
        function showEmit(): boolean;
        function showEmit(): boolean;
        function getAllPointer(pointer: any): string;
        function getAllPointer(pointer: any): string;
        function forget(): void;
        function forget(): void;
        function openParent(): void;
        function openParent(): void;
        function getId(): any;
        function getId(): any;
        function watchModelValue(deep: any): any;
        function watchModelValue(deep: any): any;
        function getPointer(index: any): any;
        function getPointer(index: any): any;
        function getSpecialType(index: any): any;
        function getSpecialType(index: any): any;
        function getModelValue(index: any): any;
        function getModelValue(index: any): any;
        function preventSelect(event: any): void;
        function preventSelect(event: any): void;
        /**
         * Get the name of key of an object or array
         * If it is an array, those keys are not named
         * @param key
         * @returns {string|*}
         */
        function getName(key: any): any;
        /**
         * Get the name of key of an object or array
         * If it is an array, those keys are not named
         * @param key
         * @returns {string|*}
         */
        function getName(key: any): any;
        function expand(): void;
        function expand(): void;
        function toggleOpen(event: any, value: any): void;
        function toggleOpen(event: any, value: any): void;
        function emit(name: any, ...args: any[]): void;
        function emit(name: any, ...args: any[]): void;
        function makeItems(): any;
        function makeItems(): any;
        function parentIsOpen(): any;
        function parentIsOpen(): any;
        function focusEmit(): void;
        function focusEmit(): void;
        function setOpen(value: any, { user }: {
            user: any;
        }): void;
        function setOpen(value: any, { user }: {
            user: any;
        }): void;
    }
    export namespace computed {
        function parentIsArray(): any;
        function parentIsArray(): any;
        function unwrapSpecific(): any;
        function unwrapSpecific(): any;
        function allowPreview(): any;
        function allowPreview(): any;
        function isMap(): any;
        function isMap(): any;
        function isSet(): any;
        function isSet(): any;
        function isMapSet(): () => any;
        function isMapSet(): () => any;
        function instanceOf(): any;
        function instanceOf(): any;
        function nextLevel(): any;
        function nextLevel(): any;
        function charClass(): "vue-dd-obj-char" | "vue-dd-arr-char";
        function charClass(): "vue-dd-obj-char" | "vue-dd-arr-char";
        function charOpen(): "{" | "[";
        function charOpen(): "{" | "[";
        function charClose(): "}" | "]";
        function charClose(): "}" | "]";
        function functionInlinePreview(): any;
        function functionInlinePreview(): any;
        function functionInline(): any;
        function functionInline(): any;
        function functionName(): any;
        function functionName(): any;
        function functionContent(): any;
        function functionContent(): any;
        function shouldComma(): any;
        function shouldComma(): any;
        function longTextInline(): any;
        function longTextInline(): any;
        function longTextContent(): any;
        function longTextContent(): any;
        function isLongText(): boolean;
        function isLongText(): boolean;
        function isRefReactive(): () => boolean;
        function isRefReactive(): () => boolean;
        function isIterable(): () => boolean;
        function isIterable(): () => boolean;
        function isArray(): boolean;
        function isArray(): boolean;
        function isObject(): boolean;
        function isObject(): boolean;
        function isFunction(): boolean;
        function isFunction(): boolean;
        function isPromise(): boolean;
        function isPromise(): boolean;
        function isReactive(): boolean;
        function isReactive(): boolean;
        function isRef(): boolean;
        function isRef(): boolean;
        function isFocused(): boolean;
        function isFocused(): boolean;
        function showName(): any;
        function showName(): any;
        function nameString(): any;
        function nameString(): any;
    }
    export namespace watch_1 {
        export namespace openLevel_1 {
            function handler(value: any): void;
            function handler(value: any): void;
            const immediate: boolean;
        }
        export { openLevel_1 as openLevel };
        export namespace unwrapSpecific {
            export function handler(value: any): undefined;
            export function handler(value: any): undefined;
            const immediate_1: boolean;
            export { immediate_1 as immediate };
        }
        export namespace open {
            export function handler(value: any, oldValue: any): void;
            export function handler(value: any, oldValue: any): void;
            const immediate_2: boolean;
            export { immediate_2 as immediate };
        }
        export function preview(preview: any): void;
        export function preview(preview: any): void;
    }
    export { watch_1 as watch };
    export namespace components {
        export { NodePrimitive };
    }
}
import NodePrimitive from "./NodePrimitive";
