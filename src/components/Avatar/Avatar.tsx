import React from "react";

interface AvatarProps {
  imageUrl?: string;
  isOnline: boolean;
}

export default function Avatar(props: AvatarProps) {
  const { imageUrl, isOnline } = props;

  return (
    <div className="w-14 h-14 rounded-full overflow-hidden relative">
      <img
        className="w-full h-full object-cover"
        src={imageUrl}
        alt="Avatar Image"
      />
      {isOnline && (
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-700 border-4 border-white rounded-full"></div>
      )}
    </div>
  );
}
