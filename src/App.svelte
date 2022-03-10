<script>
  import {
    addDoc,
    collection,
    deleteDoc,
    onSnapshot,
    doc,
    updateDoc,
  } from 'firebase/firestore';
  import {onDestroy} from 'svelte';
  import {db} from './firebase';

  let task = {
    title: '',
    description: '',
  };
  let tasks = [];
  let inputElement;
  let editStatus = false;
  let currentId = '';
  const unsub = onSnapshot(
    collection(db, 'tasks'),
    (querySnapshot) => {
      tasks = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
    (err) => {
      console.error(err);
    }
  );
  const addTask = async () => {
    try {
      await addDoc(collection(db, 'tasks'), {
        ...task,
        createdAt: Date.now(),
      });
      Toastify({
        text: 'New Task created',
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      console.error(error);
    }
  };
  const editTask = (currenTask) => {
    currentId = currenTask.id;
    task.title = currenTask.title;
    task.description = currenTask.description;
    editStatus = true;
  };
  const updateTask = async () => {
    try {
      await updateDoc(doc(db, 'tasks', currentId), task);
      Toastify({
        text: 'Task updated',
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = () => {
    if (!task.title) return;
    if (!editStatus) {
      addTask();
    } else {
      updateTask();
      editStatus = false;
      currentId = '';
    }
    task = {title: '', description: ''};
    inputElement.focus();
  };
  const onCancel = () => {
    editStatus = false;
    currentId = '';
    task = {title: '', description: ''};
  };
  onDestroy(unsub);
</script>

<main>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="title">Title</label>
    <input bind:value={task.title} type="text" />

    <label for="descrption" class="text-red-300">Description</label>
    <textarea bind:value={task.description} id="description" rows="3" />
    <button>Save</button>
  </form>

  {#each tasks as task}
    <div>
      <h5>{task.title}</h5>
      <p>{task.description}</p>
      <button on:click={editTask(task)}>Edit</button>
      <button on:click={deleteTask(task.id)}>Delete</button>
    </div>
  {/each}
</main>

<style>
</style>
