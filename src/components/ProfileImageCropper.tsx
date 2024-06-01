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
} from "@nextui-org/react";
import AvatarEditor from "react-avatar-editor";

interface ProfileImageCropperProps {
  image: string;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ProfileImageCropper(props: ProfileImageCropperProps) {
  const defaultScale = 1;
  const [scale, setScale] = useState<number>(defaultScale);

  const editorRef = useRef<AvatarEditor | null>(null);

  const handleSliderChange = (value: number) => {
    setScale(value);
  };

  const handleCropConfirm = (onClose: () => void) => {
    if (editorRef.current) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      // const canvas = editorRef.current.getImage();
      // const base64Image = canvas.toDataURL();

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const base64Image = canvasScaled.toDataURL();
      console.log(base64Image);

      props.setImage(base64Image);
      onClose();
      // props.onClose(base64Image);
    }
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
              />
              <Slider
                size="sm"
                step={0.01}
                maxValue={2}
                minValue={1}
                aria-label="Scale image"
                defaultValue={defaultScale}
                className="max-w-md"
                onChange={(e) => handleSliderChange(e as number)}
              />
            </ModalBody>
            <ModalFooter className="justify-between">
              <Button
                className="border-1"
                color="primary"
                variant="ghost"
                disableRipple
                radius="sm"
              >
                Upload new
              </Button>
              <div className="flex flex-row items-center gap-2">
                <Button
                  color="primary"
                  variant="light"
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
