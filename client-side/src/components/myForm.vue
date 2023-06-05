<template>
  <div
    class="form"
    :style="{
      minHeight: height + 'px',
      fontSize: (20 * screenWidth) / 1250 + 'px',
    }"
  >
    <form @submit.prevent="onSubmit" class="col-11 col-lg-5 mx-auto">
      <page-header
        class="mb-4 mb-smg-5"
        :page-header="pageHeader"
        :content="content"
      ></page-header>
      <input-copm
        :id="input.name"
        v-for="input in inputs"
        :key="input.name"
        :label="input.label"
        :name="input.name"
        :model="data[input.name]"
        :type="input.type"
        @set-value="setValue(input.key, $event)"
      ></input-copm>

      <div v-for="text in texts" :id="text.name" :key="texts.indexOf(text)">
        <label :for="text.name" class="form-label">{{ text.label }}</label>
        <textarea
          v-model="data[text.key]"
          class="form-control"
          :name="text.name"
          rows="3"
        ></textarea>
      </div>
      <div v-if="selects && selects[0]">
        <div v-for="select in selects" :key="selects.indexOf(select)">
          <select
            :id="select.key"
            v-model="data[select.key]"
            :name="select.name"
            :data-label-option="select.defaultValue"
          >
            <option
              v-for="option in select.options"
              :key="select.options.indexOf(option)"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <div v-for="file in files" :id="file.name" :key="files.indexOf(file)">
        <file
          :model="checkModel(file.key)"
          @set-file="handleFileUpload(file.key, $event)"
        ></file>
        <img
          v-if="data[file.name]"
          :src="imageSrc[`imgSrc${file.key}`]"
          :style="{ width: (200 * screenWidth) / 1250 + 'px' }"
          alt="uploaded_files"
        />
      </div>
      <div v-if="dates && dates[0]">
        <div v-for="date in dates" :key="dates.indexOf(date)">
          <img
            :width="(70 * screenWidth) / 1590"
            class="btn"
            :src="require('../assets/calendar.jpg')"
            alt="calendar_pic"
            @click="openToggle(date.key)"
          />

          <Callendar
            v-if="toggles[date.key]"
            :toggle="toggles[date.key]"
            @set-month="defaults[date.defaultName] = $event"
            @set-default="defaults[date.defaultName] = $event"
            :date="data[date.key]"
            @set-date="setTheDate($event, date.key)"
            @close="toggles[date.key] = $event"
            :default-date="defaults[date.defaultName]"
          ></Callendar>
          <input
            class="rounded bg-light color-dark"
            v-if="data[date.key]"
            disabled
            type="input"
            :value="`${hebJew[date.key]} -${data[date.key].getDate()}.${
              data[date.key].getMonth() + 1
            }.${data[date.key].getFullYear()}`"
          />
        </div>
      </div>
      <button @click="setValidate" class="btn btn-primary">
        {{ btnText }}
      </button>
    </form>
  </div>
</template>


<script>
import { formatJewishDateInHebrew, toJewishDate } from "jewish-date";
import PageHeader from "@/components/PageHeader.vue";
import InputCopm from "@/components/InputCopm.vue";
import File from "@/components/File.vue";
import Callendar from "@/components/Callendar.vue";
import { login } from "@/services/userService";
import httpServices from "@/services/httpServices";

export default {
  props: [
    "model",
    "inputs",
    "texts",
    "files",
    "dates",
    "selects",
    "validate",
    "url",
    "pageHeader",
    "content",
    "btnText",
    "isLogin",
    "request",
  ],
  data() {
    return {
      data: {},
      screenWidth: window.innerWidth,
      imageSrc: {},
      toggles: {},
      defaults: {},
      hebJew: {},
      height: 0,
    };
  },

  methods: {
    openToggle(e) {
      this.toggles[e] = true;
    },

    updateImageHeight() {
      const container = document.querySelector(".form");
      const backgroundImage =
        getComputedStyle(container).getPropertyValue("background-image");
      const imageUrl = backgroundImage.slice(4, -1).replace(/"/g, "");

      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        const imageRatio = image.width / image.height;
        const containerHeight = container.offsetHeight;
        const containerWidth = container.offsetWidth;
        const containerRatio = containerWidth / containerHeight;
        if (containerRatio < imageRatio) {
          container.style.backgroundSize = `auto ${containerHeight}px`;
        } else {
          const imageWidth = window.innerWidth;
          container.style.backgroundSize = `${imageWidth}px ${containerHeight}px`;
        }
      };
    },

    setToggle() {
      this.dates.map((date) => {
        this.toggles[date.key] = false;
        this.data[date.key] = new Date();
        const hebJew = toJewishDate(new Date());

        this.hebJew[date.key] = formatJewishDateInHebrew(hebJew);
      });
    },

    setHebJew() {
      if (this.dates && this.dates[0]) {
        this.dates.map((date) => {
          this.hebJew[date.key] = formatJewishDateInHebrew(
            toJewishDate(this.data[date.key])
          );
        });
      }
    },
    setTheDate(e, key) {
      this.data[key] = e;
      const hebJew = toJewishDate(e);

      this.hebJew[key] = formatJewishDateInHebrew(hebJew);
    },
    setSelectDefaultValue() {
      if (this.selects && this.selects[0]) {
        this.selects.map((select) => {
          this.data[select.key] = select.defaultValue;
        });
      }
    },
    setValue(key, value) {
      this.data[key] = value;
    },
    setHeight() {
      let height = 0;
      if (this.inputs && document.getElementById(this.inputs[0].name)) {
        for (const input in this.inputs) {
          height += document.getElementById(this.inputs[0].name).offsetHeight;
        }
      }
      if (this.texts && document.getElementById(this.texts[0].name)) {
        for (const text in this.texts) {
          height += document.getElementById(this.texts[0].name).offsetHeight;
        }
      }
      if (this.selects && document.getElementById(this.selects[0].name)) {
        for (const select in this.selects) {
          height += document.getElementById(this.selects[0].name).offsetHeight;
        }
      }
      if (this.files && document.getElementById(this.files[0].name)) {
        for (const file in this.files) {
          height += document.getElementById(this.files[0].name).offsetHeight;
          if (document.getElementById(this.imageSrc[`imgSrc${file.key}`])) {
            height += document.getElementById(
              this.imageSrc[`imgSrc${file.key}`]
            ).offsetHeight;
            let height = this.height;
            height += (200 * this.screenWidth) / 1250;
          }
        }
      }
      this.height = height + (600 / 1250) * this.screenWidth;
    },
    onResize() {
      if (window.innerWidth >= 580) this.screenWidth = window.innerWidth;
      else if (window.innerWidth > 520)
        this.screenWidth = window.innerWidth * 1.35;
      else if (window.innerWidth > 430)
        this.screenWidth = window.innerWidth * 1.6;
      else if (window.innerWidth > 370)
        this.screenWidth = window.innerWidth * 1.8;
      else if (window.innerWidth > 300)
        this.screenWidth = window.innerWidth * 2;
      else this.screenWidth = window.innerWidth * 2.5;
    },
    handleFileUpload(key, e) {
      let reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        this.setValue(key, e);
        this.imageSrc[`imgSrc${key}`] = data;
      };
      reader.readAsDataURL(e);

      let height = this.height;
      height +=
        (200 * this.screenWidth) / 1250 + (70 * this.screenWidth) / 1590;
      this.height = height;
    },

    onSubmit() {
      if (
        (this.validate !== "string" && this.validate.image) ||
        (this.validate !== "string" && this.validate.travelImage)
      ) {
        const data = Object.assign({}, this.validate);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const formData = new FormData();
        for (const key in data) {
          if (this.data[key] !== "object") {
            const value = data[key];
            formData.append(`${key}`, value);
          } else {
            const value = data[key];
            formData.append(`${key}`, value);
          }
        }
        httpServices[this.request](this.url, formData, config)
          .then(() => {
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.validate !== "string" && this.isLogin) {
        const data = Object.assign({}, this.validate);
        login(data.email, data.password);
      } else if (
        (this.validate !== "string" && !this.data.image) ||
        (!this.data.travelImage && this.validate !== "string")
      ) {
        const data = Object.assign({}, this.validate);

        httpServices[this.request](this.url, data)
          .then(() => {
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    checkModel(key) {
      if (this.model) return this.model[key];
      else return null;
    },
    setValidate() {
      this.$emit("set-data", Object.assign({}, this.data));
    },
  },

  mounted() {
    this.setSelectDefaultValue();
    if (this.dates && this.dates[0]) this.setToggle();
    this.onResize();
    window.addEventListener("resize", this.onResize);
    window.addEventListener("resize", this.setHeight);
    this.setHeight();
  },
  watch: {
    model(value) {
      this.data = value;
      this.setHebJew();
      this.files.map((file) => {
        this.imageSrc[`imgSrc${file.key}`] = value[file.key];
      });
    },
    height() {
      this.updateImageHeight();
    },
  },
  components: { PageHeader, InputCopm, File, Callendar },
};
</script>

<style>
.form {
  background: url("../assets/default.png");
  background-size: cover;
  display: flex;
  align-items: center;
  z-index: 1;
}
.form-control {
  display: block;
}
img {
  margin: 0;
  padding: 0;
}
</style>