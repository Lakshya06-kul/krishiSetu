const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function chat(message) {
  const res = await fetch(`${API_URL}/api/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}
