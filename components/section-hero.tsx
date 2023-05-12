import Image from "next/image";
import Script from "next/script";
import Head from "next/head";
import PopeMessage from "./pope-message";
import HeroImage from "../public/hero.jpeg";

function HeroText() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-gray-500 sm:text-5xl">
        Come together as{" "}
        <strong className="block font-extrabold text-primary">
          {" "}
          Church to worship God.{" "}
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
          {" "}
          Learn More{" "}
        </a>
      </div>
    </>
  );
}

export default function SectionHero({ posts }) {
  return (
    <div className="relative grid">
      <Head>
        <title>Catholic Archdioceses</title>
        <meta
          name="description"
          content="A website for Catholic Archdioceses"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        className="absolute inset-0 hidden object-cover object-center opacity-25 md:block md:opacity-100"
        src={HeroImage}
        alt="Hero Image"
        fill
        priority
      />
      <div className="absolute inset-0 z-30 bg-gradient-to-r from-blue-200 to-transparent"></div>
      <div className="container relative z-30 mx-auto max-w-screen-xl">
        <div className="grid px-4 py-32 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
          <div className="place-self-center py-8 text-center md:text-left lg:col-span-7 lg:mr-auto">
            <HeroText />
          </div>
          <div className="place-self-center py-8 lg:col-span-5">
            <PopeMessage posts={posts} />
          </div>
        </div>
      </div>
      <Script src="/some-script.js" strategy="lazyOnload" />
    </div>
  );
}
