<template>
  <div>
    <Main>
     

    <a-spin :spinning="formState.loader" class size="large">

      <a-form :model="formState">
        <a-row :gutter="25">
          <a-col :xs="24">
            <sdCards title="GENERAL" caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="12" :xs="24">
                      <a-form-item label="See all future flights as PIC flights">
                        <a-switch v-model:checked="formState.picFlghts"  />
                      </a-form-item>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item label="Include experience hours in Grand Total Hours">
                        <a-switch v-model:checked="formState.experienceHours" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>
          <a-col :xs="24">
            <sdCards title="CIRCULAR VIEWS">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="8">
                      <a-form-item label="1.Total Days">
                        <a-input v-model:value="formState.totaldays1" placeholder />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="8">
                      <a-form-item label="1.Total Hours">
                        <a-input v-model:value="formState.totalHours1" placeholder />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="8">
                      <a-form-item label="2.Total Days">
                        <a-input v-model:value="formState.totaldays2" placeholder />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="8">
                      <a-form-item label="2.Total Hours">
                        <a-input v-model:value="formState.totalHours2" placeholder />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="8">
                      <a-form-item label="3.Total Days">
                        <a-input v-model:value="formState.totaldays3" placeholder />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="8">
                      <a-form-item label="3.Total Hours">
                        <a-input v-model:value="formState.totalHours3" placeholder />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="8">
                      <a-form-item label="4.Total Days">
                        <a-input v-model:value="formState.totaldays4" placeholder />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="8">
                      <a-form-item label="4.Total Hours">
                        <a-input v-model:value="formState.totalHours4" placeholder />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="8">
                      <a-form-item label="5.Total Days">
                        <a-input v-model:value="formState.totaldays5" placeholder />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="8">
                      <a-form-item label="5.Total Hours">
                        <a-input v-model:value="formState.totalHours5" placeholder />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="8">
                      <a-form-item label="6.Total Days">
                        <a-input v-model:value="formState.totaldays6" placeholder />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="8">
                      <a-form-item label="6.Total Hours">
                        <a-input v-model:value="formState.totalHours6" placeholder />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>

          <a-col :xs="24">
            <sdCards title>
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="24">
                      <a-form-item>
                        <a-button @click="save()" type="primary">Save</a-button>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>
        </a-row>
      </a-form>
      </a-spin>
    </Main>
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted } from "vue";
import { Main } from "../../styled";
import { FormValidationWrap, VerticalFormStyleWrap } from "./Style";
import circularview from "../../../server/circularview";
import Parse from "parse";
import { message } from "ant-design-vue";


export default defineComponent({
  components: {
    Main,
    FormValidationWrap,
    VerticalFormStyleWrap
  },
  setup() {
    const formState = reactive({
      picFlghts: false,
      experienceHours: false,
      totaldays1: 7,
      totaldays2: 30,
      totaldays3: 90,
      totaldays4: 183,
      totaldays5: 365,
      totaldays6: 0,
      totalHours1: 32,
      totalHours2: 120,
      totalHours3: 300,
      totalHours4: 600,
      totalHours5: 1000,
      totalHours6: 0,
      loader:true
    });
    const save = async () => {
  formState.loader=true

      var query = new Parse.Query("circularviews");
      const data = await query.first();
      console.log(data);
      if (!data) {
        const circularviews = Parse.Object.extend("circularviews");
        const circularView = new circularviews();
        const currentUser = Parse.User.current();
        const getAdmin = Parse.Object.extend("User");
        const adminquery = new Parse.Query(getAdmin);
        adminquery.equalTo("email", "admin@logatp.com");
        const object = await adminquery.first();
        const acl = new Parse.ACL(Parse.User.current());
        acl.setWriteAccess(object.id, true);
        acl.setReadAccess(object.id, true);

        if (currentUser) {
          circularView.set({
            totaldays1: parseInt(formState.totaldays1),
            totaldays2: parseInt(formState.totaldays2),
            totaldays3: parseInt(formState.totaldays3),
            totaldays4: parseInt(formState.totaldays4),
            totaldays5: parseInt(formState.totaldays5),
            totaldays6: parseInt(formState.totaldays6),
            totalHours1:parseInt(formState.totalHours1),
            totalHours2: parseInt(formState.totalHours2),
            totalHours3: parseInt(formState.totalHours3),
            totalHours4: parseInt(formState.totalHours4),
            totalHours5: parseInt(formState.totalHours5),
            totalHours6: parseInt(formState.totalHours6),
            setPicFlight:formState.picFlghts,
            experienceHours:formState.experienceHours
          });
        }
        await circularView.setACL(acl);
        circularView.save().then((res) => {
          console.log(res)
                 message.success(" Success");

          console.log("Added");
        

        });
      } else {
        data.set("totaldays1", parseInt(formState.totaldays1));
        data.set("totaldays2", parseInt(formState.totaldays2));
        data.set("totaldays3", parseInt(formState.totaldays3));
        data.set("totaldays4", parseInt(formState.totaldays4));
        data.set("totaldays5", parseInt(formState.totaldays5));
        data.set("totaldays6", parseInt(formState.totaldays6));
        data.set("totalHours1", parseInt(formState.totalHours1));
        data.set("totalHours2", parseInt(formState.totalHours2));
        data.set("totalHours3", parseInt(formState.totalHours3));
        data.set("totalHours4",parseInt( formState.totalHours4));
        data.set("totalHours5", parseInt(formState.totalHours5));
        data.set("totalHours6", parseInt(formState.totalHours6));
        data.set("setPicFlight",formState.picFlghts)
        data.set("experienceHours",formState.experienceHours)

        await data.save().then(() => {
          console.log("success");
        }).catch((err)=>{console.log(err)
        console.log(typeof(formState.totaldays1))
        })
      }

  formState.loader=false


    };
    const setPicFlight = async()=>{
      // formState.experienceHours = !formState.experienceHours

      // console.log(formState.experienceHours)
      // var query = new Parse.Query("circularviews");
      // const data = await query.first();
      // console.log(data);

    }
    onMounted(async() => {
    await circularview.getCircularViews().then((results)=>{
    console.log(results)
    formState.totaldays1 =results.totaldays1
    formState.totaldays2 =results.totaldays2
    formState.totaldays3 =results.totaldays3
    formState.totaldays4 =results.totaldays4
    formState.totaldays5 =results.totaldays5
    formState.totaldays6 =results.totaldays6
    formState.totalHours1 =results.totalHours1
    formState.totalHours2 =results.totalHours2
    formState.totalHours3 =results.totalHours3
    formState.totalHours4 =results.totalHours4
    formState.totalHours5 =results.totalHours5
    formState.totalHours6 =results.totalHours6
    formState.picFlghts=results.setPicFlight


    




  })
  formState.loader=false


    
    });
    return {
      formState,
      save,
      setPicFlight
    };
  }
});
</script>
