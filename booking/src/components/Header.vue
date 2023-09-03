<script setup>
</script>

<template>
  <div class="nav">
  <!-- <a href="/">Home</a> -->
  <button class="but" OnClick=" location.href='/' ">Home</button>
  </div>
  <div class="nav">
    <!-- <a href="#/login">Login</a> -->
    <button class="but" OnClick=" location.href='#/login' ">Login</button>
  </div>
 <div class="nav sign-up">
    <!-- <a href="#/sign"> Sign up</a> -->
    <button class="but" OnClick=" location.href='#/sign' ">Sign up</button>
  </div>
  <div class="nav profile">
     <!-- <a href="#/profile">Profile</a> -->
     <button class="but" OnClick=" location.href='#/profile' ">Profile</button>
  </div>
</template>

<script>
</script>


<style scoped>

span{
  cursor: pointer;
}
a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);

  }
a{
    padding:25px 30px;
    text-decoration: none;
    color: rgb(255, 255, 255);
    display:block;
  }
div.nav{
  display: flex;
  align-items:center;
  margin: 0px;
  width: 8%;
  justify-content:center;

}

.but{
  height: 100%;
  width: 100%;
  margin: 0px;
  border: 0px;
  border-radius: 0px;
}
@media (min-width: 1024px) {

}
</style>