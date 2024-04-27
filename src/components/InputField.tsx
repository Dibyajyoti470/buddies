"use client";

import React from "react";
import Eye from "@/assets/icons/Eye";
import EyeSlash from "@/assets/icons/EyeSlash";
import { Input } from "@nextui-org/react";

export default function InputField(props: any) {
  const [isVisible, setIsVisible] = React.useState(false);

  const isPasswordVisible = props?.type === "password" && isVisible;
  const isPasswordInput = props?.type === "password";

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
      type={
        isPasswordInput && !isPasswordVisible
          ? "password"
          : isPasswordInput && isPasswordVisible
          ? "text"
          : props?.type
      }
      endContent={
        props.showTogglePasswordVisibility && (
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <EyeSlash className="text-xl text-default-400 pointer-events-none" />
            ) : (
              <Eye className="text-xl text-default-400 pointer-events-none" />
            )}
          </button>
        )
      }
    ></Input>
  );
}
