import { useState, useEffect } from "react"
import usePrevious from "./use-previous"

const range = (start, end) => {
  if (start === 0 && end === 0) return [0]

  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx)
}

const defaultHolderStyle = {
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  transition: "all 0.5s ease",
}

const defaultDotsStyle = {
  flexShrink: 0,
  transition: "all 0.5s ease",
}

const defaultDotStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  flexShrink: 0,
  transition:
    "transform 0.5s ease, background 0.3s ease-in-out, opacity 0.3s ease-in-out",
}

const defaultActiveDotStyle = {
  backgroundColor: "white",
}

const defaultVisibleDotStyle = {
  opacity: 1,
}

const defaultSmallDotStyle = {
  transform: "scale(0.6667)",
}

const defaultMediumDotStyle = {
  transform: "scale(0.8333)",
}

const defaultBigDotStyle = {
  transform: "scale(1)",
}

const useCarouselDots = props => {
  const {
    total,
    current,
    size = 12,
    margin = 3,
    padding = 16,
    visible = 3,
  } = props

  if (total == null) {
    throw new Error("'total' cannot be null/undefined")
  }

  if (total <= 0) {
    throw new Error("'total' cannot be less than or equal to 0")
  }

  if (visible < 3) {
    throw new Error("'visible' cannot be less than 3")
  }

  let _visible = visible

  if (total <= 3) {
    _visible = total
  }

  if (_visible > 3 && _visible !== total && visible % 2 === 0) {
    throw new Error("'visible' cannot be an even number")
  }

  if (_visible > total) {
    throw new Error("'visible' cannot be more than 'total'")
  }

  const prevCurrent = usePrevious(current)
  const dotFullWidth = size + margin * 2
  const center = Math.round(_visible / 2)
  const centerIndex = Math.floor(_visible / 2)

  const [translate, setTranslate] = useState(0)
  const [visibleDots, setVisibleDots] = useState(range(0, _visible - 1))
  const [mediumDots, setMediumDots] = useState(
    range(0, centerIndex + centerIndex - 1),
  )
  const [bigDots, setBigDots] = useState(range(0, centerIndex))
  const [isLooping, setIsLooping] = useState(false)

  useEffect(() => {
    if (current < centerIndex) {
      setTranslate(0)
      setVisibleDots(range(0, _visible - 1))
    } else if (total - center < current) {
      setTranslate((total - _visible) * dotFullWidth)
      setVisibleDots(range(total - _visible, total - 1))
    } else {
      setTranslate((current - centerIndex) * dotFullWidth)
      setVisibleDots(range(current - centerIndex, current + centerIndex))
    }
  }, [current, center, centerIndex, dotFullWidth, total, _visible])

  useEffect(() => {
    if (current < center) {
      if (_visible === 3) {
        setMediumDots(range(0, _visible))
      } else {
        setMediumDots(range(0, centerIndex + centerIndex - 1))
      }
      setBigDots(range(0, centerIndex))
    } else if (total - center - 1 < current) {
      if (_visible === 3) {
        setMediumDots(range(total - _visible, total - 1))
      } else {
        setMediumDots(range(total - centerIndex - centerIndex, total - 1))
      }
      setBigDots(range(total - center, total - 1))
    } else {
      if (_visible === 3) {
        setMediumDots(range(current - 1, current + 1))
        setBigDots([current])
      } else {
        setMediumDots(range(current - 2, current + 2))
        setBigDots(range(current - 1, current + 1))
      }
    }
  }, [current, center, centerIndex, total, _visible])

  useEffect(() => {
    if (
      (prevCurrent === 0 && current === total - 1) ||
      (prevCurrent === total - 1 && current === 0)
    ) {
      setIsLooping(true)
      setTimeout(() => setIsLooping(false), 300)
    }
  }, [current, prevCurrent, total])

  const getHolderStyle = {
    height: size,
    paddingLeft: padding,
    paddingRight: padding,
    width: _visible * dotFullWidth + padding * 2,
  }

  const getDotsStyle = {
    height: size,
    width: size,
    marginRight: margin,
    marginLeft: margin,
    transform: `translateX(-${translate}px)`,
  }

  const getDotStyle = {
    opacity: 0,
    ...(isLooping && { opacity: 1, transform: "scale(1)" }),
  }

  if (total === visible || total <= 3) {
    return {
      defaultHolderStyle,
      getHolderStyle,
      dots: range(0, total - 1),
      defaultDotsStyle,
      getDotsStyle,
      defaultDotStyle,
      getDotStyle,
      defaultVisibleDotStyle,
      defaultActiveDotStyle,
      defaultSmallDotStyle,
      defaultMediumDotStyle,
      defaultBigDotStyle,
      isSmall: () => false,
      isMedium: () => false,
      isBig: () => true,
      isActive: dot => current === dot,
      isVisible: dot => visibleDots.includes(dot),
    }
  }

  return {
    defaultHolderStyle,
    getHolderStyle,
    dots: range(0, total - 1),
    defaultDotsStyle,
    getDotsStyle,
    defaultDotStyle,
    getDotStyle,
    defaultVisibleDotStyle,
    defaultActiveDotStyle,
    defaultSmallDotStyle,
    defaultMediumDotStyle,
    defaultBigDotStyle,
    isSmall: dot => !mediumDots.includes(dot),
    isMedium: dot => mediumDots.includes(dot),
    isBig: dot => bigDots.includes(dot),
    isActive: dot => current === dot,
    isVisible: dot => visibleDots.includes(dot),
  }
}

export default useCarouselDots
