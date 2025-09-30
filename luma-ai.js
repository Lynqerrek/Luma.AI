// Luma.AI Chatbot using OpenRouter API (FREE)
// You need a free API key from https://openrouter.ai/
// You can also swap out to Groq, Together AI, etc. with similar code.

const OPENROUTER_API_KEY = "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"; // <--- PUT YOUR FREE KEY HERE

async function callLumaAI(message) {
  // You can change the model (see OpenRouter docs for free models)
  const endpoint = "https://openrouter.ai/api/v1/chat/completions";
  const body = {
    model: "openchat/openchat-3.5-1210", // FREE model, or use others from docs
    messages: [
      { role: "system", content: "You are Luma.AI, a friendly and helpful assistant." },
      { role: "user", content: message }
    ]
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error("Luma.AI API error: " + response.status);
  }

  const data = await response.json();
  // OpenRouter returns choices[0].message.content
  return data.choices && data.choices[0] && data.choices[0].message.content
    ? data.choices[0].message.content
    : "Sorry, I couldn't get a response from Luma.AI.";
}
