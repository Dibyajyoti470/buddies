import { Button } from "@nextui-org/react";
import React from "react";

export default function IconButton(props: any) {
  return (
    <Button isIconOnly disableRipple variant="light" size="sm" {...props}>
      {props.children}
    </Button>
  );
}
