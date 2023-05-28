import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import router from './router/index';
import 'element-plus/dist/index.css';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import '@hebcal/core';
import axios from 'axios';
import { getJwt } from './services/userService';



axios.defaults.headers.common['x-auth-token'] = getJwt();

axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 403;
  if (expectedError) alert.error("An unexpected error occurrred.");
  return Promise.reject(error);
});




const app = createApp(App)
app.use(router)
app.mount('#app')
