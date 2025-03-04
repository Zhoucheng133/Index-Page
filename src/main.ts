import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import router from './router';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'
import ConfirmationService from 'primevue/confirmationservice';

const color="cyan";
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: `{${color}.50}`,
      100: `{${color}.100}`,
      200: `{${color}.200}`,
      300: `{${color}.300}`,
      400: `{${color}.400}`,
      500: `{${color}.500}`,
      600: `{${color}.600}`,
      700: `{${color}.700}`,
      800: `{${color}.800}`,
      900: `{${color}.900}`,
      950: `{${color}.950}`
    }
  }
});

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: MyPreset
  }
});
app.use(router);
app.use(ToastService);
app.use(ConfirmationService)

app.mount('#app');
