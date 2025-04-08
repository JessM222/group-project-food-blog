<script>
  import { handleLogoutService } from "../services/apiService";
  import { updateUserDataStore, userDataStore } from "../store/userDataStore";
  import { updateAuthStore } from "../store/authStore";
  import { updateNotificationBoxStore } from "../store/notificationBoxStore";

  let error = false;
  let success = false;
  let emptyUserData = {
    username: "",
    password: "",
    email: "",
    fName: "",
    lName: "",
    date_of_birth: "",
    bio: "",
    avatar: ""
  };

  async function handleLogout() {
    try {
      let userData = {
        username: $userDataStore.username,
        password: $userDataStore.password,
        avatar: $userDataStore.avatar
      };

      const response = await handleLogoutService(userData);

      success = response.status === 200;
      if (success) {
        updateAuthStore(false);
        updateNotificationBoxStore(true);
        updateUserDataStore(emptyUserData);
      }
      error = !success;
      const data = await response.json();
      console.log("Response Data:", data);
    } catch (err) {
      console.error("Logout error:", err);
      error = true;
    }
  }
</script>

<button class="nav-link" type="button" on:click={handleLogout}>Logout</button>

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
</style>
