<template>
  <Main>
    <a-form :model="formState">
      <a-row :gutter="25">
        <a-col :xs="24">
          <sdCards
            title="DUPLICATED FLIGHTS FOUND"
            caption="The simplest use of Form"
          >
            <a-row :gutter="30">
              <a-col :md="8" :xs="24">
                <span>
                  <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-hard-drive"
                  />
                  Local
                </span>
                {{ o }}
              </a-col>

              <a-col :md="8" :xs="24">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-cloud" />
                  Update Database
                </span>
                {{ 0 }}
              </a-col>
            </a-row>
          </sdCards>
        </a-col>
        <a-col :xs="24">
          <sdCards title="DUPLICATED CREW FOUND">
            <a-row :gutter="30">
              <a-col :md="8" :xs="24">
                <span>
                  <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-hard-drive"
                  />
                  Local
                </span>
                {{ o }}
              </a-col>

              <a-col :md="8" :xs="24">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-cloud" />
                  Update Database
                </span>
                {{ 0 }}
              </a-col>
            </a-row>
          </sdCards>
        </a-col>

        <a-col :xs="24">
          <sdCards title="DUPLICATED AIRPLANES FOUND">
            <a-row :gutter="30">
              <a-col :md="8" :xs="24">
                <span>
                  <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-hard-drive"
                  />
                  Local
                </span>
                {{ o }}
              </a-col>

              <a-col :md="8" :xs="24">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-cloud" />
                  Update Database
                </span>
                {{ 0 }}
              </a-col>
            </a-row>
          </sdCards>
        </a-col>
        <a-col :xs="24">
          <sdCards title="DUPLICATED EXPERIENCES FOUND">
            <a-row :gutter="30">
              <a-col :md="8" :xs="24">
                <span>
                  <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-hard-drive"
                  />
                  Local
                </span>
                {{ o }}
              </a-col>

              <a-col :md="8" :xs="24">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-cloud" />
                  Update Database
                </span>
                {{ 0 }}
              </a-col>
            </a-row>
          </sdCards>
        </a-col>
      </a-row>
    </a-form>
  </Main>
</template>

<script>
import { defineComponent, reactive, onMounted } from "vue";
import { Main } from "../../styled";
// import { FormValidationWrap, VerticalFormStyleWrap } from "./Style";
import user from "../../../server/user.js";
export default defineComponent({
  components: {
    Main,
  },
  setup() {
    const formState = reactive({
      layout: "horizontal",
      fname: "",
      lname: "",
      email: "",
      homebase: "",
      airline: "",
      airlines: ["", "", ""],
      dataSource: ["apple", "orange", "grape"],
      value: "",
      search: "",
    });

    const setUserDetails = async () => {
      const user1 = await user.getCurrentUser();
      await user1.set("firstName", formState.fname);
      await user1.set("lastName", formState.lname);
      await user1.set("username", formState.email);

      await user1.save().then(() => {
        console.log("updated");
      });
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
    onMounted(async () => {
      const user1 = await user.getCurrentUser();
      var fname = user1.get("firstName");
      var lname = user1.get("lastName");
      var email = user1.get("username");

      formState.fname = fname;
      formState.lname = lname;
      formState.email = email;
      console.log("nameee", fname);
      console.log("nameee", lname);
    });
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
