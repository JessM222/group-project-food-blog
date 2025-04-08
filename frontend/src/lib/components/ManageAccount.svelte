<script>
  import InputGroup from "./InputGroup.svelte";
  import CloseButton from "./CloseButton.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { userDataStore, updateUserDataStore } from "../store/userDataStore.js";
  import {
    checkUserNameAvailabilityService,
    fetchUserDataService,
    updateUserDataResponseService
  } from "../services/apiService";
  export let open = false;
  export let onOpen;
  const avatarList = [
    "Picture1",
    "Picture2",
    "Picture3",
    "Picture4",
    "Picture5",
    "Picture6",
    "Picture7",
    "Picture8"
  ];

  let password = "";
  let confirmPassword = "";
  let confirmPasswordInvalid = false;
  let isChangePassWordClicked = false;
  let isUsernameUnavailable = false;
  $: userData = $userDataStore;

  const dispatch = createEventDispatcher();
  function confirmIfDelete() {
    dispatch("confirmIfDeleteEvent");
  }

  function handleChangePassWordClicked() {
    isChangePassWordClicked = true;
  }

  function handleClosePasswordContainer() {
    isChangePassWordClicked = false;
  }
  function checkConfirmPassword() {
    if (confirmPassword !== password) {
      confirmPasswordInvalid = true;
    } else {
      confirmPasswordInvalid = false;
      isChangePassWordClicked = false;
    }
  }

  async function checkUsernameAvailability() {
    try {
      if (userData.username.trim() === "") {
        isUsernameUnavailable = false;
        return;
      }

      const response = await checkUserNameAvailabilityService(userData.username);
      const data = await response.json();

      isUsernameUnavailable = !data.isUsernameAvailable;
    } catch (error) {
      console.error("Error checking username availability:", error);
    }
  }

  async function handleSubmit() {
    checkConfirmPassword();

    if (confirmPasswordInvalid) {
      return;
    }

    try {
      const userDataObject = {
        username: userData.username,
        password: password ?? null,
        email: userData.email,
        fName: userData.fName,
        lName: userData.lName,
        date_of_birth: userData.date_of_birth
          ? new Date(userData.date_of_birth).toJSON().slice(0, 10)
          : null,
        bio: userData.bio,
        avatar: userData.avatar
      };
      await updateUserDataResponseService(userDataObject);

      dispatch("saveChangesEvent");

      const response = await fetchUserDataService();
      const updatedUserData = await response.json();

      updateUserDataStore(updatedUserData.user);
    } catch (error) {
      console.error("Error:", error);
    }
  }
</script>

