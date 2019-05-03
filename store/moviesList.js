import fireDb from '~/plugins/firebase'
import eventBus from '@/middleware/eventBus'
export const state = () =>({
	movies: [],
	imdbList: [],
	loading: false,
	getHomeList: [],

});
export const getters = {
		moviesList(state){
			return state.movies
		},
		getHomeList(state){
			return state.homelist
		},
		getLoading(state){
			return state.loading
		}
	};
export const mutations = {
		deleteMovie(state, currentItem){
			state.movies.splice(currentItem,1)
		},
		addMovie(state, payload){
			state.movies.push(payload)
		},
		set_movies_list(state, payload){
			state.movies = payload || []
		},
		set_imdb_list(state, payload){
			state.imdbList = payload || []
		},
		clear_movies(state){
			state.movies = [];
		},
		set_loading(state, payload){
			state.loading = payload
		}
	};
export const actions = {
		GET_MOVIES_LIST({commit}){
			console.log('test');
			const urlDb = 'moviesList/' + store.state.userAuthentication.user.id;
			firebase.database().ref(urlDb).once('value').then(snapshot=>{
				let lists = snapshot.val();
				commit('set_movies_list', lists)
			}).catch(error => console.log(error))
		},
		GET_IMDB_LIST({commit}){
			commit('set_loading', true)
			fireDb.collection("IMDB").get().then(function(querySnapshot) {
				let list = [];
				querySnapshot.forEach(function(doc) {
					list.push(doc.data());
				});
				commit("set_imdb_list", list)
			});
			commit('set_loading', false)

		},
		async SET_MOVIES_LIST({commit, state}){
			commit('clear_error');
			commit('set_loading', true);
			try{
				await firebase.database().ref('moviesList/' + store.state.userAuthentication.user.id)
					.set(state.movies.map(item => item));
					eventBus.$emit("savedData")
				commit('set_loading', false);
			}catch(error){
				commit('set_error', error.message);
				commit('set_loading', false);
				throw error
			}
		}

	};
