const THRESHOLD_MS = 20000; // 20s for testing; raise to 2+ minutes later
let scrollingMs = 0;
let lastScroll = 0;
let checking = false;

function onScroll() {
  const now = Date.now();
  if (now - lastScroll < 2000) scrollingMs += now - lastScroll;
  lastScroll = now;
}
window.addEventListener("scroll", onScroll, true);
window.addEventListener("wheel", onScroll, { passive: true });

setInterval(() => {
  if (checking || scrollingMs < THRESHOLD_MS) return;
  checking = true;
  const text = document.body.innerText.slice(0, 2000);
  chrome.runtime.sendMessage({ type: "analyze", text }, (res) => {
    checking = false;
    scrollingMs = 0;
    if (res && res.doomscrolling) jumpscare(res.message);
  });
}, 5000);

function jumpscare(message) {
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;z-index:2147483647;background:#000;";

  // Image fills the whole screen
  const img = document.createElement("img");
  img.src = chrome.runtime.getURL("scare.jpg");
  img.style.cssText = "width:100%;height:100%;object-fit:cover;";

  // AI message becomes a small caption at the bottom
  const text = document.createElement("p");
  text.textContent = message;
  text.style.cssText =
    "position:absolute;bottom:40px;left:0;right:0;text-align:center;" +
    "color:#f33;font-size:24px;margin:0;padding:0 20px;" +
    "text-shadow:0 0 8px #000,0 0 8px #000;";

  // Small close button in the corner
  const button = document.createElement("button");
  button.textContent = "I'll stop";
  button.style.cssText =
    "position:absolute;top:20px;right:20px;padding:8px 16px;font-size:14px;";
  button.onclick = () => overlay.remove();

  overlay.append(img, text, button);
  document.body.appendChild(overlay);

  const sound = new Audio(chrome.runtime.getURL("scream.m4a"));
  sound.volume = 0.3;
  sound.play().catch(() => {});

  // Optional: disappear on its own after 5 seconds
  setTimeout(() => overlay.remove(), 5000);
}
