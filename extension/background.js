chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "analyze") {
    fetch("http://localhost:8000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: msg.text }),
    })
      .then((r) => r.json())
      .then(sendResponse)
      .catch(() => sendResponse(null));
    return true; // keeps the channel open for the async reply
  }
});