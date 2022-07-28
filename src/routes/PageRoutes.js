export default [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "flightInfo" */ "@/view/dashboard/overview/sales/TopSellingProduct.vue"),
  },
  {
    path: "/add-flight",
    name: "AddFlight",
    component: () =>
      import(/* webpackChunkName: "Blank" */ "@/view/pages/AddFlight.vue"),
  },
  {
    path: "/add-crew",
    name: "AddCrew",
    component: () =>
      import(/* webpackChunkName: "Blank" */ "@/view/pages/AddCrew.vue"),
  },
  {
    path: "/flights",
    name: "flights",
    component: () =>
      import(/* webpackChunkName: "flights" */ "@/view/pages/flight/Flights.vue"),
  },
  {
    path: "/flightinfo",
    name: "flightinfo",
    component: () =>
      import(
        /* webpackChunkName: "flightInfo" */ "@/view/pages/flight/FlightInfo.vue"
      ),
  },
  {
    path: "/user",
    name: "user",
    component: () =>
      import(/* webpackChunkName: "flightInfo" */ "@/view/pages/User"),
  },
  {
    path: "/crews",
    name: "crews",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/crew/Crew.vue"),
  },
];
