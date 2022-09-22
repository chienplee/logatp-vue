<template>
    <div>
      <AddExperienceVue :id="formState.expid" />
    </div>
  </template>
  
  <script>
  import { defineComponent, reactive, onMounted } from "vue";
  import { useRoute } from "vue-router";
 import AddExperienceVue from "../AddExperience.vue";  
  export default defineComponent({
    components: {
        AddExperienceVue,
    },
    setup() {
      const router = useRoute();
      const formState = reactive({
        expid: router.params.expid,
      });
  
      onMounted(() => {});
  
      return {
        formState,
      };
    },
  });
  </script>
  