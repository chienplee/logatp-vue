<template>
  <div>
    <sdPageHeader title="Input">
      <template v-slot:buttons>
        <div class="page-header-actions">
          <sdCalendarButton />
          <sdExportButton />
          <sdShareButton />
          <sdButton size="small" type="primary">
            <sdFeatherIcons type="plus" size="14" />
            Add New
          </sdButton>
        </div>
      </template>
    </sdPageHeader>
    <Main>
      <a-row :gutter="25">
        <a-col :md="12" :xs="24">
          <sdCards title="Basic">
            <a-input placeholder="Basic usage" />
          </sdCards>
          <sdCards title="Textarea">
            <a-textarea :rows="4" />
          </sdCards>
        </a-col>
        <a-col :md="12" :xs="24">
          <sdCards title="Three sizes of Input">
            <a-input size="large" placeholder="Large size">
              <template v-slot:prefix>
                <sdFeatherIcons type="user" />
              </template>
              /></a-input
            >
            <br />
            <br />
            <a-input placeholder="default size">
              <template v-slot:prefix>
                <sdFeatherIcons type="user" />
              </template>
              /></a-input
            >
            <br />
            <br />
            <a-input size="small" placeholder="small size">
              <template v-slot:prefix>
                <sdFeatherIcons type="user" />
              </template>
              />
            </a-input>
          </sdCards>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script>
import { Main } from '../styled';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
  components: {
    Main,
  },
  data() {
    return {};
  },
  methods: {
    handleButtonClick() {
      // this.$message.info("Click on left button.");
    },
  },
});
</script>
