# Denver's Care Card

Turn a quick, messy note about your dog into a clear, structured care card worth sharing.

**Live app:** https://denvers-care-card.netlify.app

A weekend project built for the [DEV Weekend Challenge: Dog Days Edition](https://dev.to/challenges/weekend-2026-08-13). I had just completed a 13-week UX design project on neighbourhood dog care (Pack) when the challenge came up, so the timing was too good to pass on: a chance to build a small, working app inspired by research I still had fresh.

## What it does

When a dog owner needs a neighbour to step in on short notice, the information that matters most, feeding, meds, quirks, which vet, usually gets passed along as a rushed, disorganized text. Denver's Care Card takes that quick note and uses Google's Gemini API to return an organized care card: feeding, meds, walk routine, quirks, emergency contact, and a warm note about what makes the dog happy, ready to hand to whoever's stepping in.

## Tech stack

- **React + Vite** (front end)
- **Netlify Functions** (serverless backend that keeps the API key off the client)
- **Google Gemini API** (structured JSON output via `responseSchema`)
- **CSS Modules** (component-scoped styling)
- **Netlify** (hosting + deploy from GitHub)

## How it works

The React app sends the user's note to a Netlify serverless function. The function holds the Gemini API key as a backend environment variable (so the key never ships to the browser), calls Gemini with a `responseSchema` that forces a consistent seven-field JSON response, and returns the result to be rendered as a care card. A retry loop with capped exponential backoff handles transient model overloads while staying within the serverless execution limit.

## Running it locally

1. Clone the repo:
```bash
   git clone https://github.com/bolouie/denvers-care-card.git
   cd denvers-care-card
```
2. Install dependencies:
```bash
   npm install
```
3. Create a `.env` file in the project root with your own Gemini API key:

GEMINI_API_KEY=your_key_here

You can get a key from [Google AI Studio](https://aistudio.google.com/).

4. Run the dev server (this runs both the React app and the serverless function together):
```bash
   netlify dev
```

> Note: use `netlify dev`, not `npm run dev`, so the serverless function is served locally alongside the front end.
