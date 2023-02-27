export default function Banner({ title }) {
  return (
    <div className="h-52 bg-blue-200 sm:h-60 md:h-72 lg:h-[350px]">
      <div className="relative mx-auto max-w-screen-xl bg-slate-100">
        <div className="absolute top-28 w-full p-4 text-left text-4xl font-semibold uppercase opacity-5 sm:top-52 md:text-6xl lg:top-64 lg:text-7xl">
          {title || "Title"}
        </div>
      </div>
    </div>
  );
}
