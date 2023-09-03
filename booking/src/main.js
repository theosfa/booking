import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Dropdown from 'vue-simple-search-dropdown';
// import DayJsAdapter from '@date-io/dayjs'

// createVuetify({
//   date: {
//     adapter: DayJsAdapter,
//   }
// })

// import DateFnsAdapter from '@date-io/date-fns'
// import enUS from 'date-fns/locale/en-US'
// import svSE from 'date-fns/locale/sv'

// createVuetify({
//   date: {
//     adapter: DateFnsAdapter,
//     locale: {
//       en: enUS,
//       sv: svSE,
//     },
//   },
// })
var app = createApp(App);
app.use(Dropdown);
app.mount('#app')

