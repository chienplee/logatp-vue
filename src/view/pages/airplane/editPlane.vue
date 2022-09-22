<template>
  <div>
    <AddAirplaneVue :id="formState.planeId" />
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import AddAirplaneVue from "../AddAirplane.vue";

export default defineComponent({
  components: {
    AddAirplaneVue,
  },
  setup() {
    const router = useRoute();
    const formState = reactive({
      planeId: router.params.planeId,
    });

    onMounted(() => {});

    return {
      formState,
    };
  },
});
</script>
