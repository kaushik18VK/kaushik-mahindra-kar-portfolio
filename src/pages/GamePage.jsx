import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const DODGE_W = 720;
const DODGE_H = 420;
const PLAYER_W = 56;
const PLAYER_H = 16;

const SNAKE_CELL = 20;
const SNAKE_COLS = 30;
const SNAKE_ROWS = 18;
const SNAKE_W = SNAKE_COLS * SNAKE_CELL;
const SNAKE_H = SNAKE_ROWS * SNAKE_CELL;

const memoryBase = ['Java', 'React', 'Kafka', 'OCI', 'Spring', 'Docker', 'AI', 'Node'];

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function DodgeGame() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const bestRef = useRef(0);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const storedBest = Number(localStorage.getItem('portfolio_game_best') || 0);
    bestRef.current = Number.isFinite(storedBest) ? storedBest : 0;
    setBest(bestRef.current);
  }, []);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const startGame = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let playerX = DODGE_W / 2 - PLAYER_W / 2;
    const playerY = DODGE_H - 44;
    let velocity = 0;
    let scoreFloat = 0;
    let obstacles = [];
    let spawnTimer = 0;
    let lastScorePush = 0;
    let lastTime = performance.now();

    setScore(0);
    setStatus('playing');

    const movePlayer = (dir) => {
      velocity = dir * 360;
    };

    const stopPlayer = () => {
      velocity = 0;
    };

    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') movePlayer(-1);
      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') movePlayer(1);
    };

    const onKeyUp = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key.toLowerCase() === 'a' || event.key.toLowerCase() === 'd') {
        stopPlayer();
      }
    };

    const bindHold = (btn, dir) => {
      if (!btn) return () => {};
      const start = () => movePlayer(dir);
      const end = () => stopPlayer();
      btn.addEventListener('touchstart', start, { passive: true });
      btn.addEventListener('touchend', end, { passive: true });
      btn.addEventListener('mousedown', start);
      btn.addEventListener('mouseup', end);
      btn.addEventListener('mouseleave', end);
      return () => {
        btn.removeEventListener('touchstart', start);
        btn.removeEventListener('touchend', end);
        btn.removeEventListener('mousedown', start);
        btn.removeEventListener('mouseup', end);
        btn.removeEventListener('mouseleave', end);
      };
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    const unbindLeft = bindHold(leftRef.current, -1);
    const unbindRight = bindHold(rightRef.current, 1);

    const finish = () => {
      setStatus('over');
      const finalScore = Math.max(0, Math.floor(scoreFloat));
      setScore(finalScore);
      if (finalScore > bestRef.current) {
        bestRef.current = finalScore;
        localStorage.setItem('portfolio_game_best', String(finalScore));
        setBest(finalScore);
      }
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      unbindLeft();
      unbindRight();
    };

    const draw = () => {
      ctx.clearRect(0, 0, DODGE_W, DODGE_H);
      const gradient = ctx.createLinearGradient(0, 0, DODGE_W, DODGE_H);
      gradient.addColorStop(0, '#091c34');
      gradient.addColorStop(0.55, '#062247');
      gradient.addColorStop(1, '#06162f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, DODGE_W, DODGE_H);

      for (let i = 0; i < 26; i += 1) {
        const x = ((i * 91) + scoreFloat * 3.4) % (DODGE_W + 140) - 70;
        const y = ((i * 56) + scoreFloat * 2.1) % DODGE_H;
        ctx.fillStyle = 'rgba(108, 223, 255, 0.08)';
        ctx.fillRect(x, y, 2, 2);
      }

      ctx.fillStyle = '#56d8ff';
      ctx.shadowColor = '#56d8ff';
      ctx.shadowBlur = 10;
      ctx.fillRect(playerX, playerY, PLAYER_W, PLAYER_H);
      ctx.shadowBlur = 0;

      obstacles.forEach((obs) => {
        const obsGradient = ctx.createLinearGradient(obs.x, obs.y, obs.x + obs.w, obs.y + obs.h);
        obsGradient.addColorStop(0, '#ff9568');
        obsGradient.addColorStop(1, '#ff5f7e');
        ctx.fillStyle = obsGradient;
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
      });

      ctx.fillStyle = 'rgba(204, 232, 255, 0.92)';
      ctx.font = '600 17px Outfit, sans-serif';
      ctx.fillText(`Score: ${Math.floor(scoreFloat)}`, 18, 28);
      ctx.fillText(`Best: ${bestRef.current}`, 18, 52);
    };

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.032);
      lastTime = now;

      playerX += velocity * dt;
      playerX = Math.max(0, Math.min(DODGE_W - PLAYER_W, playerX));

      spawnTimer += dt;
      if (spawnTimer > 0.44) {
        spawnTimer = 0;
        const width = 30 + Math.random() * 28;
        const speed = 170 + Math.random() * 170 + Math.min(scoreFloat * 1.3, 220);
        obstacles.push({
          x: Math.random() * (DODGE_W - width),
          y: -24,
          w: width,
          h: 18 + Math.random() * 18,
          speed
        });
      }

      obstacles = obstacles
        .map((obs) => ({ ...obs, y: obs.y + obs.speed * dt }))
        .filter((obs) => obs.y < DODGE_H + 30);

      const hit = obstacles.some((obs) => {
        const overlapX = playerX < obs.x + obs.w && playerX + PLAYER_W > obs.x;
        const overlapY = playerY < obs.y + obs.h && playerY + PLAYER_H > obs.y;
        return overlapX && overlapY;
      });

      if (hit) {
        draw();
        finish();
        return;
      }

      scoreFloat += dt * 18;
      if (now - lastScorePush > 110) {
        lastScorePush = now;
        setScore(Math.floor(scoreFloat));
      }

      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  };

  return (
    <section className="game-shell">
      <div className="game-top">
        <div className="game-stats">
          <span>Live Score: {score}</span>
          <span>Best Score: {best}</span>
          <span>Status: {status === 'playing' ? 'Playing' : status === 'over' ? 'Game Over' : 'Ready'}</span>
        </div>
        <button className="btn btn-solid" type="button" onClick={startGame}>
          {status === 'playing' ? 'Restart' : 'Start Game'}
        </button>
      </div>

      <div className="game-canvas-wrap">
        <canvas ref={canvasRef} width={DODGE_W} height={DODGE_H} className="game-canvas" />
      </div>

      <div className="game-controls-mobile">
        <button ref={leftRef} type="button">Move Left</button>
        <button ref={rightRef} type="button">Move Right</button>
      </div>
      <p className="game-help">Desktop: use Arrow keys or A/D. Mobile: hold the left/right buttons.</p>
    </section>
  );
}

