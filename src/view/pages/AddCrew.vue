<template>
  <!-- <div class="spin" v-if="formState.loader">
    <a-spin size="large" />
  </div> -->
  <div>
    <a-spin :spinning="formState.loader" class="" size="large">
      <sdPageHeader title="Add Crew">
        <template v-slot:buttons>
          <!-- <div class="page-header-actions">
          <sdCalendarButton />
          <sdExportButton />
          <sdShareButton />
          <sdButton size="small" type="primary">
            <sdFeatherIcons type="plus" size="14" />
            Add New
          </sdButton>
        </div> -->
        </template>
      </sdPageHeader>
      <Main>
        <a-form
          :model="formState"
          name="basic"
          :rules="rules"
          autocomplete="off"
          @finish="addCrewData()"
          @finishFailed="onFinishFailed"
        >
          <a-row :gutter="25">
            <a-col :xs="24">
              <sdCards title="Basic" caption="The simplest use of Form">
                <FormValidationWrap>
                  <VerticalFormStyleWrap>
                    <a-row :gutter="30">
                      <a-col :md="8" :xs="24">
                        <a-form-item
                          ref="firstName"
                          name="firstName"
                          label="First Name"
                        >
                          <a-input
                            v-model:value="formState.firstName"
                            placeholder="Eg. Doe"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :md="8" :xs="24">
                        <a-form-item
                          ref="lastName"
                          name="lastName"
                          label="Last Name"
                        >
                          <a-input
                            v-model:value="formState.lastName"
                            placeholder="Eg. Doe"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :md="8" :xs="24">
                        <a-form-item
                          ref="Select Captain"
                          label="Position"
                          name="Select Captain"
                        >
                          <a-select
                            v-model:value="formState.Position"
                            style="width: 270px"
                          >
                            <a-select-option value="">
                              Select Captain
                            </a-select-option>
                            <a-select-option
                              v-for="pro in formState.Positions"
                              :key="pro"
                            >
                              {{ pro }}
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </VerticalFormStyleWrap>
                </FormValidationWrap>
              </sdCards>
            </a-col>

            <a-col :xs="24">
              <sdCards title="Extra">
                <FormValidationWrap>
                  <VerticalFormStyleWrap>
                    <a-row :gutter="30">
                      <a-col :md="8" :xs="24">
                        <a-form-item
                          ref="EmployeeId"
                          label="EmployeeId"
                          name="EmployeeId"
                        >
                          <a-input
                            v-model:value="formState.EmployeeId"
                            placeholder=""
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :md="8" :xs="24">
                        <a-form-item
                          ref="LicenceNumber"
                          name="LicenceNumber"
                          label="Licence Number"
                        >
                          <a-input
                            v-model:value="formState.LicenceNumber"
                            placeholder=""
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :md="8" :xs="24">
                        <a-form-item
                          ref="Nationality"
                          name="Nationality"
                          label="Nationality"
                          ><a-select
                            v-model:value="formState.Nationality"
                            style="width: 280px"
                            placeholder="Please select a country"
                          >
                            <a-select-option value="">
                              Select Nationality
                            </a-select-option>
                            <a-select-option
                              v-for="key in data1"
                              :key="key"
                              :value="key"
                            >
                              {{ countriesData[key]["emoji"] }}
                              &nbsp;&nbsp;
                              {{ countriesData[key]["name"] }}
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </VerticalFormStyleWrap>
                </FormValidationWrap>
              </sdCards>
            </a-col>

            <a-col :xs="24">
              <sdCards title="Notes">
                <a-col :md="8" :xs="24">
                  <a-form-item ref="Note" name="Note" label="Note">
                    <a-textarea
                      v-model:value="formState.Note"
                      placeholder="You can write something here..."
                      :rows="4"
                    />
                  </a-form-item>
                </a-col>
              </sdCards>
            </a-col>
            <a-col :xs="24">
              <sdCards>
                <a-form-item :wrapper-col="{ offset: 23 }">
                  <sdButton type="primary" html-type="submit"
                    >Add Crew</sdButton
                  >
                </a-form-item>
              </sdCards>
            </a-col>
          </a-row>
        </a-form>
      </Main>
    </a-spin>
  </div>
