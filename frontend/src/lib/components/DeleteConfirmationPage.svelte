<script>
  import { createEventDispatcher } from "svelte";
  import { handleDeleteService } from "../services/apiService";
  import { userDataStore } from "../store/userDataStore";
  import { updateAuthStore } from "../store/authStore";
  export let open = false;

  const dispatch = createEventDispatcher();
  function cancelDelete() {
    dispatch("cancelDeleteEvent");
  }
  function accountDeleted() {
    dispatch("accountDeletedEvent");
  }

  async function handleDelete() {
    try {
      const response = await handleDeleteService({ username: $userDataStore.username });
      const data = await response.json();

      console.log("Response Data:", data);
      accountDeleted();
      updateAuthStore(false);
    } catch (err) {
      console.error("Login error:", err);
    }
  }
</script>

{#if open}
  <div class="mask">
    <div class="overallContainer">
      <p>Are you sure you want to delete?</p>
      <button class="Cancel" on:click={cancelDelete}>Cancel</button>
      <button class="Delete" on:click={handleDelete}>Delete</button>
    </div>
  </div>
{/if}

<style>
  .mask {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 14px;
    background: rgba(162, 161, 161, 0.5);
    z-index: 200;
  }

  .overallContainer {
    box-sizing: border-box;
    position: absolute;
    height: 430px;
    background: #ffffff;
    border-radius: 8px;
    padding: 52px 65px 30px 92px;
  }
</style>
