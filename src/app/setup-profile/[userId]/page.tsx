"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@nextui-org/react";
import { Logo } from "@/assets/icons";
import Card from "@/components/Card";
import InputField from "@/components/InputField";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import { Position } from "react-avatar-editor";
import { objectURLToFile } from "@/utils";
import { db, getProfileImageRefs, profileImageFileName } from "@/firebase";
import { uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { userId: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropperScale, setCropperScale] = useState<number>(1);
  const [cropperCoordinates, setCropperCoordinates] = useState<Position>({
    x: 0.5,
    y: 0.5,
  });
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();

    const uid = params.userId;

    if (!username) {
      console.error("Username is required");
      return;
    }

    setIsLoading(true);

    try {
      const updateData: { name: string; profile?: object } = {
        name: username,
      };

      if (!originalImage || !croppedImage) {
        throw new Error("Images not available!");
        return;
      }

      const [originalImageFile, croppedImageFile] = await Promise.all([
        objectURLToFile(originalImage, profileImageFileName.ORIGINAL),
        objectURLToFile(croppedImage, profileImageFileName.CROPPED),
      ]);

      if (!originalImageFile || !croppedImageFile) {
        throw new Error("Failed to convert images to files");
      }

      const { originalImageRef, croppedImageRef } = getProfileImageRefs(uid);

      const [originalImageUploadRes, croppedImageUploadRes] = await Promise.all(
        [
          uploadBytes(originalImageRef, originalImageFile),
          uploadBytes(croppedImageRef, croppedImageFile),
        ]
      );

      if (!originalImageUploadRes || !croppedImageUploadRes) {
        throw new Error("Failed to upload images");
      }

      const originalImageUrl = originalImageUploadRes.metadata.fullPath;
      const croppedImageUrl = croppedImageUploadRes.metadata.fullPath;

      updateData.profile = {
        originalImageUrl,
        croppedImageUrl,
        cropper: {
          scale: cropperScale,
          coordinates: cropperCoordinates,
        },
      };

      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, updateData);

      router.push(`/chat`);
    } catch (error) {
      console.error("Error updating user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleConfirm = async (e: FormEvent) => {
  //   e.preventDefault();

  //   const uid = params.userId;

  //   if (!originalImage || !croppedImage || !username) {
  //     console.error("Missing required data");
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const [originalImageFile, croppedImageFile] = await Promise.all([
  //       objectURLToFile(originalImage, profileImageFileName.ORIGINAL),
  //       objectURLToFile(croppedImage, profileImageFileName.CROPPED),
  //     ]);

  //     if (!originalImageFile || !croppedImageFile) {
  //       throw new Error("Failed to convert images to files");
  //     }

  //     const { originalImageRef, croppedImageRef } = getProfileImageRefs(uid);

  //     const [originalImageUploadRes, croppedImageUploadRes] = await Promise.all(
  //       [
  //         uploadBytes(originalImageRef, originalImageFile),
  //         uploadBytes(croppedImageRef, croppedImageFile),
  //       ]
  //     );

  //     if (!originalImageUploadRes || !croppedImageUploadRes) {
  //       throw new Error("Failed to upload images");
  //     }

  //     const originalImageUrl = originalImageUploadRes.metadata.fullPath;
  //     const croppedImageUrl = croppedImageUploadRes.metadata.fullPath;

  //     const userDocRef = doc(db, "users", uid);

  //     await updateDoc(userDocRef, {
  //       name: username,
  //       profile: {
  //         originalImageUrl,
  //         croppedImageUrl,
  //         cropper: {
  //           scale: cropperScale,
  //           coordinates: cropperCoordinates,
  //         },
  //       },
  //     });

  //     console.log("User profile updated successfully");
  //   } catch (error) {
  //     console.error("Error updating user profile:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <Card>
      <div className="flex flex-col gap-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-primary-500">
          <Logo className="w-5 h-5" />
          <span>Buddies</span>
        </p>
        <h1 className="text-2xl font-medium">Setup profile</h1>
        <form className="flex flex-col gap-5 mt-3">
          <div className="flex justify-center mb-3">
            <ProfileImageUpload
              originalImage={originalImage}
              croppedImage={croppedImage}
              cropperScale={cropperScale}
              cropperCoordinates={cropperCoordinates}
              setOriginalImage={setOriginalImage}
              setCroppedImage={setCroppedImage}
              setCropperScale={setCropperScale}
              setCropperCoordinates={setCropperCoordinates}
            />
          </div>
          <InputField
            isRequired
            type="text"
            label="Enter your name"
            labelPlacement="outside"
            placeholder="e.g. John Doe"
            onValueChange={(value: string) => setUsername(value)}
          ></InputField>
          <Button
            isLoading={isLoading}
            isDisabled={!username}
            type="submit"
            disableRipple
            color="primary"
            radius="sm"
            className="font-medium"
            onClick={(e) => handleConfirm(e)}
          >
            {isLoading || "Confirm"}
          </Button>
        </form>
      </div>
    </Card>
  );
}
