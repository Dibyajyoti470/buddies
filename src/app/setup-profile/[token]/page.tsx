"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { Logo } from "@/assets/icons";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import ProfileImageUpload from "@/components/ProfileImageUpload";

export default function Page({ params }: { params: { token: string } }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card>
      <div className="flex flex-col gap-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-primary-500">
          <Logo className="w-5 h-5" />
          <span>Buddies</span>
        </p>
        <h1 className="text-2xl font-semibold">Setup profile</h1>
        <form className="flex flex-col gap-5 mt-3">
          <div className="flex justify-center mb-3">
            <ProfileImageUpload />
          </div>
          <InputField
            isRequired
            type="text"
            label="Enter your name"
            labelPlacement="outside"
            placeholder="e.g. John Doe"
          ></InputField>
          <Button
            isLoading={isLoading}
            type="submit"
            disableRipple
            color="primary"
            radius="sm"
            className="font-medium"
          >
            {isLoading || "Confirm"}
          </Button>
        </form>
      </div>
    </Card>
  );
}
