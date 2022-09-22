<template>
  <Main>
    <a-form :model="formState">
    <a-spin :spinning="formState.loader" class size="large">
      
      <a-row :gutter="25">
        <a-col :xs="24">
          <sdCards
            title="PERSONAL INFORMATION"
            caption="The simplest use of Form"
          >
            <FormValidationWrap>
              <VerticalFormStyleWrap>
                <a-row :gutter="30">
                  <a-col :md="8" :xs="24">
                    <a-form-item label="First Name">
                      <a-input v-model:value="formState.fname" placeholder=""  />
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :xs="24">
                    <a-form-item label="Last Name">
                      <a-input v-model:value="formState.lname" placeholder="" />
                    </a-form-item>
                  </a-col>

                  <a-col :md="8" :xs="24">
                    <a-form-item label="Email">
                      <a-input v-model:value="formState.email" placeholder="" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </VerticalFormStyleWrap>
            </FormValidationWrap>
          </sdCards>
        </a-col>
        <a-col :xs="24">
          <sdCards title="AVITATION RELATED">
            <FormValidationWrap>
              <VerticalFormStyleWrap>
                <a-row :gutter="30">
                  <a-col :md="12" :xs="24">
                    <a-form-item label="Airline">
                      <!-- <a-select
                            v-model:value="formState.airlime"
                            
                          >
                            <a-select-option value="">
                              Select Airline
                            </a-select-option>
                            <a-select-option
                              v-for="pro in formState.airlines"
                              :key="pro"
                            >
                              {{ pro }}
                            </a-select-option>
                          </a-select>
                  </a-form-item> -->

                      <a-auto-complete
                        v-model:value="formState.value"
                        :data-source="formState.dataSource"
                        placeholder="Select Airline"
                        @select="onSelect"
                        :filter-option="filterOption"
                        @change="onChange"
                        allowClear="true"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :md="12" :xs="24">
                    <a-form-item label="Homebase">
                      <a-input
                        v-model:value="formState.homebase"
                        placeholder="Eg:LAX"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </VerticalFormStyleWrap>
            </FormValidationWrap>
          </sdCards>
        </a-col>

        <a-col :xs="24">
          <sdCards title="">
            <FormValidationWrap>
              <VerticalFormStyleWrap>
                <a-row :gutter="30">
                  <a-col :md="8" :xs="24">
                    <a-form-item>
                      <a-button @click="setUserDetails()" type="primary"
                        >Update Profile</a-button
                      >
                    </a-form-item>

                  </a-col>
                </a-row>
              </VerticalFormStyleWrap>
            </FormValidationWrap>
          </sdCards>
        </a-col>
      </a-row>
      </a-spin>
    </a-form>
  </Main>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import { Main } from "../../styled";
import { FormValidationWrap, VerticalFormStyleWrap } from "./Style";
import user from "../../../server/user.js";
import airlines from "../../../server/airlines";
export default defineComponent({
  components: {
    Main,
    FormValidationWrap,
    VerticalFormStyleWrap,
  },
  setup() {
    onMounted(async () => {
    
   
  await airlines.getAirlines().then(e=>{
    console.log(e)
    for(var i in e){
      formState.dataSource.push(e[i].airlinename)
    }
  })

  formState.loader=false


 

      const user1 = await user.getCurrentUser();
      var fname = user1.get("firstName");
      var lname = user1.get("lastName");
      var email = user1.get("username");
      var airline = user1.get("Airline");
      var base = user1.get("base");


      formState.fname = fname;
      formState.lname = lname;
      formState.email = email;
      formState.value = airline;
      formState.homebase = base
      console.log("nameee", fname);
      console.log("nameee", lname);
    });
    const formState = reactive({
      layout: "horizontal",
      fname: "",
      lname: "",
      email: "",
      homebase: "",
      airline: "",
      airlines: ["", "", ""],
      dataSource: [],
      value: "",
      search: "",
      loader:true
      
    });

    const setUserDetails = async () => {
      formState.loader=true
   
      const user1 = await user.getCurrentUser();
      await user1.set("firstName", formState.fname);
      await user1.set("lastName", formState.lname);
      await user1.set("username", formState.email);
      await user1.set("Airline", formState.value);
      await user1.set("base", formState.homebase);



      await user1.save().then(() => {
        console.log("updated");
      });
      formState.loader=false

    };
    const onSelect = (e) => {
      formState.value = e;
    };
    // const onSearch =  computed(()=>{
    //   return formState.dataSource.filter((data) =>{
    //     return data.toLowerCase().includes(formState.search.toLowerCase())
    //   })
    // })
    const onSearch = (searchText) => {
      // searchText = formState.search
      formState.dataSource = formState.dataSource.filter((d) =>
        d.includes(searchText)
      );
    };

    const onChange = (value) => {
      console.log("onChange", value);
    };
    const filterOption = (input, option) => {
      return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
    };

    return {
      formState,
      setUserDetails,
      onSelect,
      onSearch,
      onChange,
      filterOption,
    };
  },
});
</script>
