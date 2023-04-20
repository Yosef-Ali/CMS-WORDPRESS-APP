import Image from "next/image";
import PopeMessage from "./pope-message";
import HeroImage from "../public/hero.jpeg";

function HeroText() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-gray-500 sm:text-5xl">
        Come together as
        <strong className="block font-extrabold text-primary">
          Church to worship God.
        </strong>
      </h1>

      <p className="mt-4 max-w-lg text-gray-500 sm:text-xl sm:leading-relaxed">
        As a Catholic Archdioceses, we are focused on being a spiritual and
        faith-centered people.
      </p>

      <div className="mt-8 ">
        <a
          href="#!"
          className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/70 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
        >
          Learn More
        </a>
      </div>
    </>
  );
}
export default function SectionHero({ posts }) {
  return (
    <div style={{ display: "grid" }}>
      <Image
        style={{
          gridArea: "1/1",
        }}
        width={2000}
        height={1000}
        alt="Hero Image"
        src={HeroImage}
        className="opacity-25 sm:opacity-100"
      />
      <div
        style={{
          gridArea: "1/1",
          position: "relative",
          placeItems: "center",
          display: "grid",
        }}
      >
        <div className="absolute inset-0 z-30 bg-gradient-to-r from-blue-200 to-transparent"></div>
        <div className="container z-30 mx-auto max-w-screen-xl">
          <div className="grid px-4 py-32 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0 ">
            <div className="place-self-center py-8 text-center md:text-left lg:col-span-7 lg:mr-auto ">
              <HeroText />
            </div>
            <div className="place-self-center py-8 lg:col-span-5 ">
              <PopeMessage posts={posts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
