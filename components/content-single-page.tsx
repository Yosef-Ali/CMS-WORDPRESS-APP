import { useRouter } from "next/router";

export default function Content(props) {
  const router = useRouter();
  const { content, title } = props;
  return (
    <div className="max-w-screen-sm pt-6">
      <h2 className="text-md font-noto py-6 font-bold text-gray-900 antialiased">
        {title}
      </h2>
      <div className="font-noto prose text-gray-900 antialiased">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="mt-16 text-center">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center rounded bg-secondary px-6 py-3 text-white transition hover:bg-secondary/90 hover:shadow-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
