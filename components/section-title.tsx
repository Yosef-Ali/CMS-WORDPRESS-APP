export default function SectionTitle({ children }) {
  return (
    <h2
      className="border-b-2 border-black/10 pb-4 text-3xl font-bold text-gray-900 sm:text-4xl "
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}