function SnakeGame() {
  const canvasRef = useRef(null);
  const loopRef = useRef(0);
  const bestRef = useRef(0);
  const directionRef = useRef('right');
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const upRef = useRef(null);
  const downRef = useRef(null);

  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const storedBest = Number(localStorage.getItem('portfolio_snake_best') || 0);
    bestRef.current = Number.isFinite(storedBest) ? storedBest : 0;
    setBest(bestRef.current);
  }, []);

  useEffect(
    () => () => {
      if (loopRef.current) clearInterval(loopRef.current);
    },
    []
  );

  const startGame = () => {
    if (loopRef.current) clearInterval(loopRef.current);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let snake = [
      { x: 7, y: 9 },
      { x: 6, y: 9 },
      { x: 5, y: 9 }
    ];
    let currentScore = 0;
    let food = { x: 20, y: 7 };
    directionRef.current = 'right';
    setScore(0);
    setStatus('playing');

    const placeFood = () => {
      let fx = Math.floor(Math.random() * SNAKE_COLS);
      let fy = Math.floor(Math.random() * SNAKE_ROWS);
      while (snake.some((p) => p.x === fx && p.y === fy)) {
        fx = Math.floor(Math.random() * SNAKE_COLS);
        fy = Math.floor(Math.random() * SNAKE_ROWS);
      }
      food = { x: fx, y: fy };
    };

    const nextPos = (head, dir) => {
      if (dir === 'left') return { x: head.x - 1, y: head.y };
      if (dir === 'right') return { x: head.x + 1, y: head.y };
      if (dir === 'up') return { x: head.x, y: head.y - 1 };
      return { x: head.x, y: head.y + 1 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, SNAKE_W, SNAKE_H);
      ctx.fillStyle = '#0a1d33';
      ctx.fillRect(0, 0, SNAKE_W, SNAKE_H);

      for (let x = 0; x < SNAKE_COLS; x += 1) {
        for (let y = 0; y < SNAKE_ROWS; y += 1) {
          ctx.fillStyle = (x + y) % 2 === 0 ? 'rgba(79, 188, 242, 0.08)' : 'rgba(55, 142, 210, 0.04)';
          ctx.fillRect(x * SNAKE_CELL, y * SNAKE_CELL, SNAKE_CELL, SNAKE_CELL);
        }
      }

      ctx.fillStyle = '#67e9ff';
      snake.forEach((part, idx) => {
        if (idx === 0) ctx.fillStyle = '#95ffcb';
        else ctx.fillStyle = '#67e9ff';
        ctx.fillRect(part.x * SNAKE_CELL + 2, part.y * SNAKE_CELL + 2, SNAKE_CELL - 4, SNAKE_CELL - 4);
      });

      ctx.fillStyle = '#ff8a77';
      ctx.beginPath();
      ctx.arc(
        food.x * SNAKE_CELL + SNAKE_CELL / 2,
        food.y * SNAKE_CELL + SNAKE_CELL / 2,
        SNAKE_CELL / 2.6,
        0,
        Math.PI * 2
      );
      ctx.fill();
    };

    const setDir = (dir) => {
      const curr = directionRef.current;
      if ((curr === 'left' && dir === 'right') || (curr === 'right' && dir === 'left') || (curr === 'up' && dir === 'down') || (curr === 'down' && dir === 'up')) {
        return;
      }
      directionRef.current = dir;
    };

    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') setDir('left');
      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') setDir('right');
      if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') setDir('up');
      if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') setDir('down');
    };

    const bindTap = (btn, dir) => {
      if (!btn) return () => {};
      const handler = () => setDir(dir);
      btn.addEventListener('touchstart', handler, { passive: true });
      btn.addEventListener('mousedown', handler);
      return () => {
        btn.removeEventListener('touchstart', handler);
        btn.removeEventListener('mousedown', handler);
      };
    };

    window.addEventListener('keydown', onKeyDown);
    const u1 = bindTap(leftRef.current, 'left');
    const u2 = bindTap(rightRef.current, 'right');
    const u3 = bindTap(upRef.current, 'up');
    const u4 = bindTap(downRef.current, 'down');

    const finish = () => {
      setStatus('over');
      setScore(currentScore);
      if (currentScore > bestRef.current) {
        bestRef.current = currentScore;
        localStorage.setItem('portfolio_snake_best', String(currentScore));
        setBest(currentScore);
      }
      clearInterval(loopRef.current);
      window.removeEventListener('keydown', onKeyDown);
      u1();
      u2();
      u3();
      u4();
    };

    draw();
    loopRef.current = window.setInterval(() => {
      const head = snake[0];
      const next = nextPos(head, directionRef.current);

      const hitWall = next.x < 0 || next.x >= SNAKE_COLS || next.y < 0 || next.y >= SNAKE_ROWS;
      const hitSelf = snake.some((p) => p.x === next.x && p.y === next.y);
      if (hitWall || hitSelf) {
        finish();
        return;
      }

      snake = [next, ...snake];
      if (next.x === food.x && next.y === food.y) {
        currentScore += 1;
        setScore(currentScore);
        if (currentScore > bestRef.current) {
          bestRef.current = currentScore;
          localStorage.setItem('portfolio_snake_best', String(currentScore));
          setBest(currentScore);
        }
        placeFood();
      } else {
        snake.pop();
      }
      draw();
    }, 110);
  };

  return (
    <section className="game-shell">
      <div className="game-top">
        <div className="game-stats">
          <span>Score: {score}</span>
          <span>Best: {best}</span>
          <span>Status: {status === 'playing' ? 'Playing' : status === 'over' ? 'Game Over' : 'Ready'}</span>
        </div>
        <button className="btn btn-solid" type="button" onClick={startGame}>
          {status === 'playing' ? 'Restart' : 'Start Snake'}
        </button>
      </div>
      <div className="game-canvas-wrap">
        <canvas ref={canvasRef} width={SNAKE_W} height={SNAKE_H} className="game-canvas snake-canvas" />
      </div>
      <div className="game-controls-pad">
        <button ref={upRef} type="button">Up</button>
        <div className="pad-row">
          <button ref={leftRef} type="button">Left</button>
          <button ref={downRef} type="button">Down</button>
          <button ref={rightRef} type="button">Right</button>
        </div>
      </div>
      <p className="game-help">Collect nodes, avoid walls and your own trail.</p>
    </section>
  );
}

