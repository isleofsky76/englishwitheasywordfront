window.onload = () => {
    const
      background = document.getElementById("background"),
      scoreLbl = document.getElementById("score"),
      linesLbl = document.getElementById("lines"),
      canvas = document.getElementById("game-canvas"),
      ctx = canvas.getContext("2d"),
      speedDropdown = document.getElementById('speed-dropdown'),
      startButton = document.getElementById("start-button"),
      stopButton = document.getElementById("stop-button");
  
    class Tetromino {
      static COLORS = ["blue", "green", "yellow", "red", "orange", "light-blue", "purple"];
      static BLOCK_SIZE = 28;
      static DELAY_LEVELS = [400, 200, 100]; // Delays for Level 1, 2, and 3
  
      constructor(xs, ys, color = null) {
        this.x = xs;
        this.y = ys;
        this.length = xs.length;
        if (color !== null) {
          this.color = color;
          this.img = new Image();
          this.img.src = `resources/${Tetromino.COLORS[color]}.jpg`
        }
      }
  
      update(updFunc) {
        for (let i = 0; i < this.length; ++i) {
          ctx.clearRect(
            this.x[i] * Tetromino.BLOCK_SIZE,
            this.y[i] * Tetromino.BLOCK_SIZE,
            Tetromino.BLOCK_SIZE,
            Tetromino.BLOCK_SIZE
          );
  
          updFunc(i);
        }
  
        this.draw();
      }
  
      draw() {
        if (!this.img.complete) {
          this.img.onload = () => this.draw();
          return;
        }
        // Print the current tetromino
        for (let i = 0; i < this.length; ++i) {
          ctx.drawImage(
            this.img,
            this.x[i] * Tetromino.BLOCK_SIZE,
            this.y[i] * Tetromino.BLOCK_SIZE,
            Tetromino.BLOCK_SIZE,
            Tetromino.BLOCK_SIZE
          );
        }
  
        // Update delay based on speed dropdown
        delay = Tetromino.DELAY_LEVELS[speedDropdown.value - 1];
      }
  
      collides(checkFunc) {
        for (let i = 0; i < this.length; ++i) {
          const { x, y } = checkFunc(i);
          if (x < 0 || x >= FIELD_WIDTH || y < 0 || y >= FIELD_HEIGHT || FIELD[y][x] !== false)
            return true;
        }
        return false;
      }
  
      merge() {
        for (let i = 0; i < this.length; ++i) {
          FIELD[this.y[i]][this.x[i]] = this.color;
        }
      }
  
      rotate() {
        const
          maxX = Math.max(...this.x),
          minX = Math.min(...this.x),
          minY = Math.min(...this.y),
          nx = [],
          ny = [];
  
        if (!this.collides(i => {
            nx.push(maxX + minY - tetromino.y[i]);
            ny.push(tetromino.x[i] - minX + minY);
            return { x: nx[i], y: ny[i] };
          })) {
          this.update(i => {
            this.x[i] = nx[i];
            this.y[i] = ny[i];
          });
        }
      }
    }
  
    const
      FIELD_WIDTH = 10,
      FIELD_HEIGHT = 20,
      FIELD = Array.from({ length: FIELD_HEIGHT }),
      MIN_VALID_ROW = 4,
      TETROMINOES = [
        new Tetromino([0, 0, 0, 0], [0, 1, 2, 3]),
        new Tetromino([0, 0, 1, 1], [0, 1, 0, 1]),
        new Tetromino([0, 1, 1, 1], [0, 0, 1, 2]),
        new Tetromino([0, 0, 0, 1], [0, 1, 2, 0]),
        new Tetromino([0, 1, 1, 2], [0, 0, 1, 1]),
        new Tetromino([0, 1, 1, 2], [1, 1, 0, 1]),
        new Tetromino([0, 1, 1, 2], [1, 1, 0, 0])
      ];
  
    let tetromino = null,
      delay,
      score,
      lines,
      gameInterval;
  
    (function setup() {
      canvas.style.top = `0px`;
      canvas.style.left = `0px`;
  
      canvas.style.top = Tetromino.BLOCK_SIZE;
      canvas.style.left = Tetromino.BLOCK_SIZE;
  
      ctx.canvas.width = FIELD_WIDTH * Tetromino.BLOCK_SIZE;
      ctx.canvas.height = FIELD_HEIGHT * Tetromino.BLOCK_SIZE;
  
      // Scale background
      const scale = Tetromino.BLOCK_SIZE / 13.83333333333;
      background.style.width = scale * 166;
      background.style.height = scale * 304;
  
      // Offset each block to the middle of the table width
      const middle = Math.floor(FIELD_WIDTH / 2);
      for (const t of TETROMINOES) t.x = t.x.map(x => x + middle);
  
      reset();
      draw();
    })();
  
    function reset() {
      // Make false all blocks
      FIELD.forEach((_, y) => FIELD[y] = Array.from({ length: FIELD_WIDTH }).map(_ => false));
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      delay = Tetromino.DELAY_LEVELS[speedDropdown.value - 1];
      score = 0;
      lines = 0;
    }
  
    function draw() {
      if (tetromino) {
        // Collision?
        if (tetromino.collides(i => ({ x: tetromino.x[i], y: tetromino.y[i] + 1 }))) {
          tetromino.merge();
          // Prepare for new tetromino
          tetromino = null;
  
          // Check for completed rows
          let completedRows = 0;
          for (let y = FIELD_HEIGHT - 1; y >= MIN_VALID_ROW; --y)
            if (FIELD[y].every(e => e !== false)) {
              for (let ay = y; ay >= MIN_VALID_ROW; --ay)
                FIELD[ay] = [...FIELD[ay - 1]];
  
              ++completedRows;
              // Keep the same row
              ++y;
            }
  
          if (completedRows) {
            // Print again the table
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let y = MIN_VALID_ROW; y < FIELD_HEIGHT; ++y) {
              for (let x = 0; x < FIELD_WIDTH; ++x) {
                if (FIELD[y][x] !== false) new Tetromino([x], [y], FIELD[y][x]).draw();
              }
            }
  
            score += [40, 100, 300, 1200][completedRows - 1];
            lines += completedRows;
          } else {
            // Check if player has lost
            if (FIELD[MIN_VALID_ROW - 1].some(block => block !== false)) {
              alert("You have lost!");
              clearInterval(gameInterval); // Stop the game
              reset();
            }
          }
        } else {
          tetromino.update(i => ++tetromino.y[i]);
        }
      }
      // No tetromino falling
      else {
        scoreLbl.innerText = score;
        linesLbl.innerText = lines;
  
        // Create random tetromino
        tetromino = (({ x, y }, color) =>
          new Tetromino([...x], [...y], color)
        )(
          TETROMINOES[Math.floor(Math.random() * (TETROMINOES.length))], // Fix the range of random selection
          Math.floor(Math.random() * (Tetromino.COLORS.length))
        );
  
        tetromino.draw();
      }
    }
  
    function startGame() {
      if (!gameInterval) {
        gameInterval = setInterval(draw, delay);
      }
    }
  
    function stopGame() {
      clearInterval(gameInterval);
      gameInterval = null;
    }
  
  // Mobile touch events
  let startX, startY, touchStartTime;
  canvas.addEventListener("touchstart", handleTouchStart, false);
  canvas.addEventListener("touchmove", handleTouchMove, false);
  canvas.addEventListener("touchend", handleTouchEnd, false);

  function handleTouchStart(evt) {
    const touch = evt.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    touchStartTime = new Date().getTime(); // Record the start time
  }

  function handleTouchMove(evt) {
    if (!startX || !startY) return;

    const touch = evt.touches[0];
    const diffX = touch.clientX - startX;
    const diffY = touch.clientY - startY;

    // Set a threshold to avoid too fast movements
    const threshold = Tetromino.BLOCK_SIZE / 5;

    if (Math.abs(diffX) > threshold || Math.abs(diffY) > threshold) {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal movement
        if (diffX > threshold) {
          // Right swipe
          if (tetromino && !tetromino.collides(i => ({ x: tetromino.x[i] + 1, y: tetromino.y[i] }))) {
            tetromino.update(i => ++tetromino.x[i]);
            startX = touch.clientX;
          }
        } else if (diffX < -threshold) {
          // Left swipe
          if (tetromino && !tetromino.collides(i => ({ x: tetromino.x[i] - 1, y: tetromino.y[i] }))) {
            tetromino.update(i => --tetromino.x[i]);
            startX = touch.clientX;
          }
        }
      } else {
        // Vertical movement
        if (diffY > threshold) {
          // Down swipe
          if (tetromino) {
            delay = Tetromino.DELAY_LEVELS[2];
            startY = touch.clientY;
          }
        }
      }
    }

    // Prevent further handling
    evt.preventDefault();
  }

  function handleTouchEnd(evt) {
    const touchEndTime = new Date().getTime(); // Record the end time
    const touchDuration = touchEndTime - touchStartTime; // Calculate the duration
    const touch = evt.changedTouches[0];
    const diffX = touch.clientX - startX;
    const diffY = touch.clientY - startY;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

    // Define thresholds
    const timeThreshold = 200; // ms
    const distanceThreshold = Tetromino.BLOCK_SIZE / 2; // pixels

    if (touchDuration < timeThreshold && distance < distanceThreshold) {
      // If touch duration is short and distance is small, consider it a tap
      if (tetromino) tetromino.rotate();
    } else {
      if (tetromino) delay = Tetromino.DELAY_LEVELS[speedDropdown.value - 1];
    }
  }

    // Move
    window.onkeydown = event => {
      switch (event.key) {
        case "ArrowLeft":
          if (tetromino && !tetromino.collides(i => ({ x: tetromino.x[i] - 1, y: tetromino.y[i] })))
            tetromino.update(i => --tetromino.x[i]);
          break;
        case "ArrowRight":
          if (tetromino && !tetromino.collides(i => ({ x: tetromino.x[i] + 1, y: tetromino.y[i] })))
            tetromino.update(i => ++tetromino.x[i]);
          break;
        case "ArrowDown":
          if (tetromino)
            delay = Tetromino.DELAY_LEVELS[2];
          break;
        case " ":
          if (tetromino)
            tetromino.rotate();
          break;
      }
    }
  
    window.onkeyup = event => {
      if (event.key === "ArrowDown" && tetromino)
        delay = Tetromino.DELAY_LEVELS[speedDropdown.value - 1];
    }
  
    // Update delay based on speed dropdown value
    speedDropdown.onchange = () => {
      delay = Tetromino.DELAY_LEVELS[speedDropdown.value - 1];
      if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = setInterval(draw, delay);
      }
    }
  
    startButton.onclick = startGame;
    stopButton.onclick = stopGame;
  }
  
