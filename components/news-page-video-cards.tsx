// This component renders a list of video cards with a large card and small cards
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { ChevronRight } from "./misc/Icons";
import YouTubLargeSkeleton from "./misc/YouTubLargeSkeleton";
import YouTubSmall from "./misc/YouTubSmall";

const YouTubLargeCard = dynamic(() => import("./misc/youtubLarge"), {
  ssr: false, // server side rendering is disabled
  loading: () => <YouTubLargeSkeleton />, // loading skeleton
});

export default function NewsPageVideoCards({ data, header, viewMoreLink }) {
  const router = useRouter();
  const [selectedCardIndex, setSelectedCardIndex] = useState(0); // state to store the selected card index

  const handleCardClick = (index) => {
    setSelectedCardIndex(index); // sets the selected card index
  };

  const renderLargeCard = () => {
    const selectedCard = data[selectedCardIndex];

    return (
      <YouTubLargeCard key={selectedCard.databaseId} news={selectedCard} />
    );
  };

  const renderSmallCards = () => {
    return data
      .slice(0, 5) // renders only 5 small cards
      .map((card, index) =>
        index !== selectedCardIndex ? (
          <YouTubSmall
            news={card}
            handleClick={() => handleCardClick(index)} // handles click event on small cards
            key={card.databaseId}
            indexof={index}
          />
        ) : null
      );
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:-mb-12 lg:py-24 ">
      <h2 className="text-md title-font mb-1 uppercase tracking-widest text-gray-700">
        {header}
      </h2>
      <div className="grid-col-1 grid gap-8 md:grid-cols-5 md:gap-4 lg:gap-6">
        {renderLargeCard()}
        <div className="space-y-8 md:col-span-2 md:space-y-4 lg:bg-blue-100/80 lg:p-6">
          {renderSmallCards()}
          <div className="text-center lg:pt-8">
            <Link
              href={viewMoreLink} // link to news page
              className="inline-flex items-center rounded bg-secondary px-6 py-3 text-white transition hover:bg-secondary/90 hover:shadow-lg"
            >
              View More
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
