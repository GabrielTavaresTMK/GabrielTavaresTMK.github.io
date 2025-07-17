<script>
  export let aoClicar;
  
  const botoes = [
    "1", "2", "3", "+",
    "4", "5", "6", "-",
    "7", "8", "9", "*",
    "=", "0", "C", "/"
  ];
</script>

<div class="keyboard">
  {#each botoes as botao}
    <button on:click={() => aoClicar(botao)}>{botao}</button>
  {/each}
</div>

<style>
  .keyboard {
    display: grid;
    grid-template-columns: repeat(4, 50px);
    grid-gap: 10px;
  }

  button {
    background-color: red;
    color: black;
    font-size: 20px;
    border: none;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  
</style>
