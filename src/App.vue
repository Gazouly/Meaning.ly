<template>
  <a-layout>
    <a-layout-content class="app-content">
      <a-row>
        <a-col :xs="{span: 20}">
          <a-layout-header class="logo">
            <img src="../src/assets/logo.png" alt width="150">
          </a-layout-header>
        </a-col>
        <a-col :xs="{span: 20, offset: 2}" :lg="{span: 22, offset: 1}">
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="translate"
          >
            <a-row :gutter="16" type="flex" justify="center">
              <a-col :xs="{span: 24}" :lg="{span: 12}">
                <a-form-item>
                  <a-input
                    v-decorator="[
          'textTranslate',
          { rules: [{ required: true, message: 'Please input your word/sentence to translate!' }] }
        ]"
                    placeholder="Type a word/sentence"
                    size="large"
                  >
                    <a-icon slot="prefix" type="file-text" style="color: rgba(0,0,0,.25)"/>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :xs="{span: 24}" :lg="{span: 6}">
                <a-row :gutter="8">
                  <a-col :xs="{span: 10}">
                    <a-form-item>
                      <a-select v-model="translateFrom" default-value="en" size="large">
                        <a-select-option value="en">English</a-select-option>
                        <a-select-option value="ar">Arabic</a-select-option>
                        <a-select-option value="es">Spanish</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :xs="{span: 4}">
                    <a-form-item>
                      <a-button
                        size="large"
                        block
                        type="dashed"
                        class="switch-btn"
                        @click="switchLang"
                      >
                      <a-icon type="swap" />
                      </a-button>
                    </a-form-item>
                  </a-col>
                  <a-col :xs="{span: 10}">
                    <a-form-item>
                      <a-select v-model="translateTo" default-value="ar" size="large">
                        <a-select-option value="ar">Arabic</a-select-option>
                        <a-select-option value="es">Spanish</a-select-option>
                        <a-select-option value="en">English</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :xs="{span: 24}" :lg="{span: 4}">
                <a-form-item>
                  <a-button
                    size="large"
                    block
                    type="primary"
                    html-type="submit"
                    class="login-form-button"
                    :loading="loading"
                  >Translate</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-col :xs="{span: 20, offset: 2}" :lg="{span: 22, offset: 1}">
          <a-row :gutter="16" type="flex" justify="center">
            <a-col :xs="{span: 24}" :lg="{span: 22}">
              <div
                v-if="translationOutput !== ''"
                class="translation-output"
              >{{ translationOutput }}</div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :xs="{span: 20, offset: 2}" :lg="{span: 22, offset: 1}">
          <a-layout-footer class="footer" style="textAlign: center">
            Made with&nbsp;
            <a-icon type="heart" theme="filled"/>&nbsp;and
            <a href="https://vuejs.org/">Vue.js</a>&nbsp;|&nbsp; <a href="http://translate.yandex.com/">Yandex API for Translation</a>
          </a-layout-footer>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      translateFrom: "en",
      translateTo: "ar",
      loading: false,
      key:
        "trnsl.1.1.20190423T110933Z.e812a8ec083dd83e.633722a6adaafdfa40836a9c3a6a9dcf8c194461",
      translationOutput: ""
    };
  },
  methods: {
    translate(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // Why not working?

          /* let requestData = {
            key: this.key,
            text: values.textTranslate,
            lang: `${this.translateFrom}-${this.translateTo}`
          }
          console.log(requestData)
          
          axios.post('/translate', requestData)
          .then(res => {
            console.log(res.data.text[0])
          })
          .catch(err => console.log(err))*/

          this.loading = true;
          axios
            .post(
              `/translate?key=${this.key}&text=${values.textTranslate}&lang=${
                this.translateFrom
              }-${this.translateTo}`
            )
            .then(res => {
              this.loading = false;
              this.translationOutput = res.data.text[0];
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        }
      });
    },
    switchLang() {
      let temp = this.translateFrom
      this.translateFrom = this.translateTo
      this.translateTo = temp
    }
  }
};
</script>

<style>
.ant-layout-header {
  padding: 0px 14px !important;
  margin: 26px 0 !important;
}
.app-content {
  height: 100vh;
  background: rgba(245, 239, 122, 0.7) url("../src/assets/doodle.png") repeat !important;
  background-blend-mode: overlay;
}
.translation-output {
  height: 250px;
  padding: 15px 20px;
  font-size: 18px;

  background: rgba(245, 239, 122, 0.8);
}
.switch-btn {
  padding: 0 15px 0 13px !important;
}
.footer {
  font-size: 16px;
  font-weight: 600px;
}
.logo,
.footer {
  background: transparent !important;
}
</style>

