<script>
  export let onChange;
</script>

<div class="radio-group">
  <input
    id="all-recipe"
    type="radio"
    name="my-recipe-all-recipe"
    value={false}
    on:change={onChange}
    checked
    class="radio-input"
    {...$$restProps}
  />
  <label for="all-recipe" class="radio-label">All recipe</label>
  <input
    id="my-recipe"
    type="radio"
    name="my-recipe-all-recipe"
    value={true}
    on:change={onChange}
    class="radio-input"
    {...$$restProps}
  />
  <label for="my-recipe" class="radio-label">My recipe</label>
</div>

<style>
  .radio-group {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 40px 0;
  }

  .radio-input {
    display: none;
  }

  .radio-label {
    cursor: pointer;
    padding: 12px 24px;
    border: 2px solid #9aabc4d1;
    border-radius: 25px;
    background-color: #ffffff;
    color: #9aabc4d1;
    font-size: 1.1em;
    text-transform: uppercase;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition:
      background-color 0.3s,
      color 0.3s,
      transform 0.2s;
  }

  .radio-input:checked + .radio-label {
    background-color: #9aabc4d1;
    color: #ffffff;
    border-color: #d89a9a;
    transform: translateY(-3px);
  }

  .radio-label:hover {
    background-color: #f5e6b3;
    border-color: #d89a9a;
  }
</style>
