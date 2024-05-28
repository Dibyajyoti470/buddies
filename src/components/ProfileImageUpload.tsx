"use client";

import Edit from "@/assets/icons/Edit";
import React, { useRef, useState } from "react";
import IconButton from "./IconButton";

export default function ProfileImageUpload() {
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const profileUploadRef = useRef<HTMLInputElement>(null);

  const handleProfileImageChosen = () => {
    const files = profileUploadRef?.current?.files;

    if (files && files.length) {
      console.log(files[0]);
    }
  };

  return (
    <div className="relative w-fit">
      <div className="w-28 h-28 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="/profile-placeholder.jpg"
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
          className="w-6 h-6 min-w-6 text-white bg-primary-500 data-[hover=true]:bg-primary-400 border-2 border-white"
          radius="full"
        >
          <Edit className="w-3 h-3" />
        </IconButton>
      </div>
    </div>
  );
}
