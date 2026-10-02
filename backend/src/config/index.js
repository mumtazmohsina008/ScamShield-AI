import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  geminiApiKey: (process.env.GEMINI_API_KEY || '').trim(),
  geminiModel: (process.env.GEMINI_MODEL || 'gemini-1.5-flash').trim(),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  demoMode: process.env.DEMO_MODE === 'true' || !process.env.GEMINI_API_KEY,
  maxInputLength: 5000,
};

export const hasValidApiKey = () => {
  return Boolean(config.geminiApiKey && config.geminiApiKey.length > 10);
};
