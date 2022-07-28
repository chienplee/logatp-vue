<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :mode="mode"
    :theme="darkMode ? 'dark' : 'light'"
  >
    <a-menu-item key="Flights">
      <router-link to="/flights">
        <font-awesome-icon class="icon" :icon="['fas', 'plane-departure']" />
        <span> Flights </span>
      </router-link>
    </a-menu-item>

    <a-menu-item key="crews">
      <router-link :to="{name: 'crews'}">
        <font-awesome-icon icon="fas fa-user-friends" />
        <span> Crews </span>
      </router-link>
    </a-menu-item>

    <a-menu-item-group key="crud">
      <template v-slot:title>
        <p class="sidebar-nav-title"></p>
      </template>
    </a-menu-item-group>

    <a-menu-item key="addFlight">
      <router-link to="/add-flight">
        <font-awesome-icon icon="fas fa-plane" />
        <span> Add Flight </span>
      </router-link>
    </a-menu-item>

    <a-menu-item key="addCrew">
      <router-link to="/add-crew">
        <font-awesome-icon class="icon" icon="fas fa-user-tie" />
        <span> Add Crew </span>
      </router-link>
    </a-menu-item>
  </a-menu>
</template>
<script>
import {
  computed,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
  defineComponent,
} from "vue";
import VueTypes from "vue-types";
import { useStore } from "vuex";
// import { useRoute } from "vue-router";
import versions from "../demoData/changelog.json";

export default defineComponent({
  name: "AsideItems",
  props: {
    toggleCollapsed: VueTypes.func,
    events: VueTypes.object,
  },
  setup(props) {
    const store = useStore();
    const darkMode = computed(() => store.state.themeLayout.data);
    const mode = ref("inline");
    const { events } = toRefs(props);
    const {
      onRtlChange,
      onLtrChange,
      modeChangeDark,
      modeChangeLight,
      modeChangeTopNav,
      modeChangeSideNav,
    } = events.value;

    // const router = computed(() => useRoute());
    const state = reactive({
      selectedKeys: ["home"],
      openKeys: ["dashboard"],
      preOpenKeys: ["dashboard"],
    });

    watchEffect(() => {
      // if (router.value.matched.length) {
      //   if (router.value.matched.length > 2) {
      //     state.selectedKeys = [router.value.matched[2].name];
      //     state.openKeys = [router.value.matched[1].name];
      //     state.preOpenKeys = [router.value.matched[1].name];
      //   } else if (router.value.matched.length > 3) {
      //     state.selectedKeys = [router.value.matched[3].name];
      //     state.openKeys = [router.value.matched[1].name];
      //     state.preOpenKeys = [router.value.matched[1].name];
      //   } else {
      //     state.selectedKeys = [router.value.matched[1].name];
      //     state.openKeys = [router.value.matched[1].name];
      //     state.preOpenKeys = [router.value.matched[1].name];
      //   }
      // }
    });

    watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
      }
    );

    return {
      mode,
      ...toRefs(state),
      darkMode,
      onRtlChange,
      onLtrChange,
      modeChangeDark,
      modeChangeLight,
      modeChangeTopNav,
      modeChangeSideNav,
      versions,
    };
  },
});
</script>

<style scoped>
p.sidebar-nav-title {
  border-bottom: 1px solid gainsboro;
  margin: 12px !important;
}
</style>
