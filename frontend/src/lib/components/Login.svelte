<script>
  import InputGroup from "./InputGroup.svelte";
  import CloseButton from "./CloseButton.svelte";
  import { createEventDispatcher } from "svelte";
  import { userDataStore, updateUserDataStore } from "../store/userDataStore.js";
  import { fetchUserDataService, loginService } from "../services/apiService";
  import { updateAuthStore } from "../store/authStore";
  import { updateNotificationBoxStore } from "../store/notificationBoxStore";

  export let open = false;
  export let onOpen;
  export let isSmallScreen = false;
  let error = false;
  let success = false;
  let invalidCredentials = false;

  const dispatch = createEventDispatcher();

  function jumpToSignUp() {
    dispatch("jumpToSignUpEvent");
  }



  let username = "";
  let password = "";

  let isPasswordActive = false;
  function handlePasswordFocus(event) {
    isPasswordActive = event.detail;
  }
  function handlePasswordBlur(event) {
    isPasswordActive = event.detail;
  }

  async function fetchUserData() {
    const response = await fetchUserDataService();
    const result = await response.json();
    console.log(result);
    updateUserDataStore(result.user);
    username = $userDataStore.username;
  }
  async function handleSubmit() {
    try {
      const response = await loginService({ username, password });

      success = response.status === 200;
      error = !success;

      if (success) {
        fetchUserData();
        updateAuthStore(true);
        updateNotificationBoxStore(true);
        const data = await response.json();
        console.log("Response Data:", data);
        open = false;
      } else {
        invalidCredentials = true;
      }
    } catch (err) {
      console.error("Login error:", err);
      error = true;
    }
  }
</script>

<button class="login nav-link" class:small-screen={isSmallScreen} on:click={onOpen}>Login</button>
{#if open}
  <div class="mask">
    <div class="overallContainer" class:passwordActive={isPasswordActive}>
      <CloseButton on:closedClickedEvent />
      <h2>Login</h2>
      <form on:submit|preventDefault={handleSubmit}>
        <div class="innerContainer">
          <InputGroup
            info="Username"
            type="text"
            isRequired={true}
            bind:value={username}
            placeholder="Username"
          />
          {#if invalidCredentials}
            <span id="accountNotExist"
              >The account or password you entered was wrong. Please try again or sign up new
              account.</span
            >
          {/if}
          <div class="form_separator"></div>

          <InputGroup
            info="Password"
            type="password"
            isRequired={true}
            isPassword={true}
            minLength="5"
            maxLength="1024"
            on:focusEvent={handlePasswordFocus}
            on:blurEvent={handlePasswordBlur}
            bind:value={password}
            placeholder="Password"
          />
        </div>
        <div class="submitContainer">
          <button type="submit" class="submit">Login</button>
        </div>
      </form>

      <div class="signUpLink">
        <p>
          Don't have an account. <button class="signUp" on:click={jumpToSignUp}>Sign Up</button>
        </p>
      </div>
    </div>
  </div>
{/if}

<style>
  .nav-link {
    color: black;
    display: block;
    padding: 0;
    font-size: 1.5rem;
    color: black;
    transition: all 0.3s ease-in-out;
    background: none;
    border: none;
    font-family: inherit;
  }

  .nav-link:hover {
    color: grey;
    text-decoration: underline;
    text-underline-offset: 1rem;
    text-decoration-color: rgb(181, 181, 181);
    cursor: pointer;
  }

  .nav-link.small-screen {
    font-size: 1rem;
    padding: 10px;
    text-align: center;
    width: 100%;
  }

  .mask {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(162, 161, 161, 0.5);
    z-index: 200;
  }

  .overallContainer {
    display: flex;
    flex-direction: column;
    background-image: url(../assets/eye_opened1.jpg), url(../assets/eye_opened2.jpg);
    background-position:
      0 100%,
      100% 100%;
    background-repeat: no-repeat, no-repeat;
    background-size: 35%;
    position: relative;
    box-sizing: border-box;
    height: 600px;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 52px 65px 30px 92px;
  }

  .innerContainer {
    display: flex;
    flex-direction: column;
    border: 1px solid #e3e5e7;
    border-radius: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #212121;
  }

  .form_separator {
    display: block;
    width: 100%;
    height: 0;
    border-bottom: 1px solid #e3e5e7;
  }
  .submitContainer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .submit {
    box-sizing: border-box;
    width: 194px;
    height: 40px;
    cursor: pointer;
    color: #18191c;
    background: #ececfa;
    border: 1px solid #e3e5e7;
    border-radius: 8px;
  }

  .signUpLink {
    font-size: 1rem;
  }

  .signUp {
    cursor: pointer;
    color: #908ad6;
    background: #ececfa;
    border: 1px solid #e3e5e7;
    border-radius: 8px;
  }

  .passwordActive {
    background-image: url(../assets/eye_closed1.jpg), url(../assets/eye_closed2.jpg);
  }

  #accountNotExist {
    color: red;
    font-size: xx-small;
    position: relative;
    display: flex;
    justify-content: flex-end;
  }
</style>
