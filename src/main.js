import app from "./config/configApp";
import router from "./routes/protectedRoute";
import store from "@/vuex/store";
import "./static/css/style.css";

import Parse from "parse";
Parse.initialize("kBs4F7HKAdGvWkM7TctqEDP1unOZCf4mgHGlY25O");
Parse.serverURL = "https://server.logatp.com/parse"//"https://staging-logatp.herokuapp.com/parse";

// Vue 3rd party plugins
import "@/core/plugins/ant-design";
import "@/core/plugins/fonts";
import "@/core/components/custom";
import "@/core/components/style";
import '@/core/plugins/apexcharts';
// import { StripePlugin } from '@vue-stripe/vue-stripe';
import sdButton from "../src/components/buttons/Buttons.vue";
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)
// const options = {
//     pk: "pk_test_51L4JDISEvKMW8AqalKSC2LJYUuLwuONr0OOgoxwTOiXV8XRaLEeot4UApON2embEL18QCLRUl8JuP6ZYdqn7knxs00qaDCVDKw",
    
//   };
  
// app.use(StripePlugin, options);
app.component('font-awesome-icon', FontAwesomeIcon);
app.config.productionTip = false;
app.use(store);
app.use(router);
app.mount("#app");
app.component("sdButton", sdButton);
