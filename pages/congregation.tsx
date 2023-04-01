import Cta from "../components/cta";
import Layout from "../components/layout";
import EventCalendar from "../components/event-calendars";
import Banner from "../components/banner";
import { EmailIcon, GroupIcon, PhoneIcon } from "../components/icons";
import { GetStaticProps } from "next";
import { getAllPostsForCongregations } from "../lib/api";

function CongregationProfile({ CongregationsPost, pagesPost }) {
  const { title, content } = pagesPost[0].node;
  return (
    <section className="body-font mx-auto my-20 max-w-7xl text-gray-600">
      <div className="divide-black/10 border-b-16 border-black/10 bg-blue-100/80 p-8 ">
        <h2 className="border-b-2 border-black/10 pb-4 text-3xl font-bold text-gray-900 sm:text-4xl ">
          {title}
        </h2>

        <div className="flex flex-wrap py-8 md:flex-nowrap md:justify-between ">
          <div className="flex w-72 flex-shrink-0 text-left md:w-80">
            <div className="md:w-68 lg:w-68 mt-1 mb-20 px-2 text-gray-500 md:mb-0 md:w-80 md:px-6 lg:px-0 lg:pr-4 ">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
          <div className="-m-4 flex w-full flex-wrap lg:max-w-4xl">
            {CongregationsPost.map((profile, index) => {
              const { title, congregations } = profile.node;
              const { email, phone, representedBy } = congregations;
              return (
                <div className="mb-6 flex p-4 lg:w-1/2" key={index}>
                  <div className="mb-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/10 text-black/80">
                    <GroupIcon />
                  </div>
                  <div className="flex-grow pl-6">
                    <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
                      {title}
                    </h2>
                    <p className="text-base uppercase leading-relaxed">
                      <span className="text-lg capitalize text-gray-700">
                        Run by:{" "}
                      </span>
                      {representedBy}
                    </p>
                    {email && (
                      <div className="flex">
                        <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
                          <EmailIcon className="h-5 w-5" />
                        </div>
                        <span className="ml-2 text-base leading-relaxed">
                          {email}
                        </span>
                      </div>
                    )}
                    {phone && (
                      <div className="flex">
                        <div className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
                          <PhoneIcon className="h-5 w-5" />
                        </div>

                        <span className="ml-2 text-base leading-relaxed">
                          {phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function congregations({ pages, congregations, events }) {
  const CongregationsPost = congregations?.edges;
  const pagesPost = pages.edges;
  const eventsPosts = events?.edges;
  return (
    <Layout>
      <div className="hidden lg:block">
        <Banner title="Congregations" />
      </div>
      <CongregationProfile
        CongregationsPost={CongregationsPost}
        pagesPost={pagesPost}
      />
      <Cta />
      {eventsPosts.length > 0 && <EventCalendar posts={eventsPosts} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPostsForCongregations();

  return {
    props: {
      pages: data.pages,
      congregations: data.congregations,
      events: data.events,
    },
    revalidate: 10,
  };
};
