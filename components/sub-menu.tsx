import Link from "next/link";

const SubMenu = ({ dropDownItem }) => {
  return (
    <div>
      <ul className="z-10 hidden flex-col rounded-md bg-blue-100 group-hover:block md:absolute md:mt-2 md:w-56 md:divide-y md:divide-gray-100 md:bg-white md:shadow-lg">
        {dropDownItem.map((item) => {
          return (
            <li key={item.name} className="px-3 py-2 text-left ">
              <Link
                href={item.link}
                className="block w-full rounded-md px-2 py-2 hover:bg-blue-300 md:hover:bg-blue-50"
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubMenu;
