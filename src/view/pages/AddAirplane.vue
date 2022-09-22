<template>
  <div>

    <CardToolbox>
      <ContactPageheaderStyle>
        <sdPageHeader :title="id ? 'Edit Airplane' : 'Add Airplane'">
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
        @finish="addAirplaneData()"
        @finishFailed="onFinishFailed"
      >
        <a-row :gutter="25">
          <a-col :xs="24">
            <sdCards title="Basic" caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="12" :xs="24">
                      <select v-model="formState.Manufacturer" @change="selectAircraft">
                        <option value>Quick Select an Aircraft</option>
                        <option
                          v-for="item in formState.uniqManufacturers"
                          :value="item"
                          :key="item"
                        >{{item}}</option>
                      </select>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <select v-model="formState.selectedType" @click="selectType">
                        <option value>Quick Select an Type</option>
                        <option
                          v-for="item in formState.typesData"
                          :value="item"
                          :key="item"
                        >{{item.type}}</option>
                      </select>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item ref="Manufacturer" name="Manufacturer" label="Manufacturer">
                        <a-input v-model:value="formState.Manufacturer" placeholder="Eg. Boeing" />
                      </a-form-item>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item ref="Type" name="Type" label="Type">
                        <a-input v-model:value="formState.Type" placeholder="Eg. B77W" />
                      </a-form-item>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item ref="Name" name="Name" label="Name">
                        <a-input v-model:value="formState.Name" placeholder="Eg. B777-300ER" />
                      </a-form-item>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item ref="Registration" name="Manufacturer" label="Registration">
                        <a-input v-model:value="formState.Registration" placeholder="Eg. N1234U" />
                      </a-form-item>
                    </a-col>
                    <a-col
                      :lg="{ span: 4, offset: 20 }"
                      :md="{ span: 6, offset:18 }"
                      :xs="{ span: 24, offset: 0 }"
                      :sm="{ span: 6, offset:18 }"
                    >
                      <sdCards>
                        <sdButton type="primary" html-type="submit" class="move-right">{{id ? 'Update':'Save'}}</sdButton>
                      </sdCards>
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
import { defineComponent, onMounted, reactive } from "vue";
import { Main, CardToolbox } from "../styled";
import {
  FormValidationWrap,
  VerticalFormStyleWrap
} from "../forms/overview/Style";
import { ContactPageheaderStyle } from "./style";
import Parse from "parse";
import Aircraft from "../../server/Aircraft";
import JsHelper from "../../helper/JsHelper";
import user from "../../server/user";
import PropTypes from "vue-types";
import Airplane from "../../server/Airplane";


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

      }

      
      await Aircraft.getManuafacturers().then(results => {
        formState.uniqManufacturers = JsHelper.fliterUniqvalue(
          results.manufacturers
        );

        // console.log(results);
      });
          const userDetails = await user.getCurrentUser();
     
       formState.username = userDetails.get("username");
      
      //get airplane details
     if(props.id){
      formState.loader=true

await Airplane.getPointer(props.id).then((obj)=>{
        // console.log(obj.get("aircraftType"))
        const aircraftType = obj.get('aircraftType')
        const aircraftRegistration = obj.get('aircraftRegistration')
        const airplaneName = obj.get('airplaneName')
        const aircraftPointer = obj.get("aircraftPointer")
        // console.log(aircraftPointer)
        const query = new Parse.Query("Aircraft");
        query.get(aircraftPointer.id).then((res)=>{
          // console.log(res)
          formState.Manufacturer=res.get("manufacturer")
        })

        // console.log(aircraftPointer.get("manufacturer"))
        // var manufacturer=aircraftPointer.get("manufacturer")
        // console.log(manufacturer)
        // formState.Manufacturer=manufacturer
        formState.Registration= aircraftRegistration
        formState.Type=aircraftType
        formState.Name=airplaneName
      })
      formState.loader=false

      
     }
      // formState.loader=false

    });

    const formState = reactive({
      Manufacturer: "",
      Type: "",
      Name: "",
      Registration: "",
      title: "sanam",
      uniqManufacturers: [],
      typesData: [],
      selectedType: "",
      username:"",
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
    const addAirplaneData = async () => {
      formState.loader=true
      const AddAirplane = Parse.Object.extend("AirPlane");
      const AddAircraft = Parse.Object.extend("Aircraft");
      const addAircraft = new AddAircraft()
      




      
      const addAirplane = new AddAirplane();
      const currentUser = Parse.User.current();
      const getAdmin = Parse.Object.extend("User");
      const adminquery = new Parse.Query(getAdmin);
      adminquery.equalTo("email", "admin@logatp.com");
      const object = await adminquery.first();
      const acl = new Parse.ACL(Parse.User.current());
      acl.setWriteAccess(object.id, true);
      acl.setReadAccess(object.id, true);
      if (currentUser) {
        if(!props.id){
      addAircraft.set("manufacturer",formState.Manufacturer)

          // addAircraft.set("realmID",JsHelper.makeid(10))
      addAircraft.set("ICAOcode",formState.Type)
      addAircraft.set("type",formState.airplaneName)
      addAircraft.set("engineType","")
      addAircraft.set("wakeCategory","")
      addAircraft.set("IATAcode","")

          addAirplane.set({
          // Manufacturer:formState.Manufacturer,
          aircraftPointer:addAircraft,
          aircraftType: formState.Type,
          airplaneName: formState.Name,
          aircraftRegistration: formState.Registration,
          username:formState.username,
          realmID:JsHelper.makeid(10),
          isActive:true
        });

        await addAirplane.setACL(acl);
        addAirplane.save().then(
          () => {
            // console.log(obj);
            formState.Manufacturer = "";
            formState.Name = "";
            formState.Type = "";
            formState.Registration = "";
            formState.selectedType=null
      formState.loader=false

          },
          error => {
            console.log(error);
            formState.loader = false;
          }
        );
        // console.log("clciked on crewate new");
      }
      else{
        // console.log("clicked to update")
        // console.log(props.id)
      var query = new Parse.Query("AirPlane");
      query.get(props.id).then(async(obj)=>{

        const aircraftPointer = obj.get("aircraftPointer")
        // console.log(aircraftPointer.get("manufacturer"))
        aircraftPointer.set("ICAOcode",formState.Type)
        aircraftPointer.set("type",formState.airplaneName)
        aircraftPointer.set("engineType","")
        aircraftPointer.set("wakeCategory","")
        aircraftPointer.set("IATAcode","")
        // var manufacturer=aircraftPointer.get("manufacturer")
        aircraftPointer.set("manufacturer",formState.Manufacturer)
        obj.set("aircraftType",formState.Type)
        obj.set("aircraftRegistration",formState.Registration)
        obj.set("airplaneName",formState.Name)
        obj.set("aircraftPointer",aircraftPointer,)



        await obj.save().then(()=>{
          formState.loader=false
          
        },(error)=>{
          console.log(error)
        })
        



      })

      }
      
        }
    };
    const onFinishFailed = errorInfo => {
      console.log("Failed:", errorInfo);
    };
    const handleClick = async e => {
      // console.log("clicked", formState.uniqManufacturers[e.key]);
      // console.log("clicked", e);
      await Aircraft.getTypes(formState.uniqManufacturers[e.key]).then(res => {
        formState.typesData = res;
        // console.log(res);
      });
      formState.Manufacturer = formState.uniqManufacturers[e.key];
    };
    const titleClick = e => {
      console.log("titleClick", e);
    };
    const selectAircraft = async () => {
      // console.log("chnage", formState.Manufacturer);
      await Aircraft.getTypes(formState.Manufacturer).then(res => {
        formState.typesData = res;
        // console.log(res.data);
        if(res.data){
          formState.typesData = res.data;
        }
      });
    };
    const selectType = () => {
      // console.log("3kje 4kh", formState.selectedType);
      if (formState.selectedType) {
        formState.Name = formState.selectedType.type;
        formState.Type = formState.selectedType.ICAOcode;
      }
      if(formState.selectedType=="false"){
        // console.log("false f")
      }
    };

    return {
      formState,
      rules,
      addAirplaneData,
      onFinishFailed,
      handleClick,
      titleClick,
      selectAircraft,
      selectType
    };
  }
});
</script>

<style scoped>
.move-right {
  float: right;
}
</style>
