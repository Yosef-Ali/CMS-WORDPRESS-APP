export default function SectionTitle({ children }) {
<<<<<<< HEAD
  return (
    <h2
      className="border-b-2 border-black/10 pb-4 text-3xl font-bold text-gray-900 sm:text-4xl "
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
=======
	return (
		<h2
			className='pb-4 text-3xl font-bold text-gray-900 border-b-2 sm:text-4xl border-black/10 '
			dangerouslySetInnerHTML={{ __html: children }}
		/>
	);
>>>>>>> aa39fc7f3381656a14f872abda7274d19778faf0
}
