<<<<<<< HEAD
import { useRouter } from "next/router";
type Props = {};

export default function CTA({}: Props) {
  const router = useRouter();
  return (
    <section className="w-full bg-secondary">
      <div className="container mx-auto max-w-6xl px-6 py-24 ">
        <div className="flex flex-col items-center space-y-8 text-center lg:px-8">
          <h2 className="text-4xl text-white ">Dive into God's Word</h2>
          <div className="space-x-4 space-y-8 lg:flex-row">
            <button
              onClick={() => router.push("/dailyReadings")}
              className="bg-white-500 border border-orange-500 px-5 py-2 font-medium capitalize tracking-wide text-orange-500 outline-none transition-all hover:bg-orange-500 hover:text-white sm:px-8 "
            >
              Readings
            </button>
            <button
              onClick={() => router.push("/podcasts")}
              className="bg-white-500 border border-orange-500 px-5 py-2 font-medium capitalize tracking-wide text-orange-500 outline-none transition-all hover:bg-orange-500 hover:text-white sm:px-8 "
            >
              Podcasts
            </button>
            <button
              onClick={() => router.push("/watchingOurVideos")}
              className="bg-white-500 border border-orange-500 px-5 py-2 font-medium capitalize tracking-wide text-orange-500 outline-none transition-all hover:bg-orange-500 hover:text-white sm:px-8 "
            >
              Watching Our Video
            </button>
            <button
              onClick={() => router.push("/podcast")}
              className="bg-white-500 border border-orange-500 px-5 py-2 font-medium capitalize tracking-wide text-orange-500 outline-none transition-all hover:bg-orange-500 hover:text-white sm:px-8 "
            >
              <svg
                className="mr-3 inline-block h-6 w-6 fill-current"
                viewBox="-28 0 512 512.00075"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m432.320312 215.121094-361.515624-208.722656c-14.777344-8.53125-32.421876-8.53125-47.203126 0-.121093.070312-.230468.148437-.351562.21875-.210938.125-.421875.253906-.628906.390624-14.175782 8.636719-22.621094 23.59375-22.621094 40.269532v417.445312c0 17.066406 8.824219 32.347656 23.601562 40.878906 7.390626 4.265626 15.496094 6.398438 23.601563 6.398438s16.214844-2.132812 23.601563-6.398438l361.519531-208.722656c14.777343-8.53125 23.601562-23.8125 23.601562-40.878906s-8.824219-32.347656-23.605469-40.878906zm-401.941406 253.152344c-.21875-1.097657-.351562-2.273438-.351562-3.550782v-417.445312c0-2.246094.378906-4.203125.984375-5.90625l204.324219 213.121094zm43.824219-425.242188 234.21875 135.226562-52.285156 54.539063zm-6.480469 429.679688 188.410156-196.527344 54.152344 56.484375zm349.585938-201.835938-80.25 46.332031-60.125-62.714843 58.261718-60.773438 82.113282 47.40625c7.75 4.476562 8.589844 11.894531 8.589844 14.875s-.839844 10.398438-8.589844 14.875zm0 0"></path>
              </svg>
              <span className="">Get it on Google Play</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
=======
import { useRouter } from 'next/router';
type Props = {};

export default function CTA({}: Props) {
	const router = useRouter();
	return (
		<section className='w-full bg-secondary'>
			<div className='container max-w-6xl px-6 py-24 mx-auto '>
				<div className='flex flex-col items-center space-y-8 text-center lg:px-8'>
					<h2 className='text-4xl text-white '>Dive into God's Word</h2>
					<div className='space-x-4 space-y-8 lg:flex-row'>
						<button
							onClick={() => router.push('/catholicTeachings')}
							className='px-5 py-2 font-medium tracking-wide text-orange-500 capitalize transition-all border border-orange-500 outline-none sm:px-8 bg-white-500 hover:bg-orange-500 hover:text-white '
						>
							Readings
						</button>
						<button
							onClick={() => router.push('/podcast')}
							className='px-5 py-2 font-medium tracking-wide text-orange-500 capitalize transition-all border border-orange-500 outline-none sm:px-8 bg-white-500 hover:bg-orange-500 hover:text-white '
						>
							Podcast
						</button>
						<button
							onClick={() => router.push('/news/tvnews')}
							className='px-5 py-2 font-medium tracking-wide text-orange-500 capitalize transition-all border border-orange-500 outline-none sm:px-8 bg-white-500 hover:bg-orange-500 hover:text-white '
						>
							Watching Our Video
						</button>
						<button
							onClick={() => router.push('/podcast')}
							className='px-5 py-2 font-medium tracking-wide text-orange-500 capitalize transition-all border border-orange-500 outline-none sm:px-8 bg-white-500 hover:bg-orange-500 hover:text-white '
						>
							<svg
								className='inline-block w-6 h-6 mr-3 fill-current'
								viewBox='-28 0 512 512.00075'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='m432.320312 215.121094-361.515624-208.722656c-14.777344-8.53125-32.421876-8.53125-47.203126 0-.121093.070312-.230468.148437-.351562.21875-.210938.125-.421875.253906-.628906.390624-14.175782 8.636719-22.621094 23.59375-22.621094 40.269532v417.445312c0 17.066406 8.824219 32.347656 23.601562 40.878906 7.390626 4.265626 15.496094 6.398438 23.601563 6.398438s16.214844-2.132812 23.601563-6.398438l361.519531-208.722656c14.777343-8.53125 23.601562-23.8125 23.601562-40.878906s-8.824219-32.347656-23.605469-40.878906zm-401.941406 253.152344c-.21875-1.097657-.351562-2.273438-.351562-3.550782v-417.445312c0-2.246094.378906-4.203125.984375-5.90625l204.324219 213.121094zm43.824219-425.242188 234.21875 135.226562-52.285156 54.539063zm-6.480469 429.679688 188.410156-196.527344 54.152344 56.484375zm349.585938-201.835938-80.25 46.332031-60.125-62.714843 58.261718-60.773438 82.113282 47.40625c7.75 4.476562 8.589844 11.894531 8.589844 14.875s-.839844 10.398438-8.589844 14.875zm0 0'></path>
							</svg>
							<span className=''>Get it on Google Play</span>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
>>>>>>> aa39fc7f3381656a14f872abda7274d19778faf0
}