function MemoryGame() {
  const [cards, setCards] = useState(() => shuffle(memoryBase.flatMap((t) => [t, t])).map((label, idx) => ({ id: idx, label, matched: false })));
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const matchedCount = useMemo(() => cards.filter((c) => c.matched).length, [cards]);
  const complete = matchedCount === cards.length;

  const restart = () => {
    setCards(shuffle(memoryBase.flatMap((t) => [t, t])).map((label, idx) => ({ id: idx, label, matched: false })));
    setFlipped([]);
    setMoves(0);
    setLocked(false);
  };

  const onFlip = (id) => {
    if (locked) return;
    if (flipped.includes(id)) return;
    const current = cards.find((c) => c.id === id);
    if (!current || current.matched) return;

    const nextFlipped = [...flipped, id];
    setFlipped(nextFlipped);
    if (nextFlipped.length < 2) return;

    setMoves((m) => m + 1);
    const [aId, bId] = nextFlipped;
    const a = cards.find((c) => c.id === aId);
    const b = cards.find((c) => c.id === bId);
    if (a && b && a.label === b.label) {
      setCards((prev) => prev.map((c) => (c.id === aId || c.id === bId ? { ...c, matched: true } : c)));
      setFlipped([]);
      return;
    }

    setLocked(true);
    window.setTimeout(() => {
      setFlipped([]);
      setLocked(false);
    }, 620);
  };

  return (
    <section className="game-shell">
      <div className="game-top">
        <div className="game-stats">
          <span>Pairs Found: {matchedCount / 2}/{cards.length / 2}</span>
          <span>Moves: {moves}</span>
          <span>Status: {complete ? 'Completed' : 'Playing'}</span>
        </div>
        <button className="btn btn-solid" type="button" onClick={restart}>Shuffle</button>
      </div>

      <div className="memory-grid">
        {cards.map((card) => {
          const isOpen = flipped.includes(card.id) || card.matched;
          return (
            <button
              key={card.id}
              type="button"
              className={`memory-card ${isOpen ? 'open' : ''}`}
              onClick={() => onFlip(card.id)}
            >
              <span>{isOpen ? card.label : '?'}</span>
            </button>
          );
        })}
      </div>
      <p className="game-help">Match all tech pairs with minimum moves.</p>
    </section>
  );
}

