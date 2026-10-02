import express from 'express';
import { getDashboardStats, clearHistory } from '../services/storageService.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const stats = getDashboardStats();
    return res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    return res.status(500).json({
      error: 'Dashboard Error',
      message: 'Failed to retrieve dashboard statistics.',
    });
  }
});

router.post('/reset', (req, res) => {
  try {
    clearHistory();
    return res.json({
      success: true,
      message: 'Dashboard history reset successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Reset Error',
      message: 'Failed to reset history.',
    });
  }
});

export default router;
