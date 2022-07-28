<template>
  <div>
    <sdPageHeader title="Form Component">
      <template #buttons>
        <div class="page-header-actions">
          <sdCalendarButton />
          <sdExportButton />
          <sdShareButton />
          <sdButton size="small" type="primary">
            <sdFeatherIcons type="plus" size="14" />
            Add New
          </sdButton>
        </div>
      </template>
    </sdPageHeader>
    <Main>
      <FormComponentsWrap>
        <a-row :gutter="25">
          <a-col :md="12" :xs="24">
            <sdCards title="Input Groups" class="mb-25">
              <BasicFormWrapper>
                <a-form name="sDash_textarea" layout="vertical">
                  <a-row :gutter="30">
                    <a-col :lg="12" :xs="24" class="mb-25">
                      <a-form-item name="input-name">
                        <a-input placeholder="Name">
                          <template #prefix>
                            <sdFeatherIcons type="user" size="14" />
                          </template>
                        </a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :lg="12" :xs="24" class="mb-25">
                      <a-form-item>
                        <a-input name="email" placeholder="Email">
                          <template #prefix>
                            <sdFeatherIcons type="mail" size="14" />
                          </template>
                        </a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :lg="12" :xs="24" class="mb-25">
                      <a-form-item>
                        <a-input name="input-location" placeholder="Location">
                          <template #prefix>
                            <sdFeatherIcons type="map-pin" size="14" />
                          </template>
                        </a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :lg="12" :xs="24" class="mb-25">
                      <a-form-item>
                        <a-input-password
                          name="password"
                          value="12345678"
                          placeholder="with input password"
                        >
                          <template #prefix>
                            <sdFeatherIcons type="lock" size="14" />
                          </template>
                        </a-input-password>
                      </a-form-item>
                    </a-col>
                    <a-col :lg="12" :xs="24" class="mb-25">
                      <a-form-item>
                        <a-input
                          name="input-payment"
                          placeholder="Payment Method"
                        >
                          <template #prefix>
                            <sdFeatherIcons type="credit-card" size="14" />
                          </template>
                        </a-input>
                      </a-form-item>
                    </a-col>
                    <a-col :lg="12" :xs="24" class="mb-25">
                      <a-form-item>
                        <a-input name="input-phone" placeholder="Phone">
                          <template #prefix>
                            <sdFeatherIcons type="phone" size="14" />
                          </template>
                        </a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </BasicFormWrapper>
            </sdCards>
            <sdCards title="Dropdown" class="mb-25">
              <DropDownListComponents>
                <div class="sDash_dropdown-list">
                  <sdDropdown placement="bottomLeft">
                    <sdButton
                      class="btn-outlined"
                      :outlined="true"
                      type="light"
                    >
                      Alerts
                    </sdButton>
                  </sdDropdown>
                  <sdDropdown placement="bottomLeft">
                    <sdButton
                      class="btn-outlined"
                      :outlined="true"
                      type="light"
                    >
                      Select an option...
                    </sdButton>
                  </sdDropdown>
                </div>
              </DropDownListComponents>
            </sdCards>

            <sdCards title="Datepicker" class="mb-25">
              <div class="sDash_datepicker-list">
                <BasicFormWrapper>
                  <a-form name="datepicker-form" layout="vertical">
                    <a-form-item name="datePicker" label="Datepicker">
                      <a-date-picker />
                    </a-form-item>
                    <a-form-item name="rangePicker" label="Date Range Picker">
                      <a-range-picker />
                    </a-form-item>
                  </a-form>
                </BasicFormWrapper>
              </div>
            </sdCards>

            <sdCards title="Text Editor" class="mb-25">
              <div class="sDash_editor">
                <ckeditor
                  :editor="editor"
                  v-model="editorData"
                  :config="editorConfig"
                ></ckeditor>
              </div>
            </sdCards>
          </a-col>

          <a-col :md="12" :xs="24">
            <sdCards title="Tags" class="mb-25">
              <div class="taglist-wrap">
                <a-tag>Unremovable</a-tag>
                <a-tag closable> a-tag 2 </a-tag>
                <a-tag closable> a-tag 3 </a-tag>
              </div>
            </sdCards>
            <sdCards title="Toggle buttons" class="mb-25">
              <a-switch v-model:checked="formState.toggle" size="large" />
            </sdCards>

            <sdCards title="Sliders" class="mb-25">
              <div class="sDash_slider-list">
                <a-slider :default-value="30" />
                <a-slider range :step="10" :default-value="[20, 50]" />
              </div>
            </sdCards>

            <sdCards title="Dropzone" class="mb-25">
              <div className="sDash_uploader-list">
                <a-upload-dragger
                  class="sDash-uploader-large"
                  v-model:fileList="fileList"
                  name="file"
                  :multiple="true"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  @change="handleChange"
                >
                  <p class="ant-upload-text">Drop files here to upload</p>
                </a-upload-dragger>
                <a-upload-dragger
                  v-model:fileList="fileList"
                  name="file"
                  :multiple="true"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  @change="handleChange"
                >
                  <p class="ant-upload-text">Drop files here to upload</p>
                </a-upload-dragger>
              </div>
            </sdCards>
          </a-col>
        </a-row>
      </FormComponentsWrap>
    </Main>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import { defineComponent, ref, reactive } from "vue";
import { Main, BasicFormWrapper } from "../styled";
import { FormComponentsWrap, DropDownListComponents } from "./overview/Style";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default defineComponent({
  name: "FormComponent",
  components: {
    Main,
    BasicFormWrapper,
    FormComponentsWrap,
    DropDownListComponents,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData:
        "<p>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?</p>",
      editorConfig: {
        height: "300px",
      },
      disabled: false,
    };
  },
  setup() {
    const handleChange = (info) => {
      const status = info.file.status;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
    const formState = reactive({
      toggle: false,
    });
    return {
      handleChange,
      fileList: ref([]),
      formState,
    };
  },
});
</script>
