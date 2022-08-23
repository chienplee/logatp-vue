<template>
  <div>
    <AddFlight :id="formState.flightId" />
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import AddFlight from "../../pages/AddFlight.vue";

export default defineComponent({
  components: {
    AddFlight,
  },
  setup() {
    const router = useRoute();
    const formState = reactive({
      flightId: router.params.flightId,
    });

    onMounted(() => {});

    return {
      formState,
    };
  },
});
</script>
