<template>
  <div class="notification">
    <sdPopover placement="bottomLeft" action="click">
      <template v-slot:content>
        <AtbdTopDropdwon class="atbd-top-dropdwon">
          <sdHeading as="h5" class="atbd-top-dropdwon__title">
            <span class="title-text">Notifications</span>
            <a-badge class="badge-success" count="3" />
          </sdHeading>
          <perfect-scrollbar
            :options="{
              wheelSpeed: 1,
              swipeEasing: true,
              suppressScrollX: true,
            }"
          >
            <ul class="atbd-top-dropdwon__nav notification-list">
              <li>
                <a to="#">
                  <div class="atbd-top-dropdwon__content notifications">
                    <div class="notification-icon bg-primary">
                      <sdFeatherIcons type="hard-drive" />
                    </div>
                    <div class="notification-content d-flex">
                      <div class="notification-text">
                        <sdHeading as="h5">
                          <span>James</span> sent you a message
                        </sdHeading>
                        <p>5 hours ago</p>
                      </div>
                      <div class="notification-status">
                        <a-badge dot />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a to="#">
                  <div class="atbd-top-dropdwon__content notifications">
                    <div class="notification-icon bg-secondary">
                      <sdFeatherIcons type="share-2" />
                    </div>
                    <div class="notification-content d-flex">
                      <div class="notification-text">
                        <sdHeading as="h5">
                          <span>James</span> sent you a message
                        </sdHeading>
                        <p>5 hours ago</p>
                      </div>

                      <div class="notification-status">
                        <a-badge dot />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a to="#">
                  <div class="atbd-top-dropdwon__content notifications">
                    <div class="notification-icon bg-secondary">
                      <sdFeatherIcons type="share-2" />
                    </div>
                    <div class="notification-content d-flex">
                      <div class="notification-text">
                        <sdHeading as="h5">
                          <span>James</span> sent you a message
                        </sdHeading>
                        <p>5 hours ago</p>
                      </div>

                      <div class="notification-status">
                        <a-badge dot />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a to="#">
                  <div class="atbd-top-dropdwon__content notifications">
                    <div class="notification-icon bg-secondary">
                      <sdFeatherIcons type="share-2" />
                    </div>
                    <div class="notification-content d-flex">
                      <div class="notification-text">
                        <sdHeading as="h5">
                          <span>James</span> sent you a message
                        </sdHeading>
                        <p>5 hours ago</p>
                      </div>

                      <div class="notification-status">
                        <a-badge dot />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a to="#">
                  <div class="atbd-top-dropdwon__content notifications">
                    <div class="notification-icon bg-secondary">
                      <sdFeatherIcons type="share-2" />
                    </div>
                    <div class="notification-content d-flex">
                      <div class="notification-text">
                        <sdHeading as="h5">
                          <span>James</span> sent you a message
                        </sdHeading>
                        <p>5 hours ago</p>
                      </div>

                      <div class="notification-status">
                        <a-badge dot />
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </perfect-scrollbar>
          <router-link class="btn-seeAll" to="#">
            See all incoming activity
          </router-link>
        </AtbdTopDropdwon>
      </template>
      <a-badge dot :offset="[-8, -5]">
        <a to="#" class="head-example">
          <sdFeatherIcons type="bell" size="20" />
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
  name: "Notification",
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
