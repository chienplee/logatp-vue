<template>
  <div class="settings">
    <sdPopover placement="bottomRight" action="click">
      <template v-slot:content>
        <SettingDropdwon>
          <div class="setting-dropdwon">
            <a-row :gutter="10" :class="rtl ? 'ant-row-rtl' : ''">
              <a-col :sm="12">
                <figure class="setting-dropdwon__single d-flex">
                  <img
                    :src="require('../../../static/img/icon/014-document.png')"
                    alt=""
                  />
                  <figcaption>
                    <sdHeading as="h5">All Features</sdHeading>
                    <p>Introducing Increment subscriptions</p>
                  </figcaption>
                </figure>
              </a-col>
              <a-col :sm="12">
                <figure class="setting-dropdwon__single d-flex">
                  <img
                    :src="
                      require('../../../static/img/icon/015-color-palette.png')
                    "
                    alt=""
                  />
                  <figcaption>
                    <sdHeading as="h5">Themes</sdHeading>
                    <p>Third party themes that are compatible</p>
                  </figcaption>
                </figure>
              </a-col>
              <a-col :sm="12">
                <figure class="setting-dropdwon__single d-flex">
                  <img
                    :src="require('../../../static/img/icon/010-home.png')"
                    alt=""
                  />
                  <figcaption>
                    <sdHeading as="h5">Payments</sdHeading>
                    <p>We handle billions of dollars</p>
                  </figcaption>
                </figure>
              </a-col>
              <a-col :sm="12">
                <figure class="setting-dropdwon__single d-flex">
                  <img
                    :src="
                      require('../../../static/img/icon/017-video-camera.png')
                    "
                    alt=""
                  />
                  <figcaption>
                    <sdHeading as="h5">Design Mockups</sdHeading>
                    <p>Share planning visuals with clients</p>
                  </figcaption>
                </figure>
              </a-col>
              <a-col :sm="12">
                <figure class="setting-dropdwon__single d-flex">
                  <img
                    :src="
                      require('../../../static/img/icon/013-document-1.png')
                    "
                    alt=""
                  />
                  <figcaption>
                    <sdHeading as="h5">Content Planner</sdHeading>
                    <p>Centralize content gathering and editing</p>
                  </figcaption>
                </figure>
              </a-col>
              <a-col :sm="12">
                <figure class="setting-dropdwon__single d-flex">
                  <img
                    :src="
                      require('../../../static/img/icon/007-microphone-1.png')
                    "
                    alt=""
                  />
                  <figcaption>
                    <sdHeading as="h5">Diagram Maker</sdHeading>
                    <p>Plan user flows & test scenarios</p>
                  </figcaption>
                </figure>
              </a-col>
            </a-row>
          </div>
        </SettingDropdwon>
      </template>
      <a to="#" class="head-example">
        <sdFeatherIcons type="settings" size="20" />
      </a>
    </sdPopover>
  </div>
</template>

<script>
import { SettingDropdwon } from "./auth-info-style";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Settings",
  components: {
    SettingDropdwon,
  },
  setup() {
    const { state } = useStore();
    const rtl = computed(() => state.themeLayout.rtlData);

    return {
      rtl,
    };
  },
});
</script>
