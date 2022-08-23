<template>
  
    <sdCards title="Select Rate">
      <span>
        <a-rate v-model:value="ratingState.value" :tooltips="ratingState.desc" />
        <span class="ant-rate-text">{{ ratingState.desc[value - 1] }}</span>
      </span>
    </sdCards>
  
</template>
<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const ratingState = reactive({
      value: 2,
      desc: ["terrible", "bad", "normal", "good", "wonderful"],
    });

    return {
      ratingState,
    };
  },
});
</script>
