<template>
    <CardToolbox>
      <ContactPageheaderStyle>
        <sdPageHeader title="Flights">
          <template #subTitle>
            <a-input v-model:value="searchValue" @change="handleSearch" placeholder="Search by Name">
              <template #suffix>
                <sdFeatherIcons type="search" size="16" />
              </template>
            </a-input>
          </template>
        </sdPageHeader>
      </ContactPageheaderStyle>
    </CardToolbox>
    <Main>
    <a-row :gutter="25">
      <a-col v-for="user in pageSettings.users" :key="user.id" :lg="6" :md="8" :sm="12" :xs="24">
        <sdCards headless>
          <FlightCard :user="user" />
        </sdCards>
      </a-col>
    </a-row>
    </Main>
</template>
<script>
import { defineComponent, reactive } from 'vue'
import { Main, CardToolbox  } from "../../styled";
import { ContactPageheaderStyle } from "../style"
import FlightCard from './FlightCard.vue'
export default defineComponent({
    components:{
        FlightCard,
        Main,
        CardToolbox,
        ContactPageheaderStyle
    },
    setup() {
        const pageSettings = reactive({
            loader : false,
            users: [
                {
                  "id": 1,
                  "time": 1587041636455,
                  "name": "Duran Clayton",
                  "designation": "UI/UX Designer",
                  "stared": false,
                  "phone": "+90014525",
                  "company": "Business Development",
                  "email": "john@gmail.com",
                  "img": "static/img/users/1.png",
                  "joining": "11 Jun 2020"
                },
                {
                  "id": 2,
                  "time": 1587041711525,
                  "name": "David Milar",
                  "designation": "UI/UX Designer",
                  "stared": true,
                  "phone": "+90014525",
                  "company": "Business Development",
                  "email": "john@gmail.com",
                  "img": "static/img/users/2.png",
                  "joining": "31 May 2021"
                }]
        })

        return {
            pageSettings,
        }
    },
})
</script>
<style scoped>
.flights{
    background: #dbdbd9;
    padding:1%
}
.search-box{
    background: #dbdbd9;
    min-height: 45px;

}
</style>