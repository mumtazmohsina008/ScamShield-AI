import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createSafeSnippet } from '../utils/sanitizer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'history.json');

// Ensure data folder and file exists
function ensureStorage() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      // Seed with initial realistic records for hackathon demo dashboard
      const initialSeed = [
        {
          id: 'seed-1',
          timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
          category: 'Credential theft',
          riskScore: 94,
          riskLevel: 'CRITICAL',
          snippet: 'URGENT from Chase Bank Security: Your...',
        },
        {
          id: 'seed-2',
          timestamp: new Date(Date.now() - 1000 * 60 * 68).toISOString(),
          category: 'Fake prize/giveaway',
          riskScore: 88,
          riskLevel: 'CRITICAL',
          snippet: 'CONGRATULATIONS!! Your mobile number...',
        },
        {
          id: 'seed-3',
          timestamp: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
          category: 'Job scam',
          riskScore: 82,
          riskLevel: 'CRITICAL',
          snippet: 'Hi! I am Sarah from Global Talent HR...',
        },
        {
          id: 'seed-4',
          timestamp: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
          category: 'Delivery/package scam',
          riskScore: 78,
          riskLevel: 'HIGH',
          snippet: 'USPS: Your package #US8912 could not...',
        },
        {
          id: 'seed-5',
          timestamp: new Date(Date.now() - 1000 * 60 * 380).toISOString(),
          category: 'Suspicious/unknown',
          riskScore: 18,
          riskLevel: 'LOW',
          snippet: 'Hey Mom, what time is dinner tonight?...',
        },
      ];
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialSeed, null, 2), 'utf8');
    }
  } catch (err) {
    console.error('Error initializing storage file:', err);
  }
}

ensureStorage();

function readHistory() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data) || [];
  } catch (err) {
    console.error('Failed reading history:', err);
    return [];
  }
}

function writeHistory(records) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed writing history:', err);
  }
}

/**
 * Saves minimal record: timestamp, category, score, riskLevel, and scrubbed 40-character snippet.
 * Strict privacy guarantee: no sensitive credentials or full text stored.
 */
export function recordAnalysis({ category, riskScore, riskLevel, text }) {
  const history = readHistory();
  const safeSnippet = createSafeSnippet(text, 40);

  const newEntry = {
    id: 'scan_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    timestamp: new Date().toISOString(),
    category: category || 'Suspicious/unknown',
    riskScore: typeof riskScore === 'number' ? riskScore : 50,
    riskLevel: riskLevel || 'MEDIUM',
    snippet: safeSnippet,
  };

  history.unshift(newEntry);

  // Keep latest 200 records in local JSON store
  if (history.length > 200) {
    history.length = 200;
  }

  writeHistory(history);
  return newEntry;
}

/**
 * Computes dashboard threat metrics
 */
export function getDashboardStats() {
  const history = readHistory();

  const totalAnalyses = history.length;
  const highRiskCount = history.filter(
    (h) => h.riskLevel === 'CRITICAL' || h.riskLevel === 'HIGH'
  ).length;

  const totalScore = history.reduce((sum, item) => sum + (item.riskScore || 0), 0);
  const averageRiskScore = totalAnalyses > 0 ? Math.round(totalScore / totalAnalyses) : 0;

  // Tally category counts
  const categoryCounts = {};
  for (const item of history) {
    const cat = item.category || 'Suspicious/unknown';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  }

  // Convert to sorted array
  const commonCategories = Object.entries(categoryCounts)
    .map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / totalAnalyses) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Recent 10 analyses
  const recentAnalyses = history.slice(0, 10);

  return {
    totalAnalyses,
    highRiskCount,
    averageRiskScore,
    commonCategories,
    recentAnalyses,
  };
}

export function clearHistory() {
  writeHistory([]);
  return { success: true };
}
