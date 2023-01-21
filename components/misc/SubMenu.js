import React from "react"
import { Link } from "gatsby"

const SubMenu = ({ dropDownItem }) => {
  return (
    <div>
      <ul className="z-10 flex-col hidden bg-blue-100 rounded-md md:w-56 md:bg-white md:divide-gray-100 md:mt-2 md:shadow-lg md:divide-y md:absolute group-hover:block">
        {dropDownItem.map(item => {
          return (
            <li key={item.name} className="px-3 py-2 text-left ">
              <Link
                to={item.link}
                className="block w-full px-2 py-2 rounded-md hover:bg-blue-300 md:hover:bg-blue-50"
              >
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SubMenu
