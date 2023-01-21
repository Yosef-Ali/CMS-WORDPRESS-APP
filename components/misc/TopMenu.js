import React from "react"
import SubMenu from "./SubMenu"
import { Link } from "gatsby"

export default function TopMenu({ menuLinks }) {
  return (
    <div className="flex items-end">
      <ul className="relative flex flex-col w-full text-center transition-all md:flex-row">
        {menuLinks.map(item => {
          return (
            <li
              key={item.name}
              className="p-4 cursor-pointer group hover:bg-blue-100 md:hover:bg-transparent"
            >
              <div className="flex items-center group">
                {item.name === "Home" ? (
                  <Link to="/" className="mr-1">
                    {item.name}
                  </Link>
                ) : item.submenu.length > 0 ? (
                  <span className="mr-1">{item.name}</span>
                ) : (
                  <Link to={item.link}>
                    <span className="mr-1">{item.name}</span>
                  </Link>
                )}

                {item.submenu.length > 0 ? (
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                ) : null}
              </div>
              {item.submenu ? <SubMenu dropDownItem={item.submenu} /> : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