<button class="manageAccount nav-link" on:click={onOpen}>Manage Account</button>
{#if open}
  <form on:submit={handleSubmit}>
    <div class="mask">
      <div class="overallContainer">
        <CloseButton on:closedClickedEvent />
        <div class="col1">
          <h2>Manage your account</h2>
          <InputGroup
            info="Username"
            type="username"
            isRequired={true}
            bind:value={userData.username}
            on:input={checkUsernameAvailability}
            placeholder="Username"
          />
          {#if isUsernameUnavailable}
            <span id="usernameError">Oops this user name is taken. Please enter another one.</span>
          {/if}

          <InputGroup
            info="Email"
            type="email"
            bind:value={userData.email}
            placeholder="Please enter your email"
          />

          <InputGroup info="First Name" type="text" bind:value={userData.fName} />

          <InputGroup info="Last Name" type="text" bind:value={userData.lName} />

          <InputGroup info="Birthday" type="date" bind:value={userData.date_of_birth} />

          <InputGroup info="Bio" type="text" bind:value={userData.bio} />

          {#if !isChangePassWordClicked}
            <button type="button" class="edit" on:click={handleChangePassWordClicked}
              >Click to change your password</button
            >
          {/if}

          {#if isChangePassWordClicked}
            <div class="changePasswordContainer">
              <button type="button" class="cancel" on:click={handleClosePasswordContainer}
                >Cancel</button
              >
              <InputGroup
                info="Password"
                type="password"
                isRequired={false}
                isPassword={true}
                minLength="5"
                maxLength="1024"
                bind:value={password}
                placeholder="Password"
              />

              <InputGroup
                info="Confirm Password"
                type="password"
                isRequired={false}
                isPassword={true}
                bind:value={confirmPassword}
                placeholder="Password"
              />
              {#if confirmPasswordInvalid}
                <span id="passwordError">Please enter the same password.</span>
              {/if}
            </div>
          {/if}
        </div>
        <div class="col2">
          <div class="avatarContainer">
            <h3>Choose an Avatar:</h3>
            <div class="avatar-selection">
              {#each avatarList as avatarUrl}
                <button
                  type="button"
                  class="avatarButtons {userData.avatar === avatarUrl ? 'selected' : ''}"
                  on:click={() => (userData.avatar = avatarUrl)}
                >
                  <img
                    src={`http://localhost:3000/images/avatars/${avatarUrl}.jpg`}
                    class:avatar-selected={userData.avatar === avatarUrl}
                    alt="User Avatar"
                  />
                </button>
              {/each}
            </div>
          </div>

          <div class="buttons">
            <button class="deleteButton" type="button" on:click={confirmIfDelete}
              >Delete Account</button
            >
            <button class="saveChanges">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </form>
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
    display: flex;
    box-sizing: border-box;
    position: absolute;
    width: 1200px;
    height: 525px;
    background: #ffffff;
    border-radius: 8px;
    padding: 52px 65px 30px 92px;
  }
  .col1 {
    flex: 1;
  }

  .col2 {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .avatarContainer {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .avatar-selection {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 10px;
  }

  .avatar-selection img {
    width: 100px;
    height: 100px;
    cursor: pointer;
    border-radius: 50%;
    transition: transform 0.2s;
  }

  .avatarButtons:hover {
    transition: all 150ms ease-in;
    transform: scale(1.5);
    border-right-color: #03b3ff4b;
    border-left-color: #fff;
    border-top-color: #fff;
    border-bottom-color: #03b3ff4b;
  }

  .avatarButtons {
    display: flex;
    align-items: center;
    padding: 0;
    border-width: 4px;
    border-right-color: #03b3ff4b;
    border-left-color: #fff;
    border-top-color: #fff;
    border-bottom-color: #03b3ff4b;
    border-radius: 50%;
  }

  .selected {
    border-width: 5px;
    border-right-color: #f5f5f5;
    border-left-color: #ff8ab3;
    border-top-color: #ff8ab3;
    border-bottom-color: #fbfbfb;
    background-color: #ff8ab3;
  }

  .deleteButton {
    width: 194px;
    height: 40px;
    cursor: pointer;
    color: #18191c;
    background: #f9d0d0;
    border: 1px solid #e3e5e7;
    border-radius: 8px;
  }

  .saveChanges {
    box-sizing: border-box;
    width: 194px;
    height: 40px;
    cursor: pointer;
    color: #18191c;
    background: #d5eaff;
    border: 1px solid #e3e5e7;
    border-radius: 8px;
  }
  .changePasswordContainer {
    display: flex;
    flex-direction: column;
    border: 2px solid #d5eaff;
  }

  .edit {
    box-sizing: border-box;
    width: 300px;
    height: 40px;
    cursor: pointer;
    color: #18191c;
    background: #d5eaff;
    border: 1px solid #e3e5e7;
    border-radius: 8px;
  }

  .cancel {
    align-self: flex-start;
    width: 70px;
    cursor: pointer;
    border-radius: 10%;
    border: #d2b7b7 solid 1px;
    background: #f9d0d0;
  }

  #passwordError {
    color: red;
    font-size: xx-small;
    position: relative;
    display: flex;
    justify-content: center;
  }

  #usernameError {
    color: red;
    font-size: xx-small;
    position: relative;
    display: flex;
    justify-content: center;
  }
</style>
