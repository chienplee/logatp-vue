<template>
  <div>
    <AddCrew :id="formState.crewid" />
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import AddCrew from "../../pages/AddCrew.vue";

export default defineComponent({
  components: {
    AddCrew,
  },
  setup() {
    const router = useRoute();
    const formState = reactive({
      crewid: router.params.crewid,
    });

    onMounted(() => {});

    return {
      formState,
    };
  },
});
</script>
