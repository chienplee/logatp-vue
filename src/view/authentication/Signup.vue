<template>
  <a-spin :spinning="formState.loader" class="" size="large">
    <AuthWrapper>
      <p class="auth-notice">
        Already have an account?
        <router-link to="/auth/login">Sign In</router-link>
      </p>
      <div class="auth-contents">
        <a-form
          name="register"
          :model="formState"
          @finish="handleSubmit"
          layout="vertical"
        >
          <sdHeading as="h3"> Sign Up </sdHeading>

          <a-form-item name="email" label="Email Address">
            <a-input
              type="email"
              v-model:value="formState.email"
              placeholder="name@example.com"
            />
          </a-form-item>
          <a-form-item label="Password" name="password">
            <a-input
              type="password"
              v-model:value="formState.password"
              placeholder="Password"
            />
          </a-form-item>
          <a-form-item>
            <sdButton
              class="btn-create"
              htmlType="submit"
              type="primary"
              size="large"
            >
              Create Account
            </sdButton>
          </a-form-item>
          <!-- <p class="form-divider">
          <span>Or</span>
        </p>
        <ul class="social-login signin-social">
          <li>
            <a class="google-signup" href="#">
              <img :src="require('@/static/img/google.png')" alt="" />
              <span>Sign up with Google</span>
            </a>
          </li>
          <li>
            <a class="facebook-sign" href="#">
              <FacebookOutlined />
            </a>
          </li>
          <li>
            <a class="twitter-sign" href="#">
              <TwitterOutlined />
            </a>
          </li>
        </ul> -->
        </a-form>
      </div>
    </AuthWrapper>
  </a-spin>
</template>
<script>
// import { FacebookOutlined, TwitterOutlined } from "@ant-design/icons-vue";
import { AuthWrapper } from "./style";
import { reactive, ref, defineComponent } from "vue";
import Parse from "parse";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import admin from "../../server/admin"

const SignUp = defineComponent({
  name: "SignUp",
  components: { AuthWrapper },
  setup() {
    const { dispatch } = useStore();
    const router = useRouter();
    const checked = ref(null);
    const handleSubmit = async () => {
      formState.loader = true;
      console.log("siunp");
      const user = new Parse.User();
      const acl = new Parse.ACL(Parse.User.current());


      await admin.getAdminFunction().then(res => {
              console.log(res);
              acl.setWriteAccess(res.id, true);
              acl.setReadAccess(res.id, true);
            });
      
      user.set("email", formState.email);
      user.set("password", formState.password);
      user.set("username", formState.email);
      user.set("lastName","");
      user.set("firstName","")
      await user.setACL(acl);
      try {
        await user.signUp();
        formState.email = "";
        formState.password = "";
        formState.loader = false;
        message.success("SignUp Success");
        router.push("/");
        dispatch("login");
        const currentUser = Parse.User.current();
        console.log("use signup done", currentUser.get("username"));
      } catch (error) {
        console.log("use signup error");
        formState.loader = false;

        // alert("Error: " + error.code + " " + error.message);
        message.error("Sign up Failed");
      }
    };

    const onChange = (check) => {
      checked.value = check;
    };
    const formState = reactive({
      email: "",
      password: "",
      loader: false,
    });
    return {
      onChange,
      handleSubmit,
      formState,
    };
  },
});

export default SignUp;
</script>
