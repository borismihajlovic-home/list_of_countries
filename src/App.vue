<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/details/213">Details</router-link>
  </div> -->
  <router-view></router-view>
</template>

<style lang="scss">

body{
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  color: $blue-very-dark-text;
  // line-height: 1.5;
  font-weight: $font-weight-normal;
  background-color: $grey-lite;
  scroll-behavior: smooth;
}

.container{
    width: 100%;
    max-width: 1440px;
    padding: 0 80px;
    margin: 0 auto;
}

main{}
</style>
