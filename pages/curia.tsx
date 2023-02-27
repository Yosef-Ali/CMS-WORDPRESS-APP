import Cta from "../components/cta";
import Layout from "../components/layout";
import EventCalendar from "../components/event-calendars";

import Banner from "../components/banner";
import { EmailIcon, PersonIcon, PhoneIcon } from "../components/icons";
import { GetStaticProps } from "next";
import { getAllPostsForCuria } from "../lib/api";

function Profiles(props) {
  const { title, profile } = props.node;
  const { occupation, email, phone } = profile;
  return (
    <div className="flex p-4 lg:w-1/2 xl:w-1/3 ">
      <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 rounded-full bg-black/10 text-black/80">
        <PersonIcon />
      </div>
      <div className="flex-grow pl-6">
        <h2 className="mb-2 text-lg font-medium text-gray-900 title-font">
          {title}
        </h2>
        <p className="text-base leading-relaxed uppercase">{occupation}</p>
        {email && (
          <div className="flex">
            <div className="inline-flex items-center justify-center w-7 h-7 mb-2 rounded-full text-black/70 bg-black/10">
              <EmailIcon className="w-5 h-5 shrink-0 group-hover:text-white/75  bg-black/10" />
            </div>
            <span className="ml-2 text-base leading-relaxed">{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex ">
            <div className="inline-flex items-center justify-center w-7 h-7 mb-5 rounded-full text-black/70 bg-black/10">
              <PhoneIcon className="w-5 h-5" />
            </div>
            <span className="ml-2 text-base leading-relaxed">{phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TheCurias(props) {
  const { name, description, theCurias } = props;
  const theCuriasPost = theCurias?.edges;

  const sortedtheCuriasPost = [...theCuriasPost].sort(
    (a, b) => a.node.profile.order - b.node.profile.order
  );
  return (
    <div className="flex flex-wrap py-8 md:flex-nowrap ">
      <div className="flex flex-col flex-shrink-0 mb-6 md:w-64 md:mb-0">
        <span className="text-xl font-semibold capitalize title-font ">
          {name}
        </span>
        <span className="mt-1 text-sm text-gray-500 w-60">{description}</span>
      </div>
      <div className="flex flex-wrap w-full -m-4">
        {sortedtheCuriasPost.map((curia, index) => (
          <Profiles {...curia} key={index} />
        ))}
      </div>
    </div>
  );
}

export default function Curia({
  theCuriaOfficials,
  collegeOfConsultatories,
  presbyterianCouncils,
  pastoralCouncils,
  ecclesiasticalTribunals,
  events,
  preview,
}) {
  const TheCuriaOfficials = theCuriaOfficials?.edges[0].node;
  const CollegeOfConsultatory = collegeOfConsultatories?.edges[0].node;
  const PresbyterianCouncils = presbyterianCouncils?.edges[0].node;
  const PastoralCouncils = pastoralCouncils?.edges[0].node;
  const EcclesiasticalTribunals = ecclesiasticalTribunals?.edges[0].node;
  const eventsPosts = events?.edges;

  return (
    <Layout preview={preview}>
      <div className="hidden lg:block">
        <Banner title="The Curia" />
      </div>
      <section className="mx-auto my-20 text-gray-600 body-font max-w-7xl">
        <div className="p-8 divide-y-2 bg-blue-100/80 divide-black/10 border-black/10 border-b-16 ">
          <h2 className="pb-4 text-3xl font-bold text-gray-900 sm:text-4xl border-black/10 ">
            The Curia
          </h2>
          <TheCurias {...TheCuriaOfficials} />
          <TheCurias {...CollegeOfConsultatory} />
          <TheCurias {...PresbyterianCouncils} />
          <TheCurias {...PastoralCouncils} />
          <TheCurias {...EcclesiasticalTribunals} />
        </div>
      </section>
      <Cta />
      {eventsPosts.length > 0 && <EventCalendar posts={eventsPosts} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllPostsForCuria(preview);
  return {
    props: {
      theCuriaOfficials: data.theCuriaOfficials,
      collegeOfConsultatories: data.collegeOfConsultatories,
      presbyterianCouncils: data.presbyterianCouncils,
      pastoralCouncils: data.pastoralCouncils,
      ecclesiasticalTribunals: data.ecclesiasticalTribunals,
      events: data.events,
      preview,
    },
    revalidate: 10,
  };
};
