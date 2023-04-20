<<<<<<< HEAD
import { ParishesIcon } from "./icons";
import { CongregationsIcon } from "./icons";
import { InstitutionsIcon } from "./icons";

function AboutProfile(profile) {
  const { title, content } = profile.node;
  const IconName = () => {
    switch (title) {
      case "Parishes":
        return <ParishesIcon />;
      case "Congregations":
        return <CongregationsIcon />;
      default:
        return <InstitutionsIcon />;
    }
  };

  return (
    <div className="flex w-full flex-col p-4 lg:w-1/3">
      <a
        className="w-[411] flex-1 border-b-16 border-black/10 bg-blue-100/80 p-6 sm:px-16 sm:py-12 lg:p-10 "
        href="#!"
      >
        <div className="flex flex-col">
          <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/10 ">
            <IconName />
          </div>
          <h3 className="mt-6 text-2xl uppercase tracking-tight">{title}</h3>

          <div className="mt-2 font-sans">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </a>
    </div>
  );
}

export default function SectionBlurb({ posts }) {
  return (
    <section className="mx-auto max-w-screen-lg px-4 py-24 sm:px-8">
      <h4 className="mb-5 text-center text-sm font-medium uppercase text-primary underline underline-offset-4 sm:text-lg">
        About Us
      </h4>
      <h2 className="mb-5 text-center text-3xl font-bold uppercase text-gray-900 sm:text-4xl">
        The Archdioceses of Addis Ababa
      </h2>
      <p className="mx-auto mb-20 max-w-lg text-center text-gray-900">
        The Ethiopian Catholic Archdiocese of Addis Ababa, officially the
        Metropolitan Sui iuris Archdiocese of Addis Ababa, is the metropolitan
        see of the Ethiopian Catholic Church, a sui iuris metropolitan Eastern
        Catholic Church.
      </p>
      <div className="-m-4 flex flex-wrap">
        {posts.map((profile, i) => {
          return <AboutProfile key={i} {...profile} />;
        })}
      </div>
    </section>
  );
=======
import { ParishesIcon } from './icons';
import { CongregationsIcon } from './icons';
import { InstitutionsIcon } from './icons';

function AboutProfile(profile) {
	const { title, content } = profile.node;
	const IconName = () => {
		switch (title) {
			case 'Parishes':
				return <ParishesIcon />;
			case 'Congregations':
				return <CongregationsIcon />;
			default:
				return <InstitutionsIcon />;
		}
	};

	return (
		<div className='flex flex-col w-full p-4 lg:w-1/3'>
			<a
				className='flex-1 p-6 sm:px-16 sm:py-12 lg:p-10 bg-blue-100/80 border-black/10 w-[411] border-b-16 '
				href='#!'
			>
				<div className='flex flex-col'>
					<div className='inline-flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-black/10 '>
						<IconName />
					</div>
					<h3 className='mt-6 text-2xl tracking-tight uppercase'>{title}</h3>

					<p className='mt-2 font-sans'>
						<div dangerouslySetInnerHTML={{ __html: content }} />
					</p>
				</div>
			</a>
		</div>
	);
}

export default function SectionBlurb({ posts }) {
	return (
		<section className='max-w-screen-lg px-4 py-24 mx-auto sm:px-8'>
			<h4 className='mb-5 text-sm font-medium text-center underline uppercase sm:text-lg text-primary underline-offset-4'>
				About Us
			</h4>
			<h2 className='mb-5 text-3xl font-bold text-center text-gray-900 uppercase sm:text-4xl'>
				The Archdioceses of Addis Ababa
			</h2>
			<p className='max-w-lg mx-auto mb-20 text-center text-gray-900'>
				The Ethiopian Catholic Archdiocese of Addis Ababa, officially the
				Metropolitan Sui iuris Archdiocese of Addis Ababa, is the metropolitan see
				of the Ethiopian Catholic Church, a sui iuris metropolitan Eastern Catholic
				Church.
			</p>
			<div className='flex flex-wrap -m-4'>
				{posts.map((profile) => (
					<AboutProfile key={profile.id} {...profile} />
				))}
			</div>
		</section>
	);
>>>>>>> aa39fc7f3381656a14f872abda7274d19778faf0
}
