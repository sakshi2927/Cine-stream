// openai.js
// lightweight client to call Google Gemini API from frontend

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function getMoodMovie(prompt) {
  if (!API_KEY) {
    console.warn('No API key provided');
    throw new Error('Missing API key. Please set VITE_OPENAI_API_KEY in .env');
  }

  try {
    console.log('Calling Gemini API with prompt:', prompt);
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Recommend exactly ONE movie title that matches the following mood.
Rules:
- Output ONLY the movie title.
- No explanation.
- No punctuation.
- No extra text.
- The title must be a real popular movie.

Mood: ${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 20,
            temperature: 0.7,
          },
        }),
      }
    );

    console.log('Response status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error response:', error);
      const errorMsg =
        error?.error?.message ||
        error?.error?.code ||
        `HTTP ${response.status}`;
      throw new Error(`Gemini API error: ${errorMsg}`);
    }

    const data = await response.json();
    console.log('Response data:', data);

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) {
      throw new Error('No text in API response');
    }
    return text;
  } catch (err) {
    console.error('Error calling Gemini API:', err);
    throw err;
  }
}
