type Props = {
    color: string
}

function LightModeSvg({color} : Props) {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke=""
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        
        <g clipPath="url(#clip0_429_11039)">
          
          <circle
            cx="12"
            cy="12"
            r="4"
            stroke={color}
            strokeWidth="2.5"
            strokeLinejoin="round"
          ></circle>
          <path
            d="M20 12H21"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          ></path>
          <path
            d="M3 12H4"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          ></path>
          <path
            d="M12 20L12 21"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          ></path>
          <path
            d="M12 3L12 4"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          ></path>
          <path
            d="M17.6569 17.6569L18.364 18.364"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          ></path>
          <path
            d="M5.63605 5.63604L6.34315 6.34315"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          ></path>
          <path
            d="M6.34314 17.6569L5.63603 18.364"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          ></path>
          <path
            d="M18.364 5.63604L17.6568 6.34315"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          ></path>
        </g>
        <defs>
          
          <clipPath id="clip0_429_11039">
            <rect width="24" height="24" fill="white"></rect>
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}

export default LightModeSvg;
