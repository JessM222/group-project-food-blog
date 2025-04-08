<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function closeClicked() {
    dispatch("closedClickedEvent");
  }
</script>

<button type="button" class="closeWindow" on:click={closeClicked}></button>

<style>
  .closeWindow {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    border: none;
    background-image: url(../assets/closeButton.svg);
    padding: 0%;
    background-color: white;
  }
</style>
