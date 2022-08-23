<template>
  <div>
  
    <Main>
      <a-row :gutter="25">
        <a-col :xs="24">
          <sdCards title="">
            <a-row :gutter="30" class="center">
              <a-col>
                <img :width="300" src="../../../static/img/LogATPLogo.png" alt="logo" />

                <p>App Version:1.10.2</p>
                <p>3683</p>
                <p>
                  <a href="https://logatp.com" target="_blank"
                    >https://logatp.com</a
                  >
                </p>
              </a-col>
            </a-row>
          </sdCards>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>
<script>
import { Main } from "../../styled";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Main,
  },
  setup() {},
});

</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
