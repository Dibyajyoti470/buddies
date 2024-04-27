import React from "react";

interface AvatarProps {
  imageUrl?: string;
  isOnline: boolean;
}

export default function Avatar(props: AvatarProps) {
  const { imageUrl, isOnline } = props;

  return (
    <div className="relative">
      <div className="w-[52px] h-[52px] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt="Avatar Image"
        />
      </div>
      {isOnline && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-600 border-1 border-white rounded-full"></div>
      )}
    </div>
  );
}
