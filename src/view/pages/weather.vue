<template>
  <CardToolbox>
    <ContactPageheaderStyle>
      <sdPageHeader title="Weather">
        <template #subTitle></template>
      </sdPageHeader>
    </ContactPageheaderStyle>
  </CardToolbox>
  <Main>
    <a-form>
      <a-row :gutter="25">
        <a-col :xs="24">
          <sdCards title="Weather">
            <a-row :gutter="30" class="center">
              <a-col>
                <h1>Enter an airport code to start</h1>
                <a-input placeholder="Eg. KLAX" v-model:value="formState.stationString" />
                <span style="margin:10px">Switch to taf</span>
                <a-switch
                  @click="onClick"
                  @change="onChange"
                  :disable="formState.flag0"
                  v-model:checked="formState.flag"
                />
                <span>Switch to metars</span>
                <br />
                <!-- <span>TAF</span> <a-switch v-model:checked="meterData.meter" />
                <br />-->

                <sdButton @click="getWeather()" type="primary" html-type="submit">Search</sdButton>
              </a-col>
            </a-row>
          </sdCards>
        </a-col>
      </a-row>
    </a-form>
    <sdCards>
      <p>{{formState.data[0]}}</p>
    </sdCards>
  </Main>
</template>
<script>
import axios from "axios";
import { defineComponent, reactive, onMounted } from "vue";
import { Main ,CardToolbox} from "../styled";
const txml = require("txml");
import { ContactPageheaderStyle } from "./style";


export default defineComponent({
  components: {
    Main,
    ContactPageheaderStyle,
    CardToolbox
  },

  setup() {
    onMounted(() => {});
    const getWeather = () => {
      axios
        .get(
          `https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=${formState.dataSource}&requestType=retrieve&format=xml&stationString=${formState.stationString}&hoursBeforeNow=1`
        )
        .then(res => {
          // formState.stationString=""
          // console.log(res.getElementsByTagname("metar"));
          // console.log("eee", txml.parse(res.data));
          var data = txml.parse(res.data);
          var data1 = {};
          for (const i of data) {
            for (var j in i.children) {
              if (i.children[j].tagName === "data")
                data1 = i.children[j].children[0];
              // console.log("j", i.children[j].children[0]);
            }
          }
          // console.log("w", data1);
          formState.data = data1.children;

          for (var i of data1.children) {
            if (i.tagName === "raw_text") {
              // console.log(i.children);
              formState.data = i.children;
            }
          }
        })
        .catch(err => {
          formState.data[0] = `No Airport found with ${formState.stationString}`;
          console.log(err);
        });
    };

    const onChange = e => {
      formState.flag0 = !formState.flag0;
      // console.log(e);
      if (!e) {
        formState.dataSource = "tafs";
      } else {
        formState.dataSource = "metars";
      }
    };

    const onClick = () => {
      if (formState.dataSource) {
        getWeather();
      }
    };

    const formState = reactive({
      stationString: "",
      flag: true,
      data: [],
      dataSource: "metars",
      flag0: true
    });
    const meterData = reactive({
      meter: !formState.flag
    });
    return {
      formState,
      meterData,
      getWeather,
      onChange,
      onClick
    };
  }
});
</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
