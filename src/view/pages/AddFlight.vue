<template>
  <div>
    <a-spin :spinning="loadingState.loading">
      <sdPageHeader title="Add Flight">
        <template v-slot:buttons>
          <div class="page-header-actions">
            <sdButton @click="lastFlightRecord()" size="small" type="primary">
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
                          <a-date-picker
                            v-model:value="flightState.FlightDate"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :md="12" :xs="24">
                        <a-form-item
                          ref="FlightNumber"
                          name="FlightNumber"
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
                            @blur="setNightTime()"
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
                            @blur="setNightTime()"
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
                        <select
                          class="ant-select-selection-item"
                          v-model="flightState.airplane"
                          @change="selectAircraft"
                        >
                          <option value="">Select an Aircraft</option>
                          <option
                            v-for="aircraft in AircraftTypes.aircraft"
                            :value="aircraft"
                            :key="aircraft.id"
                          >
                            {{ aircraft.aircraftRegisteration }}
                          </option>
                        </select>
                      </a-col>

                      <a-col :md="8" :xs="24">
                        <a-form-item
                          ref="AircraftType"
                          label="Aircraft Type"
                          name="AircraftType"
                        >
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
                            @blur="
                              setOutTime();
                              setBlockTime();
                              setNightTime();
                            "
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
                            @blur="
                              setOffTime();
                              setFlightTime();
                              setNightTime();
                            "
                            v-model:value="flightState.OffTime"
                            placeholder="HHMM"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :md="6" :xs="24">
                        <a-form-item
                          ref="OnTime"
                          name="OnTime"
                          label="On Time "
                        >
                          <a-input
                            type="time"
                            @blur="
                              setOnTime();
                              setFlightTime();
                              setNightTime();
                            "
                            v-model:value="flightState.OnTime"
                            placeholder="HHMM"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :md="6" :xs="24">
                        <a-form-item ref="InTime" name="InTime" label="In Time">
                          <a-input
                            type="time"
                            @blur="
                              setInTime();
                              setBlockTime();
                              setNightTime();
                            "
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
                            type="text"
                            @blur="setNightTime()"
                            disabled
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
                <a-col @click="showModal('pilot')" :md="12" :xs="24">
                  <span>
                    <sdFeatherIcons type="user" size="16" />
                  </span>
                  <input
                    class="ant-input"
                    v-model="flightState.PilotInCommand.name"
                    type="text"
                    disabled
                    placeholder="Pilot In Command"
                  />
                </a-col>
                <a-col @click="showModal('crew2')" :md="12" :xs="24">
                  <span>
                    <sdFeatherIcons type="user" size="16" />
                  </span>

                  <input
                    class="ant-input"
                    v-model="flightState.Crew2.name"
                    type="text"
                    disabled
                    placeholder="Crew2"
                  />
                </a-col>
                <a-col @click="showModal('crew3')" :md="12" :xs="24">
                  <span>
                    <sdFeatherIcons type="user" size="16" />
                  </span>
                  <input
                    class="ant-input"
                    v-model="flightState.Crew3.name"
                    type="text"
                    disabled
                    placeholder="Crew3"
                  />
                </a-col>
                <a-col @click="showModal('crew4')" :md="12" :xs="24">
                  <span>
                    <sdFeatherIcons type="user" size="16" />
                  </span>
                  <input
                    class="ant-input"
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
                          <a-switch v-model:checked="flightState.PicTime" />
                        </a-form-item>
                      </a-col>
                      <a-col :md="8" :xs="24">
                        <a-form-item
                          ref="PFTakeOff"
                          name="PFTakeOff"
                          label="PF TakeOff "
                        >
                          <a-switch v-model:checked="flightState.PFTakeOff" />
                        </a-form-item>
                      </a-col>
                      <a-col :md="8" :xs="24">
                        <a-form-item
                          ref="PfLanding"
                          name="PfLanding"
                          label="PF Landing "
                        >
                          <a-switch v-model:checked="flightState.PfLanding" />
                        </a-form-item>
                      </a-col>
                      <a-col :md="8" :xs="24">
                        <a-form-item
                          ref="AutoLand"
                          name="AutoLand"
                          label="Autoland "
                        >
                          <a-switch v-model:checked="flightState.AutoLand" />
                        </a-form-item>
                      </a-col>
                      <a-col :md="8" :xs="24">
                        <a-form-item
                          ref="GoAround"
                          name="GoAround"
                          label="Go Around "
                        >
                          <a-switch v-model:checked="flightState.GoAround" />
                        </a-form-item>
                      </a-col>
                      <a-col :md="8" :xs="24">
                        <a-form-item
                          ref="Diverted"
                          name="Diverted"
                          label="Diverted "
                        >
                          <a-switch v-model:checked="flightState.Diverted" />
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
                          <a-select v-model:value="ApproachTypes.type">
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
            <a-col
              :lg="{ span: 4, offset: 20 }"
              :md="{ span: 6, offset: 18 }"
              :xs="{ span: 24, offset: 0 }"
              :sm="{ span: 6, offset: 18 }"
            >
              <sdCards>
                <!-- <a-form-item :wrapper-col="{ offset: 23 }"> -->
                <sdButton type="primary" html-type="submit">{{
                  update.updateFlag ? "Update Flight" : "Add Flight"
                }}</sdButton>
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
                  <input
                    type="checkbox"
                    id="datecheckbox"
                    v-model="CopyLastFlight.FlightDate"
                  />
                  <label for="datecheckbox"> Flight Date </label>
                </a-col>
                <a-col :md="24" :xs="24">
                  <input
                    type="checkbox"
                    id="AirCraftcheckbox"
                    v-model="CopyLastFlight.Aircraft"
                  />
                  <label for="AirCraftcheckbox"> AirCraft </label>
                </a-col>
                <a-col :md="24" :xs="24">
                  <input
                    type="checkbox"
                    id="DepToDescheckbox"
                    v-model="CopyLastFlight.DeptoDes"
                  />
                  <label for="DepToDescheckbox">
                    Departure to Destination
                  </label>
                </a-col>
                <a-col :md="24" :xs="24">
                  <input
                    type="checkbox"
                    id="Crewcheckbox"
                    v-model="CopyLastFlight.Crew"
                  />
                  <label for="crewcheckbox"> Crew </label>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <sdButton @click="handleSelectData()" type="primary" size="small">
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
          <a-row>
            <a-col :md="6" :xs="12" >
              <sdButton @click="showCrewModel()" size="small" type="primary">
                <sdFeatherIcons type="user" size="14" />
                <span> Add Crew</span>
              </sdButton>
            </a-col>
            <a-col :md="6" :xs="12" >
              <sdButton size="small" @click="setSelf()" type="primary">
                <sdFeatherIcons type="layers" size="14" />
                <span>Self</span>
              </sdButton>
            </a-col>
            <a-col :md="6" :xs="12" >
              <sdButton size="small" @click="clearData();handleCancel()" type="primary">
                <sdFeatherIcons type="x" size="14" />
                <span>Clear</span>
              </sdButton>
            </a-col>
            
            <a-col :md="6" :xs="12" class="search-bar">
              <a-input
                placeholder="Search by Crew Name"
                v-model:value="searchField.value"
              >
                <template #suffix>
                  <sdFeatherIcons type="search" size="16" />
                </template>
              </a-input>
            </a-col>
          </a-row>
          <div style="height: 35vh; overflow-x: scroll">
            <div v-for="crew in filterData" :key="crew.name">
              <Crew
                @click="
                  selectCrewMember(crew);
                  handleCancel();
                "
              >
                {{ crew.name }}
              </Crew>
            </div>
          </div>
        </Modal>
      </Main>
    </a-spin>
  </div>
