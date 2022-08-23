<template>
  <div>
    <Main>
      <a-form :model="formState">
        <a-row :gutter="25">
          <a-col :xs="24">
            <sdCards title="GENERAL" caption="The simplest use of Form">
              <FormValidationWrap>
                <VerticalFormStyleWrap>
                  <a-row :gutter="30">
                    <a-col :md="12" :xs="24">
                      <a-form-item
                        label="See all future flights as PIC flights"
                      >
                        <a-switch v-model:checked="formState.picFlghts" />
                      </a-form-item>
                    </a-col>
                    <a-col :md="12" :xs="24">
                      <a-form-item
                        label="Include experience hours in Grand Total Hours"
                      >
                        <a-switch v-model:checked="formState.totalHours" />
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
                        <a-input
                          v-model:value="formState.totaldays1"
                          placeholder=""
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="8">
                      <a-form-item label="1.Total Hours">
                        <a-input
                          v-model:value="formState.totalHours1"
                          placeholder=""
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="30">
                    <a-col :md="8" :xs="8">
                      <a-form-item label="2.Total Days">
                        <a-input
                          v-model:value="formState.totaldays2"
                          placeholder=""
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="8">
                      <a-form-item label="2.Total Hours">
                        <a-input
                          v-model:value="formState.totalHours2"
                          placeholder=""
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                    <a-row :gutter="30">
                    <a-col :md="8" :xs="8">
                      <a-form-item label="3.Total Days">
                        <a-input
                          v-model:value="formState.totaldays3"
                          placeholder=""
                        />
                      </a-form-item>
                    </a-col>
                  <a-col :md="8" :xs="8">
                      <a-form-item label="3.Total Hours">
                        <a-input
                          v-model:value="formState.totalHours3"
                          placeholder=""
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                    <a-row :gutter="30">
                    <a-col :md="8" :xs="8">
                      <a-form-item label="4.Total Days">
                        <a-input
                          v-model:value="formState.totaldays4"
                          placeholder=""
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="8">
                      <a-form-item label="4.Total Hours">
                        <a-input
                          v-model:value="formState.totalHours4"
                          placeholder=""
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                    <a-row :gutter="30">
                    <a-col :md="8" :xs="8">
                      <a-form-item label="5.Total Days">
                        <a-input
                          v-model:value="formState.totaldays5"
                          placeholder=""
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="8">
                      <a-form-item label="5.Total Hours">
                        <a-input
                          v-model:value="formState.totalHours5"
                          placeholder=""
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                    <a-row :gutter="30">
                    <a-col :md="8" :xs="8">
                      <a-form-item label="6.Total Days">
                        <a-input
                          v-model:value="formState.totaldays6"
                          placeholder=""
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :md="8" :xs="8">
                      <a-form-item label="6.Total Hours">
                        <a-input
                          v-model:value="formState.totalHours6"
                          placeholder=""
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
    </Main>
  </div>
</template>
<script>
import { defineComponent, reactive } from "vue";
import { Main } from "../../styled";
import { FormValidationWrap, VerticalFormStyleWrap } from "./Style";
import circularviews from "../../../server/circularviews.json";

export default defineComponent({
  components: {
    Main,
    FormValidationWrap,
    VerticalFormStyleWrap,
  },
  setup() {
    const formState = reactive({
      picFlghts: true,
      totalHours: true,
      totaldays1:"",
      totaldays2:"",
      totaldays3:"",
      totaldays4:"",
      totaldays5:"",
      totaldays6:"",
      totalHours1:'',
      totalHours2:'',
      totalHours3:'',
      totalHours4:'',
      totalHours5:'',
      totalHours6:'',



    });
    const save = ()=>{

  circularviews.days.push({ totaldays1:"",
      totaldays2:"",
      totaldays3:"",
      totaldays4:"",
      totaldays5:"",
      totaldays6:"",})
      console.log(circularviews)
    }

    return {
      formState,
      save
    };
  },
});
</script>
