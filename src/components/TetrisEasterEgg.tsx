import React, { useEffect, useRef, useState } from 'react';

interface TetrisEasterEggProps {
  isOpen: boolean;
  onClose: () => void;
}

const TetrisEasterEgg: React.FC<TetrisEasterEggProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const holdCanvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef<HTMLDivElement>(null);
  
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalLevel, setFinalLevel] = useState(1);
  const [gameKey, setGameKey] = useState(0); // Key to force re-render

  useEffect(() => {
    // Pure overlay - no body class manipulation

    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')!;
    const previewCanvas = previewCanvasRef.current!;
    const previewContext = previewCanvas.getContext('2d')!;
    const holdCanvas = holdCanvasRef.current!;
    const holdContext = holdCanvas.getContext('2d')!;
    const scoreElement = scoreRef.current!;
    const levelElement = levelRef.current!;

    // Audio context for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Sound effect functions
    function playSound(frequency: number, duration: number, type: OscillatorType = 'square') {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    }



    function playRotateSound() {
      playSound(300, 0.15, 'sine');
    }

    function playDropSound() {
      playSound(150, 0.2, 'sawtooth');
    }

    function playLineClearSound() {
      playSound(400, 0.3, 'square');
      setTimeout(() => playSound(500, 0.3, 'square'), 100);
      setTimeout(() => playSound(600, 0.3, 'square'), 200);
    }

    function playGameOverSound() {
      playSound(100, 0.5, 'sawtooth');
      setTimeout(() => playSound(80, 0.5, 'sawtooth'), 200);
      setTimeout(() => playSound(60, 0.5, 'sawtooth'), 400);
    }

    function playLevelUpSound() {
      playSound(800, 0.2, 'square');
      setTimeout(() => playSound(1000, 0.2, 'square'), 100);
      setTimeout(() => playSound(1200, 0.2, 'square'), 200);
    }

    const blockSize = 20;
    const cols = canvas.width / blockSize;
    const rows = canvas.height / blockSize;
    let score = 0;
    let level = 1;
    let linesCleared = 0;
    let canHold = true;
    let gameActive = true;

    const board = Array(rows).fill(null).map(() => Array(cols).fill(0));

    const pieces = [
      [[1, 1, 1, 1]], // I
      [[1, 1], [1, 1]], // O
      [[1, 1, 1], [0, 1, 0]], // T
      [[1, 1, 1], [1, 0, 0]], // L
      [[1, 1, 1], [0, 0, 1]], // J
      [[1, 1, 0], [0, 1, 1]], // S
      [[0, 1, 1], [1, 1, 0]]  // Z
    ];

    const colors = [
      '#FF0D72', '#0DC2FF', '#0DFF72',
      '#F538FF', '#FF8E0D', '#FFE138', '#3877FF'
    ];

    let currentPiece: number[][] | null = null;
    let currentPiecePos = { x: 0, y: 0 };
    let currentColor = '';
    let currentPieceIndex = 0;
    let nextPiece: number[][] | null = null;
    let nextColor = '';
    let nextPieceIndex = 0;
    let holdPiece: number[][] | null = null;
    let holdColor = '';
    let holdPieceIndex = -1;

    function createPiece() {
      if (nextPiece === null) {
        nextPieceIndex = Math.floor(Math.random() * pieces.length);
        nextPiece = pieces[nextPieceIndex];
        nextColor = colors[nextPieceIndex];
      }

      currentPiece = nextPiece;
      currentColor = nextColor;
      currentPieceIndex = nextPieceIndex;
      
      const pieceIndex = Math.floor(Math.random() * pieces.length);
      nextPiece = pieces[pieceIndex];
      nextColor = colors[pieceIndex];
      nextPieceIndex = pieceIndex;
      
      currentPiecePos = {
        x: Math.floor((cols - currentPiece[0].length) / 2),
        y: 0
      };

      canHold = true;
      drawPreview();
      drawHold();
    }

    function drawPiece(context: CanvasRenderingContext2D, piece: number[][], color: string, canvas: HTMLCanvasElement) {
      const previewBlockSize = 20;
      const offsetX = (canvas.width - piece[0].length * previewBlockSize) / 2;
      const offsetY = (canvas.height - piece.length * previewBlockSize) / 2;

      context.fillStyle = color;
      piece.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            context.fillRect(
              offsetX + x * previewBlockSize,
              offsetY + y * previewBlockSize,
              previewBlockSize - 1,
              previewBlockSize - 1
            );
          }
        });
      });
    }

    function drawPreview() {
      previewContext.fillStyle = '#000';
      previewContext.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
      if (nextPiece) {
        drawPiece(previewContext, nextPiece, nextColor, previewCanvas);
      }
    }

    function drawHold() {
      holdContext.fillStyle = '#000';
      holdContext.fillRect(0, 0, holdCanvas.width, holdCanvas.height);
      if (holdPiece) {
        drawPiece(holdContext, holdPiece, holdColor, holdCanvas);
      }
    }

    function holdCurrentPiece() {
      if (!canHold || !currentPiece || !gameActive) return;

      if (holdPiece === null) {
        holdPiece = currentPiece;
        holdColor = currentColor;
        holdPieceIndex = currentPieceIndex;
        createPiece();
      } else {
        const tempPiece = currentPiece;
        const tempColor = currentColor;
        const tempIndex = currentPieceIndex;

        currentPiece = holdPiece;
        currentColor = holdColor;
        currentPieceIndex = holdPieceIndex;
        
        holdPiece = tempPiece;
        holdColor = tempColor;
        holdPieceIndex = tempIndex;

        currentPiecePos = {
          x: Math.floor((cols - currentPiece[0].length) / 2),
          y: 0
        };
      }

      canHold = false;
      drawHold();
      playRotateSound();
    }

    function collide(piece = currentPiece, pos = currentPiecePos) {
      if (!piece) return true;
      
      for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
          if (piece[y][x]) {
            const boardX = pos.x + x;
            const boardY = pos.y + y;

            if (boardX < 0 || boardX >= cols ||
                boardY >= rows ||
                (boardY >= 0 && board[boardY][boardX])) {
              return true;
            }
          }
        }
      }
      return false;
    }

    function getGhostPosition() {
      const ghostPos = { ...currentPiecePos };
      while (!collide(currentPiece, { ...ghostPos, y: ghostPos.y + 1 })) {
        ghostPos.y++;
      }
      return ghostPos;
    }

    function rotate() {
      if (!currentPiece || !gameActive) return;
      
      const rotated = currentPiece[0].map((_, i) =>
        currentPiece!.map(row => row[i]).reverse()
      );
      const prevPiece = currentPiece;
      currentPiece = rotated;
      if (collide()) {
        currentPiece = prevPiece;
      } else {
        playRotateSound();
      }
    }

    function merge() {
      if (!currentPiece) return;
      
      currentPiece.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const boardY = currentPiecePos.y + y;
            if (boardY >= 0) {
              board[boardY][currentPiecePos.x + x] = currentColor;
            }
          }
        });
      });
    }

    function clearLines() {
      let lines = 0;
      outer: for (let y = rows - 1; y >= 0; y--) {
        for (let x = 0; x < cols; x++) {
          if (!board[y][x]) continue outer;
        }
        
        const row = board.splice(y, 1)[0];
        board.unshift(row.fill(0));
        y++;
        lines++;
      }
      if (lines > 0) {
        linesCleared += lines;
        score += lines * 100 * level;
        scoreElement.textContent = `Score: ${score}`;
        
        const newLevel = Math.floor(linesCleared / 10) + 1;
        if (newLevel !== level) {
          level = newLevel;
          levelElement.textContent = `Level: ${level}`;
          playLevelUpSound();
        } else {
          playLineClearSound();
        }
      }
    }

    function draw() {
      context.fillStyle = '#000';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw board
      board.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            context.fillStyle = value;
            context.fillRect(x * blockSize, y * blockSize, blockSize - 1, blockSize - 1);
          }
        });
      });

      // Draw ghost piece
      if (currentPiece && gameActive) {
        const ghostPos = getGhostPosition();
        context.fillStyle = `${currentColor}33`;
        currentPiece.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value) {
              context.fillRect(
                (ghostPos.x + x) * blockSize,
                (ghostPos.y + y) * blockSize,
                blockSize - 1,
                blockSize - 1
              );
            }
          });
        });
      }

      // Draw current piece
      if (currentPiece && gameActive) {
        context.fillStyle = currentColor;
        currentPiece.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value) {
              context.fillRect(
                (currentPiecePos.x + x) * blockSize,
                (currentPiecePos.y + y) * blockSize,
                blockSize - 1,
                blockSize - 1
              );
            }
          });
        });
      }
    }

    let dropCounter = 0;
    let lastTime = 0;
    let dropInterval = 1000;

    function update(time = 0) {
      if (!gameActive) return;
      
      const deltaTime = time - lastTime;
      lastTime = time;
      dropCounter += deltaTime;

      dropInterval = Math.max(100, 1000 - (level - 1) * 100);

      if (dropCounter > dropInterval) {
        drop();
      }

      draw();
      requestAnimationFrame(update);
    }

    function drop() {
      if (!currentPiece || !gameActive) return;
      
      currentPiecePos.y++;
      if (collide()) {
        currentPiecePos.y--;
        merge();
        clearLines();
        createPiece();
        if (collide()) {
          // Game over
          gameActive = false;
          setGameOver(true);
          setFinalScore(score);
          setFinalLevel(level);
          playGameOverSound();
        }
      }
      dropCounter = 0;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameActive) return;

      // Prevent default behavior for game keys to stop page scrolling
      const gameKeys = [37, 38, 39, 40, 32, 16]; // Arrow keys, Space, Shift
      if (gameKeys.includes(event.keyCode)) {
        event.preventDefault();
      }

      switch (event.keyCode) {
        case 37: // Left
          if (!currentPiece) return;
          currentPiecePos.x--;
          if (collide()) {
            currentPiecePos.x++;
          }
          break;
        case 39: // Right
          if (!currentPiece) return;
          currentPiecePos.x++;
          if (collide()) {
            currentPiecePos.x--;
          }
          break;
        case 40: // Down
          drop();
          playDropSound();
          break;
        case 38: // Up (rotate)
          rotate();
          break;
        case 32: // Space (hard drop)
          if (!currentPiece) return;
          while (!collide()) {
            currentPiecePos.y++;
          }
          currentPiecePos.y--;
          drop();
          playDropSound();
          break;
        case 16: // Shift (hold)
          holdCurrentPiece();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Initialize game
    createPiece();
    update();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      audioContext.close();
    };
  }, [isOpen, gameKey]); // Use gameKey instead of gameOver and shouldReset

  // Cleanup body class when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove('tetris-open');
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="tetris-overlay">
      <div className="tetris-container">
        <div className="tetris-header">
          <h2>🎮 Tetris Easter Egg! 🎮</h2>
          <button className="tetris-close-btn" onClick={onClose} aria-label="Close Tetris">
            ×
          </button>
        </div>
        
        {gameOver ? (
          <div className="tetris-game-over">
            <div className="tetris-game-over-content">
              <h3>Game Over!</h3>
              <div className="tetris-final-score">
                <p>Final Score: <span>{finalScore}</span></p>
                <p>Level Reached: <span>{finalLevel}</span></p>
              </div>
              <button 
                className="tetris-restart-btn" 
                onClick={() => {
                  setGameOver(false);
                  setGameKey(prev => prev + 1); // Force complete re-render
                }}
              >
                Play Again
              </button>
            </div>
          </div>
        ) : (
          <div className="tetris-game-container" key={gameKey}>
            <div className="tetris-stats">
              <div ref={scoreRef} className="tetris-score">Score: 0</div>
              <div ref={levelRef} className="tetris-level">Level: 1</div>
            </div>

            <div className="tetris-game-layout">
              <div className="tetris-hold-container">
                <div className="tetris-hold-label">Hold:</div>
                <canvas ref={holdCanvasRef} width="100" height="100" className="tetris-hold-canvas"></canvas>
              </div>

              <canvas ref={canvasRef} width="240" height="400" className="tetris-main-canvas"></canvas>
              
              <div className="tetris-preview-container">
                <div className="tetris-preview-label">Next:</div>
                <canvas ref={previewCanvasRef} width="100" height="100" className="tetris-preview-canvas"></canvas>
              </div>
            </div>

            <div className="tetris-controls">
              Controls:<br/>
              ← → : Move<br/>
              ↑ : Rotate<br/>
              ↓ : Drop<br/>
              Space : Hard Drop<br/>
              Shift : Hold
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TetrisEasterEgg; 