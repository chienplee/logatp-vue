<template>
  <div>
    <div>
      <p>User Data{{ getterData }}</p>
      <input v-model="UserData.email" placeholder="email" />
      <input v-model="UserData.password" placeholder="password" />
      <button @click="signup()">SignUp up</button>
    </div>
    <div>
      <input v-model="SignData.email" placeholder="email" />
      <input v-model="SignData.password" placeholder="password" />
      <button @click="signIn()">Sign In</button>
    </div>
    <button @click="logout()">logout</button>
  </div>
</template>

<script>
import Parse from "parse";
import { useStore } from "vuex";

import { defineComponent, reactive, onMounted, computed } from "vue";
export default defineComponent({
  name: "Form",
  components: {},
  setup() {
    const data = useStore();
    console.log("data", data);
    const getterData = computed(() => data.getters.getCurrentUserDetails);

    const UserData = reactive({
      email: "",
      password: "",
    });
    const SignData = reactive({
      email: "",
      password: "",
    });
    const signup = () => {
      console.log("siunp");
      const user = new Parse.User();
      user.set("username", UserData.email);
      user.set("password", UserData.password);

      try {
        user.signUp();
        const currentUser = Parse.User.current();
        console.log("use signup done", currentUser);
      } catch (error) {
        // Show the error message somewhere and let the user try again.
        console.log("use signup error");

        alert("Error: " + error.code + " " + error.message);
      }
    };

    const signIn = async () => {
      try {
        await Parse.User.logIn(SignData.email, SignData.password);
        const currentUser = Parse.User.current();

        console.log("sign in done", currentUser);
      } catch (error) {
        console.log(error);
      }
    };
    const logout = () => {
      const currentUser = Parse.User.current();
      Parse.User.logOut().then(() => {
        console.log("logout", currentUser);
      });
    };

    onMounted(() => {
      const currentUser = Parse.User.current();
      console.log("currentUser", currentUser);
    });
    return {
      UserData,
      signup,
      signIn,
      SignData,
      logout,
      getterData,
    };
  },
});
</script>
