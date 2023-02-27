import { createApp } from 'vue';
import App from './App.vue';
import { formatting } from './plugins/formatting';
import router from './router';
import './styling/main.less';

createApp(App)
    .use(router)
    .use(formatting)
    .mount('#app');