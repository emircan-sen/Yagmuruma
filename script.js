(() => {
  "use strict";

  const intro = document.getElementById("intro");
  const mainScene = document.getElementById("main-scene");
  const questionScene = document.getElementById("question-scene");
  const photoScene = document.getElementById("photo-scene");
  const countdown = document.getElementById("countdown");
  const loveRain = document.getElementById("love-rain");
  const heartParticles = document.getElementById("heart-particles");
  const particleField = document.getElementById("particle-field");
  const particleFieldQ = document.getElementById("particle-field-q");
  const replay = document.getElementById("replay");
  const replay2 = document.getElementById("replay-2");
  const tapHint = document.getElementById("tap-hint");
  const continueBtn = document.getElementById("continue-btn");

  const answerWrap = document.getElementById("answer-wrap");
  const btnEvet = document.getElementById("btn-evet");
  const btnHayir = document.getElementById("btn-hayir");
  const questionHint = document.getElementById("question-hint");
  const evetOverlay = document.getElementById("evet-overlay");
  const evetGiant = document.getElementById("evet-giant");
  const photoConfetti = document.getElementById("photo-confetti");

  let hayirClicks = 0;
  const MAX_HAYIR_CLICKS = 6;
  const HAYIR_HINTS = {
    1: "emin misin? 👀",
    2: "bir daha düşün...",
    3: "gerçekten mi? 🥺",
    4: "son şansların azalıyor",
    5: "başka seçenek kalmadı ✨",
  };

  let timers = [];

  const wait = (ms, callback) => {
    const id = window.setTimeout(callback, ms);
    timers.push(id);
    return id;
  };

  const clearTimers = () => {
    timers.forEach(window.clearTimeout);
    timers = [];
  };

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createLoveRain() {
    loveRain.innerHTML = "";

    const count = window.innerWidth < 600 ? 56 : 92;
    const words = ["SEVİYORUM", "SEVİYORUM", "♡", "SENİ SEVİYORUM", "SEVİYORUM", "♥"];

    for (let i = 0; i < count; i += 1) {
      const item = document.createElement("span");
      item.className = "rain-item";
      if (Math.random() > 0.72) item.classList.add("soft");

      item.textContent = words[Math.floor(Math.random() * words.length)];
      item.style.left = `${random(-4, 100)}%`;
      item.style.setProperty("--dx", `${random(-80, 80)}px`);
      item.style.setProperty("--rot", `${random(-35, 35)}deg`);
      item.style.setProperty("--op", random(0.25, 0.9).toFixed(2));
      item.style.animationDuration = `${random(3.6, 7.7).toFixed(2)}s`;
      item.style.animationDelay = `${random(-5.8, 0).toFixed(2)}s`;

      loveRain.appendChild(item);
    }
  }

  function createAmbientParticles(container) {
    if (!container) return;
    container.innerHTML = "";
    const count = window.innerWidth < 600 ? 34 : 58;

    for (let i = 0; i < count; i += 1) {
      const p = document.createElement("span");
      p.className = "field-particle";
      p.textContent = Math.random() > 0.45 ? "·" : "♡";
      p.style.left = `${random(2, 98)}%`;
      p.style.top = `${random(2, 98)}%`;
      p.style.fontSize = `${random(8, 16)}px`;
      p.style.animationDuration = `${random(3.1, 7.2).toFixed(2)}s`;
      p.style.animationDelay = `${random(-6, 0).toFixed(2)}s`;
      container.appendChild(p);
    }
  }

  // Parametric heart: x = 16 sin^3(t), y = 13cos(t)-5cos(2t)-2cos(3t)-cos(4t)
  function createHeart() {
    heartParticles.innerHTML = "";

    const total = window.innerWidth < 600 ? 116 : 160;
    const scale = window.innerWidth < 600 ? 7.2 : 9.1;
    const colors = ["#ff4ead", "#ff66ba", "#ff82c8", "#ffa1d8", "#ffd0ec"];

    for (let i = 0; i < total; i += 1) {
      const t = (Math.PI * 2 * i) / total;
      const noise = random(0.90, 1.10);
      const x = 16 * Math.pow(Math.sin(t), 3) * scale * noise;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale * noise;

      // Add a handful of small particles close to the outline to make the heart feel alive.
      const item = document.createElement("span");
      item.className = "heart-particle";
      item.textContent = Math.random() > 0.12 ? "♥" : "❤";
      item.style.left = `calc(50% + ${x}px)`;
      item.style.top = `calc(50% + ${y}px)`;
      item.style.setProperty("--s", `${random(8, 18)}px`);
      item.style.setProperty("--fs", `${random(8, 18)}px`);
      item.style.setProperty("--c", colors[Math.floor(Math.random() * colors.length)]);
      item.style.animationDelay = `${(i * 8 + random(0, 240))}ms`;
      item.style.transformOrigin = `${random(42, 58)}% ${random(42, 58)}%`;

      heartParticles.appendChild(item);
    }

    // A few floating hearts around the main outline.
    for (let i = 0; i < Math.floor(total * 0.20); i += 1) {
      const p = document.createElement("span");
      p.className = "heart-particle";
      p.textContent = "♥";
      const angle = random(0, Math.PI * 2);
      const radius = random(205, 245) * (window.innerWidth < 600 ? 0.70 : 1);
      p.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
      p.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
      p.style.setProperty("--s", `${random(7, 14)}px`);
      p.style.setProperty("--fs", `${random(7, 14)}px`);
      p.style.setProperty("--c", colors[Math.floor(Math.random() * colors.length)]);
      p.style.animationDelay = `${(total * 8 + i * 38 + random(0, 350))}ms`;
      heartParticles.appendChild(p);
    }
  }

  function showMainScene() {
    intro.classList.add("is-hidden");
    mainScene.classList.remove("is-fading");
    mainScene.classList.add("is-visible");
    createHeart();
    createAmbientParticles(particleField);

    wait(5300, () => {
      continueBtn.focus({ preventScroll: true });
    });
  }

  function goToQuestionScene() {
    mainScene.classList.add("is-fading");
    createAmbientParticles(particleFieldQ);

    wait(480, () => {
      mainScene.classList.remove("is-visible");
      questionScene.classList.add("is-visible");
      wait(600, () => {
        btnEvet.focus({ preventScroll: true });
      });
    });
  }

  function resetAnswerState() {
    hayirClicks = 0;
    btnEvet.style.transform = "";
    btnHayir.classList.remove("is-fleeing");
    btnHayir.style.left = "";
    btnHayir.style.top = "";
    btnHayir.style.opacity = "";
    btnHayir.style.display = "";
    questionHint.textContent = "cevabını bekliyorum...";
    questionHint.style.opacity = "1";
    document.querySelector(".question-title").style.opacity = "1";
    document.querySelector(".question-title").style.filter = "none";
    document.querySelector(".question-eyebrow").style.opacity = "1";
    evetOverlay.classList.remove("is-active");
    evetOverlay.setAttribute("aria-hidden", "true");
  }

  function handleHayirClick() {
    hayirClicks += 1;

    const scale = 1 + hayirClicks * 0.35;
    btnEvet.style.transform = `scale(${scale})`;

    btnHayir.classList.add("is-fleeing");
    const bounds = answerWrap.getBoundingClientRect();
    const btnBounds = btnHayir.getBoundingClientRect();
    const maxX = Math.max(bounds.width - btnBounds.width, 0);
    const maxY = Math.max(bounds.height - btnBounds.height, 0);
    btnHayir.style.left = `${random(0, maxX)}px`;
    btnHayir.style.top = `${random(0, maxY)}px`;
    btnHayir.style.opacity = `${Math.max(0.2, 1 - hayirClicks * 0.13)}`;

    if (HAYIR_HINTS[hayirClicks]) {
      questionHint.textContent = HAYIR_HINTS[hayirClicks];
    }

    if (hayirClicks >= MAX_HAYIR_CLICKS) {
      triggerGiantEvet();
    }
  }

  function triggerGiantEvet() {
    btnHayir.style.transition = "opacity 350ms ease, transform 350ms ease";
    btnHayir.style.opacity = "0";
    btnHayir.style.transform = "scale(0.4)";
    wait(250, () => {
      btnHayir.style.display = "none";
    });

    const title = document.querySelector(".question-title");
    const eyebrow = document.querySelector(".question-eyebrow");
    title.style.transition = "opacity 400ms ease, filter 400ms ease";
    title.style.opacity = "0";
    title.style.filter = "blur(6px)";
    eyebrow.style.transition = "opacity 400ms ease";
    eyebrow.style.opacity = "0";
    questionHint.style.transition = "opacity 400ms ease";
    questionHint.style.opacity = "0";

    wait(350, () => {
      evetOverlay.classList.add("is-active");
      evetOverlay.setAttribute("aria-hidden", "false");
      evetGiant.focus({ preventScroll: true });
    });
  }

  function createConfetti() {
    photoConfetti.innerHTML = "";
    const count = window.innerWidth < 600 ? 26 : 40;
    for (let i = 0; i < count; i += 1) {
      const h = document.createElement("span");
      h.className = "confetti-heart";
      h.textContent = Math.random() > 0.5 ? "♥" : "♡";
      h.style.left = `${random(-4, 100)}%`;
      h.style.setProperty("--dx", `${random(-60, 60)}px`);
      h.style.setProperty("--rot", `${random(-40, 40)}deg`);
      h.style.setProperty("--op", random(0.4, 0.95).toFixed(2));
      h.style.fontSize = `${random(11, 20)}px`;
      h.style.animationDuration = `${random(4.2, 8).toFixed(2)}s`;
      h.style.animationDelay = `${random(-4, 1.5).toFixed(2)}s`;
      photoConfetti.appendChild(h);
    }
  }

  function confirmYes() {
    evetOverlay.classList.remove("is-active");
    evetOverlay.setAttribute("aria-hidden", "true");
    questionScene.classList.remove("is-visible");
    photoScene.classList.add("is-visible");
    createConfetti();

    wait(1600, () => {
      replay2.focus({ preventScroll: true });
    });
  }

  function countdownStep(value, delay) {
    wait(delay, () => {
      countdown.classList.remove("pop");
      // Force reflow so the animation can replay for every number.
      void countdown.offsetWidth;
      countdown.textContent = value;
      countdown.classList.add("pop");
    });
  }

  function startSequence() {
    clearTimers();

    intro.classList.remove("is-hidden");
    mainScene.classList.remove("is-visible", "is-fading");
    questionScene.classList.remove("is-visible");
    photoScene.classList.remove("is-visible");
    resetAnswerState();

    countdown.classList.remove("done", "pop");
    countdown.textContent = "";
    tapHint.style.animation = "none";
    void tapHint.offsetWidth;
    tapHint.style.animation = "";

    createLoveRain();

    countdownStep("3", 200);
    countdownStep("2", 1100);
    countdownStep("1", 2000);

    wait(2900, () => {
      countdown.classList.remove("pop");
      countdown.classList.add("done");
      countdown.textContent = "SENİ SEVİYORUM";
    });

    wait(3650, showMainScene);
  }

  replay.addEventListener("click", (event) => {
    event.stopPropagation();
    startSequence();
  });

  replay2.addEventListener("click", (event) => {
    event.stopPropagation();
    startSequence();
  });

  continueBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    goToQuestionScene();
  });

  btnHayir.addEventListener("click", (event) => {
    event.stopPropagation();
    handleHayirClick();
  });

  btnEvet.addEventListener("click", (event) => {
    event.stopPropagation();
    confirmYes();
  });

  evetGiant.addEventListener("click", (event) => {
    event.stopPropagation();
    confirmYes();
  });

  document.addEventListener("click", (event) => {
    const activeScene =
      mainScene.classList.contains("is-visible") ||
      questionScene.classList.contains("is-visible") ||
      photoScene.classList.contains("is-visible");
    if (!activeScene) return;
    if (event.target.closest("button")) return;

    // Gentle floating hearts on taps/clicks.
    const heart = document.createElement("span");
    heart.className = "floating-note";
    heart.textContent = "♥";
    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;
    heart.style.position = "fixed";
    heart.style.zIndex = "100";
    heart.style.pointerEvents = "none";
    heart.style.fontSize = `${random(14, 23)}px`;
    heart.style.animation = "tapHeart 1.7s ease-out forwards";
    document.body.appendChild(heart);
    wait(1750, () => heart.remove());
  });

  const dynamicStyle = document.createElement("style");
  dynamicStyle.textContent = `
    @keyframes tapHeart {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(.25); }
      20% { opacity: 1; }
      100% { opacity: 0; transform: translate(-50%, -135px) scale(1.2) rotate(10deg); }
    }
  `;
  document.head.appendChild(dynamicStyle);

  window.addEventListener("resize", () => {
    if (mainScene.classList.contains("is-visible")) {
      createHeart();
      createAmbientParticles(particleField);
    }
    if (questionScene.classList.contains("is-visible")) {
      createAmbientParticles(particleFieldQ);
    }
  }, { passive: true });

  // Start automatically when the page opens.
  startSequence();
})();
