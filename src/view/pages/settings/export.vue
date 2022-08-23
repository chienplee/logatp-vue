<template>
  <!-- <Main> -->
  <sdCards size="default">
      <sdButton size="default" transparented type="primary">
      <font-awesome-icon class="icon" icon="fa-solid fa-file" />
      <span>Log ATP Data</span>
    </sdButton>
    <sdButton size="default" transparented type="primary">
      <font-awesome-icon class="icon" icon="fa-solid fa-file" />
      <span>Log ATP Data</span>
    </sdButton>
      <sdButton size="default" transparented type="primary">
      <font-awesome-icon class="icon" icon="fa-solid fa-file" />
      <span>All System Data</span>
    </sdButton>
  </sdCards>
  <!-- </Main> -->
</template>
<script>
import { defineComponent } from "vue";
// import { Main } from "../../styled";

export default defineComponent({
  components: {
    // Main,
  },
  setup() {},
});
</script>
