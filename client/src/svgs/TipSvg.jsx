import React from "react"

const TipSvg = ({ cClassis, fill }) => {
  return (
    <svg
      className={cClassis}
      width="13"
      height="13"
      viewBox="0 0 500 500"
      fill="none"
    >
      <path
        d="M330 330C468.071 191.929 500 0 500 0V500H0C0 500 191.929 468.071 330 330Z"
        fill={fill}
      />
    </svg>
  )
}

export default TipSvg
