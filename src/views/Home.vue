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
				<input placeholder="Search for a country..." type="text">
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

		<section class="countries-list"></section>
	</main>
</template>

<script>
export default {
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
			font-size: 10px;
			.input-holder{
				position: relative;
				input{
					border: none;
					width: 480px;
					padding: 2em 1.5em 2em 7em;
					border-radius: 5px;
					background-color: $white;
				}
			}
			.filter-container{
				position: relative;
				.filter-button{
					width: 200px;
					padding: 2em 0 2em 5em;
					border-radius: 5px;
					background-color: $white;
				}
				.filter-options{
					position: absolute;
					bottom: 0;
					left: 0;
					display: none;
				}
			}
		}
	}
</style>
