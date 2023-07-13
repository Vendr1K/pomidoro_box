import React from 'react'

type Props = {
    className?: string
    style?: React.CSSProperties,
    width?: string
    height?: string
  }

export  function DeleteTask({ className, style, width, height }: Props) {
  return (
    <svg 
      className={className}
      style={style}
      width={width ? width : "18"}
      height={height ? height : "18"}
      xmlns="http://www.w3.org/2000/svg"  
      viewBox="0 0 18 18"
      fill="none"
    >
        <g clipPath="url(#clip0_35_551)">
        <path d="M12 6.75V14.25H6V6.75H12ZM10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3H11.625L10.875 2.25ZM13.5 5.25H4.5V14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25Z" fill="#A8B64F"/>
        </g>
        <defs>
        <clipPath id="clip0_35_551">
        <rect width="18" height="18" fill="white"/>
        </clipPath>
        </defs>
    </svg>  
  )
}