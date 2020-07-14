import React from "react";

import useCarouselDots from "./use-carousel-dots";

const CarouselDots = (props) => {
  const { total, current, visible, size, margin, padding } = props;

  const {
    defaultHolderStyle,
    getHolderStyle,
    dots,
    defaultDotsStyle,
    getDotsStyle,
    defaultDotStyle,
    getDotStyle,
    defaultVisibleDotStyle,
    defaultActiveDotStyle,
    defaultSmallDotStyle,
    defaultMediumDotStyle,
    defaultBigDotStyle,
    isSmall,
    isMedium,
    isBig,
    isActive,
    isVisible,
  } = useCarouselDots({
    total,
    current,
    visible,
    size,
    margin,
    padding,
  });

  return (
    <div style={{ ...defaultHolderStyle, ...getHolderStyle }}>
      {dots.map((dot) => {
        return (
          <div key={dot} style={{ ...defaultDotsStyle, ...getDotsStyle }}>
            <div
              key={`${dot}-inner`}
              style={{
                ...defaultDotStyle,
                ...getDotStyle,
                ...(isActive(dot) ? defaultActiveDotStyle : {}),
                ...(isVisible(dot) ? defaultVisibleDotStyle : {}),
                ...(isSmall(dot) ? defaultSmallDotStyle : {}),
                ...(isMedium(dot) ? defaultMediumDotStyle : {}),
                ...(isBig(dot) ? defaultBigDotStyle : {}),
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CarouselDots;
