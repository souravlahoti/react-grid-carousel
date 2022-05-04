import { CSSProperties, FC, ReactNode } from 'react';
export declare type CarouselProps = {
    cols?: number;
    rows?: number;
    gap?: number | string;
    loop?: boolean;
    scrollSnap?: boolean;
    hideArrow?: boolean;
    arrowLeft?: ReactNode;
    arrowRight?: ReactNode;
    containerClassName?: string;
    containerStyle?: CSSProperties;
    onPageChanged?: (page: number) => number;
    startPage?: number;
    children?: ReactNode;
};
declare function Carousel({ cols: colsProp, rows: rowsProp, gap: gapProp, loop: loopProp, scrollSnap, hideArrow, arrowLeft, arrowRight, containerClassName, containerStyle, children, startPage, onPageChanged, }: CarouselProps): JSX.Element;
declare namespace Carousel {
    var Item: FC<{}>;
}
export default Carousel;
