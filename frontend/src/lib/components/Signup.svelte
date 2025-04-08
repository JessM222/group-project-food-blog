<script>
  import { userDataStore, updateUserDataStore } from "../store/userDataStore.js";
  import InputGroup from "./InputGroup.svelte";
  import { createEventDispatcher } from "svelte";
  import CloseButton from "./CloseButton.svelte";
  import { updateAuthStore } from "../store/authStore";
  import {
    checkUserNameAvailabilityService,
    loginService,
    registrationResponseService
  } from "../services/apiService.js";

  export let open = false;

  let confirmPasswordInvalid = false;
  // let usernameInputValue;
  // let password = "";
  // let confirmPassword = "";
  let isPasswordActive = false;
  let isUsernameUnavailable = false;
  let error = false;
  let success = false;

  let formData = {
    username: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    bio: ""
  };

  const dispatch = createEventDispatcher();
  function jumpToManageAccount() {
    dispatch("jumpToManageAccountEvent");
  }
  function loginSuccessfully() {
    dispatch("loginSuccessfullyEvent");
  }

  function handlePasswordFocus(event) {
    isPasswordActive = event.detail;
  }
  function handlePasswordBlur(event) {
    isPasswordActive = event.detail;

    if (formData.confirmPassword !== "" && formData.confirmPassword !== formData.password) {
      confirmPasswordInvalid = true;
    } else {
      confirmPasswordInvalid = false;
    }
  }

  async function checkUsernameAvailability() {
    try {
      if (formData.username.trim() === "") {
        isUsernameUnavailable = false;
        return;
      }
      const response = await checkUserNameAvailabilityService(formData.username);
      const data = await response.json();

      isUsernameUnavailable = !data.isUsernameAvailable;
    } catch (error) {
      console.error("Error checking username availability:", error);
    }
  }

  async function handleSubmit() {
    if (formData.confirmPassword !== formData.password) {
      confirmPasswordInvalid = true;
      return;
    }

    try {
      const registrationResponse = await registrationResponseService({
        username: formData.username,
        password: formData.password,
        fName: formData.firstname,
        lName: formData.lastname,
        date_of_birth: formData.dateOfBirth,
        bio: formData.bio,
        avatar: "Default"
      });
      const registrationData = await registrationResponse.json();

      console.log("Registration success:", registrationData);
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await loginService({
        username: formData.username,
        password: formData.password
      });

      success = response.status === 200;
      error = !success;

      if (success) {
        loginSuccessfully();
        jumpToManageAccount();
        console.log("formData", formData);
        updateUserDataStore({
          username: formData.username,
          fName: formData.firstname,
          lName: formData.lastname,
          date_of_birth: formData.dateOfBirth,
          bio: formData.bio,
          avatar: "Default"
        });
        console.log("userDataStore", $userDataStore);
        updateAuthStore(true);
      }

      const data = await response.json();
      console.log("Response Data:", data);
    } catch (err) {
      console.error("Login error:", err);
      error = true;
    }
  }
</script>

{#if open}
  <div class="mask">
    <div class="overallContainer" class:passwordActive={isPasswordActive}>
      <h2>Sign Up</h2>
      <CloseButton on:closedClickedEvent />

      <form on:submit|preventDefault={handleSubmit}>
        <div class="innerContainer">
          <InputGroup
            info="Username"
            type="username"
            isRequired={true}
            bind:value={formData.username}
            on:input={checkUsernameAvailability}
            placeholder="Username"
          />
          {#if isUsernameUnavailable}
            <span id="usernameError">Oops this user name is taken. Please enter another one.</span>
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
            bind:value={formData.password}
            placeholder="Password"
          />

          <div class="form_separator"></div>

          <InputGroup
            info="Confirm Password"
            type="password"
            isRequired={true}
            isPassword={true}
            on:focusEvent={handlePasswordFocus}
            on:blurEvent={handlePasswordBlur}
            bind:value={formData.confirmPassword}
            placeholder="Password"
          />
          {#if confirmPasswordInvalid}
            <span id="passwordError">Please enter the same password.</span>
          {/if}
          <div class="form_separator"></div>
          <InputGroup
            info="First Name"
            type="text"
            bind:value={formData.firstname}
            isRequired={true}
            placeholder="First name"
          />

          <div class="form_separator"></div>
          <InputGroup
            info="Last Name"
            type="text"
            bind:value={formData.lastname}
            isRequired={true}
            placeholder="Last name"
          />

          <div class="form_separator"></div>
          <InputGroup
            info="Birthday"
            type="date"
            bind:value={formData.dateOfBirth}
            isRequired={true}
          />

          <div class="form_separator"></div>
          <InputGroup
            info="Bio"
            type="text"
            bind:value={formData.bio}
            isRequired={true}
            placeholder="A sentence to describe yourself"
          />
        </div>
        <div class="submitContainer">
          <button type="submit" class="submit">Sign Up</button>
        </div>
      </form>
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
    background: rgba(162, 161, 161, 0.5);
    z-index: 200;
  }

  .overallContainer {
    background-image: url(../assets/eye_opened1.jpg), url(../assets/eye_opened2.jpg);
    background-position:
      0 100%,
      100% 100%;
    background-repeat: no-repeat, no-repeat;
    background-size: 35%;
    position: relative;
    box-sizing: border-box;
    height: 820px;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 52px 65px 30px 92px;
  }

  .passwordActive {
    background-image: url(../assets/eye_closed1.jpg), url(../assets/eye_closed2.jpg);
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
  #usernameError {
    color: red;
    font-size: xx-small;
    position: relative;
    display: flex;
    justify-content: flex-end;
  }
  #passwordError {
    color: red;
    font-size: xx-small;
    position: relative;
    display: flex;
    justify-content: flex-end;
  }

  .submitContainer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
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
</style>
