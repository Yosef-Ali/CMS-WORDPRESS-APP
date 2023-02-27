import { EmailIcon, MailBoxIcon, MapIcon, PhoneIcon } from "./icons";

interface FooterMenuLinks {
  id: number;
  name: string;
  submenu: {
    name: string;
    link: string;
    icon?: JSX.Element | undefined;
  };
}

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
  const lastMenu: number = footerMenuLinks.length - 1;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-0 lg:col-span-2">
      {lastMenu
        ? footerMenuLinks.map((menu) => (
            <div key={menu.id} className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">{menu.name}</p>
              <nav className="mt-8">
                <ul className="space-y-4 text-sm">
                  {menu.name[lastMenu] !== menu.name
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
