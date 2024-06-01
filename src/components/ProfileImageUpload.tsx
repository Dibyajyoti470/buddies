"use client";

import React, { useRef, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { Position } from "react-avatar-editor";
import { Edit, UploadImage } from "@/assets/icons";
import IconButton from "./IconButton";
import ProfileImageCropper from "./ProfileImageCropper";
import "./ProfileImageUpload.scss";

export default function ProfileImageUpload() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppingScale, setCroppingScale] = useState<number>(1);
  const [croppingCoordinates, setCroppingCoordinates] = useState<Position>({
    x: 0.5,
    y: 0.5,
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const profileUploadRef = useRef<HTMLInputElement>(null);

  const profilePlaceholderImage = "/profile-placeholder.jpg";

  const getChosenProfileImageUrl = (): string | null => {
    const files = profileUploadRef?.current?.files;
    if (files && files.length) {
      const url = URL.createObjectURL(files[0]);
      return url;
    }

    return null;
  };

  const handleProfileImageChosen = () => {
    onOpen();
  };

  return (
    <div className="relative w-fit">
      <div className="w-40 h-40 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={croppedImage || profilePlaceholderImage}
          alt="Avatar Image"
        />
      </div>
      <div className="absolute bottom-0 right-0">
        <input
          type="file"
          className="hidden"
          ref={profileUploadRef}
          onChange={handleProfileImageChosen}
        />
        {croppedImage ? (
          <IconButton
            onClick={onOpen}
            className="w-8 h-8 min-w-6 text-white bg-primary-500 data-[hover=true]:bg-primary-400 border-2 border-white"
            radius="full"
          >
            <Edit className="w-4 h-4" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => profileUploadRef?.current?.click()}
            className="w-8 h-8 min-w-6 text-white bg-primary-500 data-[hover=true]:bg-primary-400 border-2 border-white"
            radius="full"
          >
            <UploadImage className="w-4 h-4" />
          </IconButton>
        )}
      </div>
      <ProfileImageCropper
        image={getChosenProfileImageUrl() || ""}
        isOpen={isOpen}
        coordinates={croppingCoordinates}
        scale={croppingScale}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        setOriginalImage={setOriginalImage}
        setCroppedImage={setCroppedImage}
        setCroppingScale={setCroppingScale}
        setCroppingCoordinates={setCroppingCoordinates}
      />
    </div>
  );
}
