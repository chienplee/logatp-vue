<template>
  <div>
    <CardToolbox>
      <ContactPageheaderStyle>
        <sdPageHeader :title="id ? 'Edit Experience' : 'Add Experience'">
        <!-- <sdPageHeader title="Add Experiece"> -->
          <template #subTitle></template>
 
        </sdPageHeader>
      </ContactPageheaderStyle>
    </CardToolbox>
    <Main>
    <a-spin :spinning="formState.loader" class size="large">

      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish()"
        @finishFailed="onFinishFailed"
      >
        <a-row :gutter="25">
          <a-col :xs="24">
            <sdCards title="Basic" caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="24">
                      <a-form-item ref="Name" label="Name" name="Name">
                        <a-input v-model:value="formState.Name" placeholder="Eg.Avitation School" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>

          <a-col :xs="24">
            <sdCards title="DATES" caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="12" :xs="24">
                      <a-form-item name="FlightDate" label="Begin Date">
                        <a-date-picker v-model:value="formState.BeginDate" />
                      </a-form-item>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item name="FlightDate" label="End Date">
                        <a-date-picker v-model:value="formState.EndDate" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>
          <a-col :xs="24">
            <sdCards title="TOTAL TIME" caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="24">
                      <a-form-item ref="Hours" label="Hours" name="Hours">
                        <a-input v-model:value="formState.Hours" placeholder="Eg. 1000" />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="24">
                      <a-form-item ref="Minutes" label="Minutes" name="Minutes">
                        <a-input v-model:value="formState.Minutes" placeholder="Eg. 59" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>
          <a-col :xs="24">
            <sdCards title="NOTES" caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="24">
                      <a-form-item ref="Note" name="Note" label="Note">
                        <a-textarea
                          v-model:value="formState.Note"
                          placeholder="You can write something here..."
                          :rows="4"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>
          <a-col
            :lg="{ span: 4, offset: 20 }"
            :md="{ span: 6, offset:18 }"
            :xs="{ span: 24, offset: 0 }"
            :sm="{ span: 6, offset:18 }"
          >
            <sdCards>
              <!-- <a-form-item > -->
              <sdButton
                type="primary"
                html-type="submit"
                @click="addExperienceData()"
              >{{id ? "Update Experience" :"Add Experience"}}</sdButton>
              <!-- </a-form-item> -->
            </sdCards>
          </a-col>
        </a-row>
      </a-form>
      </a-spin>
    </Main>
  </div>
</template>
  <script>
  import { defineComponent, onMounted, reactive } from "vue";
  import { Main, CardToolbox } from "../styled";
  import moment from "moment";
  moment.suppressDeprecationWarnings = true;
  import {
    FormValidationWrap,
    VerticalFormStyleWrap
  } from "../forms/overview/Style";
  import { ContactPageheaderStyle } from "./style";
  import Parse from "parse";

  import JsHelper from "../../helper/JsHelper";
//   import user from "../../server/user";
  import PropTypes from "vue-types";
import experience from "../../server/experience";
// import admin from "../../server/admin"
  
  export default defineComponent({
    props: {
      id:{
        required:false,
        type:PropTypes.String
      }
    },
    components: {
      Main,
  
      CardToolbox,
      ContactPageheaderStyle,
      FormValidationWrap,
      VerticalFormStyleWrap
    },
    setup(props) {
      onMounted(async () => {
        if(!props.id){
      formState.loader=false
      formState.Hours=null
      formState.Minutes=null

      }
        if(props.id){
         await experience.getPointer(props.id).then(async object =>{
            // console.log(object)
            formState.Name = object.get("name");
        formState.BeginDate = object.get("startDate");
        formState.EndDate = object.get("endDate");
        formState.Note = object.get("note");
        // formState.totalMinutes=object.get('totalMinutes')
        // formState.totalHours=JsHelper.mintoHourswithMin(object.get('totalMinutes'))
        var totalHours=object.get('totalMinutes')
        const data = JsHelper.timeconvert(totalHours)
        formState.Hours=data.hours
        formState.Minutes=data.min
        // console.log(data)


        })
       
      formState.loader=false

      
        }
        

       
      });
  
      const formState = reactive({
        Name:'',
        BeginDate:moment(new Date()).format("DD-MMM-YYYY"),
        EndDate:moment(new Date()).format("DD-MMM-YYYY"),
        Hours:0,
        Minutes:0,
        Note:"",
        loader:true
        
      });
      const rules = {
        Registration: [
          {
            required: true,
            message: "Please input Registration",
            trigger: "blur"
          }
        ],
        Name: [
          {
            required: true,
            message: "Please input  Name",
            trigger: "blur"
          }
        ],
        Type: [
          {
            required: true,
            message: "Please input Type",
            trigger: "blur"
          }
        ],
        Manufacturer: [
          {
            required: true,
            message: "Please input Manufacturer",
            trigger: "blur"
          }
        ]
      };
      const addExperienceData = async () => {
        formState.loader= true
      const AddExperience = Parse.Object.extend("Experience");
      const addExperience = new AddExperience();
      const currentUser = Parse.User.current();
      const getAdmin = Parse.Object.extend("User");
      const adminquery = new Parse.Query(getAdmin);
      adminquery.equalTo("username", "admin@logatp.com");
      const object = await adminquery.first();
      const acl = new Parse.ACL(Parse.User.current());
      acl.setWriteAccess(object.id, true);
      acl.setReadAccess(object.id, true);
      if (currentUser) {
        const username = currentUser.get('username')

        if(!props.id){
          
            await addExperience.set({
          // Manufacturer:formState.Manufacturer,
         name:formState.Name,
         startDate:moment(formState.BeginDate).format("DD-MMM-YYYY"),
         endDate:moment(formState.EndDate).format("DD-MMM-YYYY"),
         note:formState.Note, 
         totalMinutes:parseInt(parseInt(formState.Hours*60) + parseInt(formState.Minutes)),
         
          realmId:JsHelper.makeid(10),
          username:username
        });

        await addExperience.setACL(acl);
       await addExperience.save().then(
          () => {
        formState.loader= false

            // console.log(obj);
            formState.Name=""
            formState.BeginDate=""
            formState.EndDate=""
            formState.Minutes=""
            formState.Hours=""
            formState.Hours=""
            formState.Note=""
            
          },
          error => {
        formState.loader= false

            console.log(error);
            formState.loader = false;
          }
        );
        // console.log("clciked ");
      }
      else{
        // console.log("clicked to update")
        var query = new Parse.Query("Experience");
      query.get(props.id).then(async(obj)=>{
        obj.set("name",formState.Name)
        obj.set("startDate",moment(formState.BeginDate).format("DD-MMM-YYYY"))
        obj.set("endDate",moment(formState.EndDate).format("DD-MMM-YYYY"))
        obj.set("note",formState.Note)
        obj.set("totalMinutes",parseInt(parseInt(formState.Hours*60) + parseInt(formState.Minutes)));



        await obj.save().then(()=>{
          formState.loader=false
          
        },(error)=>{
          console.log(error)
        })
        



      })

        
   
     
    }

      }
    }
      const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
      };
      const onFinish = () =>{
        console.log("success")
      }
      
  
      return {
        formState,
        rules,
        addExperienceData,
        onFinishFailed,
        onFinish
    
      };
    }

  });
  </script>
  
  <style scoped>
.move-right {
  float: right;
}
</style>
  