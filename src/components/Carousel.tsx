import {
  Children,
  CSSProperties,
  FC,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import useRefProp from '../hooks/useRefProp';
import {addResizeHandler, removeResizeHandler} from '../utils/resizeListener';
import ArrowButton from './ArrowButton';

export type CarouselProps = {
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
  onPageChanged?: (page: number) => void;
  onTotalPagesChanged?: (page: number) => void;
  startPage?: number;
  children?: ReactNode;
};

const Container = styled.div`
  position: relative;
`;

const RailWrapper = styled.div<Pick<CarouselProps, 'scrollSnap'>>`
  overflow: hidden;
  // overflow-x: auto;
  // margin: 0;
  // scroll-snap-type: ${({scrollSnap}) => (scrollSnap ? 'x mandatory' : '')};
  // scrollbar-width: none;
  //
  // &::-webkit-scrollbar {
  //   display: none;
  // }
`;

const Rail = styled.div<Pick<CarouselProps, 'gap' | 'rows' | 'cols'> & {page: number; currentPage: number}>`
  display: grid;
  grid-column-gap: ${({gap}) => `${gap}px`};
  position: relative;
  transition: transform 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0s;
  grid-template-columns: ${({page}) => `repeat(${page}, 100%)`};
  transform: ${({currentPage, gap}) => `translateX(calc(${-100 * currentPage}% - ${(gap as number) * currentPage}px))`};
`;

const ItemSet = styled.div<Pick<CarouselProps, 'gap' | 'rows' | 'cols'>>`
  display: grid;
  grid-template-columns: ${({cols}) => `repeat(${cols}, 1fr)`};
  grid-template-rows: ${({rows}) => `repeat(${rows}, 1fr)`};
  grid-gap: ${({gap}) => `${gap}px`};
`;

const Item = styled.div<Pick<CarouselProps, 'scrollSnap'>>`
  scroll-snap-align: ${({scrollSnap}) => (scrollSnap ? 'center' : '')};
`;

const CAROUSEL_ITEM = 'CAROUSEL_ITEM';
function Carousel({
  cols: colsProp = 1,
  rows: rowsProp = 1,
  gap: gapProp = 10,
  loop: loopProp = false,
  scrollSnap = true,
  hideArrow = false,
  arrowLeft,
  arrowRight,
  containerClassName,
  containerStyle,
  children,
  startPage = 0,
  onPageChanged,
  onTotalPagesChanged,
}: CarouselProps) {
  const [currentPage, setCurrentPage] = useState<number>(startPage);
  const [cols, setCols] = useState<number>(colsProp);
  const [rows, setRows] = useState<number>(rowsProp);
  const [gap, setGap] = useState<number>(0);
  const [loop, setLoop] = useState<boolean>(loopProp);
  const [railWrapperWidth, setRailWrapperWidth] = useState<number>(0);
  const [hasSetResizeHandler, setHasSetResizeHandler] = useState<boolean>(false);
  const railWrapperRef = useRef<HTMLDivElement>(null);
  const randomKey = useMemo(() => `${Math.random()}-${Math.random()}`, []);
  const onPageChangedRef = useRefProp(onPageChanged);
  const onTotalPagesChangedRef = useRefProp(onTotalPagesChanged);

  useEffect(() => {
    onPageChangedRef.current?.(currentPage);
  }, [currentPage]);

  const handleRailWrapperResize = useCallback(() => {
    railWrapperRef.current && setRailWrapperWidth(railWrapperRef.current.offsetWidth);
  }, [railWrapperRef]);

  const setResizeHandler = useCallback(() => {
    addResizeHandler(`gapCalculator-${randomKey}`, handleRailWrapperResize);
    setHasSetResizeHandler(true);
  }, [randomKey, handleRailWrapperResize]);

  const rmResizeHandler = useCallback(() => {
    removeResizeHandler(`gapCalculator-${randomKey}`);
    setHasSetResizeHandler(false);
  }, [randomKey]);

  const parseGap = useCallback(
    (gap) => {
      let parsed = gap;
      let shouldSetResizeHandler = false;

      if (typeof gap !== 'number') {
        switch (/\D*$/.exec(gap)?.[0]) {
          case 'px': {
            parsed = +gap.replace('px', '');
            break;
          }
          case '%': {
            const wrapperWidth = railWrapperWidth || (railWrapperRef.current ? railWrapperRef.current.offsetWidth : 0);
            parsed = (wrapperWidth * gap.replace('%', '')) / 100;
            shouldSetResizeHandler = true;
            break;
          }
          default: {
            parsed = 0;
            console.error(`Doesn't support the provided measurement unit: ${gap}`);
          }
        }
      }

      shouldSetResizeHandler && !hasSetResizeHandler && setResizeHandler();
      !shouldSetResizeHandler && hasSetResizeHandler && rmResizeHandler();
      return parsed;
    },
    [railWrapperWidth, railWrapperRef, hasSetResizeHandler, setResizeHandler, rmResizeHandler]
  );

  useEffect(() => {
    setCols(colsProp);
    setRows(rowsProp);
    setGap(parseGap(gapProp));
    setLoop(loopProp);
    setCurrentPage(0);
  }, [colsProp, rowsProp, gapProp, loopProp, parseGap]);

  const itemList = useMemo(
    () => Children.toArray(children).filter((child) => (child as any)?.type?.displayName === CAROUSEL_ITEM),
    [children]
  );

  const itemAmountPerSet = cols * rows;
  const itemSetList = useMemo(
    () =>
      itemList.reduce<JSX.Element[][]>((result, item, i) => {
        const itemComponent = (
          <Item key={i} scrollSnap={scrollSnap}>
            {item}
          </Item>
        );

        if (i % itemAmountPerSet === 0) {
          result.push([itemComponent]);
        } else {
          result[result.length - 1].push(itemComponent);
        }

        return result;
      }, []),
    [itemList, itemAmountPerSet, scrollSnap]
  );

  const page = Math.ceil(itemList.length / itemAmountPerSet);

  useEffect(() => {
    onTotalPagesChangedRef.current?.(page);
  }, [page]);

  const handlePrev = useCallback(() => {
    setCurrentPage((p) => {
      const prevPage = p - 1;
      if (loop && prevPage < 0) {
        return page - 1;
      }

      return prevPage;
    });
  }, [loop, page]);

  const handleNext = useCallback(() => {
    const railWrapper = railWrapperRef.current;

    setCurrentPage((p) => {
      const nextPage = p + 1;
      if (nextPage >= page) {
        return loop ? 0 : p;
      }

      return nextPage;
    });
  }, [loop, page, gap, railWrapperRef, scrollSnap]);

  const turnToPage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <Container className={containerClassName} style={containerStyle}>
      <ArrowButton
        type="prev"
        hidden={hideArrow || (!loop && currentPage <= 0)}
        CustomBtn={arrowLeft}
        onClick={handlePrev}
      />
      <RailWrapper scrollSnap={scrollSnap} ref={railWrapperRef}>
        <Rail cols={cols} rows={rows} page={page} gap={gap} currentPage={currentPage}>
          {itemSetList.map((set, i) => (
            <ItemSet key={i} cols={cols} rows={rows} gap={gap}>
              {set}
            </ItemSet>
          ))}
        </Rail>
      </RailWrapper>
      <ArrowButton
        type="next"
        hidden={hideArrow || (!loop && currentPage === page - 1)}
        CustomBtn={arrowRight}
        onClick={handleNext}
      />
    </Container>
  );
}

export default Carousel;

const CarouselItem: FC = ({children}) => <>{children}</>;
Carousel.Item = CarouselItem;
Carousel.Item.displayName = CAROUSEL_ITEM;
