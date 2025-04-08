<script>
  import { authStore } from "../store/authStore";
  import { notificationBoxStore, updateNotificationBoxStore } from "../store/notificationBoxStore";

  $: if ($notificationBoxStore) {
    setTimeout(() => {
      updateNotificationBoxStore(false);
    }, 4000); // Adjust time as needed
  }
</script>

<div class="container {$notificationBoxStore ? 'show' : ''}">
  {#if $authStore}
    <p>Welcome to Happy Hippos' kitchen! We have hea-ppos of recipes!</p>
  {/if}

  {#if !$authStore}
    <p>
      You've logged out. Thanks for visiting! <br /> Can’t wait to cook up something tasty with you next
      time!
    </p>
  {/if}
</div>

<style>
  .container {
    width: 320px;
    padding: 20px;
    color: #ffffff;
    background: linear-gradient(135deg, #ffd1d1, #cddffa);
    position: absolute;
    top: -100%;
    right: 20px;
    transition:
      top 0.6s ease,
      opacity 0.6s ease;
    opacity: 0;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    font-family: Arial, sans-serif;
  }

  .container.show {
    top: 20px;
    opacity: 1;
  }

  p {
    flex: 1;
    font-size: 1.5rem;
    line-height: 1.5;
    margin-left: 10px;
  }

  .show {
    top: 20px;
  }
</style>
