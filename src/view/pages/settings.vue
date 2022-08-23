<template>
  <Main>
    <sdCards title="APP RELATED">
      <a-tabs v-model:activeKey="activeKey1">
        <a-tab-pane key="1" type="card">
          <template #tab>
            <span>
              <font-awesome-icon
                class="icon"
                icon="fa-solid fa-circle-user"
              />Profile
            </span>
          </template>
          <Profile />
        </a-tab-pane>
        <a-tab-pane key="2" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-gear" />
              General
            </span>
          </template>
          <General />
        </a-tab-pane>
        <a-tab-pane key="3" type="card">
          <template #tab>
            <span>
              <font-awesome-icon
                class="icon"
                icon="fa-solid fa-file-arrow-up"
              />
              Export
            </span>
          </template>
          <Export />
        </a-tab-pane>
      </a-tabs>
    </sdCards>
    <sdCards title="DATABASE">
      <a-tabs v-model:activeKey="activeKey2">
        <a-tab-pane key="1" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-cloud" />Update
              Database
            </span>
          </template>
          <p>Database page</p>
        </a-tab-pane>
        <a-tab-pane key="2" type="card">
          <template #tab>
            <span>
              <font-awesome-icon
                class="icon"
                icon="fa-solid fa-circle-user"
              />Remove Duplicates
            </span>
          </template>
          <Duplicate />
        </a-tab-pane>
      </a-tabs>
    </sdCards>
    <sdCards>
      <a-tabs v-model:activeKey="activeKey3">
        <a-tab-pane key="1" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-star" />Upgrade
              to Log ATP PRO
            </span>
          </template>
          <p>Profile Page</p>
        </a-tab-pane>
        <a-tab-pane key="2" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-lock" />
              Privacy Policy
            </span>
          </template>
          <a
            href="https://logatp.com/privacy.html"
            target="_blank"
            >Click to read Privacy Policy</a
          >
        </a-tab-pane>
        <a-tab-pane key="3" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-file-lines" />
              Terms of Use
            </span>
          </template>
          <a
            href="https://logatp.com/terms.html"
            target="_blank"
            >Click to read Terms & Conditions</a
          >
        </a-tab-pane>
        
        <a-tab-pane key="4" type="card">
          <template #tab>
            <span>
              <font-awesome-icon
                class="icon round"
                icon="fa-solid fa-circle-info"
              />
              About
            </span>
            
          </template>
         <About />
        </a-tab-pane>
      </a-tabs>
    </sdCards>
  </Main>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Main } from "../styled";
import Profile from "./settings/profile.vue";
import General from "./settings/general.vue";
import Export from "./settings/export.vue";
import About from "./settings/About.vue"
import Duplicate from "./settings/Duplicate.vue"

export default defineComponent({
  components: {
    Main,
    Profile,
    General,
    Export,
    About,
    Duplicate
  },
  setup() {
    return {
      activeKey1: ref("1"),
      activeKey2: ref("1"),
      activeKey3: ref("1"),
    };
  },
});
</script>
