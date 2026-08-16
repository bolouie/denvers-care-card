// netlify/functions/generate.js
// Move 2: real Gemini call with structured (JSON) output.

export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { description } = JSON.parse(event.body || "{}");

    // Guard: don't call Gemini with an empty description
    if (!description || !description.trim()) {
        return { statusCode: 400, body: JSON.stringify({ error: "No description provided" }) };
    }

    const apiKey = process.env.GEMINI_API_KEY; // secret, server-side only
    const model = "gemini-flash-latest"; // always-current stable Flash; resilient to Google's model retirements
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    // This schema forces Gemini to return exactly these fields, as JSON.
    const responseSchema = {
        type: "object",
        properties: {
            dogName: { type: "string" },
            feeding: { type: "string" },
            meds: { type: "string" },
            walkRoutine: { type: "string" },
            quirks: { type: "string" },
            emergencyContact: { type: "string" },
            happyNote: { type: "string" },
        },
        required: ["dogName", "feeding", "meds", "walkRoutine", "quirks", "emergencyContact", "happyNote"],
    };

    const prompt = `You are helping a dog owner hand off care of their dog to a trusted neighbour.
Read the owner's notes below and turn them into a warm, clear care card.
If a detail is missing, write a friendly placeholder like "Not specified — ask the owner."
Keep each field to one or two sentences.

Owner's notes:
${description}`;

    try {
        const requestBody = JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        // Retry with exponential backoff, but ONLY for transient 503 errors.
        let response;
        const maxAttempts = 6;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: requestBody,
            });

            if (response.ok) break; // success, leave the loop

            // 503 = model temporarily overloaded. Wait and retry.
            if (response.status === 503 && attempt < maxAttempts) {
                const waitMs = 500 * 2 ** (attempt - 1); // 500ms, 1s, 2s
                await new Promise((resolve) => setTimeout(resolve, waitMs));
                continue; // try again
            }

            // Any other error (or out of retries): report it and stop.
            const errText = await response.text();
            return { statusCode: 502, body: JSON.stringify({ error: "Gemini call failed", detail: errText }) };
        }

        const data = await response.json();

        // Find the part that actually contains text (newer models may emit a thinking part first)
        const parts = data.candidates?.[0]?.content?.parts || [];
        const jsonText = parts.map((p) => p.text).filter(Boolean).join("");
        const card = JSON.parse(jsonText);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(card),
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: "Server error", detail: String(err) }) };
    }
}