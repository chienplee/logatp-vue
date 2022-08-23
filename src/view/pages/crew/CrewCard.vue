<template>
  <ContactCardWrapper>
    <router-link :to="{ name: 'crewDetails', params: { crewid: user.crewId } }">
      <div class="contact-card">
        <figure>
          <font-awesome-icon class="fa-5x" icon="fas fa-user-friends" />
          <figcaption>
            <h3>{{ user.firstName }} {{ user.lastName }}</h3>
            <span>{{ user.Position }}</span>
          </figcaption>
        </figure>
        <div class="user-info">
          <ul>
            <li>
              
            <font-awesome-icon icon="fa-solid fa-id-badge" />

              {{ user.EmployeeId }}
            </li>
            <li>
            <font-awesome-icon icon="fa-solid fa-id-card" />
              {{ user.LicenceNumber }}

            </li>
            <li>
              <sdFeatherIcons type="map-pin" size="16" />

              
              

              {{ cuntryName(user.Nationality) }}

            </li>
          </ul>
        </div>
      </div>
    </router-link>
  </ContactCardWrapper>
</template>
<script>
import { defineComponent, computed } from "vue";
import PropTypes from "vue-types";
import { ContactCardWrapper } from "../style";
import counties from "../../../helper/countryData.json";

const ContactCard = defineComponent({
  name: "ContactCard",
  components: { ContactCardWrapper },
  props: {
    user: PropTypes.object,
  },
  setup() {
    const cuntryName = computed(() => country => counties[country].name)
    return {
      cuntryName
    };
  },
});

export default ContactCard;
</script>
