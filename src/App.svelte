<script>

	import { addDoc, collection } from "firebase/firestore";
	import { db } from "./firebase";

	let task = {
		title: '',
		description: ''
	}
	async function handleSubmit () {
		await addDoc(collection(db,'tasks'), task)
		console.log('task saved');
	}
</script>

<main>
	<form on:submit|preventDefault={handleSubmit}>
	<label for="title">Title</label>
	<input
	bind:value={task.title}
	 type="text">

	<label for="descrption">Description</label>
	<textarea 
	bind:value={task.description}
	id="description" rows="3"></textarea>
	<button>Save</button>
</form>
</main>
<style>
</style>