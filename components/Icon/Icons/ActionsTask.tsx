import React from 'react'

type Props = {
    className?: string
    style?: React.CSSProperties,
    width?: string
    height?: string
  }

export  function ActionsTask({ className, style, width, height }: Props) {
  return (
    <svg 
        className={className}
        style={style}
        width={width ? width : "26"}
        height={height ? height : "6"}
        xmlns="http://www.w3.org/2000/svg"  
        viewBox="0 0 26 6" 
        fill="none"
    >
        <circle cx="3" cy="3" r="3" fill="#C4C4C4"/>
        <circle cx="13" cy="3" r="3" fill="#C4C4C4"/>
        <circle cx="23" cy="3" r="3" fill="#C4C4C4"/>
    </svg>
  )
}
