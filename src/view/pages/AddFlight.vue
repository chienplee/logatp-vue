<template>
  <div>
    <sdPageHeader title="Add Flight">
      <template v-slot:buttons>
        <div class="page-header-actions">
          <sdButton @click="lastFlightRecord();copyDataModel();" size="small" type="primary">
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
                    <a-col :md="6" :xs="24">
                      <a-form-item name="Fli" label="FlightDate(UTC)">
                        <a-date-picker v-model:value="flightState.FlightDate" />
                      </a-form-item>
                    </a-col>
                    <a-col :md="6" :xs="24">
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
                    <a-col :md="6" :xs="24">
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
                    <a-col :md="6" :xs="24">
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
                      <a-form-item
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
                            v-for="pro in AircraftTypes.types"
                            :key="pro"
                          >
                            {{ pro[0] }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>

                    <a-col :md="8" :xs="24">
                      <a-form-item
                        ref="AircraftType"
                        label="Aircraft Type"
                        name="AircraftType"
                      >
                        <!-- v-model:value="flightState.airplane[0]" -->
                        <a-input
                          v-model:value="flightState.airplane[0]"
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
                          v-model:value="flightState.airplane[1]"
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
                          v-model:value="flightState.OffTime"
                          placeholder="HHMM"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="6" :xs="24">
                      <a-form-item ref="OnTime" name="OnTime" label="On Time ">
                        <a-input
                          v-model:value="flightState.OnTime"
                          placeholder="HHMM"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="6" :xs="24">
                      <a-form-item ref="InTime" name="name" label="In Time">
                        <a-input
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
          <!-- <a-col :md="24" :xs="24">
          <sdCards title="CREW">
            <a-row>
              <a-col :md="6" :xs="24">
                <a-button
                  type="primary"
                  @click="showModal()"
                  html-type="submit"
                >
                  Pilot in Command
                </a-button>
              </a-col>

              <a-col :md="6" :xs="24">
                <a-button
                  type="primary"
                  @click="showModal()"
                  html-type="submit"
                >
                  Crew 2
                </a-button>
              </a-col>
              <a-col :md="6" :xs="24">
                <a-button
                  type="primary"
                  @click="showModal()"
                  html-type="submit"
                >
                  Crew 3
                </a-button>
              </a-col>
              <a-col :md="6" :xs="24">
                <a-button
                  type="primary"
                  @click="showModal()"
                  html-type="submit"
                >
                  Crew 4
                </a-button>
              </a-col>
            </a-row>
          </sdCards>
        </a-col> -->
          <sdCards title="CREW">
            <div class="crew-members">
              <span @click="showModal('pilot')">
                <sdFeatherIcons type="user" size="16" />
              </span>
              <input
                v-model="flightState.PilotInCommand.name"
                type="text"
                disabled
                placeholder="Pilot In Command"
              />
            </div>
            <div class="crew-members">
              <span @click="showModal('crew2')">
                <sdFeatherIcons type="user" size="16" />
              </span>

              <input
                v-model="flightState.Crew2.name"
                type="text"
                disabled
                placeholder="Crew2"
              />
            </div>
            <div class="crew-members">
              <span @click="showModal('crew3')">
                <sdFeatherIcons type="user" size="16" />
              </span>
              <input
                v-model="flightState.Crew3.name"
                type="text"
                disabled
                placeholder="Crew3"
              />
            </div>
            <div class="crew-members">
              <span @click="showModal('crew4')">
                <sdFeatherIcons type="user" size="16" />
              </span>
              <input
                type="text"
                v-model="flightState.Crew4.name"
                disabled
                placeholder="Crew4"
              />
            </div>
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
                          size="large"
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
                          size="large"
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
                          size="large"
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
                          size="large"
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
                          size="large"
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
                          size="large"
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
                    <a-col :md="6" :xs="24">
                      <a-form-item
                        ref="ApproachType"
                        name="ApproachType"
                        label="Approach Type"
                      >
                        <a-select
                          v-model:value="ApproachTypes.type"
                          style="width: 100px"
                        >
                          <a-select-option value="">
                            Select Aircraft
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
                    <a-col :md="6" :xs="24">
                      <a-form-item
                        ref="TotalPassangers"
                        name="TotalPassangers"
                        label="Total Passangers "
                      >
                        <a-input
                          v-model:value="flightState.TotalPassangers"
                          placeholder="0 "
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="6" :xs="24">
                      <a-form-item
                        ref="TotalPayload"
                        name="TotalPayload"
                        label="Total Payload(Tons) "
                      >
                        <a-input
                          v-model:value="flightState.TotalPayload"
                          placeholder="0.0 "
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="6" :xs="24">
                      <a-form-item
                        ref="FlightPlanDistance"
                        name="FlightPlanDistance"
                        label="Flight Plan Distance(NM) "
                      >
                        <a-input
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
          <a-col :xs="24">
            <sdCards>
              <a-form-item :wrapper-col="{ offset: 23 }">
                <sdButton type="primary" html-type="submit"
                  >Add Flight</sdButton
                >
              </a-form-item>
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
        <AddCrew></AddCrew>
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
                <a-checkbox @change="onChangeDate()" :checked="CopyLastFlight.FlightDate"
                  >Flight Date</a-checkbox
                >
              </a-col>
              <a-col :md="24" :xs="24">
                <a-checkbox @change="onChangeAircraft()" :value="CopyLastFlight.AirCraft">Aircraft</a-checkbox>
              </a-col>
              <a-col :md="24" :xs="24">
                <a-checkbox @change="onChangeDeptoDes()" :value="CopyLastFlight.DeptoDes">Departure to Destination</a-checkbox>
              </a-col>
              <a-col :md="24" :xs="24">
                <a-checkbox @change="onChangeCrew()" :value="CopyLastFlight.Crew">Crew</a-checkbox>
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
            <a-input placeholder="Search by Crew Name">
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
        <div v-for="crew in CrewMembers.crews" :key="crew.name">
          <Crew @click="selectCrewMember(crew);handleCancel()">
            {{ crew.name }}
          </Crew>
        </div>
      </Modal>
    </Main>
  </div>
</template>

<script>
import { Main } from "../styled";
import { defineComponent, ref, reactive } from "vue";
//import Alert from '../../components/alerts/alerts';
// import {Modals} from "../../components/modals/Modals.vue";
import Modal from "../../components/modals/Modals.vue";
import AddCrew from "./AddCrew";
import Crew from "../../customComponents/Crew.vue";
import moment from "moment";
import  Flight from '../../server/Flight.js';
import CrewHelper from '../../server/Crew.js'
import {
  FormValidationWrap,
  VerticalFormStyleWrap,
} from "../forms/overview/Style";
import Parse from "parse";

import { onMounted } from "vue";

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
  setup() {
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
      airplane: [null, null],
      OutTime: "",
      OffTime: "",
      OnTime: "",
      InTime: "",
      nightTime: "",
      BlockTime: "",
      FlightTime: "",
      PilotInCommand: "",
      Crew2: "",
      Crew3: "",
      Crew4: "",
      PicTime: false,
      PFTakeOff: false,
      PfLanding: false,
      AutoLand: false,
      GoAround: false,
      Diverted: false,
      ApproachType: "",
      TotalPassangers: "",
      TotalPayload: "",
      FlightPlanDistance: "",
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
      types: [
        ["N123", "PHE"],
        ["N12", "PHEN123"],
        ["N1", "PHEN1234444"],
      ],
    });
    const CopyLastFlight = reactive({
      FlightDate: false,
      Aircraft: false,
      DeptoDes: false,
      Crew: false,
    });

    const ApproachTypes = reactive({
      type: "",
      types: [
        "ILS",
        "RNP",
        "LOC",
        "LDA",
        "VOR",
        "NDB",
        "PAR",
        "Visual",
        "Contat",
        "Circling",
      ],
    });

    // methods
    const AddFlight = Parse.Object.extend("Flight");
    const addFlight = new AddFlight();

    const addFlightMethod = async () => {
    var pointer=null;
    var crew2=null;
    var crew3=null;
    var crew4=null;

    console.log("Add Flight");
      const currentUser = Parse.User.current();
      const CrewClass=Parse.Object.extend("Crew");
     const crewQuery=new Parse.Query(CrewClass);
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
  
      const getAdmin = Parse.Object.extend("User");
      const adminquery = new Parse.Query(getAdmin);
      adminquery.equalTo("email", "admin@logatp.com");
      const object = await adminquery.first();
      const acl = new Parse.ACL(Parse.User.current());
      acl.setWriteAccess(object.id, true);
      acl.setReadAccess(object.id, true);
      if (currentUser) {
        addFlight.set({
          pilotInCommandPointer:pointer,
          crew2Pointer:crew2,
          crew3Pointer:crew3,
          crew4Pointer:crew4,
          PilotInCommand: flightState.PilotInCommand.name,
          Crew2: flightState.Crew2.name,
          Crew3: flightState.Crew3.name,
          Crew4: flightState.Crew4.name,
          FlightDate: moment(flightState.FlightDate).format("DD/MM/YYYY"),
          FlightNumber: flightState.FlightNumber,
          DepartureAirport: flightState.DepartureAirport,
          DestinatonAirport: flightState.DestinatonAirport,
          AircraftType: flightState.airplane[0],
          AircraftRegistaton: flightState.airplane[1],
          OutTime: flightState.OutTime,
          OffTime: flightState.OffTime,
          OnTime: flightState.OnTime,
          InTime: flightState.InTime,
          BlockTime: flightState.BlockTime,
          FlightTime: flightState.FlightTime,
          PicTime: flightState.PicTime,
          PFTakeOff: flightState.PFTakeOff,
          PfLanding: flightState.PfLanding,
          AutoLand: flightState.AutoLand,
          GoAround: flightState.GoAround,
          Diverted: flightState.Diverted,
          ApproachType: ApproachTypes.type,
          TotalPassangers: flightState.TotalPassangers,
          TotalPayload: flightState.TotalPayload,
          FlightPlanDistance: flightState.FlightPlanDistance,
          Note: flightState.Note,
          nightTime: flightState.nightTime,
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
              (flightState.FlightPlanDistanc = ""),
              (flightState.Note = "");
            flightState.nightTime = "";
          },
          (error) => {
            alert("Error while adding flight");
            console.log(error);
          }
        );
      }
    };

    const showModal = (feild) => {
      crewFeild.name=feild;
      console.log(" crewFeild.name", crewFeild.name);
      ModelState.visible = true;
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

     });
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
      Flight.getLastFlightRecord().then((a)=>{
        console.log("a",a);
        lastFlightData=a;
        console.log("lastFlightData",lastFlightData);
      });

    };
    onMounted(() => {
      
      // Helper.getCrewMembers();
      // (async () => {
      //   const currentUser = Parse.User.current();

      //   try {
      //     if (currentUser) {
      //       const query = new Parse.Query("Crew");
      //       const query1 = new Parse.Query("Flight");
      //       const flightData = await query1.find();
      //       console.log("flightData", flightData);

      //       const results = await query.find();
      //       try {
      //         for (const obj of flightData) {
      //           const AircraftType = obj.get("AircraftType");
      //           const AircraftRegistaton = obj.get("AircraftRegistaton");

      //           console.log("AircraftType", AircraftType);

      //           console.log("AircraftRegistaton", AircraftRegistaton);
      //           AircraftTypes.types.push([AircraftType, AircraftRegistaton]);
      //         }

      //         for (const object of results) {
      //           const LastName = object.get("lastName");
      //           CrewMembers.crews.push({ name: LastName });
      //           console.log("lastName", LastName);
      //         }
      //       } catch (error) {
      //         console.error("Error while fetching lastName", error);
      //       }
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // })();
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
    };
    const CancleCrewModel = () => {
      ModelState.addCrew = false;
    };
    const handleSelectData = () => {
      console.log("date", CopyLastFlight.FlightDate);
      console.log("aircraft", CopyLastFlight.Aircraft);
      console.log("dep", CopyLastFlight.DeptoDes);
      console.log("Crew", CopyLastFlight.Crew);
     if(CopyLastFlight.FlightDate){
          flightState.FlightDate= lastFlightData.date
     }
     if(CopyLastFlight.Aircraft){
          flightState.AircraftType= lastFlightData.Aircraft

     }
     if(CopyLastFlight.DeptoDes){
          flightState.DepartureAirport= lastFlightData.departure
          flightState.DestinatonAirport= lastFlightData.destination

     }
     if(CopyLastFlight.Crew){
          flightState.Crew2= lastFlightData.Crew

     }
      CancleCopyModel();
      onChangeDate();
      CopyLastFlight.FlightDate= false;
      CopyLastFlight.Aircraft=false;
      CopyLastFlight.DeptoDes=false;
      CopyLastFlight.Crew= false;


    };
    const onChangeDate = () => {
      CopyLastFlight.FlightDate = !CopyLastFlight.FlightDate;
    };
    const onChangeCrew = () => {
      CopyLastFlight.Crew = !CopyLastFlight.Crew;
    };const onChangeAircraft = () => {
      CopyLastFlight.Aircraft = !CopyLastFlight.Aircraft;
    };const onChangeDeptoDes = () => {
      CopyLastFlight.DeptoDes = !CopyLastFlight.DeptoDes;
    };
    const rules = {
      FlightDate: [
        {
          required: true,
          message: "Please input FlightDate ",
          trigger: "blur",
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
      BlockTime: [
        { required: true, message: "Please Input BlockTime", trigger: "blur" },
      ],
      FlightTime: [
        { required: true, message: "Please Input FlightTime", trigger: "blur" },
      ],
      // ApproachType: [
      //   {
      //     required: true,
      //     message: "Please Input ApproachType",
      //     trigger: "change",
      //   },
      // ],
      TotalPassangers: [
        {
          required: true,
          message: "Please Input TotalPassangers",
          trigger: "blur",
        },
      ],
      TotalPayload: [
        {
          required: true,
          message: "Please Input TotalPayload",
          trigger: "blur",
        },
      ],
      FlightPlanDistance: [
        {
          required: true,
          message: "Please Input FlightPlanDistance",
          trigger: "blur",
        },
      ],

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
      onChangeDate,
      onChangeAircraft,
      onChangeDeptoDes,
      onChangeCrew,
      addFlightMethod,
      selectCrewMember,
      onFinishFailed,
      flightState,
      lastFlightRecord,
      lastFlightData
    };
  },
});
</script>
<style scoped>
.crew-members {
  display: inline;
}
</style>
