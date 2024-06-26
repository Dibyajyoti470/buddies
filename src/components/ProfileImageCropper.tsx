"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Slider,
} from "@nextui-org/react";
import AvatarEditor, { Position } from "react-avatar-editor";
import CustomTooltip from "./CustomTooltip";
import { Reset, UploadImage } from "@/assets/icons";
import { generateProfileImageFileName } from "@/utils";

interface ProfileImageCropperProps {
  image: string;
  isOpen: boolean;
  coordinates: Position;
  scale: number;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  setOriginalImage: React.Dispatch<React.SetStateAction<string | null>>;
  setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>;
  setCropperCoordinates: React.Dispatch<React.SetStateAction<Position>>;
  setCropperScale: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProfileImageCropper(props: ProfileImageCropperProps) {
  const [image, setImage] = useState<string>(props.image);
  const [scale, setScale] = useState<number>(props.scale);
  const [coords, setCoords] = useState<Position>(props.coordinates);

  const editorRef = useRef<AvatarEditor | null>(null);
  const profileUploadNewRef = useRef<HTMLInputElement>(null);

  const initCropper = () => {
    setImage(props.image);
    setScale(props.scale);
    setCoords(props.coordinates);
  };

  const handleSliderChange = (value: number) => {
    setScale(value);
  };

  const handleCropConfirm = (originalImage: string, onClose: () => void) => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const croppedImage = canvasScaled.toDataURL("image/jpeg");

      // canvasScaled.toBlob((blob) => {
      //   if (blob) {
      //     const profileImageName = generateProfileImageFileName("jpg");
      //     const file = new File([blob], profileImageName, {
      //       type: "image/jpeg",
      //     });
      //     console.log("uploaded file: ", file);

      //     props.setOriginalImage(originalImage);
      //     props.setCroppedImage(croppedImage);
      //     props.setCropperCoordinates(coords);
      //     props.setCropperScale(scale);
      //   }
      // });

      props.setOriginalImage(originalImage);
      props.setCroppedImage(croppedImage);
      props.setCropperCoordinates(coords);
      props.setCropperScale(scale);

      onClose();
    }
  };

  const handleNewProfileImageChosen = () => {
    const files = profileUploadNewRef?.current?.files;
    if (files && files.length) {
      const url = URL.createObjectURL(files[0]);
      setImage(url);
      resetCropperToDefault();
    }
  };

  const handleClose = (onClose: () => void) => {
    resetCropperToPreviouslySaved();
    onClose();
  };

  const resetCropperToPreviouslySaved = () => {
    initCropper();
  };

  const resetCropperToDefault = () => {
    setScale(1);
    setCoords({ x: 0.5, y: 0.5 });
  };

  useEffect(() => {
    if (props.isOpen) {
      initCropper();
    }
  }, [props.isOpen]);

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
                image={image || props.image}
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
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={profileUploadNewRef}
                  onChange={handleNewProfileImageChosen}
                />
                <CustomTooltip placement="bottom" content="Upload New">
                  <Button
                    isIconOnly
                    disableRipple
                    variant="light"
                    size="sm"
                    onPress={() => profileUploadNewRef?.current?.click()}
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
                    onPress={resetCropperToDefault}
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
                  onPress={() => handleClose(onClose)}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  disableRipple
                  radius="sm"
                  onPress={() => handleCropConfirm(image, onClose)}
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
