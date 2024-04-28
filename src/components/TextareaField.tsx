import { Textarea } from "@nextui-org/react";
import React from "react";

export default function TextareaField(props: any) {
  return (
    <Textarea
      variant="bordered"
      radius="sm"
      classNames={{
        label: "font-semibold",
        inputWrapper:
          "!transition-all !duration-200 border group-data-[focus=true]:border-default-600",
        input: "h-auto",
      }}
      {...props}
    />
  );
}
