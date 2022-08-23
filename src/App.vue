<template>
  <div v-if="isLoading" class="spin">
    <a-spin />
  </div>
  <ThemeProvider
    v-else
    :theme="{
      ...theme,
      rtl,
      topMenu,
      darkMode,
    }"
  >
    <Suspense>
      <template #default>
        <router-view></router-view>
      </template>
      <template #fallback>
        <div class="spin">
          <a-spin />
        </div>
      </template>
    </Suspense>
  </ThemeProvider>
</template>
<script>
import { ThemeProvider } from "vue3-styled-components";
import { theme } from "./config/theme/themeVariables";
import { computed, defineComponent, provide } from "vue";
import { useStore } from "vuex";
import moment from "moment";

export default defineComponent({
  name: "App",
  components: {
    ThemeProvider,
  },
  setup() {
    const { state } = useStore();
    const rtl = computed(() => state.themeLayout.rtlData);
    const isLoading = computed(() => state.themeLayout.loading);
    const darkMode = computed(() => state.themeLayout.data);
    const topMenu = computed(() => state.themeLayout.topMenu);

    const dateFormat = (date, format) => {
      if(format){
          return moment.utc(date).format(format);
      }
      return moment.utc(date).format('DD MMMM YYYY');
    }

    const timeFormat = (date, format) => {
      if(format){
          return moment.utc(date).format(format);
      }
      return moment.utc(date).format('hh:mm');
    };
    
    const dateFullFormat = (date, format) => {
      if(format){
          return moment.utc(date).format(format);
      }
      return moment.utc(date).format('DD-MMM-YYYY hh:mm:ss A');
    };

    provide('dateFormat', dateFormat);
    provide('timeFormat', timeFormat);
    provide('dateFullFormat', dateFullFormat)

    return {
      theme,
      rtl,
      darkMode,
      topMenu,
      isLoading,
    };
  },
});
</script>

<style>
.mt-5{
  margin-top: 15px;
}
</style>
