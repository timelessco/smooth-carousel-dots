import React, { useState } from "react"

import CarouselDots from "../src"

export default { title: "CarouselDots" }

export const Default = () => {
  const total = 12
  const [index, setIndex] = useState(0)
  const next = () => setIndex((index + 1) % total)
  const prev = () => setIndex((index - 1 + total) % total)

  return (
    <div className="container">
      <div className="showcase">
        <button
          className="button"
          style={{ marginBottom: "2rem" }}
          onClick={next}
        >
          Next
        </button>
        <CarouselDots total={total} current={index} visible={5} />

        <button className="button" style={{ marginTop: "2rem" }} onClick={prev}>
          Prev
        </button>
      </div>
    </div>
  )
}
