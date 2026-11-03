interface TennisBallIconProps {
  size: number;
  className?: string;
}

export function TennisBallIcon({ size, className = '' }: TennisBallIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-md select-none ${className}`}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15" fill="#ccff00" stroke="#99cc00" strokeWidth="0.8" />
      <path
        d="M 4.5 8.5 C 10.5 11 13 16 13 21 C 13 25 11 28.5 8.5 30.5"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 27.5 23.5 C 21.5 21 19 16 19 11 C 19 7 21 3.5 23.5 1.5"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

