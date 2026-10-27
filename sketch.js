// MODIFICADO: imgCat e imgMouth não são mais usados; o dinossauro já possui o próprio rosto.
let imgCalopsita, imgPataEsquerda, imgPataDireita, imgPataAbaixo;
let imgBongo, imgCymbal, imgKeyboard, imgTambourine, imgMarimba, imgCowbell;
let somBongo, somMeow, somCymbal, somCowbell;
let somKeyboard, somKeyboard2, somKeyboard3, somKeyboard4, somKeyboard5, somKeyboard6, somKeyboard7, somKeyboard8, somKeyboard9, somKeyboard0;
let somTambourine;
// Adicionado: sons da marimba de 0 a 9
let somMarimba0, somMarimba1, somMarimba2, somMarimba3, somMarimba4, somMarimba5, somMarimba6, somMarimba7, somMarimba8, somMarimba9;

// Estados das patas
let pawLeftDown = false;
let pawRightDown = false;

let isMeowing = false; // Controle da boca aberta

let instrumentoAtual = 'bongo';

// Posição e velocidade vertical do gato
let catY = 0;
let velocityY = 0;

const CALOPSITA_X = 375;
const CALOPSITA_WIDTH = 250;
const CALOPSITA_HEIGHT = 244;
const PATA_WIDTH = 93;
const PATA_HEIGHT = 152;
const PATA_Y_OFFSET = 86;
const PATA_Y_OFFSET2 = 126;

function preload() {
  imgCalopsita = loadImage('images/calopsita.png');
  imgPataEsquerda = loadImage('images/pataesquerdacalopisita.png');
  imgPataDireita = loadImage('images/patadireitacalopisita.png');
  imgPataAbaixo = loadImage('images/patacalopisitabaixo.png');

  // Carregamento dos sprites originais
  // COMENTADO/MODIFICADO: o gato antigo deixou de ser carregado.
  // imgCat = loadImage('images/cat.png');
  imgBongo = loadImage('images/bongo.png');
  imgCymbal = loadImage('images/cymbal.png');
  imgKeyboard = loadImage('images/keyboard.png');
  imgTambourine = loadImage('images/tambourine.png');
  imgMarimba = loadImage('images/marimba.png'); // Adicionado: imagem da marimba
  imgCowbell = loadImage('images/cowbell.png');
  // COMENTADO/MODIFICADO: o nariz/boca antigos deixaram de ser carregados.
  // imgMouth = loadImage('images/mouth.png');

  // MODIFICADO: carregamento da cabeça do dinossauro.
  // Carregamento do áudio
  soundFormats('wav', 'mp3');
  somBongo = loadSound('sounds/bongo0.wav');
  somMeow = loadSound('sounds/meow.wav');
  somCymbal = loadSound('sounds/cymbal.mp3');
  somCowbell = loadSound('sounds/cowbell.mp3');
  
  // Sons do teclado de 1 a 0
  somKeyboard = loadSound('sounds/keyboard1.mp3');
  somKeyboard2 = loadSound('sounds/keyboard2.mp3');
  somKeyboard3 = loadSound('sounds/keyboard3.mp3');
  somKeyboard4 = loadSound('sounds/keyboard4.mp3');
  somKeyboard5 = loadSound('sounds/keyboard5.mp3');
  somKeyboard6 = loadSound('sounds/keyboard6.mp3');
  somKeyboard7 = loadSound('sounds/keyboard7.mp3');
  somKeyboard8 = loadSound('sounds/keyboard8.mp3');
  somKeyboard9 = loadSound('sounds/keyboard9.mp3');
  somKeyboard0 = loadSound('sounds/keyboard0.mp3');

  // Som do pandeiro
  somTambourine = loadSound('sounds/tambourine.mp3');

  // Adicionado: Sons da marimba de 0 a 9
  somMarimba0 = loadSound('sounds/marimba0.mp3');
  somMarimba1 = loadSound('sounds/marimba1.mp3');
  somMarimba2 = loadSound('sounds/marimba2.mp3');
  somMarimba3 = loadSound('sounds/marimba3.mp3');
  somMarimba4 = loadSound('sounds/marimba4.mp3');
  somMarimba5 = loadSound('sounds/marimba5.mp3');
  somMarimba6 = loadSound('sounds/marimba6.mp3');
  somMarimba7 = loadSound('sounds/marimba7.mp3');
  somMarimba8 = loadSound('sounds/marimba8.mp3');
  somMarimba9 = loadSound('sounds/marimba9.mp3');
}

function setup() {
  // Resolução nativa dos assets do Bongo Cat
  createCanvas(1000, 450);
  configurarControlesInstrumentos();
}

