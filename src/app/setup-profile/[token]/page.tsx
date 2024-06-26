"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@nextui-org/react";
import { Logo } from "@/assets/icons";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import { Position } from "react-avatar-editor";
import { generateProfileImageFileName } from "@/utils";

export default function Page({ params }: { params: { token: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropperScale, setCropperScale] = useState<number>(1);
  const [cropperCoordinates, setCropperCoordinates] = useState<Position>({
    x: 0.5,
    y: 0.5,
  });

  const objectURLToFile = async (objectURL: string, filename: string) => {
    const response = await fetch(objectURL);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();

    if (originalImage && croppedImage) {
      try {
        const originalImageFile = await objectURLToFile(
          originalImage,
          generateProfileImageFileName(
            "jpg",
            `profile_original_${params.token}`
          )
        );
        const croppedImageFile = await objectURLToFile(
          croppedImage,
          generateProfileImageFileName("jpg", `profile_cropped_${params.token}`)
        );

        console.log(originalImageFile);
        console.log(croppedImageFile);
      } catch (error) {
        console.error("Error converting object URL to file:", error);
      }
    }
  };

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
            <ProfileImageUpload
              originalImage={originalImage}
              croppedImage={croppedImage}
              cropperScale={cropperScale}
              cropperCoordinates={cropperCoordinates}
              setOriginalImage={setOriginalImage}
              setCroppedImage={setCroppedImage}
              setCropperScale={setCropperScale}
              setCropperCoordinates={setCropperCoordinates}
            />
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
            onClick={(e) => handleConfirm(e)}
          >
            {isLoading || "Confirm"}
          </Button>
        </form>
      </div>
    </Card>
  );
}
