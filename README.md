# spookscroll 👻

Spookscroll is a browser extension powered by a local open-weight AI model that quietly detects heavy, stressful, and negative "doom-and-gloom" content as you browse, startling you out of the cycle with a spooky warning message and an audio cue.

**The Problem**

Traditional screen-time limits rely on gentle nudges that users habitually swipe away. 
Endless scrolling through negative news and social feeds traps users in an invisible loop of digital anxiety, draining their time and mental well-being without them realizing it.

**The Solution**

Spookscroll acts as an automated, privacy-friendly circuit breaker. It intercepts text from the web pages you visit, uses a local small language model to evaluate its tone in real-time, and intervenes when you are sliding into a doomscrolling spiral.

**🚀 What It Does**

- Uses Behavioral Tracking: It monitors scroll velocity and gaze patterns in real-time.

-  When it detects erratic scrolling or looking down, it forcefully locks down the browser tab.

- It snaps a silent local frame of your face, triggers a full-screen dystopian overlay, and uses Gemma to generate a hyper-specific, unhinged audio-visual roast detailing exactly how much time you've wasted.

- To unlock your feed, you have to survive an active mini-game or type out an antidote phrase to prove you're conscious.
  
**How It's Built**

- **Backend:** Built with **FastAPI** (`backend/main.py`), providing an API endpoint that receives page text payloads from the extension.
- **AI Engine:** Uses **Ollama** running locally with the lightweight open-weight **`gemma3:1b`** model (under 10B parameters) set to zero temperature for deterministic, reliable text classification.
- **Extension:** A browser extension that reads active tab text, sends it to the FastAPI backend, and triggers visual alerts and audio warnings (`extension/screeching audio.m4a`) when doomscrolling is detected.


**Accomplishments that we're proud of**

**What we learned**
