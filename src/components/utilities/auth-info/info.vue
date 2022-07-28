<template>
  <InfoWraper>
    <div class="nav-author">
      <sdPopover
        placement="bottomRight"
        action="click"
        :class="rtl ? 'ant-popover-rtl' : ''"
      >
        <template v-slot:content>
          <UserDropDwon>
            <div class="user-dropdwon">
              <ul class="user-dropdwon__links">
                <li>
                  <a to="#"> <sdFeatherIcons type="user" /> Profile </a>
                </li>
                <li>
                  <a to="#"> <sdFeatherIcons type="settings" /> Settings </a>
                </li>
              </ul>
              <a @click="SignOut" class="user-dropdwon__bottomAction" href="#">
                <font-awesome-icon icon="fas fa-sign-out" />
                Sign Out
              </a>
            </div>
          </UserDropDwon>
        </template>
        <a to="#" class="head-example">
          <a-avatar
            src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"
          />
        </a>
      </sdPopover>
    </div>
  </InfoWraper>
</template>

<script>
import { InfoWraper, UserDropDwon } from "./auth-info-style";
import Parse from "parse";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AuthInfo",
  components: {
    InfoWraper,
    UserDropDwon,
  },
  data() {
    return {
      flag: "english",
    };
  },
  setup() {
    const { dispatch } = useStore();
    const { push } = useRouter();
    const SignOut = async (e) => {
      try {
        const currentUser = Parse.User.current();
        await Parse.User.logOut().then(() => {
          e.preventDefault();
          push("/auth/login");
          dispatch("logOut");
          console.log("logout", currentUser.get("username"));
        });
      } catch (errorInfo) {
        console.log("error", errorInfo);
      }
    };

    return {
      SignOut,
    };
  },
  methods: {
    onFlagChangeHandle: function (value) {
      this.flag = value;
    },
  },
});
</script>
