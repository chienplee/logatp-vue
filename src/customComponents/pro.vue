<template>
  <div>
    <Main>
      <sdCards class="center">
        <img :width="500" src="../static/img/LogATPLogo.png" />
      </sdCards>
      <sdCards title="PRO FEATURES">
        <a-row :gutter="25">
          <a-col v-for="obj of proFeaturesData.data" :key="obj" :lg="6" :md="8" :sm="12" :xs="24">
            <sdCards :title="obj.title">
              <ContactCardWrapper>
                <div>
                  <p>{{obj.text}}</p>
                  <span v-if="obj.Note">Note:{{obj.Note}}</span>
                  <!-- <p>{{obj.img}}</p> -->
                  <img :width="200" :src="obj.img" />
                </div>
              </ContactCardWrapper>
            </sdCards>
          </a-col>
        </a-row>
      </sdCards>
      <sdCards title>
        <a href="https://logatp.com/pricing.html" target="_blank">
          <a-button class="button">
            <font-awesome-icon class="icon" icon="fa-solid fa-circle-question" />
            <span class="custom">FAQs</span>
          </a-button>
        </a>
        <a href="https://logatp.com/terms.html" target="_blank">
          <a-button class="button">
            <font-awesome-icon class="icon" icon="fa-solid fa-dollar-sign" />
            <span class="custom">Terms of Use</span>
          </a-button>
        </a>
        <a href="https://logatp.com/privacy.html" target="_blank">
          <a-button class="button">
            <font-awesome-icon class="icon" icon="fa-solid fa-lock" />
            <span class="custom">Privacy Policy</span>
          </a-button>
        </a>
      </sdCards>

      <sdCards title="PRICING">
        <!-- <router-link :to="{name:'selectPlan',params:{cusId:'hi',priceId:'hgcy'},props:{name:'nagarjuna'}}"> -->
        
        <a-tooltip  placement="top" :color="proFeaturesData.color">
          <template #title>
            <h4>{{proFeaturesData.proUser}}</h4>
          </template>
          <a-button
          class="button"
          :disabled="proFeaturesData.state"
          @click="modal2Visible = true,monthlyPlan(),renderCard()"
        >
          <font-awesome-icon icon="fa-solid fa-file-invoice-dollar" />
          <span class="custom">
            <span>&#8377;</span>
            869 INR/year
          </span>
        </a-button>
        </a-tooltip>
        <!-- </router-link>s -->

        

        <a-tooltip  placement="top" :color="proFeaturesData.color">
          <template #title>
            <h4>{{proFeaturesData.proUser}}</h4>
          </template>
          <a-button
          class="button"
          :disabled="proFeaturesData.state"
          @click="modal2Visible = true,yearlyPlan(),renderCard()"
        >
          <font-awesome-icon icon="fa-solid fa-file-invoice-dollar" />
          <span class="custom">
            <span>&#8377;</span>
            8500 INR/year
          </span>
        </a-button>
        </a-tooltip>
      </sdCards>

      <div>
        <a-modal
          v-model:visible="modal2Visible"
          title="Enter Card Details"
          centered
          @ok="pay(proFeaturesData.amount,proFeaturesData.plandId)"
        >
          <a-spin :spinning="proFeaturesData.loader" class size="large">
            <div>
              <input class="subscriber-name" v-model="proFeaturesData.name" placeholder="Enter Name" />
            </div>
            <!-- <Token /> -->
            <div id="card">
              <!-- A Stripe Element will be inserted here. -->
            </div>
            <!-- <button type="submit" @click="createT">Subscribe</button> -->
            <!-- <button
              type="submit"
              @click="pay(proFeaturesData.amount,proFeaturesData.plandId)"
            >Subscribe</button> -->
          </a-spin>
        </a-modal>
      </div>
    </Main>
  </div>
</template>

<script >
import { defineComponent, ref, reactive, onMounted } from "vue";
import { Main } from "./styled";
import Parse from "parse";
import admin from "../server/admin.js";
// import StripeService from "../server/stripe-service";
// import Token from "../customComponents/token.vue";

