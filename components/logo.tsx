import Image from 'next/image';

import LogoImg from '../public/acs-logo.png';

const logo = ({ color }) => {
	return (
		<div className='flex items-end space-x-3 '>
			<Image src={LogoImg} alt='logo' className='w-10 h-auto' color='white' />
			<div>
				<p
					className={
						' mb-0 text-md  text-left lg:text-base font-noto' +
						(color === 'white' ? ' text-gray-100' : ' text-primary')
					}
				>
					አዲስ አበባ ካቶሊክ ሀገረ ስብከት
				</p>
				<p className='mb-0 font-sans text-md lg:text-base '>
					The Archdioceses of Addis Ababa
				</p>
			</div>
		</div>
	);
};

export default logo;
