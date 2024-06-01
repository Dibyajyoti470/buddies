import { Tooltip, TooltipPlacement } from "@nextui-org/react";
import React from "react";

interface CustomTooltipProps {
  content: string;
  placement: TooltipPlacement;
  children: React.ReactNode;
}

export default function CustomTooltip(props: CustomTooltipProps) {
  return (
    <Tooltip
      classNames={{
        content: "text-xs",
      }}
      radius="sm"
      placement={props.placement}
      content={props.content}
      delay={0}
      closeDelay={0}
    >
      {props.children}
    </Tooltip>
  );
}
