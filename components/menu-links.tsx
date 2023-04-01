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
    link: `/about`,
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
    link: `/secretariat`,
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
    id: 4,
    name: `Catholic TV`,
    link: `/news`,
    submenu: [],
  },
  {
    id: 5,
    name: `Contact`,
    link: `/contact`,
    submenu: [],
  },
];
