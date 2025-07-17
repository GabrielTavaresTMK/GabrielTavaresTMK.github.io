<script>
  import Display from './components/Display.svelte';
  import Keyboard from './components/Keyboard.svelte';

  let atual = "0";
  let operador = null;
  let anterior = null;
  let deveLimpar = false;

  function aoClicar(botao) {
    if ("0123456789".includes(botao)) {
      if (atual === "0" || deveLimpar) {
        atual = botao;
        deveLimpar = false;
      } else {
        atual += botao;
      }
    }
    
    else if ("+-*/".includes(botao)) {
      if (operador && !deveLimpar) {
        atual = eval(`${anterior}${operador}${atual}`).toString();
      }
      anterior = atual;
      operador = botao;
      deveLimpar = true;
    }
    
    else if (botao === "=") {
      if (operador && anterior !== null) {
        atual = eval(`${anterior}${operador}${atual}`).toString();
        operador = null;
        anterior = null;
        deveLimpar = true;
      }
    }
    
    else if (botao === "C") {
      atual = "0";
      operador = null;
      anterior = null;
    }
  }
</script>

<main>
  <Display valor={atual} />
  <Keyboard aoClicar={aoClicar} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: sans-serif;
    margin-top: 50px;
  }

</style>