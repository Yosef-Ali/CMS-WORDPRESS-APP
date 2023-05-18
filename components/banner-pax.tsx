import Image from "next/image";
import React from "react";
import SocialMediaLinks from "../components/social-media-links";

export default function BannerPax() {
  return (
    <div className="container mx-auto grid grid-cols-1 px-4 py-8 md:grid-cols-12 md:gap-14 lg:-mb-24  ">
      <div className="grid-item col-span-7 "></div>
      <div
        className="grid-item
          col-span-1 grid  justify-center border p-4 md:col-span-5 xl:flex xl:space-x-4"
      >
        <Image
          width={2000}
          height={1000}
          src={"/pax-ctv-logo.png"}
          alt="logo"
          className="h-auto w-44"
          priority
        />

        <SocialMediaLinks color="secondary" />
      </div>
    </div>
  );
}
