var player = {
    left:450,
    top:620
}
var enemies=[
    {left:350,top:100},
    {left:450,top:150},
    {left:550,top:200},
    {left:650,top:250},
]
function dibujarPlayer(){
    content = "<div class='player' style='left:"+player.left+"px;top:"+player.top+"px'></div>";
    document.getElementById("players").innerHTML=content;
}
dibujarPlayer();
function dibujarEnemigo() {
    var content = "";
    for (var i = 0; i < enemies.length; i++) {
      content += "<div class='enemy' style='left:" + enemies[i].left + "px;top:" + enemies[i].top + "px'></div>";
    }
    document.getElementById("enemies").innerHTML = content;
  }
  
dibujarEnemigo()
document.onkeydown = function(e) {
    if (e.key == "ArrowLeft" && player.left > 0) {
      player.left -= 10;
    }
    if (e.key == "ArrowUp" && player.top > 500) {
        player.top -= 10;
    }
    if (e.key == "ArrowRight" && player.left < 840) {
        player.left += 10;
    }
    if (e.key == "ArrowDown" && player.top < 625) {
        player.top += 10;
    }
    dibujarPlayer();
  };
  