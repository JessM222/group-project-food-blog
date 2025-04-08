<script>
  import "$lib/css/app.css";
  import { onMount } from "svelte";
  import Navbar from "../lib/components/navbar.svelte";
  import { fetchUserDataService } from "../lib/services/apiService";
  import { updateUserDataStore } from "../lib/store/userDataStore";
  import { authStore, updateAuthStore } from "../lib/store/authStore";
  import NotificationBox from "../lib/components/NotificationBox.svelte";

  onMount(async () => {
    try {
      const response = await fetchUserDataService();

      if (response.ok && response.status === 200) {
        const userData = await response.json();

        updateUserDataStore(userData.user);
        updateAuthStore(true);
      }
    } catch (error) {}
  });
</script>

<body>
  <Navbar />
  <NotificationBox />

  <div class="container">
    <slot />
  </div>
</body>
