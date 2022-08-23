<template>

  <div>
    <a-spin :spinning="loadingState.loading" >
      
    <sdPageHeader title="Add Flight">
      <template v-slot:buttons>
        <div class="page-header-actions">
          <sdButton @click="lastFlightRecord();" size="small" type="primary">
            <sdFeatherIcons type="plus" size="14" />
            Copy data from last flight
          </sdButton>
        </div>
      </template>
    </sdPageHeader>
    <Main>
      <a-form
        :model="flightState"
        name="basic"
        autocomplete="off"
        @finish="addFlightMethod()"
        @finishFailed="onFinishFailed"
        :rules="rules"
      >
        <a-row :gutter="25">
          <!-- Basic Data -->
          <a-col :xs="24">
            <sdCards title="BASIC" caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="12" :xs="24">
                      <a-form-item name="FlightDate" label="FlightDate(UTC)">
                        <a-date-picker v-model:value="flightState.FlightDate"  />
                      </a-form-item>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item
                        ref="FlightNumber"
                        name="Flight Number"
                        label="Flight Number"
                      >
                        <a-input
                          v-model:value="flightState.FlightNumber"
                          placeholder="Eg. AA123"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item
                        ref="DepartureAirport"
                        name="DepartureAirport"
                        label="Departure Airport"
                      >
                        <a-input
                          v-model:value="flightState.DepartureAirport"
                          autocomplete="off"
                          placeholder="Eg. LAX"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item
                        ref="DestinatonAirport"
                        name="DestinatonAirport"
                        label="Destinaton Airport"
                      >
                        <a-input
                          v-model:value="flightState.DestinatonAirport"
                          autocomplete="off"
                          placeholder="Eg. SFO"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>

          <!-- Aircraft -->
          <a-col :xs="24">
            <sdCards title="AIRCRAFT " caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <!-- dropdown -->
                    <a-col :md="8" :xs="24">
                      <!-- <a-form-item
                        ref="airplane"
                        name="airplane"
                        label="Select an airplane"
                      >
                        <a-select
                          v-model:value="flightState.airplane"
                          style="width: 300px"
                        >
                          <a-select-option value="">
                            Select an Aircraft
                          </a-select-option>
                          <a-select-option
                            v-for="type in AircraftTypes.aircraft"
                            :key="type.id"
                          >
                            {{ type.aircraftRegisteration}}
                          </a-select-option>
                        </a-select>
                      </a-form-item> -->
                      <select v-model="flightState.airplane">
                        <option value="">
                            Select an Aircraft
                          </option>
                        <option v-for="aircraft in AircraftTypes.aircraft" :value="aircraft" :key="aircraft.id">{{aircraft.aircraftRegisteration}}</option>
 
                      </select>
                    </a-col>

                    <a-col :md="8" :xs="24">
                      <a-form-item
                        ref="AircraftType"
                        label="Aircraft Type"
                        name="AircraftType"
                      >
                        <!-- v-model:value="flightState.airplane[0]" -->
                        <a-input
                          v-model:value="flightState.aircraftType"
                          placeholder="Eg. B777"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="24">
                      <a-form-item
                        ref="AircraftRegistaton"
                        label="Aircraft Registaton"
                        name="AircraftRegistaton"
                      >
                        <!-- v-model:value="flightState.airplane[1]" -->
                        <a-input
                          v-model:value="flightState.AircraftRegistaton"
                          placeholder="Eg. N12345"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>
          <!-- Times (UTC) -->
          <a-col :xs="24">
            <sdCards title="TIMES(UTC)" caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="6" :xs="24">
                      <a-form-item
                        ref="OutTime"
                        label="Out Time"
                        name="OutTime"
                      >
                        <a-input
                          type="time"
                          @blur="setOutTime();setBlockTime();"
                          format="hh:mm:ss"
                          v-model:value="flightState.OutTime"
                          placeholder="HHMM"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="6" :xs="24">
                      <a-form-item
                        ref="OffTime"
                        name="OffTime"
                        label="Off Time "
                      >
                        <a-input
                          type="time"
                          @blur="setOffTime();setFlightTime()"
                          v-model:value="flightState.OffTime"
                          placeholder="HHMM"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="6" :xs="24">
                      <a-form-item ref="OnTime" name="OnTime" label="On Time ">
                        <a-input
                          type="time"
                          @blur="setOnTime();setFlightTime()"
                          v-model:value="flightState.OnTime"
                          placeholder="HHMM"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="6" :xs="24">
                      <a-form-item ref="InTime" name="name" label="In Time">
                        <a-input
                          type="time"
                          @blur="setInTime();setBlockTime()"
                          v-model:value="flightState.InTime"
                          placeholder="HHMM"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>

          <!-- Night ime -->
          <a-col :xs="24">
            <sdCards title="Night Time" caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="24">
                      <a-form-item
                        ref="NightTime"
                        label="Night Time"
                        name="NightTime"
                      >
                        <a-input
                          type="time"
                          @blur="setNightTime()"
                          v-model:value="flightState.nightTime"
                          placeholder="HHMM"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>

          <!-- calculated Time -->
          <a-col :xs="24">
            <sdCards title="CALCULATED" caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="24">
                      <a-form-item
                        ref="BlockTime"
                        label="Block Time"
                        name="BlockTime"
                      >
                        <a-input
                          disabled
                          v-model:value="flightState.BlockTime"
                          placeholder="00:00"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="24">
                      <a-form-item
                        ref="FlightTime"
                        name="FlightTime"
                        label="Flight Time "
                      >
                        <a-input
                          disabled
                          v-model:value="flightState.FlightTime"
                          placeholder="00:00"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>
          <!-- crew time -->
        
          <sdCards title="CREW">
          
             
             
              <a-row :gutter="30">
           <a-col :md="12" :xs="24">
                 <span @click="showModal('pilot')">
                <sdFeatherIcons type="user" size="16" />
              </span>
              <input
                v-model="flightState.PilotInCommand.name"
                type="text"
                disabled
                placeholder="Pilot In Command"
              />
             </a-col>
           <a-col :md="12" :xs="24">
              <span @click="showModal('crew2')">
                <sdFeatherIcons type="user" size="16" />
              </span>

              <input
                v-model="flightState.Crew2.name"
                type="text"
                disabled
                placeholder="Crew2"
              />
          </a-col>
           <a-col :md="12" :xs="24">
 <span @click="showModal('crew3')">
                <sdFeatherIcons type="user" size="16" />
              </span>
              <input
                v-model="flightState.Crew3.name"
                type="text"
                disabled
                placeholder="Crew3"
              />
          </a-col>
           <a-col :md="12" :xs="24">
             <span @click="showModal('crew4')">
                <sdFeatherIcons type="user" size="16" />
              </span>
              <input
                type="text"
                v-model="flightState.Crew4.name"
                disabled
                placeholder="Crew4"
              /> 
          </a-col>
           </a-row>
          </sdCards>

          <!-- setting data
                       -->
          <a-col :xs="24">
            <sdCards title="SETTING " caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="24">
                      <a-form-item
                        ref="PicTime"
                        label="Pic Time"
                        name="PicTime"
                      >
                        <a-switch
                          v-model:checked="flightState.PicTime"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="24">
                      <a-form-item
                        ref="PFTakeOff"
                        name="PFTakeOff"
                        label="PF TakeOff "
                      >
                        <a-switch
                          v-model:checked="flightState.PFTakeOff"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="24">
                      <a-form-item
                        ref="PfLanding"
                        name="PfLanding"
                        label="PF Landing "
                      >
                        <a-switch
                          v-model:checked="flightState.PfLanding"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="24">
                      <a-form-item
                        ref="AutoLand"
                        name="AutoLand"
                        label="Autoland "
                      >
                        <a-switch
                          v-model:checked="flightState.AutoLand"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="24">
                      <a-form-item
                        ref="GoAround"
                        name="GoAround"
                        label="Go Around "
                      >
                        <a-switch
                          v-model:checked="flightState.GoAround"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="24">
                      <a-form-item
                        ref="Diverted"
                        name="Diverted"
                        label="Diverted "
                      >
                        <a-switch
                          v-model:checked="flightState.Diverted"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>
          <!-- extra -->
          <a-col :xs="24">
            <sdCards title="EXTRA " caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="12" :xs="24">
                      <a-form-item
                        ref="ApproachType"
                        name="ApproachType"
                        label="Approach Type"
                      >
                        <a-select
                          v-model:value="ApproachTypes.type"
                        >
                          <a-select-option value="">
                            Select Approach
                          </a-select-option>
                          <a-select-option
                            v-for="pro in ApproachTypes.types"
                            :key="pro"
                          >
                            {{ pro }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item
                        ref="TotalPassangers"
                        name="TotalPassangers"
                        label="Total Passangers "
                      >
                        <a-input
                          type="number"
                          v-model:value="flightState.TotalPassangers"
                          placeholder="0 "
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item
                        ref="TotalPayload"
                        name="TotalPayload"
                        label="Total Payload(Tons) "
                      >
                        <a-input
                          type="decimal"
                          v-model:value="flightState.TotalPayload"
                          placeholder="0.0 "
                        />
                        <!-- <input type="number" v-model="flightState.TotalPayload"> -->
                      </a-form-item>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item
                        ref="FlightPlanDistance"
                        name="FlightPlanDistance"
                        label="Flight Plan Distance(NM) "
                      >
                        <a-input
                          type="number"
                          v-model:value="flightState.FlightPlanDistance"
                          placeholder="0"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </VerticalFormStyleWrap>
              </FormValidationWrap>
            </sdCards>
          </a-col>
          <!-- Note -->
          <a-col :xs="24">
            <sdCards title="NOTE">
              <a-form-item ref="Note" name="Note" label="Note">
                <a-textarea
                  v-model:value="flightState.Note"
                  placeholder="You can write something here..."
                  :rows="4"
                />
              </a-form-item>
            </sdCards>
          </a-col>
          <a-col :lg="{ span: 4, offset: 20 }" :md="{ span: 6, offset:18 }" :xs="{ span: 24, offset: 0 }" :sm="{ span: 6, offset:18 }">
            <sdCards>
              <!-- <a-form-item :wrapper-col="{ offset: 23 }"> -->
                <sdButton type="primary" html-type="submit"
                  >{{update.updateFlag?'Update Flight':'Add Flight'}}</sdButton
                >
              <!-- </a-form-item> -->
            </sdCards>
          </a-col>
        </a-row>
      </a-form>
      <Modal
        name="addCrew"
        id="1"
        :visible="ModelState.addCrew"
        title="AddCrew"
        @cancel="CancleCrewModel()"
        type="primary"
        :width="1000"
      >
        <AddCrew @added="added()"></AddCrew>
      </Modal>
      <Modal
        name="copyDataModel"
        id="1"
        :visible="ModelState.copyData"
        title="Copt Data from last flight"
        @cancel="CancleCopyModel()"
        type="primary"
      >
        <a-row :gutter="25">
          <a-col :xs="24">
            <a-row>
              <a-col :md="24" :xs="24">
                <!-- <a-checkbox @change="onChangeDate()" :checked="CopyLastFlight.FlightDate"
                  >Flight Date</a-checkbox
                > -->
                <input type="checkbox" id="datecheckbox" v-model="CopyLastFlight.FlightDate" />
                <label for="datecheckbox"> Flight Date </label>
              </a-col>
              <a-col :md="24" :xs="24">
                 <input type="checkbox" id="AirCraftcheckbox" v-model="CopyLastFlight.Aircraft" />
                <label for="AirCraftcheckbox"> AirCraft </label>
                <!-- <a-checkbox @change="onChangeAircraft()" :value="CopyLastFlight.AirCraft">Aircraft</a-checkbox>
             --> </a-col> 
              <a-col :md="24" :xs="24">
                 <input type="checkbox" id="DepToDescheckbox" v-model="CopyLastFlight.DeptoDes" />
                <label for="DepToDescheckbox"> Departure to Destination </label>
                <!-- <a-checkbox @change="onChangeDeptoDes()" :value="CopyLastFlight.DeptoDes">Departure to Destination</a-checkbox> -->
              </a-col>
              <a-col :md="24" :xs="24">
                 <input type="checkbox" id="Crewcheckbox" v-model="CopyLastFlight.Crew" />
                <label for="crewcheckbox"> Crew </label>
                <!-- <a-checkbox @change="onChangeCrew()" :value="CopyLastFlight.Crew">Crew</a-checkbox> -->
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <sdButton @click="handleSelectData();" type="primary" size="small">
          Save
        </sdButton>
      </Modal>

      <Modal
        name="showCrewData"
        id="2"
        :visible="ModelState.visible"
        title="Crew List"
        @cancel="handleCancel()"
        type="primary"
      >
        <sdCards>
          <sdButton @click="showCrewModel()" size="small" type="primary" block>
            <!-- <router-link to="add-crew">Add Crew</router-link> -->
            Add Crew
          </sdButton>
          <a-col>
            <a-input placeholder="Search by Crew Name" v-model:value="searchField.value">
              <template #suffix>
                <sdFeatherIcons type="search" size="16" />
              </template>
            </a-input>
          </a-col>
        </sdCards>

        <sdCards>
          <sdFeatherIcons type="user" size="14" />
          <sdButton type="primary" size="small"></sdButton>
          Clear
        </sdCards>

        <a-row :gutter="15">
          <a-col :xs="24">
            <sdCards headless size="default">
              <GridStyleOffset>
                <a-row>
                  <a-col :span="12">
                    <sdButton size="large" type="primary">
                      <sdFeatherIcons type="layers" size="14" />
                      <span>Self</span>
                    </sdButton>
                  </a-col>
                </a-row>
              </GridStyleOffset>
            </sdCards>
          </a-col>
        </a-row>
        <div v-for="crew in filterData" :key="crew.name">
          <Crew @click="selectCrewMember(crew);handleCancel()">
            {{ crew.name }}
          </Crew>
        </div>
      </Modal>
    </Main>
    </a-spin>

  </div>

</template>

<script>
import { Main } from "../styled";
import { defineComponent, ref, reactive,computed } from "vue";
//import Alert from '../../components/alerts/alerts';
// import {Modals} from "../../components/modals/Modals.vue";
import Modal from "../../components/modals/Modals.vue";
import AddCrew from "./AddCrew";
import Crew from "../../customComponents/Crew.vue";
import moment from "moment";
import PropTypes from "vue-types";

import Airplane from '../../server/Airplane.js'
import  Flight from '../../server/Flight.js';
import CrewHelper from '../../server/Crew.js'
import {
  FormValidationWrap,
  VerticalFormStyleWrap,
} from "../forms/overview/Style";
import Parse from "parse";

import { onMounted } from "vue";
import jsHelper from '../../helper/JsHelper.js'
export default defineComponent({
  name: "AddFlight",
  components: {
    Main,
    FormValidationWrap,
    VerticalFormStyleWrap,
    //Alert,
    Modal,
    Crew,
    AddCrew,
  },
   props: {
    id:{
      required:false,
      type:PropTypes.String
    }
  },
  setup(props) {
    const update =reactive({
      updateFlag:false,
    });
    const loadingState =reactive({
      loading:false,
    });
    const selectCrewMember = (cr) => {
      console.log(cr);
      if(crewFeild.name=='pilot'){
      flightState.PilotInCommand = cr;

      }
      else if(crewFeild.name=='crew2'){
      flightState.Crew2 = cr;

      }
      else if(crewFeild.name=='crew3'){
      flightState.Crew3 = cr;
        
      }else if(crewFeild.name=='crew4'){
      flightState.Crew4 = cr;
        
      }
      console.log("clicked  on selectCrewMember", cr);
    };

    const NationalityState = reactive({
      contries: ["India", "America", "Newzland"],
    });
    const country = reactive({
      countryData: NationalityState.contries[0],
    });
    const flightState = reactive({
      layout: "vertical",

      FlightDate: "",
      FlightNumber: "",
      DepartureAirport: "",
      DestinatonAirport: "",
      AircraftType: "",
      AircraftRegistaton: "",
      airplane: "",
      OutTime: "",
      OffTime: "",
      OnTime: "",
      InTime: "",
      nightTime: "",
      BlockTime: "",
      FlightTime: "",
      PilotInCommand: {
        name:'',
        id:'',
      },
      Crew2: {
        name:'',
        id:'',
      },
      Crew3: {
        name:'',
        id:'',
      },
      Crew4: {
        name:'',
        id:'',
      },
      PicTime: false,
      PFTakeOff: false,
      PfLanding: false,
      AutoLand: false,
      GoAround: false,
      Diverted: false,
      ApproachType: "",
      TotalPassangers: "",
      TotalPayload: "",
      FlightPlanDistance:0 ,
      Note: "",
    });

    const BasicRef = ref();
    const formRef = ref();

    const ModelState = reactive({
      visible: false,
      confirmLoading: false,
      addCrew: false,
      copyData: false,
    });

    const modelExample = reactive({
      show: false,
    });

    const CrewMembers = reactive({
      crews: [
      
      ],
    });

    const AircraftTypes = reactive({
      aircraft: [
      //   ["N123", "PHE"],
      //   ["N12", "PHEN123"],
      //   ["N1", "PHEN1234444"],
      ],
    });
    const CopyLastFlight = reactive({
      FlightDate: false,
      Aircraft: false,
      DeptoDes: false,
      Crew: false,
    });
    const searchField=reactive(
      {value:'',}
    );

    const ApproachTypes = reactive({
      type: "",
      types: jsHelper.content
    });

    // methods
    const displayTime=(time1,time2)=>{
   if(time1 && time2){
     console.log("time1",time1);
     console.log("time2",time2);

     return  strToMins(time1) - strToMins(time2) ;

   }
   else{
     return 0 
   }
   function strToMins(t) {
    var s = t.split(":");
     return Number(s[0]) * 60 + Number(s[1]);
    }
  


    };
   const setBlockTime=()=>{
    var blockTime =displayTime(flightState.OutTime,flightState.InTime);
    console.log(typeof(blockTime));
    blockTime > 0? flightState.BlockTime=blockTime:flightState.BlockTime=0; 
   };
   const setFlightTime=()=>{
    var flightTime = flightState.FlightTime= displayTime(flightState.OffTime,flightState.OnTime);
    console.log(typeof(flightTime));
    flightTime > 0? flightState.FlightTime=flightTime:flightState.FlightTime=0;
   };
  
    

    const addFlightMethod = async () => {
    const AddFlight = Parse.Object.extend("Flight");
    const addFlight = new AddFlight();
    const AirPort = Parse.Object.extend("Airport");
    var pointer=null;
    var crew2=null;
    var crew3=null;
    var crew4=null;
    
    console.log("Add Flight");
      const currentUser = Parse.User.current();
      const CrewClass=Parse.Object.extend("Crew");
     const crewQuery=new Parse.Query(CrewClass);
     
     const airportDestinationQuery=new Parse.Query(AirPort);
     const departureQuery=new Parse.Query(AirPort);
     airportDestinationQuery.equalTo("IATAcode",flightState.DestinatonAirport.toUpperCase());
     departureQuery.equalTo("IATAcode",flightState.DepartureAirport.toUpperCase());
    const destinationPointer = await airportDestinationQuery.first();
    console.log("destinationPointer",destinationPointer)
    const departureAirport =  await departureQuery.first(); 
    console.log("departurePointer",departureAirport)
          console.log("typeof",flightState.TotalPayload)
    
    await crewQuery.get(flightState.PilotInCommand.id).then((object) => {
        pointer=object
        }).catch((error) =>  {
          pointer=null
          console.log("error",error)
        });
   console.log('flightState.PilotInCommand.id',flightState.PilotInCommand.id);
     await crewQuery.get(flightState.PilotInCommand.id).then((object) => {
        pointer=object
        }).catch((error) =>  {
          pointer=null
          console.log("error",error)
        });
           await crewQuery.get(flightState.Crew2.id).then((object) => {
        crew2=object
        }).catch((error) =>  {
          crew2=null
          console.log("error",error)
        });
     await crewQuery.get(flightState.Crew3.id).then((object) => {
        crew3=object
        }).catch((error) =>  {
          crew3=null
          console.log("error",error)
        });
     await crewQuery.get(flightState.Crew4.id).then((object) => {
        crew4=object
        }).catch((error) =>  {
          crew4=null
          console.log("error",error)
        });
      var airplanePointer=null;
      const getAdmin = Parse.Object.extend("User");
      const Airplane = Parse.Object.extend("AirPlane");
      const airplanequery = new Parse.Query(Airplane);
      console.log("airid",flightState.airplane.id);
      await airplanequery.get(flightState.airplane.id).then((obj)=>{
        console.log("then",obj)
        airplanePointer=obj
      }).catch((err)=>{
        console.log("err" ,err);
        airplanePointer=null;
      })
      const adminquery = new Parse.Query(getAdmin);
      adminquery.equalTo("email", "admin@logatp.com");
      const object = await adminquery.first();
      const acl = new Parse.ACL(Parse.User.current());
      acl.setWriteAccess(object.id, true);
      acl.setReadAccess(object.id, true);
      if (currentUser) {
        if(props.id){
          var query = new Parse.Query("Flight"); 
          query.get(props.id).then(async(obj)=>{
            var d=new Date(new Date(moment(flightState.FlightDate).format("yyyy-MM-DD")).toISOString());
            
          obj.set("flightDate",d);
          obj.set("flightNumber",flightState.FlightNumber);
          obj.set("blockTime",flightState.BlockTime);
          obj.set("Note",flightState.notes);
          obj.set("flightTime", flightState.FlightTime);
          obj.set("picTime",flightState.PicTime);
          obj.set("pfTakeOff", flightState.PFTakeOff);
          obj.set("pfLanding", flightState.PfLanding);
          obj.set("autoLand", flightState.AutoLand);
          obj.set("goAround", flightState.GoAround);
          obj.set("diverted", flightState.Diverted);
          obj.set("approachType", ApproachTypes.type);
          obj.set("totalPassangers", flightState.TotalPassangers);
          obj.set("totalPayload", parseFloat(flightState.TotalPayload));
          obj.set("flightplanDistance", parseInt(flightState.FlightPlanDistance));
          obj.set("notes", flightState.Note);
          obj.set("nightTime", TimeDetails.nightTime);
          obj.set("departureAirport",departureAirport);
          obj.set("destinationAirport",destinationPointer);
          obj.set("pilotInCommandPointer",pointer);
          obj.set("crew2Pointer",crew2);
          obj.set("crew3Pointer",crew3);
          obj.set("crew4Pointer",crew4);
          obj.set("crew2",flightState.Crew2.name);
          obj.set("crew3",flightState.Crew3.name);
          obj.set("crew4",flightState.Crew4.name);
          obj.set("pilotInCommand",flightState.PilotInCommand.name);

          obj.set("departure",flightState.DepartureAirport)
          obj.set("destination",flightState.DestinatonAirport);
         var outTime=new Date(moment.utc(TimeDetails.outTime));
         var offTime= new Date(moment.utc(TimeDetails.offTime));
         var onTime= new Date(moment.utc(TimeDetails.onTime));
         var inTime= new Date(moment.utc(TimeDetails.inTime));
          console.log("outTime",outTime)
          console.log("offTime",offTime)
          console.log("onTime",onTime)
          console.log("inTime",inTime)

          obj.set("outTime",outTime);
          obj.set("offTime",offTime);
          obj.set("onTime",onTime);
          obj.set("inTime",inTime);

          // obj.set("inTime",inTime);
          obj.save().then((res)=>{
          console.log("saved",res);
            });

          }); 
        }
        else{
        addFlight.set({
          airplanePointer:airplanePointer,
          realmID:jsHelper.makeid(10),
          departureAirport:departureAirport,
          destinationAirport:destinationPointer,
          pilotInCommandPointer:pointer,
          crew2Pointer:crew2,
          crew3Pointer:crew3,
          crew4Pointer:crew4,
          pilotInCommand: flightState.PilotInCommand.name,
          crew2: flightState.Crew2.name,
          crew3: flightState.Crew3.name,
          crew4: flightState.Crew4.name,
          flightDate: new Date(new Date(moment(flightState.FlightDate).format("yyyy-MM-DD")).toISOString()),//new Date (moment(flightState.FlightDate).format("DD/MM/YYYY")),
          flightNumber: flightState.FlightNumber,
          departure: flightState.DepartureAirport,
          destination: flightState.DestinatonAirport,
          aircraftType: flightState.airplane.aircraftType,
          aircraftRegistration: flightState.airplane.aircraftRegisteration,
          outTime:new Date(moment.utc(TimeDetails.outTime)), //new Date('2022-08-03T06:30:00.000Z'),//flightState.OutTime,
          offTime: new Date(moment.utc(TimeDetails.offTime)),//flightState.OffTime,
          onTime: new Date(moment.utc(TimeDetails.onTime)),//flightState.OnTime,
          inTime: new Date(moment.utc(TimeDetails.inTime)),//flightState.InTime,
          blockTime: flightState.BlockTime,
          flightTime: flightState.FlightTime,
          picTime: flightState.PicTime,
          pfTakeOff: flightState.PFTakeOff,
          pfLanding: flightState.PfLanding,
          autoLand: flightState.AutoLand,
          goAround: flightState.GoAround,
          diverted: flightState.Diverted,
          approachType: ApproachTypes.type,
          totalPassangers: flightState.TotalPassangers,
          totalPayload: parseFloat(flightState.TotalPayload),
          flightplanDistance: parseInt(flightState.FlightPlanDistance),
          notes: flightState.Note,
          nightTime: TimeDetails.nightTime,
        });

        addFlight.setACL(acl);
        await addFlight.save().then(
          (flight) => {
            console.log(flight);
            (flightState.PilotInCommand = ""), (flightState.Crew2 = "");
            (flightState.Crew3 = ""),
              (flightState.Crew4 = ""),
              (flightState.FlightDate = ""),
              (flightState.FlightNumber = ""),
              (flightState.DepartureAirport = ""),
              (flightState.DestinatonAirport = ""),
              (flightState.airplane = []),
              (flightState.OutTime = ""),
              (flightState.OffTime = ""),
              (flightState.OnTime = ""),
              (flightState.InTime = ""),
              (flightState.BlockTime = ""),
              (flightState.FlightTime = ""),
              (flightState.PicTime = false),
              (flightState.PFTakeOff = false),
              (flightState.PfLanding = false),
              (flightState.AutoLand = false),
              (flightState.GoAround = false),
              (flightState.Diverted = false),
              (ApproachTypes.type = ""),
              (flightState.TotalPassangers = ""),
              (flightState.TotalPayload = ""),
              (flightState.FlightPlanDistance = ""),
              (flightState.Note = "");
            flightState.nightTime = "";
          },
          (error) => {
            alert("Error while adding flight");
            console.log(error);
          }
        );
      }
      }
    };
    const added =()=>{
      console.log("added");
      CancleCrewModel();
      getCrewMembers();

    };
    const getCrewMembers=()=>{
      loadingState.loading=true;
           CrewHelper.getCrewMembers().then((data)=>{
       console.log(
        "data" ,data
       )
      //  var arr=[];
      CrewMembers.crews=[];
            for (const object of data) {

                var obj={
                 name: object.get("firstName")+ ' '+  object.get("lastName"),
                 id:object.id,

                };
                CrewMembers.crews.push(obj);
            }
      loadingState.loading=false;
      ModelState.visible = true;

     }
      
     );

    };
    const showModal = (feild) => {
      crewFeild.name=feild;
      console.log(" crewFeild.name", crewFeild.name);
      getCrewMembers();
    };
    const copyDataModel = () => {
      ModelState.copyData = true;
    };
    const crewFeild=reactive({
      name:null,
    });
    const showCrewModel = () => {
      console.log("crew model is clcked");
      ModelState.addCrew = true;
      const query = new Parse.Query("Crew");
      // query.limit(1);
      const data = query.find();
      console.log(
        data.then((e) => {
          console.log(e);
        })
      );
    };

    const handleOk = () => {
      ModelState.confirmLoading = true;
      setTimeout(() => {
        ModelState.visible = false;
        ModelState.confirmLoading = false;
      }, 2000);
    };
    const lastFlightRecord= ()=>{
      loadingState.loading=true
      Flight.getLastFlightRecord().then((a)=>{
        console.log("a",a);
        lastFlightData=a;
        copyDataModel();
        loadingState.loading=false;
        console.log("lastFlightData",lastFlightData);
      });

    };

   
   const filterData = computed(() => {
        return CrewMembers.crews.filter((crew) => {
                return crew.name.toLowerCase().includes(searchField.value.toLowerCase())
      });
    });
    onMounted(() => {
      console.log("time",moment().utcOffset());
      if(props.id){
        update.updateFlag=true;
    console.log("id",props.id)
  //  const getcrewquery = new Parse.Query("Crew");
      Flight.getFlight(props.id).then(
        (obj) => {
          console.log("obj",obj);
          // const airplanePointer=obj.get("airplanePointer");
          // const realmID=obj.get("realmID");
          // const departureAirport=obj.get("departureAirport");
          // const destinationAirport=obj.get("destinationAirport");
          const pilotInCommandPointer=obj.get("pilotInCommandPointer");
          const crew2Pointer=obj.get("crew2Pointer");
          const crew3Pointer=obj.get("crew3Pointer");
          const crew4Pointer=obj.get("crew4Pointer");
          // const pilotInCommand=obj.get("pilotInCommand");
          // const crew2= obj.get("crew2");
          // const crew3=obj.get("crew3");
          // const crew4=obj.get("crew4");
          const flightDate=obj.get("flightDate");
          const flightNumber=obj.get("flightNumber");
          const departure=obj.get("departure");
          const destination=obj.get("destination");
          const aircraftType=obj.get("aircraftType");
          const aircraftRegistration=obj.get("aircraftRegistration");
          const outTime=obj.get("outTime");
          const offTime=obj.get("offTime");
          const onTime=obj.get("onTime");
          const blockTime=obj.get("blockTime");
          const flightTime=obj.get("flightTime");
          const picTime=obj.get("picTime");
          const pfTakeOff=obj.get("pfTakeOff");
          const pfLanding=obj.get("pfLanding");
          const autoLand=obj.get("autoLand");
          const goAround=obj.get("goAround");
          const diverted=obj.get("diverted");
          const approachType=obj.get("approachType");
          const totalPassangers=obj.get("totalPassangers");
          const totalPayload=obj.get("totalPayload");
          const flightplanDistance=obj.get("flightplanDistance");
          const notes=obj.get("notes");
          const nightTime=obj.get("nightTime");
          const inTime =obj.get("inTime");
      if(pilotInCommandPointer){
        flightState.PilotInCommand.id=pilotInCommandPointer.id;
        flightState.PilotInCommand.name=pilotInCommandPointer.get("firstName") + ' ' +  pilotInCommandPointer.get("lastName"); 
      }
      if(crew2Pointer){
        flightState.Crew2.id=crew2Pointer.id;
        flightState.Crew2.name=crew2Pointer.get("firstName") + ' ' +  crew2Pointer.get("lastName"); 
      }
      if(crew3Pointer){
        flightState.Crew3.id=crew3Pointer.id;
        flightState.Crew3.name=crew3Pointer.get("firstName") + ' ' +  crew3Pointer.get("lastName"); 
      }
      if(crew4Pointer){
        flightState.Crew4.id=crew4Pointer.id;
        flightState.Crew4.name=crew4Pointer.get("firstName") + ' ' +  crew4Pointer.get("lastName"); 
      }    
      flightState.FlightDate=  flightState.FlightDate=moment(flightDate).format("YYYY/MM/DD");
      flightState.FlightNumber= flightNumber;
      flightState.DepartureAirport= departure;
      flightState.DestinatonAirport= destination;
      flightState.AircraftType= aircraftType;
      flightState.AircraftRegistaton= aircraftRegistration;
      // flightState.airplane= airplane,
      console.log("out",moment.utc(outTime).format("HH:mm"));
      console.log("out",moment.utc(outTime).format("HH:mm"));

      // console.log("out",moment.toUTCString(outTime);
      console.log("out",moment(outTime).format("hh:mm a"));
      console.log("out",moment(outTime).format("hh:mm A"));

      flightState.OutTime= moment.utc(outTime).format("HH:mm");
      flightState.OffTime=moment.utc(offTime).format("HH:mm");
      flightState.OnTime= moment.utc(onTime).format("HH:mm");
      flightState.InTime= moment.utc(inTime).format("HH:mm");

      TimeDetails.outTime=outTime;
      TimeDetails.offTime=offTime;
      TimeDetails.onTime=onTime;
      TimeDetails.inTime=inTime;
      
      flightState.nightTime= moment.utc(nightTime).format("hh:mm");
      flightState.BlockTime= blockTime;
      flightState.FlightTime= flightTime;
      // flightState.PilotInCommand= PilotInCommand;
      // flightState.Crew2= crew2;
      // flightState.Crew3= crew3;
      // flightState.Crew4= crew4;
      flightState.PicTime= picTime;
      flightState.PFTakeOff= pfTakeOff;
      flightState.PfLanding= pfLanding;
      flightState.AutoLand= autoLand;
      flightState.GoAround= goAround;
      flightState.Diverted= diverted;
      ApproachTypes.type= approachType;
      flightState.TotalPassangers= totalPassangers;
      flightState.TotalPayload= totalPayload;
      flightState.FlightPlanDistance= parseInt(flightplanDistance);
      flightState.Note= notes;
        },
        (error) => {
          console.log(error);
        }
      );

  }
      Airplane.getAircrafts().then((data)=>{
        for (const object of data) {

                var obj={
                 aircraftRegisteration: object.get("aircraftRegisteration"),
                 aircraftType: object.get("aircraftType"),
                 id:object.id,
                };
                AircraftTypes.aircraft.push(obj);
            }
      });
    });
    let lastFlightData=reactive();
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const handleCancel = () => {
      ModelState.visible = false;
    };
    const CancleCopyModel = () => {
      ModelState.copyData = false;
      CopyLastFlight.FlightDate= false;
      CopyLastFlight.Aircraft=false;
      CopyLastFlight.DeptoDes=false;
      CopyLastFlight.Crew= false;
    };
    const CancleCrewModel = () => {
      ModelState.addCrew = false;
    };
    const handleSelectData = () => {

      const CrewClass=Parse.Object.extend("Crew");
      const crewQuery=new Parse.Query(CrewClass);
      const airplane=Parse.Object.extend("AirPlane");
      const airplaneQuery=new Parse.Query(airplane);
      console.log("date", CopyLastFlight.FlightDate);
      console.log("aircraft", CopyLastFlight.Aircraft);
      console.log("dep", CopyLastFlight.DeptoDes);
      console.log("Crew", CopyLastFlight.Crew);
     if(CopyLastFlight.FlightDate){
       console.log("CopyLastFlight.FlightDate",lastFlightData.date);
          console.log(typeof(lastFlightData.date))
      
          // console.log("type", typeOf(a));
          console.log("date ",moment(lastFlightData.date).format("YYYY/MM/DD"));
          flightState.FlightDate=moment(lastFlightData.date).format("YYYY/MM/DD"); 
     }
     if(CopyLastFlight.Aircraft){
        if(lastFlightData.airplane){

           airplaneQuery.get(lastFlightData.airplane.id).then((object) => {
            console.log("object", object)
            var type = object.get("aircraftType");
            var registeration = object.get("aircraftRegisteration");

            console.log("type",type);
            console.log("reg",registeration);

            flightState.airplane={
              'aircraftType':type,
              'aircraftRegisteration':registeration,
              'id':lastFlightData.airplane.id,

            };
          }
          ).catch((error) =>  {
            console.log("error",error)
          });

        }


     }
     if(CopyLastFlight.DeptoDes){
          flightState.DepartureAirport= lastFlightData.departure
          flightState.DestinatonAirport= lastFlightData.destination

     }
     if(CopyLastFlight.Crew){
          //flightState.Crew2= lastFlightData.Crew
          if(lastFlightData.pilot){
           
      crewQuery.get(lastFlightData.pilot.id).then((object) => {
            console.log("object", object)
            var name = object.get("firstName")+ ' ' + object.get("lastName");
            console.log("name",name);
            flightState.PilotInCommand={
              'name':name,
              'id':lastFlightData.pilot.id,

            };
          }
          ).catch((error) =>  {
            console.log("error",error)
          });
            
          }
          if(lastFlightData.crew2){
          crewQuery.get(lastFlightData.crew2.id).then((object) => {
            console.log("object", object)
            var name = object.get("firstName")+ ' ' + object.get("lastName");
            console.log("name",name);
            flightState.Crew2={
              'name':name,
              'id':lastFlightData.crew2.id,

            };
          }
          ).catch((error) =>  {
            console.log("error",error)
          });
      
          } 
          if(lastFlightData.crew3){
           crewQuery.get(lastFlightData.crew3.id).then((object) => {
            console.log("object", object)
            var name = object.get("firstName")+ ' ' + object.get("lastName");
            console.log("name",name);
            flightState.Crew3={
              'name':name,
              'id':lastFlightData.crew3.id,

            };
          }
          ).catch((error) =>  {
            console.log("error",error)
          });
      
          } 
          if(lastFlightData.crew4){
          crewQuery.get(lastFlightData.crew4.id).then((object) => {
            console.log("object", object)
            var name = object.get("firstName")+ ' ' + object.get("lastName");
            console.log("name",name);
            flightState.Crew4={
              'name':name,
              'id':lastFlightData.crew4.id,

            };
          }
          ).catch((error) =>  {
            console.log("error",error)
          });
        
          }


     }
      CancleCopyModel();
      


    };
    const setNightTime=()=>{
      console.log("flightState.NightTime",flightState.nightTime)
      function strToMins(t) {
    var s = t.split(":");
     return Number(s[0]) * 60 + Number(s[1]);
    }
      TimeDetails.nightTime=strToMins(flightState.nightTime);
      console.log("TimeDetails.nightTime",TimeDetails.nightTime);

    };
    const setInTime=()=>{
      var d=new Date();
      // var dt1= moment(d).format("MM/DD/YYYY") + ' '+ flightState.InTime+':00';
      var dt2= moment(d).format("DD MMMM YYYY") + ' '+ flightState.InTime+' UTC';
      TimeDetails.inTime=new Date(dt2);
      
      // TimeDetails.inTime=new Date(dt1).toISOString();

    };
    const setOnTime=()=>{
      var d=new Date();
      // var dt1= moment(d).format("MM/DD/YYYY") + ' '+ flightState.OnTime+':00';
      // TimeDetails.onTime=new Date(dt1).toISOString();
      var dt2= moment(d).format("DD MMMM YYYY") + ' '+ flightState.OnTime+' UTC';
       console.log("dt2",dt2)
       TimeDetails.onTime=new Date(dt2);

    };
    const setOutTime=()=>{
      var d=new Date();
      // var dt1= moment(d).format("MM/DD/YYYY") + ' '+ flightState.OutTime+':00';
       var dt2= moment(d).format("DD MMMM YYYY") + ' '+ flightState.OutTime+' UTC';
       console.log("dt2",dt2)
       TimeDetails.outTime=new Date(dt2);
       
     // TimeDetails.outTime=new Date(dt1).toISOString();
    //  TimeDetails.outTime=new Date(moment.utc(dt1).format("yyyy/MM/DD,HH:mm"));

    //  TimeDetails.outTime=moment(moment.utc(dt1).format("yyyy/MM/DD,HH:mm")).utcOffset(moment().utcOffset());
     console.log("TimeDetails.outTime", TimeDetails.outTime);
    //  console.log("new Date(dt1).toISOString()",new Date(dt1).toUTCString());
      // console.log("new Date(dt1).toISOString()",moment.toUTCString(dt1));
      // console.log("new Date(dt1).toISOString()",moment.utc(dt1).format("yyyy/MM/DD,HH:mm"));
// console.log("offset",moment(moment.utc(dt1).format("yyyy/MM/DD,HH:mm")).utcOffset(moment().utcOffset()));


    };
    const setOffTime=()=>{
      // console.log("flightState.OutTime",flightState.OutTime);
      var d=new Date();
      // var dt1= moment(d).format("MM/DD/YYYY") + ' '+ flightState.OffTime+':00';
       var dt2= moment(d).format("DD MMMM YYYY") + ' '+ flightState.OffTime+' UTC';
       console.log("dt2",dt2)

       TimeDetails.offTime=new Date(dt2);


      // TimeDetails.offTime=new Date(dt1).toISOString();

      // console.log("d",d );
      // var out =flightState.OutTime;
      // var mins= parseInt(out.slice(-2), 10)//parseInt(number, 10)
      // var hour=parseInt(out.substring(0,2), 10)
      // console.log("min",mins);
      // console.log("hour",hour)
      // var space = out.replace(':',' ');
      // console.log("space",space);
      // console.log("utc",d.toUTCString()); 
      
      // var dt= moment(d).format("yyyy-MM-DD") +' '+flightState.OutTime+':00';
      // console.log("d format",moment(d).format("yyyy-MM-DD"));
      // console.log("dt",dt);
      // console.log("dt1",dt1);
      // console.log("dt1",new Date(dt1).toUTCString);
      //  console.log("dt1",new Date(dt1).toISOString());
      // var year=moment(d).format("yyyy")
      // var month=moment(d).format("MM")
      // var day=moment(d).format("DD");
      // console.log("dateee", new Date(Date.UTC(year, month, day, hour, mins)));
      // var ut=new Date(Date.UTC(year, month, day, hour, mins))
      // console.log("ut",ut.toUTCString());
      // console.log("dt utc",new Date(dt).toUTCString());

      // console.log("dt",new Date(dt).toISOString());
      


    };
    const display =()=>{
      console.log("date",flightState.FlightDate._d.toUTCString());
      console.log("final",moment(flightState.FlightDate).format("YYYY MM Do"));
      console.log(moment(flightState.FlightDate).format("yyyy-MM-DD"));
      var date=moment(flightState.FlightDate).format("yyyy-MM-DD")
      var stringdate = new Date(date).toISOString();
      console.log("stringdate",stringdate);

      console.log("date",new Date('02 October 2011 14:48 UTC'));
      console.log("date",flightState.FlightDate._d.toISOString());

    };
    const TimeDetails=reactive({
      offTime:'',
      onTime:'',
      inTime:'',
      outTime:'',
      nightTime:0,
    });
    const rules = {
      FlightDate: [
        {
          required: true,
          message: "Please input FlightDate ",
        },
      ],
      FlightNumber: [
        {
          required: true,
          message: "Please input FlightNumber ",
          trigger: "blur",
        },
      ],
      DepartureAirport: [
        {
          required: true,
          message: "Please input DepartureAirport",
          trigger: "blur",
        },
      ],
      DestinatonAirport: [
        {
          required: true,
          message: "Please input DestinatonAirport",
          trigger: "blur",
        },
      ],
      // airplane: [
      //   {
      //     required: true,
      //     message: "Please Select Airplane",
      //     trigger: "change",
      //   },
      // ],
      // AircraftType: [
      //   {
      //     required: true,
      //     message: "Please Input AircraftType",
      //     trigger: "blur",
      //   },
      // ],
      // // AircraftRegistaton: [
      // //   {
      // //     required: true,
      // //     message: "Please Input AircraftRegistaton",
      // //     trigger: "blur",
      // //   },
      // // ],
      OutTime: [
        {
          required: true,
          message: "Please Input Outtim",
          trigger: "blur",
        },
      ],
      OffTime: [
        {
          required: true,
          message: "Please Input OffTime",
          trigger: "blur",
        },
      ],
      OnTime: [
        {
          required: true,
          message: "Please Input OnTime",
          trigger: "blur",
        },
      ],
      InTime: [
        {
          required: true,
          message: "Please Input InTime",
          trigger: "blur",
        },
      ],
      NighTime: [
        {
          required: true,
          message: "Please Input NighTime",
          trigger: "blur",
        },
      ],

      // PicTime: [
      //   {
      //     required: true,
      //     message: "Please Select PicTime",
      //     trigger: "blur",
      //   },
      // ],
      // PFTakeOff: [
      //   {
      //     required: true,
      //     message: "Please Select PFTakeOff",
      //     trigger: "blur",
      //   },
      // ],
      // PfLanding: [
      //   {
      //     required: true,
      //     message: "Please Select PfLanding",
      //     trigger: "blur",
      //   },
      // ],
      // AutoLand: [
      //   {
      //     required: true,
      //     message: "Please Select AutoLand",
      //     trigger: "blur",
      //   },
      // ],
      // GoAround: [
      //   {
      //     required: true,
      //     message: "Please Select GoAround",
      //     trigger: "blur",
      //   },
      // ],
      // Diverted: [
      //   {
      //     required: true,
      //     message: "Please Select Diverted",
      //     trigger: "blur",
      //   },
      // ],
      // BlockTime: [
      //   { required: true, message: "Please Input BlockTime", trigger: "blur" },
      // ],
      // FlightTime: [
      //   { required: true, message: "Please Input FlightTime", trigger: "blur" },
      // ],
      // ApproachType: [
      //   {
      //     required: true,
      //     message: "Please Input ApproachType",
      //     trigger: "change",
      //   },
      // ],
      // TotalPassangers: [
      //   {
      //     required: true,
      //     message: "Please Input TotalPassangers",
      //     trigger: "blur",
      //   },
      // ],
      // TotalPayload: [
      //   {
      //     required: true,
      //     message: "Please Input TotalPayload",
      //     trigger: "blur",
      //   },
      // ],
      // FlightPlanDistance: [
      //   {
      //     required: true,
      //     message: "Please Input FlightPlanDistance",
      //     trigger: "blur",
      //   },
      // ],

      Note: [
        {
          required: true,
          message: "Please Input Notes",
          trigger: "blur",
        },
      ],
    };
    return {
      CopyLastFlight,
      copyDataModel,
      formRef,
      rules,
      ModelState,
      showModal,
      handleOk,
      handleCancel,
      modelExample,
      CrewMembers,
      showCrewModel,
      NationalityState,
      country,
      AircraftTypes,
      ApproachTypes,
      BasicRef,
      CancleCopyModel,
      CancleCrewModel,
      handleSelectData,
      addFlightMethod,
      selectCrewMember,
      onFinishFailed,
      flightState,
      lastFlightRecord,
      lastFlightData,
      filterData,
      searchField,
      loadingState,
      displayTime,
      setBlockTime,
      setFlightTime,
      added,
      getCrewMembers,
      display,
      TimeDetails,
      setInTime,
      setOnTime,
      setOutTime,
      setOffTime,
      setNightTime,
      update


    };
  },
});
</script>
<style scoped>
.crew-members {
  display: inline;
}
</style>
