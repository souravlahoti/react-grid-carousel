declare const HANDLER_NAME_SPACE = "__react-grid-carousel-resize-handler";
declare global {
    interface Window {
        [HANDLER_NAME_SPACE]?: Record<string, Function>;
    }
}
export declare const addResizeHandler: (key: string, handler: Function) => void;
export declare const removeResizeHandler: (key: string) => void;
export {};
