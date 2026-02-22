const senha = document.getElementById("senhaAtual");
const mesa = document.getElementById("mesaAtual");
const som = new Audio("assets/sounds/sound.mp3"); // Caminho do objeto de audio
const tipoDeSenha = document.getElementById("tipoDeSenha");
const linhaHistorico = document.querySelectorAll(".alinhamento_senha_mesa");

let ultimasChamadas = [];

// Atualiza as senhas do painel
function atualizarSenhaMesa() {
   const letras = ["E", "D", "H", "S"];
   const letra = letras[Math.floor(Math.random() * letras.length)];
   const numero = Math.floor(Math.random() * 2000 + 1000);

   return letra + numero;
}

// Atualiza o numero das mesas
function atualizarMesaSenha() {
   const numero2  = Math.floor(Math.random() * 9 + 1); // Arredondamento para cima
   return numero2;
}

// Atualização dos elementos no HTML
senha.textContent = atualizarSenhaMesa();
mesa.textContent = atualizarMesaSenha();

function atualizarPainel() {

   const senhaAnterior = senha.textContent;
   const mesaAnterior = mesa.textContent;

   const chamadaAnterior = {
      senha: senhaAnterior,
      mesa: mesaAnterior
   };

   ultimasChamadas.unshift(chamadaAnterior);

   if (ultimasChamadas.length > 4) {
      ultimasChamadas.pop(); // Remove o ultimo item do array
   }

   for (let i = 0; i < ultimasChamadas.length; i++) {
      linhaHistorico[i].children[0].textContent = ultimasChamadas[i].senha;
      linhaHistorico[i].children[1].textContent = ultimasChamadas[i].mesa;
   }

   const novaSenha = atualizarSenhaMesa();
   const novaMesa = atualizarMesaSenha();

   senha.textContent = novaSenha;
   mesa.textContent = novaMesa;

// Lógica que tras o "preferencial" em senhas do tipo D
   if (novaSenha.startsWith("D")) {
      tipoDeSenha.textContent = "(PREFERENCIAL)";
      tipoDeSenha.style.visibility = "visible";
   } else {
      tipoDeSenha.textContent = "";
   }


   // Chamada do som para cada troca de senha
   som.currentTime = 0; // Som sempre toca do inicio independentemente da senha
   som.play();
}

// Tempo que leva para o painel atualizar as informações (5000 = 5 segundos)
setInterval(atualizarPainel, 5000);