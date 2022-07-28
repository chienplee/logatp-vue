<template>
  <div class="message">
    <sdPopover
      placement="bottomLeft"
      action="click"
      :class="rtl ? 'ant-popover-rtl' : ''"
    >
      <template v-slot:content>
        <AtbdTopDropdwon class="atbd-top-dropdwon">
          <sdHeading class="atbd-top-dropdwon__title" as="h5">
            <span class="title-text">Messages</span>
            <a-badge class="badge-success" count="3" />
          </sdHeading>
          <div class="atbd-top-dropdwon-menu">
            <perfect-scrollbar
              :options="{
                wheelSpeed: 1,
                swipeEasing: true,
                suppressScrollX: true,
              }"
            >
              <ul class="atbd-top-dropdwon__nav">
                <li>
                  <a to="#">
                    <figure class="atbd-top-dropdwon__content">
                      <img
                        :src="require('../../../static/img/avatar/NoPath.png')"
                        alt=""
                      />
                      <figcaption>
                        <sdHeading as="h5">
                          Software <span class="color-success">3 hrs ago </span>
                        </sdHeading>
                        <div>
                          <span class="atbd-top-dropdwonText"
                            >Lorem ipsum dolor amet cosec...</span
                          >
                          <span>
                            <a-badge class="badge-success" count="3" />
                          </span>
                        </div>
                      </figcaption>
                    </figure>
                  </a>
                </li>
                <li>
                  <a to="#">
                    <figure class="atbd-top-dropdwon__content">
                      <img
                        :src="require('../../../static/img/avatar/NoPath.png')"
                        alt=""
                      />
                      <figcaption>
                        <sdHeading as="h5">
                          Software <span class="color-success">3 hrs ago</span>
                        </sdHeading>
                        <div>
                          <span class="atbd-top-dropdwonText"
                            >Lorem ipsum dolor amet cosec...</span
                          >
                          <span>
                            <a-badge class="badge-success" count="3" />
                          </span>
                        </div>
                      </figcaption>
                    </figure>
                  </a>
                </li>
                <li>
                  <a to="#">
                    <figure class="atbd-top-dropdwon__content">
                      <img
                        :src="require('../../../static/img/avatar/NoPath.png')"
                        alt=""
                      />
                      <figcaption>
                        <sdHeading as="h5">
                          Software <span class="color-success">3 hrs ago</span>
                        </sdHeading>
                        <div>
                          <span class="atbd-top-dropdwonText"
                            >Lorem ipsum dolor amet cosec...</span
                          >
                          <span>
                            <a-badge class="badge-success" count="3" />
                          </span>
                        </div>
                      </figcaption>
                    </figure>
                  </a>
                </li>
                <li>
                  <a to="#">
                    <figure class="atbd-top-dropdwon__content">
                      <img
                        :src="require('../../../static/img/avatar/NoPath.png')"
                        alt=""
                      />
                      <figcaption>
                        <sdHeading as="h5">
                          Software <span class="color-success">3 hrs ago</span>
                        </sdHeading>
                        <div>
                          <span class="atbd-top-dropdwonText"
                            >Lorem ipsum dolor amet cosec...</span
                          >
                          <span>
                            <a-badge class="badge-success" count="3" />
                          </span>
                        </div>
                      </figcaption>
                    </figure>
                  </a>
                </li>
                <li>
                  <a to="#">
                    <figure class="atbd-top-dropdwon__content">
                      <img
                        :src="require('../../../static/img/avatar/NoPath.png')"
                        alt=""
                      />
                      <figcaption>
                        <sdHeading as="h5">
                          Software <span class="color-success">3 hrs ago</span>
                        </sdHeading>
                        <div>
                          <span class="atbd-top-dropdwonText"
                            >Lorem ipsum dolor amet cosec...</span
                          >
                          <span>
                            <a-badge class="badge-success" count="3" />
                          </span>
                        </div>
                      </figcaption>
                    </figure>
                  </a>
                </li>
                <ul />
              </ul>
            </perfect-scrollbar>
          </div>
          <router-link class="btn-seeAll" to="#">
            See all messages
          </router-link>
        </AtbdTopDropdwon>
      </template>
      <a-badge dot :offset="[-8, -5]">
        <a to="#" class="head-example">
          <sdFeatherIcons type="mail" size="20" />
        </a>
      </a-badge>
    </sdPopover>
  </div>
</template>

<script>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import { AtbdTopDropdwon } from "./auth-info-style";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessageBox",
  components: {
    AtbdTopDropdwon,
    PerfectScrollbar,
  },
});
</script>
<style scoped>
.ps {
  height: 200px;
}
</style>