function configurarControlesInstrumentos() {
  document.querySelectorAll('[data-instrument-key]').forEach((botao) => {
    const tecla = botao.dataset.instrumentKey;
    botao.addEventListener('pointerdown', (evento) => {
      botao.setPointerCapture(evento.pointerId);
      tocarTeclaInstrumento(tecla);
    });

    const soltarBotao = () => soltarTeclaInstrumento(tecla);
    botao.addEventListener('pointerup', soltarBotao);
    botao.addEventListener('pointercancel', soltarBotao);
    botao.addEventListener('lostpointercapture', soltarBotao);
    botao.addEventListener('click', (evento) => {
      // ADICIONADO: ativação por Enter/Espaço e tecnologias assistivas.
      if (evento.detail === 0) {
        tocarTeclaInstrumento(tecla);
        soltarTeclaInstrumento(tecla);
      }
    });
  });
}

function draw() {
  background(160);
  
  // 1. Linha da mesa inclinada (igual ao original)
  stroke(0);
  strokeWeight(5);
  line(-50, 180, 1000, 370);
  noStroke();

  // 2. Calopsita e patas: desenhadas antes dos instrumentos para ficarem atrás.
  image(imgCalopsita, CALOPSITA_X, catY - 20, CALOPSITA_WIDTH, CALOPSITA_HEIGHT);
  desenharPata2(imgPataEsquerda, pawLeftDown, 550);
  desenharPata(imgPataDireita, pawRightDown, 285);

  // 3. Instrumento de fundo
  if (instrumentoAtual === 'bongo') {
    image(imgBongo, -10, 50, 800, 450);
  } else if (instrumentoAtual === 'cymbal') {
    image(imgCymbal, 0, 70, 800, 450);
  } else if (instrumentoAtual === 'keyboard') {
    image(imgKeyboard, 0, 70, 800, 450);
  } else if (instrumentoAtual === 'tambourine') {
    image(imgTambourine, 0, 60, 800, 450);
  } else if (instrumentoAtual === 'marimba') { // Adicionado: desenho da marimba
    image(imgMarimba, 0, 70, 800, 450);
  } else if (instrumentoAtual === 'cowbell') {
    image(imgCowbell, 0, 70, 800, 450);
  }

  // 3. Cabeça e corpo do gato (recorte superior 800x450)
  // MODIFICADO: o dinossauro substitui a cabeça/corpo do gato.
  // A imagem original tem 924x914 e é ajustada à área de 800x450 do jogo.
  // 4. BOCA E NARIZ (imgMouth)
  // COMENTADO/MODIFICADO: o nariz/boca do gato não é mais desenhado,
  // pois o dinossauro já possui seu próprio rosto.
  // let sxMouth = isMeowing ? 800 : 0;
  // image(
  //   imgMouth,
  //   0, catY, 800, 450,
  //   sxMouth, 450, 800, 450
  // );

  catY += velocityY;
}

function desenharPata(pataLevantada, abaixada, x) {
  const pata = abaixada ? imgPataAbaixo : pataLevantada;
  const largura = abaixada ? 171 : PATA_WIDTH;
  const altura = abaixada ? 148 : PATA_HEIGHT;
  const ajusteX = abaixada ? -80 : 0;
  image(pata, x + ajusteX, catY + PATA_Y_OFFSET, largura, altura);
}
function desenharPata2(pataLevantada, abaixada, x) {
  const pata = abaixada ? imgPataAbaixo : pataLevantada;
  const largura = abaixada ? 171 : PATA_WIDTH;
  const altura = abaixada ? 148 : PATA_HEIGHT;
  const ajusteX = abaixada ? -140 : 0;
  image(pata, x + ajusteX, catY + PATA_Y_OFFSET2, largura, altura);
}

function keyPressed() {

  // Quando aperta a seta para CIMA, dá a velocidade negativa (sobe suavemente)
  if (keyCode === UP_ARROW) {
    velocityY = -5; // Quanto mais negativo, mais rápido ele sobe
  }
  // MODIFICADO: teclado físico e caixinhas HTML compartilham o mesmo mapeamento.
  if (tocarTeclaInstrumento(key)) {
    return;
  }

  // Miado (Barra de Espaço)
  if (key === ' ') {
    if (!isMeowing) {
      isMeowing = true;
      if (somMeow && somMeow.isLoaded()) {
        somMeow.play();
      }
    }
  }
}

function keyReleased() {
  // MODIFICADO: solta a pata correspondente tanto no teclado quanto no toque.
  soltarTeclaInstrumento(key);

  // Miado (Barra de Espaço)
  if (key === ' ') {
    isMeowing = false;
    if (somMeow && somMeow.isLoaded()) {
      somMeow.stop();
    }
  }
}

// ADICIONADO: centraliza o acionamento das patas para teclado e tela sensível ao toque.
function tocarBongoComPata(pata) {
  const tecla = pata === 'left' ? 'A' : 'D';
  acionarInstrumento(tecla, 'bongo', pata, tocarBongo);
}

