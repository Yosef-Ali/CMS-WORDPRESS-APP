import React from "react";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "./icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WhoWeAre({ posts }) {
  return (
    <section className="max-w-screen-lx mx-auto bg-blue-100/80 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-screen-lg">
        <div className="container mx-auto ">
          <h2 className="mb-5 text-center text-3xl font-bold uppercase text-gray-900 sm:text-4xl">
            Who We Are
          </h2>
          <p className="mx-auto mb-20 max-w-md text-center text-gray-900">
            We are Ethiopian Catholic Archdioceses of Addis Abeba, officially
            the Metropolitan sui iuris Archdioceses of Addis Abeba.
          </p>
          <Tab.Group>
            <Tab.List className="bg-blue-900/20 md:flex">
              {posts.map(({ node }) => {
                const { databaseId, title } = node;
                return (
                  <Tab
                    key={databaseId}
                    className={({ selected }) =>
                      classNames(
                        "tab",
                        selected
                          ? "tabSelected outline-none"
                          : "text-blue-100  transition hover:bg-secondary hover:text-white"
                      )
                    }
                  >
                    <span>{title}</span>
                  </Tab>
                );
              })}
            </Tab.List>
            <Tab.Panels>
              {posts.map(({ node }) => {
                const { databaseId, title, content, featuredImage } = node;
                return (
                  <Tab.Panel key={databaseId}>
                    <div className="relative">
                      <Image
                        width={2000}
                        height={1000}
                        className="h-[580px] w-full object-cover "
                        src={featuredImage?.node.sourceUrl}
                        alt={`${title} image`}
                      />
                      <div className="absolute top-24 right-6 z-10 max-w-xs bg-white/90 p-6">
                        <h2 className="mb-5 text-2xl">{title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                        <Link
                          href={"#"}
                          className="mt-4 inline-flex cursor-none items-center text-gray-400"
                        >
                          Learn More
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </Tab.Panel>
                );
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
}
