<template lang="pug">
v-container(grid-list-lg align-center)
	v-layout(row wrap )
		v-flex(xs12)
			v-card(color="grey lighten-2")
				.display-1.light-blue--text.text-xs-center.py-2 Search movies list
				v-divider
				v-card-text
					v-text-field(prepend-icon="search" v-model="search" @input="currentPage=1" label="Search movies list")
		v-flex.text-xs-center(xs12)
			h1.display-1.light-blue--text Top 50 IMDB films
		v-flex(xs12).text-xs-center
			v-progress-circular(v-if="loading" :size='170', :width='7', color='info', indeterminate)
			v-expansion-panel()
				v-expansion-panel-content.light-blue--text(v-for="(item, index) in displayedList" :key="`moviesList+${index}`")
					div(slot="header" color='light-blue' ) {{ item.title }}
					v-icon(slot='actions', color='light-blue') keyboard_arrow_down
					v-card
						v-card-text.px-4.grey--text  {{ item.description }}
			v-layout(row wrap )
				v-flex.text-xs-center(fluid v-if="displayedList.length")
					v-pagination(v-model="currentPage" :length="totalPage" :total-visible="perPage")
</template>
<script>
import fireDb from '~/plugins/firebase'
export default {
	data:()=>({
		showMasage: false,
		search: "",
		currentPage: 1,
		perPage: 7,
		setMoviesListOnPage: 10,
	}),
	computed:{
		loading(){return this.$store.state.moviesList.loading},
		moviesList(){
			return this.$store.state.moviesList.imdbList
		},
		filteredList(){
			return this.moviesList.filter( post => {
				return post.title.toLowerCase().includes(this.search.toLowerCase());
			})
		},
		displayedList () {
			return this.paginator(this.filteredList);
		},
		totalPage(){
			return Math.ceil(this.filteredList.length/this.setMoviesListOnPage)
		}
	},
	async fetch ({ store}) {
		await store.dispatch("moviesList/GET_IMDB_LIST");
	},
	methods:{
			paginator(list){
				let page = this.currentPage;
				let setMoviesListOnPage = this.setMoviesListOnPage;
				let from = (page * setMoviesListOnPage) - setMoviesListOnPage;
				let to = (page * setMoviesListOnPage);
				return list.slice(from, to);
		}

	}
}
</script>
<style lang="stylus" scoped>
.v-btn--top.v-btn--absolute
	top: 5px
.v-btn--right
	right: 0
.v-pagination
	margin: 20px 0 50px 0
</style>
