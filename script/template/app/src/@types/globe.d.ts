declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: HTMLElement;
    }

    type Element = HTMLElement
}
declare type OffscreenCanvasRenderingContext2D = CanvasRenderingContext2D 

declare class  OffscreenCanvas extends HTMLCanvasElement{
    constructor(width:number,height:number) {}
}