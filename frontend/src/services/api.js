const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Analyzes suspicious message text
 */
export async function analyzeMessage(text, forceDemo = false) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, forceDemo }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to analyze message');
  }

  return data.data;
}

/**
 * Fetches dashboard threat intelligence metrics
 */
export async function getDashboardStats() {
  const response = await fetch(`${API_BASE}/dashboard`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch dashboard metrics');
  }
  return data.data;
}

/**
 * Resets dashboard history (for demo resets)
 */
export async function resetDashboard() {
  const response = await fetch(`${API_BASE}/dashboard/reset`, {
    method: 'POST',
  });
  const data = await response.json();
  return data;
}

/**
 * Fetches server health, Gemini configuration, and active model
 */
export async function getHealthStatus() {
  const response = await fetch(`${API_BASE}/health`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Failed to reach backend service');
  }
  return data;
}

/**
 * Fetches preset demo samples
 */
export async function getPresetSamples() {
  const response = await fetch(`${API_BASE}/presets`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error('Failed to load demo presets');
  }
  return data.presets;
}
