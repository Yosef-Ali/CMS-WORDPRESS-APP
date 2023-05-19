import Image from "next/image";

interface FeaturedImageProps {
  featuredImageSrc?: string;
}

export default function FeaturedImage(props: FeaturedImageProps) {
  // Remove the useMemo hook and just use props.featuredImageSrc directly
  const imageUrl = props.featuredImageSrc;

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
