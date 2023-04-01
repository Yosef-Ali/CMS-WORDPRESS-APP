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
      <div className="mb-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/10 text-black/80">
        <PersonIcon />
      </div>
      <div className="flex-grow pl-6">
        <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
          {title}
        </h2>
        <p className="text-base uppercase leading-relaxed">{occupation}</p>
        {email && (
          <div className="flex">
            <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
              <EmailIcon className="h-5 w-5 shrink-0 bg-black/10  group-hover:text-white/75" />
            </div>
            <span className="ml-2 text-base leading-relaxed">{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex ">
            <div className="mb-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-black/70">
              <PhoneIcon className="h-5 w-5" />
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
      <div className="mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64">
        <span className="title-font text-xl font-semibold capitalize ">
          {name}
        </span>
        <span className="mt-1 w-60 text-sm text-gray-500">{description}</span>
      </div>
      <div className="-m-4 flex w-full flex-wrap">
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
    <Layout>
      <div className="hidden lg:block">
        <Banner title="The Curia" />
      </div>
      <section className="body-font mx-auto my-20 max-w-7xl text-gray-600">
        <div className="divide-y-2 divide-black/10 border-b-16 border-black/10 bg-blue-100/80 p-8 ">
          <h2 className="border-black/10 pb-4 text-3xl font-bold text-gray-900 sm:text-4xl ">
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

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllPostsForCuria();
  return {
    props: {
      theCuriaOfficials: data.theCuriaOfficials,
      collegeOfConsultatories: data.collegeOfConsultatories,
      presbyterianCouncils: data.presbyterianCouncils,
      pastoralCouncils: data.pastoralCouncils,
      ecclesiasticalTribunals: data.ecclesiasticalTribunals,
      events: data.events,
    },
    revalidate: 10,
  };
};
