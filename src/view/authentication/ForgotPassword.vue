<template>
  <AuthWrapper>
    <div class="auth-contents">
      <a-form @finish="handleSubmit" :model="formState" layout="vertical">
        <sdHeading as="h3">Forgot Password?</sdHeading>
        <p class="forgot-text">
          Enter the email address you used when you joined and we’ll send you
          instructions to reset your password.
        </p>
        <a-form-item label="Email Address" name="email">
          <a-input
            type="email"
            v-model:value="formState.email"
            placeholder="name@example.com"
          />
        </a-form-item>
        <a-form-item>
          <sdButton
            class="btn-reset"
            htmlType="submit"
            type="primary"
            size="large"
          >
            Reset Password
          </sdButton>
        </a-form-item>

        <p class="return-text">
          Return to <router-link to="/auth/login">Sign In</router-link>
        </p>
      </a-form>
    </div>
  </AuthWrapper>
</template>
<script>
import Parse from "parse";

import { reactive, defineComponent } from "vue";
import { AuthWrapper } from "./style";
import { message } from "ant-design-vue";

const ForgotPassword = defineComponent({
  name: "ForgotPassword",
  components: { AuthWrapper },
  setup() {
    const handleSubmit = async (values) => {
      console.log(values);
      console.log("forgot");
      const Users = Parse.Object.extend("User");
      const query = new Parse.Query(Users);
      query.equalTo("email", formState.email);
      const checkUser = await query.first();
      console.log("checkUser", checkUser.id);

      if (!checkUser) {
        message.error("User Not Found");
      } else {
        Parse.User.requestPasswordReset(formState.email)
          .then(() => {
            message.success("Reset password link sent to register mail");
          })
          .catch((error) => {
            // Show the error message somewhere
            console.log(error);
            message.success("User Not Found");

            // alert("Error: " + error.code + " " + error.message);
          });
      }
    };

    const formState = reactive({
      email: "",
    });

    return {
      handleSubmit,
      formState,
    };
  },
});

export default ForgotPassword;
</script>
