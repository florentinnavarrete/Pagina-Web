import { AI_SYSTEM_INSTRUCTION } from '../constants';

// Usar proxy PHP en producción para ocultar la API key
const USE_PROXY = import.meta.env.PROD; // true en build de producción
const PROXY_URL = '/portfolio-oksap/api/chat.php';

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
) => {
  if (USE_PROXY) {
    // Modo producción: usar proxy PHP
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history,
        systemInstruction: AI_SYSTEM_INSTRUCTION,
      }),
    });

    if (!response.ok) {
      throw new Error(`Proxy error: ${response.status}`);
    }

    const data = await response.json();
    
    // Simular formato de streaming para compatibilidad
    return (async function* () {
      if (data.candidates && data.candidates[0]?.content?.parts) {
        for (const part of data.candidates[0].content.parts) {
          yield { text: part.text || '' };
        }
      }
    })();
  } else {
    // Modo desarrollo: usar Google GenAI directamente
    const { GoogleGenAI } = await import("@google/genai");
    
    let apiKey: string | undefined;
    try {
      apiKey = (process && (process.env as any)?.API_KEY) || (process && (process.env as any)?.GEMINI_API_KEY);
    } catch (e) {
      apiKey = undefined;
    }

    if (!apiKey) {
      const venv = (typeof import.meta !== 'undefined' ? (import.meta as any).env : undefined);
      apiKey = venv?.VITE_GEMINI_API_KEY || undefined;
    }

    if (!apiKey) {
      throw new Error('API_KEY missing. Set VITE_GEMINI_API_KEY for development.');
    }

    const client = new GoogleGenAI({ apiKey });
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessageStream({
      message: message,
    });

    return result;
  }
};
