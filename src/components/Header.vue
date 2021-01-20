<template>
    <header>
		<div class="container">
			<div class="logo">Where in the world?</div>
			<div class="mode-change"><i class="far fa-moon"></i> Dark Mode</div>
		</div>
	</header>
	
</template>


<script>
export default {
    
}
</script>


<style lang="scss" scoped>
header{
    -webkit-box-shadow: 0 4px 2px -2px rgba(0,0,0,0.15);
    -moz-box-shadow:    0 4px 2px -2px rgba(0,0,0,0.15);
    box-shadow:         0 4px 2px -2px rgba(0,0,0,0.15);
    background-color: $white;
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