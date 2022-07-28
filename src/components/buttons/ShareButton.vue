<template>
  <sdPopover placement="bottomLeft" action="click">
    <template v-slot:content>
      <a to="#">
        <sdFeatherIcons type="facebook" />
        <span>Facebook</span>
      </a>
      <a to="#">
        <sdFeatherIcons type="twitter" />
        <span>Twitter</span>
      </a>
      <a to="#">
        <sdFeatherIcons type="rss" />
        <span>Feed</span>
      </a>
      <a to="#">
        <sdFeatherIcons type="linkedin" />
        <span>Linkedin</span>
      </a>
      <a to="#">
        <sdFeatherIcons type="instagram" />
        <span>Instagram</span>
      </a>
    </template>
    <sdButton size="small" type="white">
      <sdFeatherIcons type="share-2" size="14" />
      <span>Share</span>
    </sdButton>
  </sdPopover>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ShareButton',
  components: {},
});
</script>
