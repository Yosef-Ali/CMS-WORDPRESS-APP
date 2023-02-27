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
    <section className="mx-auto my-20 text-gray-600 body-font max-w-7xl">
      <div className="p-8 bg-blue-100/80 divide-black/10 border-black/10 border-b-16 ">
        <h2 className="pb-4 text-3xl font-bold text-gray-900 border-b-2 sm:text-4xl border-black/10 ">
          {title}
        </h2>

        <div className="flex flex-wrap py-8 md:flex-nowrap md:justify-between ">
          <div className="flex flex-shrink-0 text-left md:w-80 w-72">
            <div className="px-2 mt-1 mb-20 text-gray-500 lg:px-0 md:px-6 md:w-80 md:w-68 lg:w-68 lg:pr-4 md:mb-0 ">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
          <div className="flex flex-wrap w-full -m-4 lg:max-w-4xl">
            {CongregationsPost.map((profile, index) => {
              const { title, congregations } = profile.node;
              const { email, phone, representedBy } = congregations;
              return (
                <div className="flex p-4 mb-6 lg:w-1/2" key={index}>
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 rounded-full bg-black/10 text-black/80">
                    <GroupIcon />
                  </div>
                  <div className="flex-grow pl-6">
                    <h2 className="mb-2 text-lg font-medium text-gray-900 title-font">
                      {title}
                    </h2>
                    <p className="text-base leading-relaxed uppercase">
                      <span className="text-lg text-gray-700 capitalize">
                        Run by:{" "}
                      </span>
                      {representedBy}
                    </p>
                    {email && (
                      <div className="flex">
                        <div className="inline-flex items-center justify-center w-7 h-7 mb-2 rounded-full text-black/70 bg-black/10">
                          <EmailIcon className="w-5 h-5" />
                        </div>
                        <span className="ml-2 text-base leading-relaxed">
                          {email}
                        </span>
                      </div>
                    )}
                    {phone && (
                      <div className="flex">
                        <div className="inline-flex items-center justify-center w-7 h-7 mb-5 rounded-full text-black/70 bg-black/10">
                          <PhoneIcon className="w-5 h-5" />
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

export default function congregations({
  pages,
  congregations,
  events,
  preview,
}) {
  const CongregationsPost = congregations?.edges;
  const pagesPost = pages.edges;
  const eventsPosts = events?.edges;
  return (
    <Layout preview={preview}>
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

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllPostsForCongregations(preview);

  return {
    props: {
      pages: data.pages,
      congregations: data.allCongregations,
      events: data.events,
      preview,
    },
    revalidate: 10,
  };
};
