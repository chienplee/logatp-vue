<template>
  <sdPopover placement="bottomLeft" action="click">
    <template v-slot:content>
      <a to="#">
        <sdFeatherIcons type="printer" />
        <span>Printer</span>
      </a>
      <a to="#">
        <sdFeatherIcons type="book-open" />
        <span>PDF</span>
      </a>
      <a to="#">
        <sdFeatherIcons type="file-text" />
        <span>Google Sheets</span>
      </a>
      <a to="#">
        <sdFeatherIcons type="x" />
        <span>Excel (XLSX)</span>
      </a>
      <a to="#">
        <sdFeatherIcons type="file" />
        <span>CSV</span>
      </a>
    </template>
    <sdButton size="small" type="white">
      <sdFeatherIcons type="download" />
      <span>Export</span>
    </sdButton>
  </sdPopover>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ExportButton',
  components: {},
});
</script>
