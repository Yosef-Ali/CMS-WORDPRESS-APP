import moment from "moment";
import { useRouter } from "next/navigation";
import Moment from "react-moment";
import MoreButton from "./more-button";
import SectionTitle from "./section-title";
import parse from "react-html-parser";

// Extracting Event only day as DD or DD-DD
function EventDay(props) {
  const { startingDate, endingDate } = props.events;

  const start = moment(startingDate);
  const end = moment(endingDate);

  let eDate = end.diff(start, "days");

  if (eDate <= 0) {
    return <Moment date={startingDate} format="DD" />;
  } else if (eDate > 0) {
    return (
      <>
        <Moment date={startingDate} format="DD" />
        {"-"}
        <Moment date={endingDate} format="DD" />
      </>
    );
  }
}
// Extracting Event month and year as MMM-YYYY or MMM-YYYY--MMM-YYYY
function EventDates(props) {
  const { startingDate, endingDate } = props.events;

  const start = moment(startingDate);
  const end = moment(endingDate);

  let eDates = end.diff(start, "M");

  return eDates <= 0 ? (
    //the same month
    <Moment date={start} format="MMM-YYYY" />
  ) : (
    //different month
    <>
      <Moment date={startingDate} format="MMM-YYYY" />
      {"--"}
      <Moment date={endingDate} format="MMM-YYYY" />
    </>
  );
}

export default function EventCalendar({ posts }) {
  return (
    <section className="body-font mx-auto max-w-7xl text-gray-800">
      <div className="container mx-auto mb-24 px-5">
        <div className="mx-auto max-w-6xl border-b-16 border-black/10 bg-blue-100/80 px-8 py-8 md:px-24">
          <SectionTitle>Event Calendars</SectionTitle>
          <div className="divide-y-2 divide-black/10 text-center md:text-left">
            {posts.map(({ node }) => {
              const { title, content, databaseId } = node;
              const { startingDate, endingDate } = node.events;
              return (
                <div
                  key={databaseId}
                  className="flex flex-wrap py-6 transition delay-300 hover:shadow-lg md:flex-nowrap md:py-8 lg:px-2"
                >
                  <div className="mb-6 flex w-full flex-shrink-0 flex-col items-center justify-center border-black/10 md:mb-0 md:w-40 md:border-r-2">
                    {
                      <>
                        <span className="text-center text-2xl font-bold text-gray-700">
                          {!endingDate ? (
                            <Moment date={startingDate} format="DD" />
                          ) : (
                            <EventDay {...node} />
                          )}
                        </span>
                        <span className="mt-1 text-center text-gray-500">
                          {!endingDate ? (
                            <Moment date={startingDate} format="MMM-YYYY" />
                          ) : (
                            <EventDates {...node} />
                          )}
                        </span>
                      </>
                    }
                  </div>
                  <div className="flex w-full justify-center md:justify-start ">
                    <h2 className="title-font font-nono p-4 text-2xl font-medium text-gray-900">
                      {title}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
          <MoreButton title="Load More" moreURL={"../../events/"} />
        </div>
      </div>
    </section>
  );
}
