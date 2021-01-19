<template>
	<header>
		<div class="container">
			<div class="logo">Where in the world?</div>
			<div class="mode-change"><i class="far fa-moon"></i> Dark Mode</div>
		</div>
	</header>
	<main class="container home">
		<section class="search-container">
			<div class="input-holder">
				<i class="fas fa-search fa-3x"></i>
				<input placeholder="Search for a country..." type="text" @input="filterByName" v-model="filterInputValue">
			</div>
			<div class="filter-container">
				<div class="filter-button">Filter by region</div>
				<div class="filter-options">
					<div>Africa</div>
					<div>Europe</div>
					<div>Asia</div>
				</div>
			</div>
		</section>

		<list-of-countries></list-of-countries>
	</main>
</template>

<script>
import ListOfCountries from '../components/ListOfCountries.vue';

export default {
	components: {
		ListOfCountries
	},
	data(){
		return{
			filterInputValue: null,
			regionValue: null
		}
	},
	methods:{
		filterByName(event){
			this.filterInputValue = event.target.value;
			console.log(event, this.filterInputValue);
		}
	}
}
</script>

<style lang="scss" scoped>
	header{
		box-shadow: 0 4px 2px -2px rgba(0,0,0,0.15);
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
				max-width: 200px;
				.filter-button{
					width: 100%;
					padding: 1.5em 1.7em;
					border-radius: 5px;
					background-color: $white;
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
					transition: all 0.3s linear;
					div{
						margin: 20px 0 20px 20px;
					}
				}
				&.active .filter-options{
					max-height: 200px;
				}
			}
		}
	}
</style>
