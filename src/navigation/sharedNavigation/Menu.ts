// export const MENU_ITEMS = [
//   {
//     name: 'Storage',
//     route: 'Storage',
//     expandable: true,
//     children: [
//       {
//         name: 'Sheds',
//         route: 'RO Token',
//       },
//     ],
//   },
//   {
//     name: 'Token Management',
//     expandable: true,

//     children: [
//       {
//         name: 'Issue',
//         route: 'RO Token',
//       },
//     ],
//   },

//   {
//     name: 'Gate Management',
//     expandable: true,

//     children: [
//       {
//         name: 'Gate Pass',
//         route: 'Gate Pass',
//       },
//       {
//         name: 'Gate Pass Exit',
//         route: 'Gate Pass Exit',
//       },
//     ],
//   },
//   {
//     name: 'Weigh Bridge',
//     expandable: true,
//     children: [
//       {name: 'Out Weight', route: 'OutWeight'},
//       {name: 'In Weight', route: 'InWeight'},
//       {name: 'Generate Truck Chit', route: 'GenerateTruckChit'},
//     ],
//   },
//   {
//     name: 'Labour Management',
//     expandable: true,

//     children: [
//       {
//         name: 'Labour Gang Usage',
//         route: 'Labour Gang Usage',
//       },
//       {name: 'Labour Gang Usage Rail', route: 'Labour Gang Usage Rail'},
//       {
//         name: 'Gang Usage For Miscellaneous',
//         route: 'Gang Usage For Miscellaneous',
//       },
//       {name: 'Labour Gang Allocation', route: 'Labour Gang Allocation'},
//     ],
//   },
//   {
//     name: 'Shed Operations',
//     expandable: true,

//     children: [
//       {
//         name: 'Stacking',
//         route: 'Stacking',
//       },

//       {name: 'Loading', route: 'Loading'},
//     ],
//   },
//   {
//     name: 'Quality',
//     expandable: true,

//     children: [
//       {
//         name: 'Update Moisture For Issue',
//         route: 'Update Moisture For Issue',
//       },
//     ],
//   },
//   {
//     name: 'Master Sync',
//     route: 'Master Sync',
//     expandable: false,
//   },
//   {
//     name: 'Settings',
//     route: 'Settings',
//     expandable: false,
//   },
//   {
//     name: 'Logout',
//     route: 'Logout',
//     expandable: false,
//   },
// ];
export const MENU_ITEMS = [
  {
    name: 'Storage',
    route: 'Storage',
    expandable: true,
    children: [
      {
        name: 'Sheds',
        route: 'Home',
      },
    ],
  },
  {
    name: 'Sales Import / Export',
    expandable: true,
    children: [
      {
        name: 'Token Management',
        expandable: true,

        children: [
          {
            name: 'Issue',
            route: 'RO Token',
          },
        ],
      },
      {
        name: 'Gate Management',
        expandable: true,

        children: [
          {
            name: 'Gate Pass',
            route: 'Gate Pass',
          },
          {
            name: 'Gate Pass Exit',
            route: 'Gate Pass Exit',
          },
        ],
      },
      {
        name: 'Weigh Bridge',
        expandable: true,
        children: [
          {name: 'Out Weight', route: 'OutWeight'},
          {name: 'In Weight', route: 'InWeight'},
          {name: 'Generate Truck Chit', route: 'GenerateTruckChit'},
        ],
      },
      {name: 'Loading', route: 'Loading'},
    ],
  },
  {
    name: 'Shed Operations',
    expandable: true,

    children: [
      {
        name: 'Stacking',
        route: 'Stacking',
      },
    ],
  },
  {
    name: 'Quality and PV',
    expandable: true,

    children: [
      {
        name: 'Update Moisture For Issue',
        route: 'Update Moisture For Issue',
      },
    ],
  },

  {
    name: 'Labour Management',
    expandable: true,

    children: [
      {
        name: 'Labour Gang Usage',
        route: 'Labour Gang Usage',
      },
      {name: 'Labour Gang Usage Rail', route: 'Labour Gang Usage Rail'},
      {
        name: 'Gang Usage For Miscellaneous',
        route: 'Gang Usage For Miscellaneous',
      },
      {name: 'Labour Gang Allocation', route: 'Labour Gang Allocation'},
    ],
  },
  {
    name: 'Master Sync',
    route: 'Master Sync',
    expandable: false,
  },
  {
    name: 'Settings',
    route: 'Settings',
    expandable: false,
  },
  {
    name: 'Logout',
    route: 'Logout',
    expandable: false,
  },
];
