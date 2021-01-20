<template>
	<Header :isDark="isDark" @dark-or-light="changeMode"></Header>
	<main class="home" :class="{'dark-mode': isDark}">
		<div class="container">
			<section class="search-container">
				<div class="input-holder">
					<i class="fas fa-search fa-3x"></i>
					<input placeholder="Search for a country..." type="text" @input="filterByName" v-model="filterInputValue">
				</div>
				<div class="filter-container" :class="{active: isListOpened}">
					<div class="filter-button" @click="toggleRegionList">{{ regionValue === '' ? 'Filter by region' : regionValue }}</div>
					<div class="filter-options">
						<div @click="selectRegion('')">all</div>
						<div v-for="(regionName, index) in regions" :key="index" @click="selectRegion(regionName)">{{ regionName }}</div>
					</div> 
				</div>
			</section>

			<list-of-countries :is-dark="isDark" :inputValue="filterInputValue" :region="regionValue"></list-of-countries>
		</div>
	</main>
</template>

<script>
import ListOfCountries from '../components/ListOfCountries.vue';
import Header from '../components/Header.vue';

export default {
	name: 'Home page',
	components: {
		Header,
		ListOfCountries
	},
	data(){
		return{
			isDark: false,
			filterInputValue: null,
			regionValue: '',
			isListOpened: false,
			regions: ['africa', 'americas', 'asia', 'europe', 'oceania']
		}
	},
	methods:{
		filterByName(event){
			this.filterInputValue = event.target.value;
		},
		selectRegion(region){
			this.isListOpened = false;
			this.regionValue = region;
		},
		toggleRegionList(){
			this.isListOpened = !this.isListOpened;
		},
		changeMode(){
			this.isDark = !this.isDark;
		}
	},
	mounted(){
		if(this.$route.query.isDark == 'true'){
			this.isDark = this.$route.query.isDark;
		}
	}
}
</script>

<style lang="scss" scoped>
	main.home{
		padding-top: 45px;
		padding-bottom: 45px;
		font-size: 14px;
		.search-container{
			display: flex;
			justify-content: space-between;
			margin-bottom: 50px;
			font-size: 14px;
			.input-holder{
				position: relative;
				@include elements-box-shadow;
				border-radius: 5px;
				i{
					font-size: 20px;
					color:$grey;
					position: absolute;
					top: calc(50% - 10px);
					left: 40px;
				}
				input{
					border: none;
					width: 480px;
					padding: 1.5em 1.5em 1.5em 5em;
					border-radius: 5px;
					&::placeholder{
						color: $grey;
					}
				}
			}
			.filter-container{
				position: relative;
				width: 200px;
				border-radius: 5px;
				@include elements-box-shadow;
				
				.filter-button{
					width: 100%;
					padding: 1.5em 1.7em;
					border-radius: 5px;
					text-transform: capitalize;
					position: relative;
					cursor: pointer;
					&::after{
						content: '';
						position: absolute;
						top: calc(50% - 7px);
						right: 11px;
						width: 10px;
						height: 10px;
						border-bottom: 3px solid;
						border-right: 3px solid;
						transform: rotate(45deg);
					}
				}
				.filter-options{
					position: absolute;
					top: 110%;
					left: 0;
					width: 100%;
					max-height: 0;
					overflow: hidden;
					border-radius: 5px;
					transition: all 0.15s linear;
					cursor: pointer;
					div{
						margin: 20px 0 20px 20px;
						text-transform: capitalize;
					}
				}
				&.active .filter-options{
					max-height: 200px;
				}
			}
		}
	}

	@media screen and (max-width: 750px) {
    main.home .search-container{
        display: block;
		.input-holder{
			margin-bottom: 50px;
			input{
				width: 100%;
			}
		}
}
}
</style>
