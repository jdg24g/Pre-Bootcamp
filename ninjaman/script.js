var mundo = document.querySelector("#mundo");
var mapa = [
  [0, 0, 0, 0, 0],
  [0, 1, 2, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 2, 0, 1, 0],
  [0, 1, 1, 2, 0],
  [0, 0, 0, 0, 0],
];

function dibujarMapa(mundoArr) {
  var string = "";
  var diccionario = {
    0: "pared",
    1: "blank",
    2: "sushi",
    3: "onigiri",
  };
  for (var i = 0; i < mundoArr.length; i++) {
    string += "<div class='fila'>";
    for (var j = 0; j < mundoArr[i].length; j++) {
      var celda = mundoArr[i][j];
      string += "<div class='" + diccionario[celda] + "'></div>";
    }
    string += "</div>";
  }
  mundo.innerHTML = string;
  mapa = mundoArr;
}

function crearMundo(filas, columnas) {
  var mundoArr = [];
  for (var i = 0; i < filas; i++) {
    mundoArr.push([]);

    for (var j = 0; j < columnas; j++) {
      if (i === 0 || i === filas - 1 || j === 0 || j === columnas - 1) {
        mundoArr[i].push(0);
      } else {
        var random = Math.floor(Math.random() * filas * columnas);
        if (random < 0.01 * filas * columnas) {
          mundoArr[i].push(3);
        } else if (random === 0.01 * filas * columnas) {
          mundoArr[i].push(2);
        } else if (random > filas * columnas - 0.1 * filas * columnas) {
          mundoArr[i].push(0);
        } else {
          mundoArr[i].push(1);
        }
      }
    }
  }
  mundoArr[1][1] = 1;
  mundoArr[filas - 2][columnas - 2] = 1;
  dibujarMapa(mundoArr);
}

var ninjaman = {
  left: 1,
  top: 1,
};

var bluey = {
  left: 1,
  top: 1,
};

function dibujarNinjaman() {
  document.getElementById("ninjaman").style.left = ninjaman.left * 40 + "px";
  document.getElementById("ninjaman").style.top = ninjaman.top * 40 +40+ "px";
  comer(mapa[ninjaman.top][ninjaman.left]);
}

function dibujarBluey() {
  document.getElementById("fantasma").style.left = bluey.left * 40 + "px";
  document.getElementById("fantasma").style.top = bluey.top * 40 + 40+ "px";
}

function comer(ubicacion) {
  var puntos = Number(document.querySelector("#puntos").textContent);
  switch (ubicacion) {
    case 2:
      puntos += 10;
      break;
    case 3:
      puntos += 5;
      break;
  }
  document.getElementById("puntos").textContent = puntos;
  mapa[ninjaman.top][ninjaman.left] = 1;
  dibujarMapa(mapa);
}

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      if (mapa[ninjaman.top][ninjaman.left - 1] !== 0) {
        ninjaman.left--;
      }
      break;
    case 38:
      if (mapa[ninjaman.top - 1][ninjaman.left] !== 0) {
        ninjaman.top--;
      }
      break;
    case 39:
      if (mapa[ninjaman.top][ninjaman.left + 1] !== 0) {
        ninjaman.left++;
      }
      break;
    case 40:
      if (mapa[ninjaman.top + 1][ninjaman.left] !== 0) {
        ninjaman.top++;
      }
      break;
  }
  dibujarNinjaman();
};

function movimientoFantasma() {
  var direccion = [
    [bluey.top, bluey.left + 1],
    [bluey.top, bluey.left - 1],
    [bluey.top + 1, bluey.left],
    [bluey.top - 1, bluey.left],
  ];
  moves = [];
  alternarMovimientos = [];
  var nizquierda = ninjaman.left;
  var narriba = ninjaman.top;
  var bizquierda = bluey.left;
  var barriba = bluey.top;
  var distanciaActual = Math.sqrt(
    Math.pow(nizquierda - bizquierda, 2) + Math.pow(narriba - barriba, 2)
  );
  direccion.forEach(function (movimiento) {
    var distanciaNueva = Math.sqrt(
      Math.pow(nizquierda - movimiento[1], 2) +
        Math.pow(narriba - movimiento[0], 2)
    );
    if (mapa[movimiento[0]][movimiento[1]] !== 0) {
      if (distanciaNueva < distanciaActual) {
        moves.push(movimiento);
      } else {
        alternarMovimientos.push(movimiento);
      }
    }
  });
  if (moves.length > 0) {
    var aleatorio = Math.floor(Math.random() * moves.length);
    var eleccion = moves[aleatorio];
    bluey.left = eleccion[1];
    bluey.top = eleccion[0];
  }else{
    var aleatorio = Math.floor(Math.random() * alternarMovimientos.length);
    var eleccion = alternarMovimientos[aleatorio];
    bluey.left = eleccion[1];
    bluey.top = eleccion[0];
  }
  dibujarBluey();
  verificarMuerte();
}

function nuevoJuego(){
    crearMundo(20,20);
    pararBluey= setInterval(movimientoFantasma, 250);
    //crear funcion que agrega comida despues no olvidarme
    pararComida= setInterval(addComida, 2000);
    bluey.left= 18;
    bluey.top= 18;
    ninjaman.left= 1;
    ninjaman.top= 1;
    dibujarNinjaman();
    dibujarBluey();
}
nuevoJuego();

function addComida(){
    var fila = 0;
    var columna = 0;
    while(mapa[fila][columna] !== 1){
        fila = Math.floor(Math.random() * mapa.length);
        columna = Math.floor(Math.random() * mapa[0].length);  
    }
    var aleatorio = Math.floor(Math.random() * 100);
    if(aleatorio < 9){
        mapa[fila][columna] = 2;
    }else{
        mapa[fila][columna]=3;
    }
    dibujarMapa(mapa);
}

function verificarMuerte(){
    if(bluey.top === ninjaman.top && bluey.left === ninjaman.left){
        clearInterval(pararBluey);
        clearInterval(pararComida);
        var vida = document.querySelector("#vida");
        vida.textContent = Number(vida.textContent) - 1;
        if(Number(vida.textContent) > 0){
            alert("Perdiste, vuelve a intentarlo");
            nuevoJuego();
        }else{
            var puntos = document.querySelector("#puntos");
            alert("Tu puntaje fue: " + puntos.textContent);
            puntos.textContent = 0;
            vida.textContent = 3;
        }
    }
}
