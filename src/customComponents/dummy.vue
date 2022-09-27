<template>
    <div class>
      <div>
        <form>
          <label>
            <input name="cardholder-name" class="field is-empty" placeholder="Jane Doe" />
            <span>
              <span>Name</span>
            </span>
          </label>
          <label>
            <input class="field is-empty" type="tel" placeholder="(123) 456-7890" />
            <span>
              <span>Phone number</span>
            </span>
          </label>
          <label>
            <!-- <div id="card-element" class="field is-empty"></div> -->
            <div id="stripe-element-mount-point" class="field is-empty" />
  
            <span>
              <span>Credit or debit card</span>
            </span>
          </label>
          <button type="submit">Pay $25</button>
          <div class="outcome">
            <div class="error" role="alert"></div>
            <div class="success">
              Success! Your Stripe token is
              <span class="token"></span>
            </div>
          </div>
        </form>
        <button @click="createToken">click</button>
      </div>
    </div>
  </template>
    
    <script>
  // import { loadStripe } from "@stripe/stripe-js";
  
  // import token from "../server/token.js"
  import { onMounted } from "vue";
  
  export default {
    setup() {
      // let stripe = null;
  
      // let elements = null;
      onMounted(async () => {
        // const ELEMENT_TYPE = "card";
  
        // stripe = await loadStripe("pk_test_51L4JDISEvKMW8AqalKSC2LJYUuLwuONr0OOgoxwTOiXV8XRaLEeot4UApON2embEL18QCLRUl8JuP6ZYdqn7knxs00qaDCVDKw");
        // this.publishableKey = "";
  
        // elements = stripe.elements();
      //   const card = elements.create(ELEMENT_TYPE, {
      //     iconStyle: "solid",
      //     style: {
      //       base: {
      //         iconColor: "#8898AA",
      //         color: "white",
      //         lineHeight: "36px",
      //         fontWeight: 300,
      //         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      //         fontSize: "19px",
  
      //         "::placeholder": {
      //           color: "#8898AA"
      //         }
      //       },
      //       invalid: {
      //         iconColor: "#e85746",
      //         color: "#e85746"
      //       }
      //     },
      //     classes: {
      //       focus: "is-focused",
      //       empty: "is-empty"
      //     }
      //   });
      //   card.mount("#stripe-element-mount-point");
      //   function setOutcome(result) {
      //     var successElement = document.querySelector(".success");
      //     var errorElement = document.querySelector(".error");
      //     successElement.classList.remove("visible");
      //     errorElement.classList.remove("visible");
  
      //     if (result.token) {
      //       // Use the token to create a charge or a customer
      //       // https://stripe.com/docs/charges
      //       successElement.querySelector(".token").textContent = result.token.id;
      //       successElement.classList.add("visible");
      //     } else if (result.error) {
      //       errorElement.textContent = result.error.message;
      //       errorElement.classList.add("visible");
      //     }
      //   }
      //   card.on("change", event => {
      //     setOutcome(event);
      //   });
      //   document.querySelector("form").addEventListener("submit", function(e) {
      //     e.preventDefault();
      //     var form = document.querySelector("form");
      //     var extraDetails = {
      //       name: form.querySelector("input[name=cardholder-name]").value
      //     };
      //     stripe.createToken(card, extraDetails).then(setOutcome);
      //   });
      });
      const stripe = require("stripe")(
        "sk_test_51L4JDISEvKMW8AqaGakvAZCNKUMm3B6bbyjUBU23p2lAc0bBZUmVpjWaWWrBW3hB09DrY8zbajpi7W0iTrInp2qC00f87qlwsV"
      );
      
      var elements = stripe.elements();
  
      var card = elements.create("card", {
        iconStyle: "solid",
        style: {
          base: {
            iconColor: "#8898AA",
            color: "white",
            lineHeight: "36px",
            fontWeight: 300,
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSize: "19px",
  
            "::placeholder": {
              color: "#8898AA"
            }
          },
          invalid: {
            iconColor: "#e85746",
            color: "#e85746"
          }
        },
        classes: {
          focus: "is-focused",
          empty: "is-empty"
        }
      });
      card.mount("#card-element");
  
      var inputs = document.querySelectorAll("input.field");
      Array.prototype.forEach.call(inputs, function(input) {
        input.addEventListener("focus", function() {
          input.classList.add("is-focused");
        });
        input.addEventListener("blur", function() {
          input.classList.remove("is-focused");
        });
        input.addEventListener("keyup", function() {
          if (input.value.length === 0) {
            input.classList.add("is-empty");
          } else {
            input.classList.remove("is-empty");
          }
        });
      });
  
      function setOutcome(result) {
        var successElement = document.querySelector(".success");
        var errorElement = document.querySelector(".error");
        successElement.classList.remove("visible");
        errorElement.classList.remove("visible");
  
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          successElement.querySelector(".token").textContent = result.token.id;
          successElement.classList.add("visible");
        } else if (result.error) {
          errorElement.textContent = result.error.message;
          errorElement.classList.add("visible");
        }
      }
  
      card.on("change", function(event) {
        setOutcome(event);
      });
  
      document.querySelector("form").addEventListener("submit", function(e) {
        e.preventDefault();
        var form = document.querySelector("form");
        var extraDetails = {
          name: form.querySelector("input[name=cardholder-name]").value
        };
        stripe.createToken(card, extraDetails).then(setOutcome);
      });
  
      const createToken = () => {
        var inputs = document.querySelectorAll("input.field");
        Array.prototype.forEach.call(inputs, function(input) {
          input.addEventListener("focus", function() {
            input.classList.add("is-focused");
          });
          input.addEventListener("blur", function() {
            input.classList.remove("is-focused");
          });
          input.addEventListener("keyup", function() {
            if (input.value.length === 0) {
              input.classList.add("is-empty");
            } else {
              input.classList.remove("is-empty");
            }
          });
        });
        console.log(inputs);
      };
  
      return {
        createToken
      };
    }
  };
  </script>
    
    <style scoped>
  .checkout {
    border: 1px solid black;
    padding: 3px;
  }
  
  .fields {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 30px;
  }
  .img {
    display: flex;
    justify-content: center;
  }
  .showcase {
    margin-bottom: 20px;
  }
  .mt {
    margin-top: 20px;
  }
  .dis {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }
  button {
    margin-top: 30px;
  }
  * {
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 19px;
    font-variant: normal;
    padding: 0;
    margin: 0;
  }
  
  html {
    height: 100%;
  }
  
  body {
    background: #424770;
    display: flex;
    align-items: center;
    min-height: 100%;
  }
  
  form {
    width: 90%;
    max-width: 30rem;
    margin: 20px auto;
  }
  
  label {
    height: 35px;
    position: relative;
    color: #8798ab;
    display: block;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  
  label > span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-weight: 300;
    line-height: 32px;
    color: #8798ab;
    border-bottom: 1px solid #586a82;
    transition: border-bottom-color 200ms ease-in-out;
    cursor: text;
    pointer-events: none;
  }
  
  label > span span {
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0% 50%;
    transition: transform 200ms ease-in-out;
    cursor: text;
  }
  
  label .field.is-focused + span span,
  label .field:not(.is-empty) + span span {
    transform: scale(0.68) translateY(-36px);
    cursor: default;
  }
  
  label .field.is-focused + span {
    border-bottom-color: #34d08c;
  }
  
  .field {
    background: transparent;
    font-weight: 300;
    border: 0;
    color: white;
    outline: none;
    cursor: text;
    display: block;
    width: 100%;
    line-height: 32px;
    padding-bottom: 3px;
    transition: opacity 200ms ease-in-out;
  }
  
  .field::-webkit-input-placeholder {
    color: #8898aa;
  }
  .field::-moz-placeholder {
    color: #8898aa;
  }
  
  /* IE doesn't show placeholders when empty+focused */
  .field:-ms-input-placeholder {
    color: #424770;
  }
  
  .field.is-empty:not(.is-focused) {
    opacity: 0;
  }
  
  button {
    float: left;
    display: block;
    background: #34d08c;
    color: white;
    border-radius: 2px;
    border: 0;
    margin-top: 20px;
    font-size: 19px;
    font-weight: 400;
    width: 100%;
    height: 47px;
    line-height: 45px;
    outline: none;
  }
  
  button:focus {
    background: #24b47e;
  }
  
  button:active {
    background: #159570;
  }
  
  .outcome {
    float: left;
    width: 100%;
    padding-top: 8px;
    min-height: 20px;
    text-align: center;
  }
  
  .success,
  .error {
    display: none;
    font-size: 15px;
  }
  
  .success.visible,
  .error.visible {
    display: inline;
  }
  
  .error {
    color: #e4584c;
  }
  
  .success {
    color: #34d08c;
  }
  
  .success .token {
    font-weight: 500;
    font-size: 15px;
  }
  </style>
    