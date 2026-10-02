import express from 'express';
import { sanitizeInput } from '../utils/sanitizer.js';
import { extractAndAnalyzeUrls } from '../services/urlAnalysisService.js';
import { analyzeMessageWithGemini } from '../services/geminiService.js';
import { recordAnalysis } from '../services/storageService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { text, forceDemo } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Please provide message text to analyze.',
      });
    }

    const sanitized = sanitizeInput(text, 5000);
    if (!sanitized || sanitized.length < 5) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Message is too short. Please provide at least 5 characters.',
      });
    }

    // 1. Static URL analysis (safely heuristics-only, never visited)
    const urlAnalysis = extractAndAnalyzeUrls(sanitized);

    // 2. Gemini AI / Fallback analysis
    const aiResult = await analyzeMessageWithGemini(sanitized, { forceDemo: Boolean(forceDemo) });

    // 3. Record minimal metadata in storage for dashboard metrics (scrubbed)
    recordAnalysis({
      category: aiResult.category,
      riskScore: aiResult.riskScore,
      riskLevel: aiResult.riskLevel,
      text: sanitized,
    });

    // 4. Return combined comprehensive result
    return res.json({
      success: true,
      data: {
        ...aiResult,
        extractedUrls: urlAnalysis,
        analyzedTextLength: sanitized.length,
      },
    });
  } catch (error) {
    console.error('Analyze Route Error:', error);
    return res.status(500).json({
      error: 'Analysis Error',
      message: error.message || 'An unexpected error occurred during message analysis.',
    });
  }
});

export default router;
