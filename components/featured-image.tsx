import Image from "next/image";
import { useMemo } from "react";

interface FeaturedImageProps {
  videoSource?: {
    acfvideosource: string;
  };
  featuredImageSrc?: string;
  content: string;
}

export default function FeaturedImage(props: FeaturedImageProps) {
  const imageUrl = useMemo(
    () => props.featuredImageSrc,
    [props.featuredImageSrc]
  );

  return (
    <div>
      <Image
        width={2000}
        height={1000}
        alt="image"
        priority
        src={imageUrl}
        className="aspect-video w-full object-cover "
      />
    </div>
  );
}
