<script>
  import logo1 from "$lib/assets/opened1.png";
  import logo2 from "$lib/assets/opened2.png";
  import DeleteConfirmationPage from "./DeleteConfirmationPage.svelte";
  import Login from "./Login.svelte";
  import Logout from "./Logout.svelte";
  import ManageAccount from "./ManageAccount.svelte";
  import Signup from "./Signup.svelte";
  import { authStore } from "../store/authStore";
  import { userDataStore } from "../store/userDataStore";

  $: isMenuOpen = false;
  $: loginAppear = false;
  $: signUpAppear = false;
  $: manageAccountAppear = false;
  $: deleteConfirmationAppear = false;
  $: if (!$authStore) {
    loginAppear = false;
  }

  function handleCancelDelete() {
    deleteConfirmationAppear = false;
    manageAccountAppear = true;
  }

  function handleDeleted() {
    deleteConfirmationAppear = false;
    loginAppear = false;
    signUpAppear = false;
    manageAccountAppear = false;
  }

  function hadlesaveChanges() {
    loginAppear = false;
    signUpAppear = false;
    manageAccountAppear = false;
  }

  function hadleConfirmIfDelete() {
    deleteConfirmationAppear = true;
  }

  function hadleJumpToManageAccount() {
    manageAccountAppear = true;
  }

  function handleCloseButtonClicked() {
    loginAppear = false;
    signUpAppear = false;
    manageAccountAppear = false;
  }

  function hadleJumpToSignUp() {
    signUpAppear = true;
  }

  function handleLoginSuccessfully() {
    loginAppear = false;
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<link
  href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Dancing+Script:wght@600&display=swap"
  rel="stylesheet"
/>

<nav id="desktop-nav">
  <div class="logoContainer">
    <img class="logo1" src={logo1} alt="hippoLogo" />
    <div class="blogName">Happy Hippos' Kitchen</div>
    <img class="logo2" src={logo2} alt="hippoLogo" />
  </div>

  <div>
    <ul class="nav-links">
      <li><a href="/home">Home</a></li>
      <li><a href="/Aboutme">About Us</a></li>
      <li><a href="/recipes">Recipes</a></li>

      {#if !$authStore}
        <li>
          <Login
            open={loginAppear}
            onOpen={() => (loginAppear = true)}
            on:closedClickedEvent={handleCloseButtonClicked}
            on:jumpToSignUpEvent={hadleJumpToSignUp}
            on:loginSuccessfullyEvent={handleLoginSuccessfully}
          />
          <Signup
            open={signUpAppear}
            on:closedClickedEvent={handleCloseButtonClicked}
            on:jumpToManageAccountEvent={hadleJumpToManageAccount}
          />
        </li>
      {/if}

      {#if $authStore}
        <li>
          <ManageAccount
            open={manageAccountAppear}
            onOpen={() => (manageAccountAppear = true)}
            on:closedClickedEvent={handleCloseButtonClicked}
            on:confirmIfDeleteEvent={hadleConfirmIfDelete}
            on:saveChangesEvent={hadlesaveChanges}
          />
          <DeleteConfirmationPage
            open={deleteConfirmationAppear}
            on:cancelDeleteEvent={handleCancelDelete}
            on:accountDeletedEvent={handleDeleted}
          />
        </li>
      {/if}

      {#if $authStore}
        <li><Logout /></li>
      {/if}

      {#if $authStore}
        <div>
          <img
            class="navAvatar"
            src={`http://localhost:3000/images/avatars/${$userDataStore.avatar ?? "Default"}.jpg`}
            alt="User Avatar"
          />
        </div>
      {/if}

      {#if $authStore}
        <div class="navUsername">Hi: {$userDataStore.username}</div>
      {/if}
    </ul>
  </div>
</nav>

<nav id="hamburger-nav">
  <div class="logoContainer">
    <img class="logo1" src={logo1} alt="hippoLogo" />
    <div class="blogName">Happy Hippo's Kitchen</div>
    <img class="logo2" src={logo2} alt="hippoLogo" />
  </div>
  <div class="hamburger-menu">
    <button on:click={toggleMenu} class:open={isMenuOpen}>
      <div class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
    <div class="menu-links" class:open={isMenuOpen}>
      <li><a href="/home" on:click={toggleMenu}>Home</a></li>
      <li><a href="/Aboutme" on:click={toggleMenu}>About Us</a></li>
      <li><a href="/recipes" on:click={toggleMenu}>Recipes</a></li>

      {#if !$authStore}
        <li>
          <Login
            open={loginAppear}
            onOpen={() => (loginAppear = true)}
            isSmallScreen={true}
            on:closedClickedEvent={handleCloseButtonClicked}
            on:jumpToSignUpEvent={hadleJumpToSignUp}
            on:loginSuccessfullyEvent={handleLoginSuccessfully}
          />
          <Signup
            open={signUpAppear}
            on:closedClickedEvent={handleCloseButtonClicked}
            on:jumpToManageAccountEvent={hadleJumpToManageAccount}
          />
        </li>
      {/if}
      <li>
        {#if $authStore}
          <li><Logout /></li>
        {/if}
      </li>

      <li>
        {#if $authStore}
          <li>
            <ManageAccount
              open={manageAccountAppear}
              onOpen={() => (manageAccountAppear = true)}
              on:closedClickedEvent={handleCloseButtonClicked}
              on:confirmIfDeleteEvent={hadleConfirmIfDelete}
              on:saveChangesEvent={hadlesaveChanges}
            />
            <DeleteConfirmationPage
              open={deleteConfirmationAppear}
              onOpen={() => (deleteConfirmationAppear = true)}
              on:cancelDeleteEvent={handleCancelDelete}
              on:accountDeletedEvent={handleDeleted}
            />
          </li>
        {/if}
      </li>
    </div>
  </div>
</nav>

<style>
  #hamburger-nav {
    display: none;
  }
  @media screen and (max-width: 1133px) {
    #desktop-nav {
      display: none;
    }

    #hamburger-nav {
      display: flex;
      padding: 0 64px;
      display: flex;
      justify-content: space-between;
    }
  }
  nav,
  .nav-links {
    display: flex;
  }

  nav {
    justify-content: space-around;
    align-items: center;
    height: 100px;
    background-color: #9aabc47d;
  }

  .nav-links {
    gap: 2rem;
    list-style: none;
    font-size: 1.5rem;
  }

  .logo1 {
    width: 70px;
  }
  .logo2 {
    width: 70px;
  }

  .logoContainer {
    display: flex;
    min-width: 378px;
    width: 378px;
    justify-content: space-around;
    align-items: center;
  }

  .blogName {
    color: #d89a9a;
    font-family: "Dancing Script", cursive;
    font-size: 25px;
    text-shadow:
      1px 1px 4px rgba(255, 255, 255, 0.1),
      0 0 10px #fafafa;
    letter-spacing: 1px;
    font-weight: 600;
  }
  a {
    color: black;
    text-decoration: none;
    text-decoration-color: white;
  }

  a:hover {
    color: grey;
    text-decoration: underline;
    text-underline-offset: 1rem;
    text-decoration-color: rgb(181, 181, 181);
  }

  .hamburger-menu {
    position: relative;
    display: inline-block;
  }

  .hamburger-icon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 24px;
    width: 30px;
    cursor: pointer;
  }

  .hamburger-icon span {
    width: 100%;
    height: 2px;
    background-color: black;
    transition: all 0.3s ease-in-out;
  }

  .menu-links {
    position: absolute;
    top: 100%;
    right: 0;
    border-radius: 10%;
    width: fit-content;
    min-width: 150px;
    max-height: 0;
    background-color: #fbd1d1;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .menu-links a {
    display: block;
    padding: 10px;
    text-align: center;
    font-size: 1rem;
    color: black;

    text-decoration: none;
    transition: all 0.3s ease-in-out;
  }

  .menu-links a:hover {
    color: grey;
  }
  .menu-links li {
    list-style: none;
  }

  .menu-links.open {
    max-height: 300px;
  }

  .open .hamburger-icon span:first-child {
    transform: rotate(45deg) translate(10px, 5px);
  }

  .open .hamburger-icon span:nth-child(2) {
    opacity: 0;
  }

  .open .hamburger-icon span:last-child {
    transform: rotate(-45deg) translate(10px, -5px);
  }

  button {
    border: none;
    background-color: #9aabc400;
  }

  .hamburger-icon span:first-child {
    transform: none;
  }

  .hamburger-icon span:nth-child(2) {
    opacity: 1;
  }

  .hamburger-icon span:last-child {
    transform: none;
  }
  .navAvatar {
    border-radius: 50%;
    width: 60px;
    object-fit: cover;
    border: 2px solid #d89a9a;
    margin-left: 15px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .navUsername {
    font-size: 1.2rem;
    font-family: "Merriweather", serif;
    color: #d89a9a;
    margin-left: 10px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
</style>
