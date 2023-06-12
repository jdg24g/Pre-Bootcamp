var player = {
  left: 450,
  top: 620,
};
var enemies = [
  { left: 350, top: 100 },
  { left: 450, top: 150 },
  { left: 550, top: 200 },
  { left: 650, top: 250 },
];
var missiles = [];
function dibujarPlayer() {
  content =
    "<div class='player' style='left:" +
    player.left +
    "px;top:" +
    player.top +
    "px'></div>";
  document.getElementById("players").innerHTML = content;
}
function dibujarEnemigo() {
  var content = "";
  for (var i = 0; i < enemies.length; i++) {
    content +=
      "<div class='enemy' style='left:" +
      enemies[i].left +
      "px;top:" +
      enemies[i].top +
      "px'></div>";
  }
  document.getElementById("enemies").innerHTML = content;
}
function dibujarMisiles() {
  content = "";
  for (var i = 0; i < missiles.length; i++) {
    content +=
      '<div class="missile" style="left: ' +
      missiles[i].left +
      "px; top: " +
      missiles[i].top +
      'px;"></div>';
  }
  document.getElementById("missiles").innerHTML = content;
}
function moverMisiles() {
  for (var i = 0; i < missiles.length; i++) {
    missiles[i].top -= 4;
  }
}
function moverEnemigo() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].top += 1;

    if (enemies[i].top > 625) {
      enemies[i].top = -75;
      enemies[i].left = Math.floor(Math.random() * 750) + 75;
    }
  }
}
function detectarColisionJugadorEnemigo() {
  for (var i = 0; i < enemies.length; i++) {
    if (
      player.left <= enemies[i].left + 70 &&
      player.left + 70 >= enemies[i].left &&
      player.top <= enemies[i].top + 75 &&
      player.top + 75 >= enemies[i].top
    ) {
      player.left = 450;
      player.top = 620;
      break;
    }
  }
}

function detectarColisiones() {
  for (var i = 0; i < missiles.length; i++) {
    for (var j = 0; j < enemies.length; j++) {
      if (
        missiles[i].top <= enemies[j].top + 75 &&
        missiles[i].top >= enemies[j].top &&
        missiles[i].left >= enemies[j].left &&
        missiles[i].left <= enemies[j].left + 70
      ) {
        enemies[j].top = -75;
        enemies[j].left = Math.floor(Math.random() * 750) + 75;
        missiles.splice(i, 1);
        break;
      }
    }
  }
}

document.onkeydown = function (e) {
  if (e.key == "ArrowLeft" && player.left > 0) {
    player.left -= 15;
  }
  if (e.key == "ArrowUp" && player.top > 500) {
    player.top -= 15;
  }
  if (e.key == "ArrowRight" && player.left < 840) {
    player.left += 15;
  }
  if (e.key == "ArrowDown" && player.top < 625) {
    player.top += 15;
  }
  if (e.key == " ") {
    missiles.push({ left: player.left + 34, top: player.top - 8 });
  }
  console.log(missiles);

  dibujarPlayer();
};
function gameLoop() {
  dibujarPlayer();

  moverEnemigo();
  detectarColisionJugadorEnemigo();
  dibujarEnemigo();
  dibujarMisiles();
  moverMisiles();
  detectarColisiones();
  setTimeout(gameLoop, 10);
}
gameLoop();
