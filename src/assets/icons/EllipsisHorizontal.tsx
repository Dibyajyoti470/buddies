import React from "react";

export default function EllipsisHorizontal(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <circle cx="256" cy="256" r="48" />
      <circle cx="416" cy="256" r="48" />
      <circle cx="96" cy="256" r="48" />
    </svg>
  );
}
