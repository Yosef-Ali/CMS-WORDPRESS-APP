import React from "react";

const footerMenuLinks = [
  {
    id: 1,
    name: "About us",
    submenu: [
      {
        name: "Archdioceses",
        link: "/archdioceses",
      },
      {
        name: "Archbishop",
        link: "/archbishop",
      },
      {
        name: "Curia",
        link: "/curia",
      },
      {
        name: "Parishes",
        link: "/parishes",
      },
      {
        name: "Congregations",
        link: "/congregations",
      },
    ],
  },
  {
    id: 2,
    name: "Secretariat",
    submenu: [
      {
        name: "Pastoral department ",
        link: "/pastoralDepartment ",
      },
      {
        name: "Social department",
        link: "/social-department",
      },
      {
        name: "Institutions",
        link: "/institutions",
      },
    ],
  },
  {
    id: 3,
    name: "Helpful Links",
    submenu: [
      {
        name: "Vatican News ",
        link: "/pastoralDepartment ",
      },
      {
        name: "ACS News",
        link: "/news",
      },
      {
        name: "Catholic Addis TV",
        link: "/news",
      },
      {
        name: "Ethiocist.org",
        link: "!#",
      },
    ],
  },
  {
    id: 4,
    name: "Contact Us",
    submenu: [
      {
        name: "acsec@ethionet.et",
        link: "acsec@ethionet.et",
        icon: <EmailIcon />,
      },
      {
        name: "(00.251).011.662.62.56",
        link: "",
        icon: <PhoneIcon />,
      },
      {
        name: "P.O. Box 21768, Addis Ababa Ethiopia",
        link: "",
        icon: <MailBoxIcon />,
      },
      {
        name: "Addis Ababa, Ethiopia",
        link: "",
        icon: <MapIcon />,
      },
    ],
  },
];

export default function FooterMenu() {
  const lastMenu = footerMenuLinks.length - 1;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-0 lg:col-span-2">
      {lastMenu
        ? footerMenuLinks.map((menu) => (
            <div key={menu.id} className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">{menu.name}</p>
              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  {lastMenu.name !== menu.name
                    ? menu.submenu.map((sub) => (
                        <li key={sub.name}>
                          <a
                            className="text-white transition hover:text-white/75"
                            href={sub.link}
                          >
                            {sub.name}
                          </a>
                        </li>
                      ))
                    : menu.submenu.map((sub) => (
                        <li
                          key={sub.name}
                          className="group flex items-start justify-center gap-1.5 sm:justify-start"
                        >
                          {sub.icon}
                          <span className="cursor-pointer text-white transition group-hover:text-white/75">
                            {sub.name}
                          </span>
                        </li>
                      ))}
                </ul>
              </nav>
            </div>
          ))
        : null}
    </div>
  );
}

function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 shrink-0 text-white group-hover:text-white/75 "
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function PhoneIcon(params) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 shrink-0 text-white group-hover:text-white/75"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 shrink-0 text-white group-hover:text-white/75"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function MailBoxIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 shrink-0 text-white group-hover:text-white/75"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
      />
    </svg>
  );
}
