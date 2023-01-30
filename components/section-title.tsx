export default function SectionTitle({ children }) {
	return (
		<h2
			className='pb-4 text-3xl font-bold text-gray-900 border-b-2 sm:text-4xl border-black/10 '
			dangerouslySetInnerHTML={{ __html: children }}
		/>
	);
}
