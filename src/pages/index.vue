<template lang="pug">
div
	h1 Test {{text}}
	v-btn(@click="fetchText") Fetch data
</template>
<script>
import fireDb from '~/plugins/firebase.js'
export default {
	data() {
		return {
			text: "default"
		}
	},
	methods:{
		async fetchText(){
			const ref = fireDb.collection("Test").doc("test1");
			let snap
			try {
				snap = await ref.get()
				this.text = snap.data().text
			} catch (e) {
				console.error(e)
			}
		}
	}
}
</script>
