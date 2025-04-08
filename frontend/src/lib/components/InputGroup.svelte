<script>
  export let info = "";
  export let type = "text";
  export let isRequired = false;
  export let isPassword = false;
  export let value = "";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  function handleFocus() {
    if (isPassword) dispatch("focusEvent", true);
  }

  function handleBlur() {
    if (isPassword) dispatch("blurEvent", false);
  }

  let show_password = false;
  $: if (isPassword) type = show_password ? "text" : "password";
</script>

<div class="InputGroup">
  <div class="form_info">{info}</div>
  {#if type === "password" && show_password}
    <input
      type="text"
      required={isRequired}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:input
      bind:value
      {...$$restProps}
    />
  {:else if type === "password" && !show_password}
    <input
      type="password"
      required={isRequired}
      on:focus={handleFocus}
      on:blur={handleBlur}
      on:input
      bind:value
      {...$$restProps}
    />
  {:else if type === "email"}
    <input type="email" required={isRequired} bind:value on:input {...$$restProps} />
  {:else if type === "date"}
    <input type="date" required={isRequired} bind:value on:input {...$$restProps} />
  {:else if type === "username"}
    <input type="text" required={isRequired} bind:value on:input {...$$restProps} />
  {:else}
    <input type="text" required={isRequired} bind:value on:input {...$$restProps} />
  {/if}
  {#if isPassword}
    <button
      type="button"
      on:click={() => {
        if (show_password) {
          dispatch("focusEvent", true);
        }
        if (!show_password) {
          dispatch("blurEvent", false);
        }
        show_password = !show_password;
      }}
    >
      {show_password ? "Hide" : "Show"}
    </button>
  {/if}
</div>

<style>
  input::placeholder {
    font-size: x-small;
    color: gray;
    opacity: 0.5;
    font-style: italic;
  }
  .InputGroup {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    padding: 12px 20px;
    gap: 20px;
  }
  .form_info {
    width: 100px;
  }

  .InputGroup input {
    width: 230px;
  }
  input {
    font-weight: 1400;
    font-size: 14px;
    line-height: 20px;
  }

  button {
    cursor: pointer;
  }
</style>
