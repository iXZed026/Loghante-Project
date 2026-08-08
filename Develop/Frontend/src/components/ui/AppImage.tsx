"use client";

import Image, { ImageProps } from "next/image";

interface AppImageProps extends ImageProps {
  priority?: boolean;
  quality:number;
}

export default function AppImage({
  priority = false,
  ...props
}: AppImageProps) {
  return (
    <Image
      {...props}
      priority={priority}
    />
  );
}