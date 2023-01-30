import moment from 'moment';
import Moment from 'react-moment';
import MoreButton from './more-button';
import SectionTitle from './section-title';

// Extracting Event only day as DD or DD-DD
function EventDay(props) {
	const { startingDate, endingDate } = props.events;

	const start = moment(startingDate);
	const end = moment(endingDate);

	let eDate = end.diff(start, 'days');

	if (eDate <= 0) {
		return <Moment date={startingDate} format='DD' />;
	} else if (eDate > 0) {
		return (
			<>
				<Moment date={startingDate} format='DD' />
				{'-'}
				<Moment date={endingDate} format='DD' />
			</>
		);
	}
}
// Extracting Event month and year as MMM-YYYY or MMM-YYYY--MMM-YYYY
function EventDates(props) {
	const { startingDate, endingDate } = props.events;

	const start = moment(startingDate);
	const end = moment(endingDate);

	let eDates = end.diff(start, 'M');

	return eDates <= 0 ? (
		//the same month
		<Moment date={start} format='MMM-YYYY' />
	) : (
		//different month
		<>
			<Moment date={startingDate} format='MMM-YYYY' />
			{'--'}
			<Moment date={endingDate} format='MMM-YYYY' />
		</>
	);
}

export default function EventCalendar({ posts }) {
	return (
		<section className='mx-auto text-gray-800 body-font max-w-7xl'>
			<div className='container px-5 mx-auto mb-24'>
				<div className='max-w-6xl px-8 py-8 mx-auto bg-blue-100/80 md:px-24 border-black/10 border-b-16'>
					<SectionTitle>Event Calendars</SectionTitle>
					<div className='text-center divide-y-2 divide-black/10 md:text-left'>
						{posts.map(({ node }) => {
							const { title, databaseId } = node;
							const { startingDate, endingDate } = node.events;
							return (
								<div
									key={databaseId}
									className='flex flex-wrap py-6 transition delay-300 md:py-8 lg:px-2 md:flex-nowrap hover:shadow-lg'
								>
									<div className='flex flex-col items-center justify-center flex-shrink-0 w-full mb-6 md:w-40 md:mb-0 md:border-r-2 border-black/10'>
										{
											<>
												<span className='text-2xl font-bold text-center text-gray-700'>
													{!endingDate ? (
														<Moment date={startingDate} format='DD' />
													) : (
														<EventDay {...node} />
													)}
												</span>
												<span className='mt-1 text-center text-gray-500'>
													{!endingDate ? (
														<Moment date={startingDate} format='MMM-YYYY' />
													) : (
														<EventDates {...node} />
													)}
												</span>
											</>
										}
									</div>
									<div className='flex justify-center w-full md:justify-start '>
										<h2 className='p-4 text-2xl font-medium text-gray-900 title-font font-nono'>
											{title}
										</h2>
									</div>
								</div>
							);
						})}
					</div>
					<MoreButton title='Load More' moreURL={'../../events/'} />
				</div>
			</div>
		</section>
	);
}
