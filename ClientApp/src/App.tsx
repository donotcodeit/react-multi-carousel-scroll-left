import React, { useCallback, useMemo, useRef } from "react";
import Carousel from "./react-multi-carousel";
import { ResponsiveType } from "./react-multi-carousel/types";

const Slide = (props: { value: number }) => {
    return <div className="slide">{props.value}</div>
}

export const App = () => {
    const sliderRef = useRef<Carousel>(null);

    const prev = useCallback(() => sliderRef.current?.previous(1), [sliderRef]);
    const next = useCallback(() => sliderRef.current?.next(1), [sliderRef]);

    const responsive = useMemo(() => {
        const result: ResponsiveType = {};
        const slideWidth = 180;
        const boundBetweenSliderAndBordersWidth = 388;
        const maxSlideCount = 20;

        let max = boundBetweenSliderAndBordersWidth + slideWidth;
        let min = 0;
        for (let i = 1; i <= maxSlideCount; i++) {
            result[i] = {
                breakpoint: { max, min },
                items: i - 1
            }

            min = max;
            max += slideWidth;
        }

        return result;
    }, []);

    return (
        <div className="content-box-grid carousel">
            <Carousel ref={sliderRef} responsive={responsive} arrows={false} infinite>
                {[1, 2, 3, 4].map((v, i) => <Slide key={`${i}_${v}`} value={v} />)}
            </Carousel>
            <div className="carousel-control back" onClick={prev}>
                <button className="slider-button">&laquo;</button>
            </div>
            <div className="carousel-control next" onClick={next}>
                <button className="slider-button">&raquo;</button>
            </div>
        </div>
    );
}
