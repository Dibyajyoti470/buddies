"use client";

import React, { useRef, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import IconButton from "./IconButton";
import Edit from "@/assets/icons/Edit";
import ProfileImageCropper from "./ProfileImageCropper";
import "./ProfileImageUpload.scss";
import Camera from "@/assets/icons/Camera";
import UploadImage from "@/assets/icons/UploadImage";

export default function ProfileImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const profileUploadRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const profilePlaceholderImage = "/profile-placeholder.jpg";

  const handleProfileImageChosen = () => {
    const files = profileUploadRef?.current?.files;

    if (files && files.length) {
      const url = URL.createObjectURL(files[0]);
      setImage(url);
      onOpen();
    }
  };

  // const handleModalClose = (image: string) => {
  //   setImage(image);
  // };

  return (
    <div className="relative w-fit">
      <div className="w-40 h-40 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={image || profilePlaceholderImage}
          alt="Avatar Image"
        />
      </div>
      {/* <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-600 border-1 border-white rounded-full"></div> */}
      <div className="absolute bottom-0 right-0">
        <input
          type="file"
          className="hidden"
          ref={profileUploadRef}
          onChange={handleProfileImageChosen}
        />
        <IconButton
          onClick={() => profileUploadRef?.current?.click()}
          className="w-8 h-8 min-w-6 text-white bg-primary-500 data-[hover=true]:bg-primary-400 border-2 border-white"
          radius="full"
        >
          {image ? (
            <Edit className="w-4 h-4" />
          ) : (
            <UploadImage className="w-4 h-4" />
          )}
        </IconButton>
      </div>
      <ProfileImageCropper
        image={image || ""}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        setImage={setImage}
      />
    </div>
  );
}
