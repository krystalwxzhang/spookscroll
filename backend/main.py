from fastapi import FastAPI
from pydantic import BaseModel
import ollama

app = FastAPI()

class Page(BaseModel):
    text: str

def ask(prompt):
    reply = ollama.chat(
        model="gemma3:1b",
        messages=[{"role": "user", "content": prompt}],
        options={"temperature": 0},
    )
    return reply["message"]["content"].strip()

@app.post("/analyze")
def analyze(page: Page):
    text = page.text[:2000]

    verdict_prompt = (
        "Decide if this page text is negative, stressful, or doom-and-gloom content "
        "that someone might endlessly scroll through. Answer with one word only: YES or NO.\n\n"
        "Text: Terrible disaster, crisis, and everything is getting worse.\nAnswer: YES\n\n"
        "Text: A simple banana bread recipe with three ingredients.\nAnswer: NO\n\n"
        "Text: Lecture notes on photosynthesis for my biology class.\nAnswer: NO\n\n"
        f"Text: {text}\nAnswer:"
    )
    verdict_raw = ask(verdict_prompt)
    print("VERDICT RAW:", repr(verdict_raw))
    is_doom = "YES" in verdict_raw.upper()[:10]

    message = ""
    if is_doom:
        message = ask(
            "Write one short, spooky sentence telling someone to stop doomscrolling. "
            "Reply with only the sentence."
        )
        print("MESSAGE RAW:", repr(message))

    return {"doomscrolling": is_doom, "message": message}