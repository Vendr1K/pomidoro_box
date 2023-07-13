import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties,
  width?: string
  height?: string
}

export function Minus({ className, style, width, height }: Props) {
  return (
    <svg
      className={className}
      style={style}
      width={width ? width : "50"}
      height={height ? height : "50"}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
           <circle cx="25" cy="25" r="25" fill="#C4C4C4" />
      <path d="M26.2756 26.1321H17V23.7029H33V26.1321Z" fill="white" />
    </svg>
  )
}