<template>
    <header :class="{'dark-mode': isDark}">
		<div class="container">
            <router-link class="logo" :to="`/?isDark=${isDark}`">Where in the world?</router-link>
			<div class="mode-change" @click="changeMode"><i class="far fa-moon"></i> Dark Mode</div>
		</div>
	</header>
	
</template>


<script>
export default {
    name: 'Header',
    props: ['isDark'],
    emits: ['dark-or-light'],
    methods: {
        changeMode(){
            const currentPath = this.$route.path;
            console.log(this.$router)
            this.$router.replace({path: currentPath, query: {isDark: !this.isDark}});
            this.$emit('dark-or-light', !this.isDark);
        }
    }
}
</script>


<style lang="scss" scoped>
header{
    -webkit-box-shadow: 0 4px 2px -2px rgba(0,0,0,0.15);
    -moz-box-shadow:    0 4px 2px -2px rgba(0,0,0,0.15);
    box-shadow:         0 4px 2px -2px rgba(0,0,0,0.15);
    &>div{
        display: flex;
        justify-content: space-between;
        padding-top: 30px;
        padding-bottom: 30px;
        .logo{
            font-weight: $font-weight-bold;
        }
        .mode-change{
            cursor: pointer;
            font-size: 14px;
        }
    }
}
</style>