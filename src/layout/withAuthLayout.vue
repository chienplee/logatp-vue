<template>
  <a-row>
    <a-col :xxl="8" :xl="9" :lg="12" :md="8" :xs="24">
      <Aside>
        <div class="auth-side-content">
          <img
            :src="require('@/static/img/auth/topShape.png')"
            alt=""
            class="topShape"
          />
          <img
            :src="require('@/static/img/auth/bottomShape.png')"
            alt=""
            class="bottomShape"
          />
          <Content>
            <img
              :style="{ width: '350px' }"
              :src="require('@/static/img/LogATPLogo.png')"
              alt=""
            />
          </Content>
        </div>
      </Aside>
    </a-col>

    <a-col :xxl="16" :xl="15" :lg="12" :md="16" :xs="24">
      <router-view></router-view>
    </a-col>
  </a-row>
</template>
<script>
import { Aside, Content } from "./style";

const AuthLayout = {
  name: "AuthLayout",
  components: { Aside, Content },
};

export default AuthLayout;
</script>
