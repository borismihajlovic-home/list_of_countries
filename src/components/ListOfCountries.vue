<template>
    <section v-if="!isLoading && countries && countries.length > 0"  class="countries-list">
        <router-link :to="`/details/${country.alpha3Code}?isDark=${isDark}`" v-for="country in countries" :key="country.alpha3Code">
            <div class="card-image">
                <img :src="country.flag" alt="countryFlag">
            </div>
            <div class="card-text">
                <div class="card-title">{{ country.name }}</div>
                <p><strong>Population: </strong>{{ country.population }}</p>
                <p><strong>Region: </strong>{{ country.region }}</p>
                <p><strong>Capital: </strong>{{ country.capital }}</p>
            </div>
        </router-link>
    </section>
    <div class="loading" v-else-if="isLoading">Loading please wait...</div>
    <div class="no-data" v-else-if="!isLoading && (!countries || countries.length < 1)">No countries found.</div>
    <div class="error" v-else>{{ err }}</div>
</template>


<script>
export default {
    name: 'List of countries',
    props: ['inputValue', 'region', 'isDark'],
    data(){
        return{
			fixedArrayCountries: [],
			countries: [],
			isLoading: false,
			err: null
		}
    },
    watch: {
        inputValue(value){
            this.countries = this.fixedArrayCountries.filter(country => {
                return country.name.toLowerCase().includes(value.toLowerCase());
            });
        },
        region(value){
            console.log(value);
            this.countries = this.fixedArrayCountries.filter(country => {
                return country.region.toLowerCase().includes(value.toLowerCase());
            });
        }
    },
    methods: {
        getCountries(){
            this.isLoading = true;
            this.err = null;
			fetch('https://restcountries.eu/rest/v2/all').then((response)=>{
				if(response.ok){
					return response.json();
				}
			}).then((data) => {
                this.isLoading = false;
                data.forEach((item)=>{
                    item.population = this.formatNumber(item.population);
                });
                this.fixedArrayCountries = data;
				this.countries = data;
			}).catch(()=>{
                this.isLoading = false;
                this.err = 'There was an error. Please try again.';
			});
        },
		formatNumber(num) {
			return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
		}
    },
    mounted(){
        this.getCountries();
    }
}
</script>


<style lang="scss" scoped>
.countries-list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    a{
        @include elements-box-shadow;
        border-radius: 10px;
        background-color: $white;
        width: 260px;
        margin-bottom: 75px;
        margin-right: 10px;
        .card-image{
            height: 160px;
            width: 100%;
            img{
                height: 100%;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
        }
        .card-text{
            padding: 30px 25px;
            .card-title{
                margin-bottom: 25px;
                font-weight: $font-weight-bold;
            }
            p{
                font-size: 12px;
            }
        }
    }
}
.no-data,
.loading,
.error{
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    padding: 2em 0;
}
.error{
    color: $red;
}

@media screen and (max-width: 580px) {
    .countries-list a{
        width: 100%;
        margin-right: 0;
        .card-image{
            height: auto;
        }
    }
}
</style>