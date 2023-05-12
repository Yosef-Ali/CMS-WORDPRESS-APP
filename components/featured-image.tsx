import Image from "next/image";
import { useMemo } from "react";

export default function FeaturedImage(props) {
  const imageUrl = useMemo(
    () => props.featuredImage?.node.sourceUrl,
    [props.featuredImage]
  );
  return (
    <div>
      <Image
        width={2000}
        height={1000}
        alt={""}
        priority
        src={imageUrl}
        className="aspect-video w-full object-cover "
      />
    </div>
  );
}