import { loadStripe } from "@stripe/stripe-js";
import { message } from "ant-design-vue";
import moment from "moment";
import ContactCardWrapper from "./styled"
export default defineComponent({
  components: {
    Main,
    ContactCardWrapper
    // Token
  },
  setup() {
    const proFeaturesData = reactive({
      data: [
        {
          title: "Real Flight Plan",
          text:
            "The app will look for your flight plan from o contracted ADS-B companv and save the flightplan together with your flight",
          img: require("../static/img/sc.jpg")
        },
        {
          title: "Real Flight Track",
          text:
            "The app will pin point your flight track fromtakeoff to landing at 30 seconds interval if ADS-B data is available.",
          Note:
            "ADS-B data may not be available in pacific or oceanic areas because there are noADS-B receivers",
          img: require("../static/img/map.jpg")
        },
        {
          title: "Real Flight Data",
          text:
            "The app will look for your flight data from takeoffto landing, provide altitude, groundspeed,latitude and longitude information to you atregular interval.",
          img: require("../static/img/data.png")
        },
        {
          title: "Actual Block Times",
          text:
            "If available, the app will look for your actualblock out, block off, block on and block in times",
          Note:
            "Some block times may be missing because there are no enough data fed to ADS-B data center",
          img: require("../static/img/block.jpg")
        }
      ],
      cusId: "",
      priceId1: "price_1Lmf6WSEvKMW8Aqat8IHEHeL",
      priceId2: "price_1LkLDFSEvKMW8AqatEuvc1Rl",
      modal1Visible: false,
      card: null,
      stripe: null,
      amount: null,
      plandId: null,
      loader: false,
      state: false,
      name: "",
      proUser:"click here to subscribe",
      color:"#8ba832"
    });
    const modal1Visible = ref(false);
    // let stripe = null;

    // let elements = null;
    // var card = null;
    onMounted(async () => {
    
      admin.getAdminFunction().then(() => {
        // console.log(res);
      });
      // console.log(modal1Visible.value);
      const currentUser = Parse.User.current();
      const Subscription = currentUser.get('Subscription')
      if(Subscription=="on"){
        // console.log("on")
        proFeaturesData.state=true
        proFeaturesData.proUser="You are a pro member"
        proFeaturesData.color="red"

      }
    });
    var modal2Visible = ref(false);

    const setModal1Visible = visible => {
      modal1Visible.value = visible;
    };
    // const createT = async () => {
    //   console.log("creating......................");
    //   proFeaturesData.stripe
    //     .createToken(proFeaturesData.card)
    //     .then(async res => {
    //       console.log(res.token.id);
    //       var token = res.token.id;
    //       console.log("token", token);
    //       const currentUser = Parse.User.current();
    //       var email = currentUser.get("username");
    //       console.log("clicked");
    //       var fname = currentUser.get("firstName");
    //       var lname = currentUser.get("lastName");
    //       var fullname = fname + lname;
    //       var cusid = "";
    //       var subid = "";
    //       var clientSecret = "";
    //       try {
    //         const res = await StripeService.createCust(email, fullname);
    //         console.log("res", res);
    //         cusid = res.data.customer;

    //         // if (res.data.customer) {
    //         //   proFeaturesData.cusId = res.data.customer;
    //         //   console.log(res);

    //         // }
    //       } catch (error) {
    //         console.log(error);
    //       }
    //       try {
    //         const res1 = await StripeService.createSubs(
    //           cusid,
    //           proFeaturesData.priceId1
    //         );
    //         console.log(res1);
    //         clientSecret = res1.data.clientSecret;

    //         subid = res1.data.subscriptionId;
    //         // console.log(subid,res.data.clientSecret)
    //         if (res1.data) {
    //           // const currentUser = Parse.User.current();
    //         }
    //       } catch (error) {
    //         console.log(error);
    //       }

    //       try {
    //         const res = await StripeService.setToken(cusid, token);
    //         console.log(subid);

    //         // const query1 = new Parse.Query("Purchases");
    //         // currentUser.set("planId",proFeaturesData.priceId1)
    //         const Purchases = Parse.Object.extend("Purchases");
    //         const addPurchase = new Purchases();
    //         var acl = new Parse.ACL(Parse.User.current());
    //         await admin.getAdminFunction().then(res => {
    //           console.log(res);
    //           acl.setWriteAccess(res.id, true);
    //           acl.setReadAccess(res.id, true);
    //         });

    //         addPurchase.set({
    //           customerId: cusid,
    //           subscriptionId: subid,
    //           amount: 869,
    //           user: email,
    //           planId: proFeaturesData.priceId1,
    //           purchaseDate: new Date()
    //         });
    //         addPurchase.setACL(acl);
    //         await addPurchase.save().then(() => {
    //           console.log("purchase added");
    //         });

    //         currentUser.set("plan", "pro");
    //         currentUser.set("Subscription", "on");
    //         //  await  currentUser.set("planExpiryDate", );
    //         await proFeaturesData.stripe
    //           .confirmCardPayment(clientSecret, {
    //             payment_method: {
    //               type: "card",
    //               card: proFeaturesData.card,
    //               billing_details: {
    //                 name: "fullName"
    //               }
    //             }
    //           })
    //           .then(res => {
    //             console.log(res);
    //           })
    //           .catch(error => {
    //             console.log(error);
    //           });

    //         await currentUser.save();

    //         // const query1 = new Parse.Query("Purchases");

    //         console.log(res);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     });
    //   console.log(proFeaturesData.card);
    // };

    const pay = async (amount, priceId) => {
      proFeaturesData.loader = true;
      const currentUser = Parse.User.current();
      var email = currentUser.get("username");
      // console.log(email);

      var token = "";
      var clientSecret = "";
      var subId = "";
      var cusId = "";

      await proFeaturesData.stripe
        .createToken(proFeaturesData.card)
        .then(data => {
          token = data.token.id;
        })
        .catch(error => {
          console.log(error);

          proFeaturesData.loader = false;
          message.error("enter valid card details");
        });
      // console.log(token);
      // console.log(amount, priceId);

      if (token) {
        // const currentUser = Parse.User.current();
        // console.log(currentUser);

        const params1 = { email: email, name: proFeaturesData.name };
        await Parse.Cloud.run("createStripeCustomer", params1).then(res => {
          // console.log(res);
          cusId = res.id;

          // console.log(cusId);
        });

        const params2 = {
          customerId: cusId,
          priceId: priceId
        };
        await Parse.Cloud.run("createStripeSubscription", params2).then(
          subscription => {
            // console.log(subscription);
            clientSecret =
              subscription.latest_invoice.payment_intent.client_secret;
            subId = subscription.id;
            // console.log(subId, clientSecret);
            //     subscriptionId: subscription.id,
            // clientSecret: subscription.latest_invoice.payment_intent.client_secret,
          }
        );
      }
      if (!token) {
        proFeaturesData.loader = false;
      }

      await proFeaturesData.stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            type: "card",
            card: proFeaturesData.card,
            billing_details: {
              name: "fullName"
            }
          }
        })
        .then(async res => {
          //
          // console.log(res);
          if (res.error) {
            // console.log(res.error);
            const params4 = {
              customerId: cusId
            };

            await Parse.Cloud.run("deleteStripeCustomer", params4).then(() => {
              // console.log(res);
            });
            message.error(res.error.message);

            modal2Visible.value = false;
          } else {
            const params3 = {
              customerId: cusId,
              token: token
            };
            // console.log("params3", params3);
            await Parse.Cloud.run("saveStripeCardDetails", params3).then(
              () => {
                // console.log(res);
              }
            );
            const Purchases = Parse.Object.extend("Purchases");
            const addPurchase = new Purchases();
            // var acl = new Parse.ACL(Parse.User.current());
            // await admin.getAdminFunction().then(res => {
            //   console.log(res);
            //   acl.setWriteAccess(res.id, true);
            //   acl.setReadAccess(res.id, true);
            // });

            const getAdmin = Parse.Object.extend("User");
            const adminquery = new Parse.Query(getAdmin);
            adminquery.equalTo("username", "admin@logatp.com");
            const object = await adminquery.first();
            const acl = new Parse.ACL(Parse.User.current());
            acl.setWriteAccess(object.id, true);
            acl.setReadAccess(object.id, true);

            let currentDateTime = moment();
            if (amount == 869) {
              currentDateTime = moment(currentDateTime).add(30, "days");
            } else {
              currentDateTime = moment(currentDateTime).add(365, "days");
            }
            // console.log("currentDateTime", currentDateTime);
            // add days in current time and re console it.
            // console.log("currentDateTime plus 30s", currentDateTime._d);

            addPurchase.set({
              customerId: cusId,
              subscriptionId: subId,
              amount: proFeaturesData.amount,
              user: email,
              planId: proFeaturesData.plandId,
              purchaseDate: new Date()
            });
            addPurchase.setACL(acl);
            await addPurchase.save().then(() => {
              // console.log("purchase added");
            });

            currentUser.set("plan", "pro");
            currentUser.set("Subscription", "on");
            currentUser.set("ProUser", true);

            currentUser.set("planExpiryDate", currentDateTime._d);
            await currentUser.save().then(() => {
              // console.log("user updated");
            });
            message.success("payment completed");
            proFeaturesData.state = true;
            proFeaturesData.loader = false;
            proFeaturesData.proUser="You are a pro member"
            proFeaturesData.color="red"


            modal2Visible.value = false;
            // proFeaturesData.state=true

            //  await  currentUser.set("planExpiryDate", );
          }
        })
        .catch(error => {
          message.error("payment failed");
          proFeaturesData.loader = false;

          modal1Visible.value = false;

          console.log(error);
        });
    };
    const renderCard = async () => {
      // let stripe = null;

      let elements = null;
      // var card = null;
      // console.log("hello");
      const ELEMENT_TYPE = "card";

      proFeaturesData.stripe = await loadStripe(
        "pk_test_51LdaSGGXj7ZrMaUQetqoJH010X91s7sKsZZsDWtc1ubIjx9AFTbftEAJIu9JJ87cMgjqorUp4PTWbuonigthbH7v00HfoBoKqI"
      );
      // this.publishableKey = "";

      elements = proFeaturesData.stripe.elements();
      proFeaturesData.card = elements.create(ELEMENT_TYPE, {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      });
      proFeaturesData.card.mount("#card");
    };

    const monthlyPlan = () => {
      proFeaturesData.amount = 869;
      proFeaturesData.plandId = "price_1LnNVmGXj7ZrMaUQ0zmv8oZQ";
    };

    const yearlyPlan = () => {
      proFeaturesData.amount = 8500;
      proFeaturesData.plandId = "price_1LnNXxGXj7ZrMaUQ5RT3Yvp2";
    };

    // const Signup = async () => {
    //   const currentUser = Parse.User.current();
    //   var email = currentUser.get("username");
    //   console.log("clicked");
    //   var fname = currentUser.get("firstName");
    //   var lname = currentUser.get("lastName");
    //   var fullname = fname + lname;
    //   var cus_id = currentUser.get("customerId");
    //   proFeaturesData.cusId = cus_id;

    //     try {
    //       const res = await StripeService.createCust(email, fullname);
    //       console.log("res", res);

    //       if (res.data.customer) {
    //         proFeaturesData.cusId = res.data.customer;
    //         console.log(res);
    //         currentUser.set("customerId", res.data.customer);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }

    // };

    return {
      activeKey1: ref("1"),
      proFeaturesData,
      setModal1Visible,
      modal2Visible,
      // createT,
      renderCard,
      pay,
      monthlyPlan,
      yearlyPlan
    };
  }
});
</script>

<style scoped>
.subscriber-name{
  border:none;
  border-radius: 0.5;
  margin-left: 18px;
  margin-bottom: 25px;
  padding:10px
  
  
}
.subscriber-name:focus{
  outline:none;
  
}
.center {
  display: flex;
  justify-content: center;
  text-align: center;
}
.custom {
  margin-left: 10px;
}
.wrapper {
  display: inline-block;
  height: 150px;
  width: 250px;
  padding: 5px;
  margin: 5px;
  background: lightgray;
}
</style>