</template>

<script>
import {
  FormValidationWrap,
  VerticalFormStyleWrap,
} from "../forms/overview/Style";
import { Main } from "../styled";
import Parse from "parse";
import countriesData from "../../helper/countryData.json";
import { onMounted } from "vue";

import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Form",
  components: {
    Main,
    FormValidationWrap,
    VerticalFormStyleWrap,
  },
  setup() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const AddCrew = Parse.Object.extend("Crew");
    const addCrew = new AddCrew();
    const addCrewData = async () => {
      formState.loader = true;
      const currentUser = Parse.User.current();
      const getAdmin = Parse.Object.extend("User");
      const adminquery = new Parse.Query(getAdmin);
      adminquery.equalTo("email", "admin@logatp.com");
      const object = await adminquery.first();
      const acl = new Parse.ACL(Parse.User.current());
      acl.setWriteAccess(object.id, true);
      acl.setReadAccess(object.id, true);
      if (currentUser) {
        addCrew.set({
          firstName: formState.firstName,
          lastName: formState.lastName,
          Position: formState.Position,
          EmployeeId: formState.EmployeeId,
          Nationality: formState.Nationality,
          LicenceNumber: formState.LicenceNumber,
          Note: formState.Note,
          realmId: makeid(10),
        });
        await addCrew.setACL(acl);
        addCrew.save().then(
          (crew) => {
            (formState.firstName = ""),
              (formState.lastName = ""),
              (formState.Position = ""),
              (formState.EmployeeId = ""),
              (formState.Nationality = ""),
              (formState.LicenceNumber = ""),
              (formState.Note = ""),
              (formState.realmId = makeid(10)),
              console.log(crew);
            formState.loader = false;
          },
          (error) => {
            console.log(error);
            formState.loader = false;
          }
        );
      }
    };
    const data1 = Object.keys(countriesData);

    const makeid = (length) => {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return (formState.realmId = result);
    };

    onMounted(() => {
      var query = new Parse.Query("Crew");
      //  const query = new Parse.Query(AddCrew);
      // query.limit(1);
      const data = query.find();
      console.log(
        data.then((e) => {
          console.log(e);
        })
      );
    });

    const handleButtonClick = (e) => {
      console.log(e);
    };

    const formState = reactive({
      layout: "vertical",
      firstName: "",
      lastName: "",
      Positions: ["Captain", "Captain", "Captain"],
      Position: "",
      Note: "",
      EmployeeId: "",
      Nationality: "",
      LicenceNumber: "",
      realmId: "",
      loader: false,
    });

    const rules = {
      firstName: [
        {
          required: true,
          message: "Please input First name",
          trigger: "blur",
        },
      ],
      lastName: [
        {
          required: true,
          message: "Please input Last name",
          trigger: "blur",
        },
      ],

      EmployeeId: [
        {
          required: true,
          message: "Please Input EmployeeId",
          trigger: "blur",
        },
      ],
      LicenceNumber: [
        {
          required: true,
          message: "Please Inut LicenceNumber",
          trigger: "blur",
        },
      ],

      Note: [
        {
          required: true,
          message: "Please Input Note",
          trigger: "blur",
        },
      ],
      Nationality: [
        {
          required: true,
          message: "Please Select Nationality",
          trigger: "blur",
        },
      ],
      Position: [
        {
          required: true,
          message: "Please Select Postion",
          trigger: "blur",
        },
      ],
    };

    const onSubmit = () => {
      console.log("hello");
    };

    return {
      formState,
      rules,
      onSubmit,
      handleButtonClick,
      addCrewData,
      onFinish,
      onFinishFailed,
      data1,
      countriesData,
    };
  },
});
</script>
