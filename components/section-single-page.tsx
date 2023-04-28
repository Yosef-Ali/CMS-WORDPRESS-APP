export default function Section({ title, children }) {
  return (
    <section className="body-font text-gray-800">
      <div className="container mx-auto mb-24 max-w-2xl">
        <div className="border-b-16 border-black/10 px-4 py-8">
          <h2 className="text-md title-font font-noto border-b-2 border-black/10 pb-4 font-bold text-gray-900 sm:text-xl ">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}
