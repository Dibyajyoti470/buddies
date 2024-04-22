import { Input } from "@nextui-org/react";
import React from "react";

export default function InputField(props: any) {
  return (
    <Input
      variant="bordered"
      radius="sm"
      classNames={{
        label: "font-semibold",
        inputWrapper: "border",
        input: "h-auto",
      }}
      {...props}
    ></Input>
  );
}