function winner(board) {
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a];
  }
  return null;
}

function bestAiMove(board) {
  const empties = board.map((v, i) => (v ? null : i)).filter((v) => v !== null);
  if (!empties.length) return -1;

  // Easy-to-medium AI:
  // 1) Always take immediate win.
  // 2) Usually (not always) block immediate player win.
  // 3) Sometimes choose strategic squares.
  // 4) Otherwise pick a random legal square.
  for (const idx of empties) {
    const copy = [...board];
    copy[idx] = 'O';
    if (winner(copy) === 'O') return idx;
  }

  const shouldBlock = Math.random() < 0.8;
  if (shouldBlock) {
    for (const idx of empties) {
      const copy = [...board];
      copy[idx] = 'X';
      if (winner(copy) === 'X') return idx;
    }
  }

  const strategicChance = Math.random();
  if (strategicChance < 0.35) {
    if (empties.includes(4)) return 4;
    const corners = empties.filter((i) => [0, 2, 6, 8].includes(i));
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  }

  return empties[Math.floor(Math.random() * empties.length)];
}

function TicTacToeGame() {
  const botTimerRef = useRef(0);
  const [board, setBoard] = useState(Array(9).fill(''));
  const [botThinking, setBotThinking] = useState(false);
  const [result, setResult] = useState(null);

  const currentWinner = winner(board);
  const draw = !currentWinner && board.every(Boolean);
  const locked = botThinking || Boolean(result);
  const status = result
    ? result === 'X'
      ? 'X won'
      : result === 'O'
        ? 'O won'
        : 'Draw'
    : botThinking
      ? 'Bot thinking...'
      : 'Your turn';

  useEffect(() => {
    if (result) return;
    if (currentWinner) {
      setResult(currentWinner);
      return;
    }
    if (draw) {
      setResult('draw');
    }
  }, [currentWinner, draw, result]);

  useEffect(
    () => () => {
      if (botTimerRef.current) window.clearTimeout(botTimerRef.current);
    },
    []
  );

  const reset = () => {
    if (botTimerRef.current) window.clearTimeout(botTimerRef.current);
    setBoard(Array(9).fill(''));
    setBotThinking(false);
    setResult(null);
  };

  const onMove = (idx) => {
    if (locked || board[idx]) return;
    const next = [...board];
    next[idx] = 'X';
    setBoard(next);

    const playerWin = winner(next);
    if (playerWin) {
      setResult(playerWin);
      return;
    }
    if (next.every(Boolean)) {
      setResult('draw');
      return;
    }

    setBotThinking(true);
    botTimerRef.current = window.setTimeout(() => {
      const move = bestAiMove(next);
      if (move < 0) {
        setBotThinking(false);
        setResult('draw');
        return;
      }

      const withBot = [...next];
      withBot[move] = 'O';
      setBoard(withBot);

      const botWin = winner(withBot);
      if (botWin) setResult(botWin);
      else if (withBot.every(Boolean)) setResult('draw');
      setBotThinking(false);
    }, 420);
  };

  return (
    <section className="game-shell">
      <div className="game-top">
        <div className="game-stats">
          <span>Mode: Player vs Bot (Medium)</span>
          <span>Status: {status}</span>
        </div>
        <button className="btn btn-solid" type="button" onClick={reset}>Reset Board</button>
      </div>
      <div className="ttt-grid">
        {board.map((value, idx) => (
          <button key={idx} type="button" className="ttt-cell" onClick={() => onMove(idx)}>
            {value || ''}
          </button>
        ))}
      </div>
      <p className="game-help">You are X. Bot is O. Try to outplay it.</p>
    </section>
  );
}

