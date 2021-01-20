<template>
	<Header></Header>
	<main class="container home">
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

		<list-of-countries :inputValue="filterInputValue" :region="regionValue"></list-of-countries>
	</main>
</template>

<script>
import ListOfCountries from '../components/ListOfCountries.vue';
import Header from '../components/Header.vue';

export default {
	components: {
		Header,
		ListOfCountries
	},
	data(){
		return{
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
					background-color: $white;
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
					background-color: $white;
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
						border-bottom: 3px solid #000;
						border-right: 3px solid #000;
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
					background-color: $white;
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
</style>
