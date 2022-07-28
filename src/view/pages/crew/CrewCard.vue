<template>
  <ContactCardWrapper>
    <div class="contact-card">
      <figure>
          <font-awesome-icon class="fa-5x" icon="fas fa-user-friends" />
        <figcaption>
          <h3>{{ user.name }}</h3>
          <span>{{ user.designation }}</span>
        </figcaption>
      </figure>
      <div class="user-info">
        <ul>
          <li>
            <sdFeatherIcons type="phone" size="16" />
            {{ user.phone }}
          </li>
          <li>
            <sdFeatherIcons type="mail" size="16" />
            {{ user.email }}
          </li>
          <li>
            <sdFeatherIcons type="map-pin" size="16" />
            {{ user.company }}
          </li>
        </ul>
      </div>
    </div>
  </ContactCardWrapper>
</template>
<script>
import { defineComponent } from 'vue';
import PropTypes from 'vue-types';
import { ContactCardWrapper } from '../style';

const ContactCard = defineComponent({
  name: 'ContactCard',
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
