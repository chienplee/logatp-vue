<template>
  <div>
    <Modal
      :visible="visible"
      title="Crew List"
      @cancel="handleCancel()"
      type="primary"
    >
      <sdCards>
        <sdButton size="small" type="primary" block>
          <router-link to="add-crew">Add Crew</router-link>
        </sdButton>
        <a-col>
          <a-input placeholder="Search by Crew Name">
            <template #suffix>
              <sdFeatherIcons type="search" size="16" />
            </template>
          </a-input>
        </a-col>
      </sdCards>

      <sdCards>
        <sdFeatherIcons type="user" size="14" />
        <sdButton type="primary" size="small"></sdButton>
        Clear
      </sdCards>

      <a-row :gutter="15">
        <a-col :xs="24">
          <sdCards headless size="default">
            <GridStyleOffset>
              <a-row>
                <a-col :span="12">
                  <sdButton size="large" type="primary">
                    <sdFeatherIcons type="layers" size="14" />
                    <span>Self</span>
                  </sdButton>
                </a-col>
              </a-row>
            </GridStyleOffset>
          </sdCards>
        </a-col>
      </a-row>
      <div v-for="crew in CrewMembers.crews" :key="crew.name">
        <Crew>
          {{ crew.name }}
        </Crew>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "../components/modals/Modals.vue";
import Crew from "../customComponents/Crew.vue";
import { defineComponent } from "vue";
import VueTypes from "vue-types";

export default defineComponent({
  name: "CrewModel",
  components: {
    Modal,
    Crew,
  },
  props: {
    onCancel: VueTypes.func,
    onOk: VueTypes.func,
    visible: VueTypes.bool.def(false),
    confirmLoading: VueTypes.bool.def(false),
    title: VueTypes.string,
    class: VueTypes.string.def("atbd-modal"),
    type: VueTypes.oneOf([
      "primary",
      "secondary",
      "success",
      "error",
      "danger",
      "info",
      "white",
      "warning",
    ]).def("white"),
    footer: VueTypes.oneOf([null]),
    width: VueTypes.number.def(620),
    color: VueTypes.oneOfType([VueTypes.bool, VueTypes.string]).def(false),
  },
});
</script>
