export default [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "flightInfo" */ "@/view/pages/Dashboard.vue"),
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
    props: true,
    component: () =>
      import(/* webpackChunkName: "Blank" */ "@/view/pages/AddCrew.vue"),
  },
  {
    path: "/flights",
    name: "flights",
    component: () =>
      import(
        /* webpackChunkName: "flights" */ "@/view/pages/flight/Flights.vue"
      ),
  },
  {
    path: "/flight/:flightId",
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
  {
    path: "/crews",
    name: "crews",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/crew/Crew.vue"),
  },
  {
    path: "/crews/:crewid",
    name: "crewDetails",
    component: () =>
      import(
        /* webpackChunkName: "crews" */ "@/view/pages/crew/CrewDetails.vue"
      ),
  },
  {
    path: "/airplanes/:planeid",
    name: "airplaneInfo",
    component: () =>
      import(
        /* webpackChunkName: "crews" */ "@/view/pages/airplane/airplaneInfo.vue"
      ),
  },
  {
    path: "/crews/edit/:crewid",
    name: "editCrew",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/crew/edit.vue"),
  },
  {
    path: "/airplanes/editPlane/:planeId",
    name: "editPlane",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/airplane/editPlane.vue"),
  },
  {
    path: "/flights/edit/:flightId",
    name: "editFlight",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/flight/edit.vue"),
  },
  {
    path:"settings",
    name:"settings",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/settings.vue"),
  },
  {
    path: "summary",
    name: "summary",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/summary.vue"),
  },
  {
    path: "hours",
    name: "hours",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/hours.vue"),
  },
  {
    path:"currency",
    name:"currency",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/currency.vue"),
  },
  {
    path:"weather",
    name:"weather",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/weather.vue"),
  },{
    path:'airportview',
    name:"airportview",
    component: () =>
    import(/* webpackChunkName: "crews" */ "@/view/pages/AirportView.vue"),
  },{
    path:"map",
    name:"map",
    component: () =>
    import(/* webpackChunkName: "crews" */ "@/view/pages/map.vue"),
  },
  {
    path:"data",
    name:"data",
    component: () =>
    import(/* webpackChunkName: "crews" */ "@/view/pages/data.vue"),
  },{
    path:"career",
    name:"career",
    component: () =>
    import(/* webpackChunkName: "crews" */ "@/view/pages/career.vue"),
  },{
    path:"add-airplane",
    name:"addAirplane",
    component: () =>
    import(/* webpackChunkName: "crews" */ "@/view/pages/AddAirplane.vue"),

  },{
    path:"airplanes",
    name:"airplanes",
    component: () =>
    import(/* webpackChunkName: "crews" */ "@/view/pages/Airplanes.vue"),
  },
  // {
  //   path:"table",
  //   name:"table",
  //   component: () =>
  //   import(/* webpackChunkName: "crews" */ "@/view/pages/table.vue"),

  // },
  {
    path:"add-experiece",
    name:"addExperience",
    component: () =>
    import(/* webpackChunkName: "crews" */ "@/view/pages/AddExperience"),

  },
  {
    path:"experiences",
    name:"Experiences",
    component: () =>
    import(/* webpackChunkName: "crews" */ "@/view/pages/Experiences.vue"),

  },
  {
    path: "/experiences/:expid",
    name: "experienceInfo",
    component: () =>
      import(
        /* webpackChunkName: "crews" */ "@/view/pages/experience/experienceInfo.vue"
      ),
  },
  {
    path: "/experiences/editExperience/:expid",
    name: "editExperience",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/experience/editExperience.vue"),
  },

  //stripe
  {
    path: "/stripe",
    name: "payment",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/payment.vue"),
  },
  {
    path: "/success",
    name: "success",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/success.vue"),
  },{
    path: "/error",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/error.vue"),
  },
  {
    path: "/selectPlan/:cusId/:priceId",
    name: "selectPlan",
    props: true,
    component: () =>
      import(/* webpackChunkName: "crews" */ "@/view/pages/selectPlan"),
  },
  


];
