import express from 'express';
import { config, hasValidApiKey } from '../config/index.js';
import { DEMO_PRESETS } from '../services/mockDemoService.js';

const router = express.Router();

router.get('/health', (req, res) => {
  return res.json({
    status: 'online',
    service: 'ScamShield AI Engine',
    hasGeminiKey: hasValidApiKey(),
    model: config.geminiModel,
    demoMode: config.demoMode,
    timestamp: new Date().toISOString(),
  });
});

router.get('/presets', (req, res) => {
  const safePresets = DEMO_PRESETS.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    text: p.text,
  }));
  return res.json({
    success: true,
    presets: safePresets,
  });
});

export default router;
