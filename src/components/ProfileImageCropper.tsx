"use client";

import React, { useState } from "react";
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
}

export default function ProfileImageCropper(props: ProfileImageCropperProps) {
  const defaultScale = 1.5;
  const [scale, setScale] = useState<number>(defaultScale);

  const handleSliderChange = (value: number) => {
    setScale(value);
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
              Crop image
            </ModalHeader>
            <ModalBody>
              <AvatarEditor
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
            <ModalFooter>
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
                onPress={onClose}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
