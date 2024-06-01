"use client";

import React, { useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Slider,
  Tooltip,
} from "@nextui-org/react";
import AvatarEditor, { Position } from "react-avatar-editor";
import { UploadImage } from "@/assets/icons";
import IconButton from "./IconButton";
import Reset from "@/assets/icons/Reset";
import CustomTooltip from "./CustomTooltip";

interface ProfileImageCropperProps {
  image: string;
  isOpen: boolean;
  coordinates: Position;
  scale: number;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  setOriginalImage: React.Dispatch<React.SetStateAction<string | null>>;
  setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setCroppingCoordinates: React.Dispatch<React.SetStateAction<Position>>;
  setCroppingScale: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProfileImageCropper(props: ProfileImageCropperProps) {
  const [scale, setScale] = useState<number>(props.scale);
  const [coords, setCoords] = useState<Position>(props.coordinates);
  const editorRef = useRef<AvatarEditor | null>(null);

  const handleSliderChange = (value: number) => {
    setScale(value);
  };

  const handleCropConfirm = (onClose: () => void) => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const base64Image = canvasScaled.toDataURL();
      const { x, y } = editorRef.current.getCroppingRect();

      props.setOriginalImage(props.image);
      props.setCroppedImage(base64Image);
      props.setCroppingCoordinates({ x, y });
      props.setCroppingScale(scale);

      onClose();
    }
  };

  const handleUploadNewButtonPress = () => {};

  const handleResetButtonPress = () => {
    setScale(props.scale);
    setCoords(props.coordinates);
  };

  return (
    <Modal
      classNames={{
        base: "rounded-lg",
        header: "pt-6",
        footer: "pb-6",
        closeButton: "top-4 right-4 rounded-lg",
      }}
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit profile image
            </ModalHeader>
            <ModalBody>
              <AvatarEditor
                ref={editorRef}
                image={props.image}
                width={400}
                height={400}
                border={0}
                borderRadius={500}
                scale={scale}
                rotate={0}
                position={{ x: coords.x, y: coords.y }}
                onPositionChange={(pos) => setCoords(pos)}
              />
              <Slider
                classNames={{
                  thumb: "bg-primary-500",
                }}
                size="sm"
                step={0.01}
                maxValue={2}
                minValue={1}
                aria-label="Scale image"
                value={scale}
                className="max-w-md"
                onChange={(e) => handleSliderChange(e as number)}
              />
            </ModalBody>
            <ModalFooter className="justify-between items-center pl-[18px]">
              <div className="flex flex-row items-center gap-[2px]">
                <CustomTooltip placement="bottom" content="Upload New">
                  <Button
                    isIconOnly
                    disableRipple
                    variant="light"
                    size="sm"
                    onPress={handleUploadNewButtonPress}
                  >
                    <UploadImage className="w-5 h-5" />
                  </Button>
                </CustomTooltip>
                <CustomTooltip placement="bottom" content="Reset">
                  <Button
                    isIconOnly
                    disableRipple
                    variant="light"
                    size="sm"
                    onPress={handleResetButtonPress}
                  >
                    <Reset className="w-5 h-5" />
                  </Button>
                </CustomTooltip>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Button
                  variant="flat"
                  disableRipple
                  radius="sm"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  disableRipple
                  radius="sm"
                  onPress={() => handleCropConfirm(onClose)}
                >
                  Confirm
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
