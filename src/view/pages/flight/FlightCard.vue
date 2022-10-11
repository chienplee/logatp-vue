<template>
  <ContactCardWrapper>
    <div class="contact-card">
      <router-link :to="{name: 'flightinfo', params: {flightId: flight.id}}">
      <figure>
          <font-awesome-icon class="icon fa-5x " :icon="['fas', 'plane-departure']" />
        <figcaption>
          <h3>{{ flight.departure }} - {{ flight.destination }}</h3>
          <span v-if="flight.proFlight"><font-awesome-icon icon="fa-solid fa-circle-check" /></span>
        </figcaption>
      </figure>
      <div class="user-info">
        <ul>
          <li>
            <font-awesome-icon icon="fas fa-clock" />
            {{ timeFormat(flight.blockTime) }}
          </li>
          <li>
            <font-awesome-icon icon="fas fa-calendar-alt" />
            {{ dateFormat(flight.flightDate) }}
          </li>
          <li>
            <font-awesome-icon icon="fas fa-plane" />
            {{ flight.flightNumber }}
          </li>
        </ul>
      </div>
      </router-link>
    </div>
  </ContactCardWrapper>
</template>
<script>
import { defineComponent, inject } from 'vue';
import PropTypes from 'vue-types';
import { ContactCardWrapper } from '../style';

const ContactCard = defineComponent({
  name: 'ContactCard',
  components: { ContactCardWrapper },
  props: {
    flight: PropTypes.object,
  },
  setup() {
    const dateFormat = inject('dateFormat');
    const timeFormat = inject('timeFormat');
    return {
      dateFormat,
      timeFormat
    };
  },
});

export default ContactCard;
</script>
