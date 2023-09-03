<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { ref, computed } from 'vue'
import Home from './basics/Home.vue'
import Login from './basics/Login.vue'
import Sign from './basics/Sign.vue'
import Profile from './basics/Profile.vue'
import Dropdown from 'vue-simple-search-dropdown';
// import VueCookies from 'vue-cookies'
// Vue.use(VueCookies)
// this.$cookies.set('cookieName', 'cookieValue')
// this.$cookies.set('cookieName', 'cookieValue', { expires: 7, path: '/' })
// const cookieValue = this.$cookies.get('cookieName')
// this.$cookies.remove('cookieName')


const routes = {
  '/': Home,
  '/login': Login,
  '/sign': Sign,
  '/profile': Profile
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <div class="master">
    <div class="header">
      <Header/>
    </div>
    <div class="app">
      <component :is="currentView" />
    </div>
    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>

<style scoped>
.master{
  height: 100%;
}
.header{
  
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  background: #683434;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  /* width: 100%;  */
}
.footer{
  display: block;
  padding-top: 30px;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 30px;
  width: 100%;
  height: 19%;
  color: white;
  margin-top: 1%;
  background: rgb(107, 58, 58);
  /* width: 100%; */
}
.app{
  /* flex: 1; */
  /* width: 100%; */
  /* min-height: 1000px;  */
  /* margin-top: 10%; */
  margin-top: 10vh;
  margin-bottom: 0;
  min-height: 70%;
  overflow-y: auto;
  background: rgb(255, 255, 255);
  }
</style>
