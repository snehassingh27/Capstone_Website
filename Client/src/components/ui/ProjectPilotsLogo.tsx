import { SVGProps } from "react";

export function ProjectPilotsLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path 
        d="M250 100L350 250L250 400L150 250L250 100Z" 
        fill="#0D2546" 
        stroke="#0D2546" 
        strokeWidth="10"
      />
      <path 
        d="M250 150L325 250L250 350L175 250L250 150Z" 
        fill="#1E88E5" 
        stroke="#0D2546" 
        strokeWidth="5"
      />
      <path 
        d="M150 400L190 340L150 310L130 340L150 400Z" 
        fill="#1E88E5"
      />
      <path 
        d="M120 380L140 350L120 330L110 350L120 380Z" 
        fill="#1E88E5"
      />
    </svg>
  );
}