</template>

<script>
import { getDistance } from "geolib";
// import SolarCalc  from 'solar-calc';
import { message } from "ant-design-vue";
import SunCalc from "suncalc";
import { Main } from "../styled";
import { defineComponent, ref, reactive, computed } from "vue";
//import Alert from '../../components/alerts/alerts';
// import {Modals} from "../../components/modals/Modals.vue";
import Modal from "../../components/modals/Modals.vue";
import AddCrew from "./AddCrew";
import Crew from "../../customComponents/Crew.vue";
import moment from "moment";
import PropTypes from "vue-types";
import circularview from "../../server/circularview";

import Airplane from "../../server/Airplane.js";
import Flight from "../../server/Flight.js";
import CrewHelper from "../../server/Crew.js";
import {
  FormValidationWrap,
  VerticalFormStyleWrap,
} from "../forms/overview/Style";
import Parse from "parse";

import { onMounted } from "vue";
import jsHelper from "../../helper/JsHelper.js";
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
    id: {
      required: false,
      type: PropTypes.String,
    },
  },
  setup(props) {
    const update = reactive({
      updateFlag: false,
    });
    const loadingState = reactive({
      loading: false,
    });
    const selectCrewMember = (cr) => {
      if (crewFeild.name == "pilot") {
        flightState.PilotInCommand = cr;
      } else if (crewFeild.name == "crew2") {
        flightState.Crew2 = cr;
      } else if (crewFeild.name == "crew3") {
        flightState.Crew3 = cr;
      } else if (crewFeild.name == "crew4") {
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
        name: "",
        id: "",
      },
      Crew2: {
        name: "",
        id: "",
      },
      Crew3: {
        name: "",
        id: "",
      },
      Crew4: {
        name: "",
        id: "",
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
      crews: [],
    });

    const AircraftTypes = reactive({
      aircraft: [],
    });
    const CopyLastFlight = reactive({
      FlightDate: false,
      Aircraft: false,
      DeptoDes: false,
      Crew: false,
    });
    const searchField = reactive({ value: "" });

    const ApproachTypes = reactive({
      type: "",
      types: jsHelper.content,
    });

    // methods
    const displayTime = (time1, time2) => {
      if (time1 && time2) {
        return strToMins(time1) - strToMins(time2);
      } else {
        return 0;
      }
      function strToMins(t) {
        var s = t.split(":");
        return Number(s[0]) * 60 + Number(s[1]);
      }
    };
    const setBlockTime = () => {
      var blockTime = displayTime(flightState.InTime, flightState.OutTime);
      flightState.BlockTime = blockTime;
    };
    const setFlightTime = () => {
      var flightTime = (flightState.FlightTime = displayTime(
        flightState.OnTime,
        flightState.OffTime,
        
      ));
      
        flightState.FlightTime = flightTime
           };

    const addFlightMethod = async () => {
      loadingState.loading = true;
      const AddFlight = Parse.Object.extend("Flight");
      const addFlight = new AddFlight();
      const AirPort = Parse.Object.extend("Airport");
      var pointer = null;
      var crew2 = null;
      var crew3 = null;
      var crew4 = null;

      const currentUser = Parse.User.current();
      const CrewClass = Parse.Object.extend("Crew");
      const crewQuery = new Parse.Query(CrewClass);

      const airportDestinationQuery = new Parse.Query(AirPort);
      const departureQuery = new Parse.Query(AirPort);
      airportDestinationQuery.equalTo(
        "IATAcode",
        flightState.DestinatonAirport.toUpperCase()
      );
      departureQuery.equalTo(
        "IATAcode",
        flightState.DepartureAirport.toUpperCase()
      );
      const destinationPointer = await airportDestinationQuery.first();
      const departureAirport = await departureQuery.first();

      await crewQuery
        .get(flightState.PilotInCommand.id)
        .then((object) => {
          pointer = object;
        })
        .catch((error) => {
          pointer = null;
          console.log("error", error);
        });
      await crewQuery
        .get(flightState.PilotInCommand.id)
        .then((object) => {
          pointer = object;
        })
        .catch((error) => {
          pointer = null;
          console.log("error", error);
        });
      await crewQuery
        .get(flightState.Crew2.id)
        .then((object) => {
          crew2 = object;
        })
        .catch((error) => {
          crew2 = null;
          console.log("error", error);
        });
      await crewQuery
        .get(flightState.Crew3.id)
        .then((object) => {
          crew3 = object;
        })
        .catch((error) => {
          crew3 = null;
          console.log("error", error);
        });
      await crewQuery
        .get(flightState.Crew4.id)
        .then((object) => {
          crew4 = object;
        })
        .catch((error) => {
          crew4 = null;
          console.log("error", error);
        });
      var airplanePointer = null;
      const getAdmin = Parse.Object.extend("User");
      const Airplane = Parse.Object.extend("AirPlane");
      const airplane = new Airplane();
      const airplanequery = new Parse.Query(Airplane);
      await airplanequery
        .get(flightState.airplane.id)
        .then((obj) => {
          airplanePointer = obj;
        })
        .catch((err) => {
          console.log("err", err);
          airplanePointer = null;
        });
      const acl = new Parse.ACL(Parse.User.current());
      if (!airplanePointer) {
        airplane.set({
          aircraftType: flightState.aircraftType,
          aircraftRegistration: flightState.AircraftRegistaton,
          realmID: jsHelper.makeid(10),
        });
        airplane.setACL(acl);
        await airplane.save().then((obj) => {
          airplanePointer = obj;
        });
      }
      const adminquery = new Parse.Query(getAdmin);
      adminquery.equalTo("username", "admin@logatp.com");
      const object = await adminquery.first();

      acl.setWriteAccess(object.id, true);
      acl.setReadAccess(object.id, true);
      if (currentUser) {
        if (props.id) {
          var query = new Parse.Query("Flight");
          query.get(props.id).then(async (obj) => {
            var d = new Date(
              new Date(
                moment(flightState.FlightDate).format("yyyy-MM-DD")
              ).toISOString()
            );
            obj.set("aircraftType", flightState.aircraftType);
            obj.set("aircraftRegistration", flightState.AircraftRegistaton);
            obj.set("airplanePointer", airplanePointer);
            obj.set("flightDate", d);
            obj.set("flightNumber", flightState.FlightNumber);
            obj.set("blockTime", flightState.BlockTime);
            obj.set("Note", flightState.notes);
            obj.set("flightTime", flightState.FlightTime);
            obj.set("picTime", flightState.PicTime);
            obj.set("pfTakeOff", flightState.PFTakeOff);
            obj.set("pfLanding", flightState.PfLanding);
            obj.set("autoLand", flightState.AutoLand);
            obj.set("goAround", flightState.GoAround);
            obj.set("diverted", flightState.Diverted);
            obj.set("approachType", ApproachTypes.type);
            obj.set("totalPassangers", flightState.TotalPassangers);
            obj.set("totalPayload", parseFloat(flightState.TotalPayload));
            obj.set(
              "flightplanDistance",
              parseInt(flightState.FlightPlanDistance)
            );
            obj.set("notes", flightState.Note);
            obj.set("nightTime", flightState.nightTime);
            obj.set("departureAirport", departureAirport);
            obj.set("destinationAirport", destinationPointer);
            obj.set("pilotInCommandPointer", pointer);
            obj.set("crew2Pointer", crew2);
            obj.set("crew3Pointer", crew3);
            obj.set("crew4Pointer", crew4);
            obj.set("crew2", flightState.Crew2.name);
            obj.set("crew3", flightState.Crew3.name);
            obj.set("crew4", flightState.Crew4.name);
            obj.set("pilotInCommand", flightState.PilotInCommand.name);
            obj.set("departure", flightState.DepartureAirport);
            obj.set("destination", flightState.DestinatonAirport);
            var outTime = new Date(moment.utc(TimeDetails.outTime));
            var offTime = new Date(moment.utc(TimeDetails.offTime));
            var onTime = new Date(moment.utc(TimeDetails.onTime));
            var inTime = new Date(moment.utc(TimeDetails.inTime));
            obj.set("outTime", outTime);
            obj.set("offTime", offTime);
            obj.set("onTime", onTime);
            obj.set("inTime", inTime);
            obj
              .save()
              .then(() => {
                message.success("Flight Updated");
                loadingState.loading = false;
              })
              .catch(() => {
                loadingState.loading = false;
                message.error("error");
              });
          });
        } else {
          await addFlight.set({
            airplanePointer: airplanePointer,
            realmID: jsHelper.makeid(10),
            departureAirport: departureAirport,
            destinationAirport: destinationPointer,
            pilotInCommandPointer: pointer,
            crew2Pointer: crew2,
            crew3Pointer: crew3,
            crew4Pointer: crew4,
            pilotInCommand: flightState.PilotInCommand.name,
            crew2: flightState.Crew2.name,
            crew3: flightState.Crew3.name,
            crew4: flightState.Crew4.name,
            flightDate: new Date(
              new Date(
                moment(flightState.FlightDate).format("yyyy-MM-DD")
              ).toISOString()
            ), //new Date (moment(flightState.FlightDate).format("DD/MM/YYYY")),
            flightNumber: flightState.FlightNumber,
            departure: flightState.DepartureAirport,
            destination: flightState.DestinatonAirport,
            aircraftType: flightState.aircraftType,
            aircraftRegistration: flightState.AircraftRegistaton,
            outTime: new Date(moment.utc(TimeDetails.outTime)),
            offTime: new Date(moment.utc(TimeDetails.offTime)),
            onTime: new Date(moment.utc(TimeDetails.onTime)),
            inTime: new Date(moment.utc(TimeDetails.inTime)),
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
            nightTime: flightState.nightTime,
          });
          addFlight.setACL(acl);
          await addFlight.save().then(
            () => {
              message.success("flight added");
              (flightState.PilotInCommand = ""), (flightState.Crew2 = "");
              (flightState.Crew3 = ""),
                (flightState.Crew4 = ""),
                (flightState.FlightDate = ""),
                (flightState.FlightNumber = ""),
                (flightState.DepartureAirport = ""),
                (flightState.DestinatonAirport = ""),
                (flightState.airplane = ""),
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
              loadingState.loading = false;
            },
            (error) => {
              message.error("Error while adding flight");

              console.log(error);
            }
          );
        }
      }
    };
    const added = () => {
      CancleCrewModel();
      getCrewMembers();
    };
    const getCrewMembers = () => {
      loadingState.loading = true;
      CrewHelper.getCrewMembers().then((data) => {
        //  var arr=[];
        CrewMembers.crews = [];
        for (const object of data) {
          var obj = {
            name: object.get("firstName") + " " + object.get("lastName"),
            id: object.id,
          };
          CrewMembers.crews.push(obj);
        }
        loadingState.loading = false;
        ModelState.visible = true;
      });
    };
    const showModal = (feild) => {
      crewFeild.name = feild;
      getCrewMembers();
    };
    const copyDataModel = () => {
      ModelState.copyData = true;
    };
    const crewFeild = reactive({
      name: null,
    });
    const showCrewModel = () => {
      ModelState.addCrew = true;
      // const query = new Parse.Query("Crew");
      // query.limit(1);
      // const data = query.find();
    };

    const handleOk = () => {
      ModelState.confirmLoading = true;
      setTimeout(() => {
        ModelState.visible = false;
        ModelState.confirmLoading = false;
      }, 2000);
    };
    const lastFlightRecord = () => {
      loadingState.loading = true;
      Flight.getLastFlightRecord().then((a) => {
        lastFlightData = a;
        copyDataModel();
        loadingState.loading = false;
      });
    };

    const filterData = computed(() => {
      return CrewMembers.crews.filter((crew) => {
        return crew.name
          .toLowerCase()
          .includes(searchField.value.toLowerCase());
      });
    });
    onMounted(async () => {
      if(!props.id){
        circularview.getCircularViews().then(res=>{
          console.log(res)
          flightState.PicTime=res.setPicFlight
        })
      }
      if (props.id) {
        loadingState.loading = true;

        update.updateFlag = true;
        //  const getcrewquery = new Parse.Query("Crew");
        await Flight.getFlight(props.id).then(
          (obj) => {
            const airplanePointer = obj.get("airplanePointer");
            const pilotInCommandPointer = obj.get("pilotInCommandPointer");
            const crew2Pointer = obj.get("crew2Pointer");
            const crew3Pointer = obj.get("crew3Pointer");
            const crew4Pointer = obj.get("crew4Pointer");
            const flightDate = obj.get("flightDate");
            const flightNumber = obj.get("flightNumber");
            const departure = obj.get("departure");
            const destination = obj.get("destination");
            const aircraftType = obj.get("aircraftType");
            const aircraftRegistration = obj.get("aircraftRegistration");
            const outTime = obj.get("outTime");
            const offTime = obj.get("offTime");
            const onTime = obj.get("onTime");
            const blockTime = obj.get("blockTime");
            const flightTime = obj.get("flightTime");
            const picTime = obj.get("picTime");
            const pfTakeOff = obj.get("pfTakeOff");
            const pfLanding = obj.get("pfLanding");
            const autoLand = obj.get("autoLand");
            const goAround = obj.get("goAround");
            const diverted = obj.get("diverted");
            const approachType = obj.get("approachType");
            const totalPassangers = obj.get("totalPassangers");
            const totalPayload = obj.get("totalPayload");
            const flightplanDistance = obj.get("flightplanDistance");
            const notes = obj.get("notes");
            const nightTime = obj.get("nightTime");
            const inTime = obj.get("inTime");
            if (pilotInCommandPointer) {
              flightState.PilotInCommand.id = pilotInCommandPointer.id;
              flightState.PilotInCommand.name =
                pilotInCommandPointer.get("firstName") +
                " " +
                pilotInCommandPointer.get("lastName");
            }
            if (crew2Pointer) {
              flightState.Crew2.id = crew2Pointer.id;
              flightState.Crew2.name =
                crew2Pointer.get("firstName") +
                " " +
                crew2Pointer.get("lastName");
            }
            if (airplanePointer) {
              // console.log("reg1178",registeration);
              flightState.airplane = {
                aircraftType: aircraftType,
                aircraftRegisteration: aircraftRegistration,
                id: airplanePointer.id,
              };
            }
            if (crew3Pointer) {
              flightState.Crew3.id = crew3Pointer.id;
              flightState.Crew3.name =
                crew3Pointer.get("firstName") +
                " " +
                crew3Pointer.get("lastName");
            }
            if (crew4Pointer) {
              flightState.Crew4.id = crew4Pointer.id;
              flightState.Crew4.name =
                crew4Pointer.get("firstName") +
                " " +
                crew4Pointer.get("lastName");
            }
            flightState.FlightDate = flightState.FlightDate =
              moment(flightDate).format("YYYY/MM/DD");
            flightState.FlightNumber = flightNumber;
            flightState.DepartureAirport = departure;
            flightState.DestinatonAirport = destination;
            flightState.aircraftType = aircraftType;
            flightState.AircraftRegistaton = aircraftRegistration;
            // flightState.airplane= airplane,
            flightState.OutTime = moment.utc(outTime).format("HH:mm");
            flightState.OffTime = moment.utc(offTime).format("HH:mm");
            flightState.OnTime = moment.utc(onTime).format("HH:mm");
            flightState.InTime = moment.utc(inTime).format("HH:mm");

            TimeDetails.outTime = outTime;
            TimeDetails.offTime = offTime;
            TimeDetails.onTime = onTime;
            TimeDetails.inTime = inTime;

            flightState.nightTime = nightTime
            flightState.BlockTime = blockTime;
            flightState.FlightTime = flightTime;
            flightState.PicTime = picTime;
            flightState.PFTakeOff = pfTakeOff;
            flightState.PfLanding = pfLanding;
            flightState.AutoLand = autoLand;
            flightState.GoAround = goAround;
            flightState.Diverted = diverted;
            ApproachTypes.type = approachType;
            flightState.TotalPassangers = totalPassangers;
            flightState.TotalPayload = totalPayload;
            flightState.FlightPlanDistance = parseInt(flightplanDistance);
            flightState.Note = notes;
            loadingState.loading = false;
          },
          (error) => {
            loadingState.loading = false;
            console.log(error);
          }
        );
      }

      await Airplane.getAircrafts().then((data) => {
        for (const object of data) {
          if (object.get("aircraftRegistration")) {
            var obj = {
              aircraftRegisteration: object.get("aircraftRegistration"),
              aircraftType: object.get("aircraftType"),
              id: object.id,
            };
            AircraftTypes.aircraft.push(obj);
          }
        }
      });
    });
    let lastFlightData = reactive();
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const handleCancel = () => {
      ModelState.visible = false;
    };
    const setLoader = () => {
      loadingState.loading = false;
    };
    const CancleCopyModel = () => {
      ModelState.copyData = false;
      CopyLastFlight.FlightDate = false;
      CopyLastFlight.Aircraft = false;
      CopyLastFlight.DeptoDes = false;
      CopyLastFlight.Crew = false;
    };
    const CancleCrewModel = () => {
      ModelState.addCrew = false;
    };
    const handleSelectData = async () => {
      const CrewClass = Parse.Object.extend("Crew");
      const crewQuery = new Parse.Query(CrewClass);
      const airplane = Parse.Object.extend("AirPlane");
      const airplaneQuery = new Parse.Query(airplane);
      if (CopyLastFlight.FlightDate) {
        flightState.FlightDate = moment(lastFlightData.date).format(
          "YYYY/MM/DD"
        );
      }
      if (CopyLastFlight.Aircraft) {
        if (lastFlightData.airplane) {
          airplaneQuery
            .get(lastFlightData.airplane.id)
            .then((object) => {
              var type = object.get("aircraftType");
              var registeration = object.get("aircraftRegistration");
              flightState.airplane = {
                aircraftType: type,
                aircraftRegisteration: registeration,
                id: lastFlightData.airplane.id,
              };
              flightState.aircraftType = flightState.airplane.aircraftType;
              flightState.AircraftRegistaton =
                flightState.airplane.aircraftRegisteration;
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      }
      if (CopyLastFlight.DeptoDes) {
        flightState.DepartureAirport = lastFlightData.departure;
        flightState.DestinatonAirport = lastFlightData.destination;
      }
      if (CopyLastFlight.Crew) {
        //flightState.Crew2= lastFlightData.Crew
        if (lastFlightData.pilot) {
          await crewQuery
            .get(lastFlightData.pilot.id)
            .then((object) => {
              var name = object.get("firstName") + " " + object.get("lastName");
              flightState.PilotInCommand = {
                name: name,
                id: lastFlightData.pilot.id,
              };
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
        if (lastFlightData.crew2) {
          await crewQuery
            .get(lastFlightData.crew2.id)
            .then((object) => {
              var name = object.get("firstName") + " " + object.get("lastName");
              flightState.Crew2 = {
                name: name,
                id: lastFlightData.crew2.id,
              };
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
        if (lastFlightData.crew3) {
          await crewQuery
            .get(lastFlightData.crew3.id)
            .then((object) => {
              var name = object.get("firstName") + " " + object.get("lastName");
              flightState.Crew3 = {
                name: name,
                id: lastFlightData.crew3.id,
              };
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
        if (lastFlightData.crew4) {
          await crewQuery
            .get(lastFlightData.crew4.id)
            .then((object) => {
              var name = object.get("firstName") + " " + object.get("lastName");
              flightState.Crew4 = {
                name: name,
                id: lastFlightData.crew4.id,
              };
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      }
      CancleCopyModel();
    };
    const setSelf = async () => {
      var a = await CrewHelper.findSelf();
      if (!a) {
        message.error("self is not assigned");
        return;
      }
      if (crewFeild.name == "pilot") {
        flightState.PilotInCommand = a;
      } else if (crewFeild.name == "crew2") {
        flightState.Crew2 = a;
      } else if (crewFeild.name == "crew3") {
        flightState.Crew3 = a;
      } else if (crewFeild.name == "crew4") {
        flightState.Crew4 = a;
      }
    };
      const clearData = () => {
      if (crewFeild.name == "pilot") {
        flightState.PilotInCommand = {
          name: "",
          id: "",
        };
      } else if (crewFeild.name == "crew2") {
        flightState.Crew2 = {
          name: "",
          id: "",
        };
      } else if (crewFeild.name == "crew3") {
        flightState.Crew3 = {
          name: "",
          id: "",
        };
      } else if (crewFeild.name == "crew4") {
        flightState.Crew4 = {
          name: "",
          id: "",
        };
      }
    };
    const selectAircraft = () => {
      if (flightState.airplane) {
        flightState.aircraftType = flightState.airplane.aircraftType;
        flightState.AircraftRegistaton =
          flightState.airplane.aircraftRegisteration;
      } else {
        flightState.aircraftType = "";
        flightState.AircraftRegistaton = "";
      }
    };
    const setNightTime = async () => {
      console.log(
        "set night",
        flightState.InTime,
        flightState.OutTime,
        flightState.OnTime
      );
      if (flightState.InTime && flightState.OutTime && flightState.OnTime) {
        console.log("set night if");

        const AirPort = Parse.Object.extend("Airport");
        const airportDestinationQuery = new Parse.Query(AirPort);
        const departureQuery = new Parse.Query(AirPort);
        airportDestinationQuery.equalTo(
          "IATAcode",
          flightState.DestinatonAirport.toUpperCase()
        );
        //  airportDestinationQuery.equalTo("IATAcode",'LAX')
        departureQuery.equalTo(
          "IATAcode",
          flightState.DepartureAirport.toUpperCase()
        );
        //  departureQuery.equalTo("IATAcode",'HNA');

        const destinationPointer = await airportDestinationQuery.first();
        const departureAirport = await departureQuery.first();
        var destlat = await destinationPointer.get("latitude");
        var departlat = await departureAirport.get("latitude");
        var destlong = await destinationPointer.get("longitude");
        var departlong = await departureAirport.get("longitude");
        var start = {
          latitude: departlat,
          longitude: departlong,
        };
        var end = {
          latitude: destlat,
          longitude: destlong,
        };
        var d = getDistance(start, end, 1);
        console.log("distance", d);
        var nightTime = 0;
        var time = TimeDetails.onTime;
        // console.log("TimeDetails.onTime",TimeDetails.onTime);
        var i;
        // var blockTime=60;
        var blockTime = flightState.BlockTime;
        for (i = 0; i < blockTime; i++) {
          console.log("i", i);
          let f = i / blockTime;
          let A = Math.sin(1 - f * d) / Math.sin(d);
          let B = Math.sin(f * d) / Math.sin(d);
          console.log("F", f);
          console.log("A", A);
          console.log("B", B);

          let x =
            A *
              Math.cos((departlat * Math.PI) / 180) *
              Math.cos((departlong * Math.PI) / 180) +
            B *
              Math.cos((destlat * Math.PI) / 180) *
              Math.cos((destlong * Math.PI) / 180);
          let y =
            A *
              Math.cos((departlat * Math.PI) / 180) *
              Math.sin((departlong * Math.PI) / 180) +
            B *
              Math.cos((destlat * Math.PI) / 180) *
              Math.sin((destlong * Math.PI) / 180);
          let z =
            A * Math.sin((departlat * Math.PI) / 180) +
            B * Math.sin((destlat * Math.PI) / 180);
          console.log("x", x);
          console.log("y", y);
          console.log("z", z);
          let lat = (Math.atan2(z, Math.sqrt(x * x + y * y)) * Math.PI) / 180;
          let long = (Math.atan2(y, x) * Math.PI) / 180;
          // time = time.addingTimeInterval(60)
          console.log("lat,", lat);
          console.log("long,", long);
          console.log("time", new Date(moment.utc(time)));
          console.log("time", time);
          time = moment(time).add(1, "m").toDate();
          console.log("time", time);
          console.log("newDate", new Date());

          //  var solar= new SolarCalc(new Date(time),35.78,-78.649999);
          var data = SunCalc.getTimes(time, lat, long);
          console.log("data", data);
          var futuretime = moment(time).add(24, "h").toDate();
          var futuredata = SunCalc.getTimes(futuretime, lat, long);
          var pasttime = moment(time).add(-24, "h").toDate();
          var pastdata = SunCalc.getTimes(pasttime, lat, long);

          console.log("solar", data.sunrise);
          // console.log("solar",data1.sunrise);
          var sunrise = data.sunrise;
          // var sunset=data.sunset;
          let futureSunrise = moment(sunrise).add(24, "h").toDate();
          console.log("future", futureSunrise);
          if (
            (time > data.sunrise && time < data.sunset) ||
            (time > futuredata.sunrise && time < futuredata.sunset) ||
            (time > pastdata.sunrise && time < pastdata.sunset)
          ) {
            console.log("if");
          } else {
            console.log("else");
            nightTime += 1;
            console.log(" nightTime", nightTime);
          }
        }
        console.log("TimeDetails.nightTime", TimeDetails.nightTime);
        flightState.nightTime = nightTime;
      } else {
        console.log("set night else");

        return;
      }
    };
    const setInTime = () => {
      var d = new Date();
      var dt2 =
        moment(d).format("DD MMMM YYYY") + " " + flightState.InTime + " UTC";
      TimeDetails.inTime = new Date(dt2);
    };
    const setOnTime = () => {
      var d = new Date();
      var dt2 =
        moment(d).format("DD MMMM YYYY") + " " + flightState.OnTime + " UTC";
      TimeDetails.onTime = new Date(dt2);
    };
    const setOutTime = () => {
      var d = new Date();
      var dt2 =
        moment(d).format("DD MMMM YYYY") + " " + flightState.OutTime + " UTC";
      TimeDetails.outTime = new Date(dt2);
    };
    const setOffTime = () => {
      var d = new Date();
      var dt2 =
        moment(d).format("DD MMMM YYYY") + " " + flightState.OffTime + " UTC";

      TimeDetails.offTime = new Date(dt2);
    };
    const display = () => {
      // var date=moment(flightState.FlightDate).format("yyyy-MM-DD")
      // var stringdate = new Date(date).toISOString();
    };
    const TimeDetails = reactive({
      offTime: "",
      onTime: "",
      inTime: "",
      outTime: "",
      nightTime: 0,
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
      update,
      setLoader,
      selectAircraft,
      setSelf,
      clearData
    };
  },
});
</script>
<style scoped>
.crew-members {
  display: inline;
}
/* .modal-button {
  margin-left: 5px;
} */
</style>
