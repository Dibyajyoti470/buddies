import React from "react";

interface AvatarProps {
  imageUrl?: string;
  isActive: boolean;
}

export default function Avatar(props: AvatarProps) {
  const { imageUrl, isActive } = props;

  return (
    <div className="relative">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt="Avatar Image"
        />
      </div>
      {isActive && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-600 border-1 border-white rounded-full"></div>
      )}
    </div>
  );
}
