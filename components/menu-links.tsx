interface MenuLink {
  id: number;
  name: string;
  link: string;
  submenu: Array<{ name: string; link: string }>;
}

export const menuLinks: MenuLink[] = [
  {
    id: 1,
    name: "Home",
    link: `/`,
    submenu: [],
  },
  {
    id: 2,
    name: `About us `,
    link: "",
    submenu: [
      {
        name: "Archdiocese",
        link: "/archdiocese",
      },
      {
        name: "Archbishop",
        link: "/archbishop",
      },
      {
        name: "Curia",
        link: "/the_curia_list",
      },
      {
        name: "Parishes",
        link: "/parishes",
      },
      {
        name: "Congregations",
        link: "/congregation",
      },
    ],
  },
  {
    id: 3,
    name: `Secretariat`,
    link: " ",
    submenu: [
      {
        name: "Pastoral department ",
        link: "/pastoralDepartment ",
      },
      {
        name: "Social department",
        link: "/socialDepartment",
      },
      {
        name: "Institutions",
        link: "/institutions",
      },
    ],
  },
  {
    id: 4,
    name: `PAX Catholic TV`,
    link: `/catholic-tv`,
    submenu: [],
  },
  {
    id: 5,
    name: `Contact`,
    link: `/contact`,
    submenu: [],
  },
];