export default function GamePage() {
  const [active, setActive] = useState('dodge');

  return (
    <main>
      <section className="card section reveal page-hero">
        <p className="pill">Mini Arcade</p>
        <h1>Play 4 Interactive Games</h1>
        <p>Enjoy quick games that showcase frontend interaction design and smooth gameplay logic.</p>
      </section>

      <section className="section card reveal">
        <div className="game-mode-row">
          <button type="button" className={`game-mode-btn ${active === 'dodge' ? 'active' : ''}`} onClick={() => setActive('dodge')}>Neon Dodge</button>
          <button type="button" className={`game-mode-btn ${active === 'snake' ? 'active' : ''}`} onClick={() => setActive('snake')}>Snake Grid</button>
          <button type="button" className={`game-mode-btn ${active === 'memory' ? 'active' : ''}`} onClick={() => setActive('memory')}>Memory Match</button>
          <button type="button" className={`game-mode-btn ${active === 'ttt' ? 'active' : ''}`} onClick={() => setActive('ttt')}>Tic-Tac-Toe AI</button>
        </div>

        {active === 'dodge' ? <DodgeGame /> : null}
        {active === 'snake' ? <SnakeGame /> : null}
        {active === 'memory' ? <MemoryGame /> : null}
        {active === 'ttt' ? <TicTacToeGame /> : null}
      </section>

      <section className="section">
        <div className="hero-actions">
          <Link className="btn btn-outline" to="/projects">Back to Projects</Link>
          <Link className="btn btn-outline" to="/contact">Let’s Connect</Link>
        </div>
      </section>
    </main>
  );
}
