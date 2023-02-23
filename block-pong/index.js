const game_start = () => {
  let gamePalay = false;
  let connect = true;
  let cubes = [];
  let cubePos = [];
  let ai_player = false;
  for (let i = 0; i < 20; i++) {
    let cube = document.createElement("div");
    cube.classList.add("cube");
    game_win.appendChild(cube);
    cubes.push(cube);
  }
  for (let i = 0; i < cubes.length; i++) {
    cubePos.push({
      t: cubes[i].offsetTop,
      l: cubes[i].offsetLeft,
    });
  }
  for (let i = 0; i < cubes.length; i++) {
    cubes[i].style.top = cubePos[i].t - 5 + "px";
    cubes[i].style.left = cubePos[i].l - 5 + "px";
    cubes[i].style.position = "absolute";
  }
  window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
      if (player.offsetLeft < 400) {
        if (connect) {
          ball.style.left = ball.offsetLeft + 20 + "px";
        }
        player.style.left = player.offsetLeft + 20 + "px";
      }
    }
    if (e.key == "ArrowLeft") {
      if (player.offsetLeft > 0) {
        if (connect) {
          ball.style.left = ball.offsetLeft - 20 + `px`;
        }
        player.style.left = player.offsetLeft - 20 + "px";
      }
    }
    if (e.key == " ") {
      gamePalay = !gamePalay;
    }
    if (e.key == "a") {
      ai_player = !ai_player;
    }
  });
  game_win.addEventListener("touchmove", (e) => {
    let x = e.changedTouches[0].clientX;
    gamePalay = true;
    if (
      x > game_win.offsetLeft + 50 &&
      x < game_win.offsetLeft + game_win.offsetWidth - 50
    ) {
      player.style.left = x - game_win.offsetLeft - 50 + "px";
    }
    console.log(e);
  });
  let ball_top = 5;
  let ball_left = -5;
  let gameTimer = setInterval(() => {
    if (gamePalay && cubes.length > 0) {
      console.log(cubes);
      cubes.forEach((cub) => {
        if (
          ball.offsetTop == cub.offsetTop + cub.offsetHeight &&
          ball.offsetLeft + 10 >= cub.offsetLeft &&
          ball.offsetLeft - 10 <= cub.offsetLeft + cub.offsetWidth
          // &&
          // ball.offsetLeft - ball.offsetWidth >= cub.offsetLeft &&
          // ball.offsetLeft + ball.offsetWidth  <=
          //   cub.offsetLeft + cub.offsetWidth
        ) {
          ball_top = -5;
          game_win.removeChild(cub);
          cubes = cubes.filter((o) => {
            return cub != o;
          });
        } else if (
          ball.offsetTop < cub.offsetTop + cub.offsetHeight &&
          ball.offsetTop >= cub.offsetTop &&
          ball.offsetLeft >= cub.offsetLeft + cub.offsetHeight &&
          ball.offsetLeft < cub.offsetLeft + cub.offsetHeight + 10
        ) {
          ball_left = -5;
          game_win.removeChild(cub);
          cubes = cubes.filter((o) => {
            return cub != o;
          });
        } else if (
          ball.offsetTop < cub.offsetTop + cub.offsetHeight &&
          ball.offsetTop >= cub.offsetTop &&
          ball.offsetLeft <= cub.offsetLeft &&
          ball.offsetLeft > cub.offsetLeft - 15
        ) {
          ball_left = 5;
          game_win.removeChild(cub);
          cubes = cubes.filter((o) => {
            return cub != o;
          });
        } else if (ball.offsetTop == 0) {
          ball_top = -5;
        } else if (
          ball.offsetTop + 20 == player.offsetTop &&
          ball.offsetLeft >= player.offsetLeft - 10 &&
          ball.offsetLeft + 10 <= player.offsetLeft + player.offsetWidth
        ) {
          ball_top = 5;
        } else if (ball.offsetTop > 460) {
          clearInterval(gameTimer);
        } else if (ball.offsetLeft == 480) {
          ball_left = 5;
        } else if (ball.offsetLeft == 0) {
          ball_left = -5;
        } else {
          connect = false;
        }
      });

      ball.style.top = ball.offsetTop - ball_top + "px";
      ball.style.left = ball.offsetLeft - ball_left + "px";
    } else {
      if (cubes.length < 0) {
        clearInterval(gameTimer);
      }
    }
    if (ai_player) {
      AI();
      ai_text.innerText = "on";
    } else {
      ai_text.innerText = "off";
    }
  }, 25);
};

game_start();

function AI() {
  if (ball.offsetLeft < 445 && ball.offsetLeft - 35 > 0) {
    player.style.left = ball.offsetLeft - 40 + "px";
  }
}
