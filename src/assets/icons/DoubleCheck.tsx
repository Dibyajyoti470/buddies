import React from "react";

export default function DoubleCheck(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M464 128L240 384l-96-96M144 384l-96-96M368 128L232 284"
      />
    </svg>
  );
}
