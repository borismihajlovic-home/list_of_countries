<template>
  <router-view></router-view>
</template>

<style lang="scss">

.container{
    width: 100%;
    max-width: 1440px;
    padding: 0 80px;
    margin: 0 auto;
}

header{
    background-color: $white;
}
header.dark-mode{
    background-color: $blue-dark ;
    color: $white;
}
main{
    .search-container .input-holder input,
    .filter-container .filter-button,
    .filter-container .filter-options,
    .countries-list a,
    .back a,
    .details .border-countries-holder .countries a{
        background-color: $white;
    }
    .filter-container .filter-button::after{
        border-color: $black;
    }
}
main.dark-mode{
    background-color: $blue-very-dark;
    color: $white;
    .search-container .input-holder input,
    .filter-container .filter-button,
    .filter-container .filter-options,
    .countries-list a,
    .back a,
    .details .border-countries-holder .countries a{
        background-color: $blue-dark;
        color: $white;
    }
    .filter-container .filter-button::after{
        border-color: $white;
    }
}

@media screen and (max-width: 1295px){
    .container{
        padding-left: 20px;
        padding-right: 20px;
    }
}

</style>
