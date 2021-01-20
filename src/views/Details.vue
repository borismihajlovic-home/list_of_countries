<template>
	<Header></Header>
	<main class="container details-page">
		<div class="back">
			<router-link to="/"><i class="fas fa-arrow-left"></i> Back</router-link>
			<!-- <button><i class="fas fa-arrow-left"></i> Back</button> -->
		</div>
		<section class="details">
			<div class="flag-holder"><img :src="countryDetails.flag" alt="countryFlag"></div>
			<div class="details-holder">
				<h3>{{ countryDetails.name }}</h3>
				<div class="info-holder">
					<div>
						<p><strong>Native name:</strong> {{ countryDetails.nativeName }}</p>
						<p><strong>Population:</strong> {{ countryDetails.population }}</p>
						<p><strong>Region:</strong> {{ countryDetails.region }}</p>
						<p><strong>Sub Region:</strong> {{ countryDetails.subregion }}</p>
						<p><strong>Capital:</strong> {{ countryDetails.capital }}</p>
					</div>
					<div>
						<p><strong>Top Level Domain:</strong> <span :key="index" v-for="(domain, index) in countryDetails.topLevelDomain">{{ countryDetails.topLevelDomain.length == index+1 ? domain : domain+', ' }}</span></p>
						<p><strong>Currencies:</strong> <span :key="index" v-for="(item, index) in countryDetails.currencies">{{ countryDetails.currencies.length === index+1 ? item.name : item.name+', ' }}</span></p>
						<p><strong>Languages:</strong> <span :key="index" v-for="(item, index) in countryDetails.languages">{{ countryDetails.languages.length === index+1 ? item.name : item.name+', ' }}</span></p>
					</div>
				</div>
				<div class="border-countries-holder">
					<strong>Border Countries: </strong>
					<div class="countries">
						<!-- <span :key="index" v-for="(item, index) in borteringCountries"> -->
							<router-link :key="index" v-for="(item, index) in borteringCountries" :to="item.code" @click="getCountryDetails">{{ item.name }}</router-link>
						<!-- </span> -->
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import Header from '../components/Header.vue';

export default {
	components:{
		Header
	},
	data(){
		return{
			countryDetails: {},
			borteringCountries: [],
			noData: false,
			err: false,
			isLoading: false
		}
	},
	methods: {
		getBorderingCountries(){
			console.log(this.countryDetails.borders);
			this.countryDetails.borders.forEach(element => {
				const countryDetailsUrl = `https://restcountries.eu/rest/v2/alpha/${element}`;
				fetch(countryDetailsUrl).then((response)=>{
					if(response.ok){
						return response.json();
					}
				})
				.then(this.setBorderingCountries)
				.catch((error)=>{
					console.log(error);
					this.err = true;
				});	
			});
		},
		setBorderingCountries(dataObj){
			this.borteringCountries.push({name: dataObj.name, code: dataObj.alpha3Code});
		},
		setCountryDetails(dataObj){
			this.noData = false;
			this.err = false;
			this.isLoading = false;
			console.log(dataObj);

			if(dataObj.constructor && Object.keys(dataObj).length){
				this.countryDetails = dataObj;
				this.getBorderingCountries();
			}else{
				this.noData = true;
			}
		},
		getCountryDetails(){
			const countryCode = this.$route.params.countryCode;
			const countryDetailsUrl = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
			
			this.isLoading = true;

			fetch(countryDetailsUrl).then((response)=>{
				if(response.ok){
					return response.json();
				}
			})
			.then(this.setCountryDetails)
			.catch((error)=>{
				console.log(error);
				this.err = true;
			});
		}
	},
	mounted(){
		this.getCountryDetails();
	}
}
</script>


<style lang="scss" scoped>
	main.details-page{
		padding-top: 80px;
		padding-bottom: 80px;
		.back{
			a{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 150px;
				height: 40px;
				background: white;
				border: none;
				font-size: 12px;
				border-radius: 5px;
				cursor: pointer;
				@include elements-box-shadow;
				i{
					margin-right: 5px;
				}
			}
		}
		.details{
			padding-top: 80px;
			padding-bottom: 80px;
			display: flex;
			justify-content: space-between;
			.flag-holder,
			.details-holder{
				flex-basis: 47%;
			}
			.details-holder{
				h3{
					margin-bottom: 45px;
				}
				.info-holder{
					display: flex;
					justify-content: space-between;
					margin-bottom: 75px;
					&>div{
						width: 50%;
						p:first-child{
							margin-top: 0;
						}
					}
				}
			}
			.border-countries-holder{
				display: flex;
				strong{
					width: 28%;
				}
				.countries{
					width: 71%;
					display: flex;
					flex-wrap: wrap;
					a{
						width: 100px;
						line-height: 30px;
						margin-bottom: 10px;
						margin-right: 10px;
						background: white;
						white-space: nowrap;
						padding: 0 5px;
						overflow: hidden;
						text-overflow: ellipsis;
						text-align: center;
						font-size: 12px;
						border-radius: 5px;
						cursor: pointer;
						@include elements-box-shadow;
					}
				}
			}
		}
	}
</style>