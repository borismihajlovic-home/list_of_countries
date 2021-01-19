<template>
    <section v-if="!isLoading && countries && countries.length > 0"  class="countries-list">
        <article v-for="country in countries" :key="country.alpha3Code">
            <div class="card-image">
                <img :src="country.flag" alt="countryFlag">
            </div>
            <div class="card-text">
                <div class="card-title">{{ country.name }}</div>
                <p><strong>Population: </strong>{{ country.population }}</p>
                <p><strong>Region: </strong>{{ country.region }}</p>
                <p><strong>Capital: </strong>{{ country.capital }}</p>
            </div>
        </article>

    </section>
    <div class="loading" v-else-if="isLoading"></div>
    <div class="no-data" v-else-if="!isLoading && (!countries || countries.length < 1)">No countries found.</div>
    <div class="error" v-else>{{ error }}</div>
</template>


<script>
export default {
    data(){
        return{
			countries: [],
			isLoading: false,
			error: null
		}
    },
    methods: {
        getCountries(){
            this.isLoading = true;
            this.error = null;
			fetch('https://restcountries.eu/rest/v2/all').then((response)=>{
				if(response.ok){
					return response.json();
				}
			}).then((data) => {
                this.isLoading = false;
				this.countries = data;
			}).catch((error)=>{
                console.log(error);
                this.isLoading = false;
                this.error = 'There was an error. Please try again.';
			});
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
    article{
        border-radius: 10px;
        background-color: $white;
        width: 260px;
        margin-bottom: 75px;
        .card-image{
            height: 160px;
            width: 100%;
            img{
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
</style>