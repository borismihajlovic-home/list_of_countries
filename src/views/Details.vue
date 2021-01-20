<template>
	<Header :isDark="isDark" @dark-or-light="changeMode"></Header>
	<main class="details-page" :class="{'dark-mode': isDark}">
		<div class="container">
			<div class="back">
				<router-link :to="`/?isDark=${isDark}`"><i class="fas fa-arrow-left"></i> Back</router-link>
			</div>
			<section class="details">
				<div class="flag-holder"><img :src="countryDetails.flag" alt="countryFlag"></div>
				<div class="details-holder">
					<h3>{{ countryDetails.name }}</h3>
					<div class="info-holder">
						<div>
							<p><span>Native name:</span> {{ countryDetails.nativeName }}</p>
							<p><span>Population:</span> {{ countryDetails.population }}</p>
							<p><span>Region:</span> {{ countryDetails.region }}</p>
							<p><span>Sub Region:</span> {{ countryDetails.subregion }}</p>
							<p><span>Capital:</span> {{ countryDetails.capital }}</p>
						</div>
						<div>
							<p><span>Top Level Domain:</span> <span :key="index" v-for="(domain, index) in countryDetails.topLevelDomain">{{ countryDetails.topLevelDomain.length == index+1 ? domain : domain+', ' }}</span></p>
							<p><span>Currencies:</span> <span :key="index" v-for="(item, index) in countryDetails.currencies">{{ countryDetails.currencies.length === index+1 ? item.name : item.name+', ' }}</span></p>
							<p><span>Languages:</span> <span :key="index" v-for="(item, index) in countryDetails.languages">{{ countryDetails.languages.length === index+1 ? item.name : item.name+', ' }}</span></p>
						</div>
					</div>
					<div class="border-countries-holder">
						<span>Border Countries: </span>
						<div class="countries">
							<router-link :key="index" v-for="(item, index) in borteringCountries" :to="item.code+'?isDark='+isDark" @click="getCountryDetails">{{ item.name }}</router-link>
						</div>
					</div>
				</div>
			</section>
		</div>
	</main>
</template>

<script>
import Header from '../components/Header.vue';

export default {
	name: 'Details',
	components:{
		Header
	},
	data(){
		return{
			countryDetails: {},
			borteringCountries: [],
			noData: false,
			err: false,
			isLoading: false,
			isDark: false
		}
	},
	methods: {
		getBorderingCountries(){
			this.countryDetails.borders.forEach(element => {
				const countryDetailsUrl = `https://restcountries.eu/rest/v2/alpha/${element}`;
				fetch(countryDetailsUrl).then((response)=>{
					if(response.ok){
						return response.json();
					}
				})
				.then(this.setBorderingCountries)
				.catch(()=>{
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

			if(dataObj.constructor && Object.keys(dataObj).length){
				dataObj.population = this.formatNumber(dataObj.population);
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
			.catch(()=>{
				this.err = true;
			});
		},
		changeMode(){
			this.isDark = !this.isDark;
		},
		formatNumber(num) {
			return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
		}
	},
	mounted(){
		this.getCountryDetails();
		if(this.$route.query.isDark == 'true'){
			this.isDark = this.$route.query.isDark;
		}
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
				border: none;
				font-size: 12px;
				border-radius: 5px;
				font-weight: $font-weight-lite;
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
					font-size: 20px;
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
						p{
							font-weight: $font-weight-lite;
							span:first-child{
								font-weight: $font-weight-normal;
							}
						}
					}
				}
			}
			.border-countries-holder{
				display: flex;
				span{
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
						white-space: nowrap;
						padding: 0 5px;
						overflow: hidden;
						text-overflow: ellipsis;
						text-align: center;
						font-size: 12px;
						font-weight: $font-weight-lite;
						border-radius: 5px;
						cursor: pointer;
						@include elements-box-shadow;
					}
				}
			}
		}
	}

	@media screen and (max-width: 1120px){
		main.details-page .details .border-countries-holder{
			display: block;
			span{
				display: block;
				margin-bottom: 20px;
			}
			span,
			.countries{
				width: 100%;
			}
		}
	}
	@media screen and (max-width: 800px){
		main.details-page .details{
			display: block;
			.details-holder h3{
				margin-top: 75px;
			}
		}
	}
	@media screen and (max-width: 500px){
		main.details-page .details .details-holder .info-holder{
			display: block;
			&>div{
				width: 100%;
			}
			div:first-child{
				margin-bottom: 75px;
			}
		}
	}
</style>