// ADICIONADO: mapeia cada tecla indicada no guia para o som e a pata corretos.
function tocarTeclaInstrumento(tecla) {
  const teclaNormalizada = String(tecla).toUpperCase();

  if (teclaNormalizada === 'A' || teclaNormalizada === 'D') {
    tocarBongoComPata(teclaNormalizada === 'A' ? 'left' : 'right');
    return true;
  }

  if (teclaNormalizada === 'C') {
    acionarInstrumento(teclaNormalizada, 'cymbal', 'left', tocarSymbol);
    return true;
  }
  if (teclaNormalizada === 'B') {
    acionarInstrumento(teclaNormalizada, 'tambourine', 'left', tocarTambourine);
    return true;
  }
  if (teclaNormalizada === 'V') {
    acionarInstrumento(teclaNormalizada, 'cowbell', 'left', tocarCowbell);
    return true;
  }

  const teclasTeclado = '1234567890';
  const indiceTeclado = teclasTeclado.indexOf(teclaNormalizada);
  if (indiceTeclado !== -1) {
    const sonsTeclado = [
      somKeyboard, somKeyboard2, somKeyboard3, somKeyboard4, somKeyboard5,
      somKeyboard6, somKeyboard7, somKeyboard8, somKeyboard9, somKeyboard0
    ];
    const pata = indiceTeclado < 5 ? 'right' : 'left';
    acionarInstrumento(teclaNormalizada, 'keyboard', pata, () => tocarKeyboard(sonsTeclado[indiceTeclado]));
    return true;
  }

  const teclasMarimba = 'QWERTYUIOP';
  const indiceMarimba = teclasMarimba.indexOf(teclaNormalizada);
  if (indiceMarimba !== -1) {
    const sonsMarimba = [
      somMarimba0, somMarimba1, somMarimba2, somMarimba3, somMarimba4,
      somMarimba5, somMarimba6, somMarimba7, somMarimba8, somMarimba9
    ];
    const pata = indiceMarimba < 5 ? 'right' : 'left';
    acionarInstrumento(teclaNormalizada, 'marimba', pata, () => tocarMarimba(sonsMarimba[indiceMarimba]));
    return true;
  }

  return false;
}

function acionarInstrumento(tecla, instrumento, pata, tocarSom) {
  instrumentoAtual = instrumento;
  const pataJaPressionada = pata === 'left' ? pawLeftDown : pawRightDown;
  if (pataJaPressionada) {
    return;
  }

  if (pata === 'left') {
    pawLeftDown = true;
  } else {
    pawRightDown = true;
  }

  atualizarBotaoInstrumento(tecla, true);
  tocarSom();
}

function soltarTeclaInstrumento(tecla) {
  const teclaNormalizada = String(tecla).toUpperCase();
  let pata = null;

  if (teclaNormalizada === 'A' || teclaNormalizada === 'C' || teclaNormalizada === 'B' || teclaNormalizada === 'V') {
    pata = 'left';
  } else if (teclaNormalizada === 'D') {
    pata = 'right';
  } else {
    const indiceTeclado = '1234567890'.indexOf(teclaNormalizada);
    const indiceMarimba = 'QWERTYUIOP'.indexOf(teclaNormalizada);
    if (indiceTeclado !== -1) {
      pata = indiceTeclado < 5 ? 'right' : 'left';
    } else if (indiceMarimba !== -1) {
      pata = indiceMarimba < 5 ? 'right' : 'left';
    }
  }

  if (pata) {
    soltarPataInstrumento(teclaNormalizada, pata);
  }
}

function soltarPataInstrumento(tecla, pata) {
  if (pata === 'left') {
    pawLeftDown = false;
  } else {
    pawRightDown = false;
  }

  atualizarBotaoInstrumento(tecla, false);
}

function atualizarBotaoInstrumento(tecla, pressionado) {
  const botao = document.querySelector(`[data-instrument-key="${tecla}"]`);
  if (botao) {
    botao.setAttribute('aria-pressed', String(pressionado));
  }
}

function tocarBongo() {
  if (somBongo && somBongo.isLoaded()) {
    somBongo.play();
  }
}

function tocarSymbol() {
  if (somCymbal && somCymbal.isLoaded()) {
    somCymbal.play();
  }
}

function tocarKeyboard(n) {
  if (n && n.isLoaded()) {
    n.play();
  }
}

function tocarTambourine() {
  if (somTambourine && somTambourine.isLoaded()) {
    somTambourine.play();
  }
}

function tocarCowbell() {
  if (somCowbell && somCowbell.isLoaded()) {
    somCowbell.play();
  }
}

// Adicionado: função para tocar o som da marimba
function tocarMarimba(n) {
  if (n && n.isLoaded()) {
    n.play();
  }
}
