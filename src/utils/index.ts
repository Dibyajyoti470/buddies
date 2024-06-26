import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tw-merge";

export function formatPastTime(time: string): string {
  const today = new Date();
  const date = new Date(time);

  const todayTimestamp = today.getTime();
  const dateTimestamp = date.getTime();

  const diffTime = Math.abs(todayTimestamp - dateTimestamp);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export async function objectURLToFile(objectURL: string, filename: string) {
  const response = await fetch(objectURL);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

export function generateProfileImageFileName(
  type: "jpg" | "png",
  prefix?: string
): string {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\..+/, "");
  return `${prefix || "profile"}_${timestamp}.${type}`;
}
