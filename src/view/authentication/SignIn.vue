<template>
  <a-spin :spinning="formState.loader" class="" size="large">
    <AuthWrapper>
      <p class="auth-notice">
        Don&rsquo;t have an account?
        <router-link to="/auth/register">Sign up now</router-link>
      </p>

      <div class="auth-contents">
        <a-form @finish="handleSubmit" :model="formState" layout="vertical">
          <sdHeading as="h3"> Sign in</sdHeading>
          <a-form-item name="username" label="Email">
            <a-input type="email" v-model:value="formState.email" />
          </a-form-item>
          <a-form-item name="password" initialValue="123456" label="Password">
            <a-input
              type="password"
              v-model:value="formState.password"
              placeholder="Password"
            />
          </a-form-item>
          <div class="auth-form-action">
            <a-checkbox @change="onChange">Keep me logged in</a-checkbox>
            <router-link class="forgot-pass-link" to="/auth/forgotPassword">
              Forgot password?
            </router-link>
          </div>
          <a-form-item>
            <sdButton
              class="btn-signin"
              htmlType="submit"
              type="primary"
              size="large"
            >
              {{ isLoading ? "Loading..." : "Sign In" }}
            </sdButton>
          </a-form-item>
          <!-- <p class="form-divider">
          <span>Or</span>
        </p>
        <ul class="social-login">
          <li>
            <a class="google-signup" href="#">
              <img :src="require('@/static/img/google.png')" alt="" />
              <span>Sign in with Google</span>
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
          <!-- <div class="auth0-login">
          <a href="#" @click="() => lock.show()"> Sign In with Auth0 </a>
        </div> -->
        </a-form>
      </div>
    </AuthWrapper>
  </a-spin>
</template>
<script>
// import { FacebookOutlined, TwitterOutlined } from "@ant-design/icons-vue";
import { computed, reactive, ref, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { AuthWrapper } from "./style";
import { useRouter } from "vue-router";
import Parse from "parse";
import { message } from "ant-design-vue";

const SignIn = defineComponent({
  name: "SignIn",
  components: { AuthWrapper },
  setup() {
    const { state, dispatch } = useStore();
    const data = useStore();
    const isLoading = computed(() => state.auth.loading);
    const getterData = computed(() => data.getters.getCurrentUserDetails);

    const username = computed(() => state.auth.username);

    const checked = ref(null);
    const router = useRouter();

    const handleSubmit = async () => {
      formState.loader = true;
      console.log("login");
      try {
        await Parse.User.logIn(formState.email, formState.password);
        formState.loader = false;
        message.success("signin Success");

        const currentUser = Parse.User.current();
        const email = currentUser.get("username");
        console.log("current user: " + email);
        data.commit("setCurrentUserDetails", email);

        router.push("/");
        dispatch("login");

        console.log("sign in success", currentUser.get("username"));
      } catch (error) {
        formState.loader = false;

        message.error("Invalid Email or Password");

        console.log(error);
      }
    };
    const onChange = (checked) => {
      checked.value = checked;
    };

    const formState = reactive({
      email: "",
      password: "",
      loader: false,
    });
    onMounted(() => {
      console.log("on MOunted");
    });

    return {
      isLoading,
      checked,
      handleSubmit,
      onChange,
      formState,
      username,
      data,
      getterData,
    };
  },
});

export default SignIn;
</script>
