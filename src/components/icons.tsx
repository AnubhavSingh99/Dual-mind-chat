import type { SVGProps } from 'react';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="12" height="12" x="4" y="8" rx="2" />
      <path d="M20 12v4h-4" />
      <rect width="12" height="12" x="8" y="12" rx="2" />
    </svg>
  ),
};
