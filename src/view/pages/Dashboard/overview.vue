
<template>
  <ContactCardWrapper>
      <div class="contact-card">
        <figure>
          <font-awesome-icon class="fa-2x round" :icon="user.icon" />
          <figcaption>
            <h3>{{user.data}} </h3>
            <span>{{user.title}}</span>
          </figcaption>
        </figure>
    
      </div>

  </ContactCardWrapper>
</template>
<script>
import { defineComponent } from "vue";
import PropTypes from "vue-types";
import { ContactCardWrapper } from "../style";

const ContactCard = defineComponent({
  name: "ContactCard",
  components: { ContactCardWrapper },
  props: {
    user: PropTypes.object,
  },
  setup() {
    return {
      // users,
    };
  },
});

export default ContactCard;
</script>
<style scoped>
svg.round {
    border: 1px solid;
    padding: 18px;
    border-radius: 50%;
    width: 34px;
    height: 34px;
}
</style>
