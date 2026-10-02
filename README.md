# 🛡️ ScamShield AI - AI Scam & Phishing Message Analyzer

> **"Detect the red flags before they become a threat."**  
> An intelligent cybersecurity advisory application for students and everyday internet users to analyze suspicious SMS, WhatsApp messages, emails, job offers, or website snippets using Google Gemini AI.

---

## 📌 Problem

Modern digital scams have evolved beyond obvious typos. Everyday consumers, students, and elderly internet users are bombarded daily with hyper-realistic SMS notifications, fake job offers on Telegram, counterfeit delivery tracking links, and lookalike banking portals. Traditional security advice ("look for bad spelling") is no longer sufficient against generative AI-crafted lures, yet standard threat intelligence tools are filled with cryptic jargon that confuses non-technical users.

## 💡 Solution

**ScamShield AI** provides an accessible, non-technical threat diagnosis engine. When a user pastes suspicious text, ScamShield AI:
1. **Deconstructs Psychological Manipulation:** Detects artificial urgency, panic triggers, intimidation, and impersonation.
2. **Performs Safe Static URL Inspection:** Scans domain syntax, brand lookalike typosquatting, suspicious TLDs, and URL shorteners without ever visiting or pinging external links.
3. **Explains "Why" in Plain English:** Translates complex cybersecurity concepts (like "credential harvesting") into everyday analogies anyone can understand via the **"Explain Like I'm New"** mode.
4. **Delivers Concrete Action Steps:** Provides clear, safe actions (e.g. contacting official numbers on the back of bank cards, reporting spam, and blocking senders).

---

## ✨ Features

- **Multi-Signal Scam Analysis:** Evaluates 10 major scam categories:
  - *Phishing*, *Financial scam*, *Impersonation*, *Fake prize/giveaway*, *Job scam*, *Credential theft*, *Investment scam*, *Delivery/package scam*, *Social engineering*, *Suspicious/unknown*.
- **Risk Score & Level Indicator:** Dynamic visual gauge scoring threat severity from 0 to 100 across 4 standardized tiers (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
- **Interactive Highlighted Text Inspector:** Highlights exact suspicious phrases in the message with interactive click/hover popovers explaining why each phrase was flagged.
- **"Explain Like I'm New" Toggle:** Instant toggle switch between technical cybersecurity breakdown and friendly, jargon-free explanations.
- **Static URL Traits Scanner:** Separately lists embedded URLs and flags:
  - IP addresses used as hostnames
  - URL shorteners (`bit.ly`, `tinyurl.com`, `is.gd`, etc.)
  - High-risk / disposable TLDs (`.xyz`, `.top`, `.club`, etc.)
  - Brand typosquatting and spoofed subdomains (`chase-security-restore.xyz`)
  - *Zero Outbound Requests:* External links are never fetched or executed.
- **One-Click Demo Presets:** 4 preloaded real-world hackathon demo samples:
  1. *Fake Bank / Account Verification*
  2. *Fake Prize / Giveaway*
  3. *Work-From-Home Job Scam*
  4. *Suspicious Investment Opportunity*
- **Threat Intelligence Dashboard:**
  - Real-time aggregate telemetry: Total scanned, High-risk detections %, Average threat score.
  - Scam category distribution bar chart.
  - Recent analyses feed displaying scrubbed 40-character snippets.
- **Zero-Trust Privacy & Safety Guarantee:**
  - Full message text and credentials are never stored.
  - Passwords, credit cards, and OTPs are scrubbed using automated redaction.
  - Strict system prompt protection against prompt injections in untrusted inputs.

---

## 🏗️ Architecture & AI Pipeline

```
  [User Message / Link]
           │
           ▼
 [Frontend React + Vite] ── (CORS / Proxy) ──▶ [Express Backend :5000]
                                                        │
                      ┌─────────────────────────────────┴─────────────────────────────────┐
                      ▼                                                                   ▼
       [Static URL Syntactic Scanner]                                     [Gemini AI Threat Pipeline]
       - Heuristic pattern matching                                       - System prompt isolation
       - Brand lookalike detection                                        - Untrusted passive data enclosure
       - Zero outbound web requests                                       - Strict JSON schema enforcement
                      │                                                                   │
                      └─────────────────────────────────┬─────────────────────────────────┘
                                                        │
                                                        ▼
                                        [Validation & Normalization]
                                        - Redaction of sensitive fields
                                        - Severity scoring (0-100)
                                        - Plain-English breakdown
                                                        │
                                                        ▼
                                           [Local Minimal History]
                                           - Scrubbed 40-char snippet
                                           - Timestamp & category
                                                        │
                                                        ▼
                                            [Interactive UI Report]
```

---

## 🛠️ Tech Stack

- **Frontend:**
  - **Framework:** React 19 + Vite
  - **Styling:** Tailwind CSS (cybersecurity dark theme with glowing neon accents)
  - **Icons:** Lucide React
- **Backend:**
  - **Runtime:** Node.js (v20+ / v22+)
  - **Server:** Express 4
  - **Security:** `express-rate-limit`, `cors`, input sanitization, length caps
  - **AI SDK:** `@google/generative-ai` (Google Gemini API)
- **Storage:**
  - Local JSON persistent store (`backend/data/history.json`) with automated sensitive data scrubbing.

---

## 📁 Folder Structure

```
ScamSheild AI/
├── backend/
│   ├── data/
│   │   └── history.json            # Minimal scrubbed threat telemetry
│   ├── src/
│   │   ├── config/
│   │   │   └── index.js            # Environment config loader
│   │   ├── routes/
│   │   │   ├── analyze.js          # POST /api/analyze
│   │   │   ├── dashboard.js        # GET /api/dashboard & reset
│   │   │   └── health.js           # GET /api/health & GET /api/presets
│   │   ├── services/
│   │   │   ├── geminiService.js    # Gemini API client & prompt injection defense
│   │   │   ├── mockDemoService.js  # Hackathon demo presets & fallback simulation
│   │   │   ├── storageService.js   # History management & metric calculations
│   │   │   └── urlAnalysisService.js# Static URL heuristic inspection
│   │   ├── utils/
│   │   │   ├── sanitizer.js        # Input length caps & sensitive OTP/card redaction
│   │   │   └── validator.js        # Output normalization & plain-language translator
│   │   └── server.js               # Express application entrypoint
│   ├── .env.example                # Backend environment template
│   ├── .env                        # Local environment file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Header, engine status badge, tabs
│   │   │   ├── Hero.jsx            # Tagline, product overview, trust pillars
│   │   │   ├── DemoPresets.jsx     # 4 Hackathon demo sample buttons
│   │   │   ├── MessageInput.jsx    # Textarea, paste, clear, validation
│   │   │   ├── ScanningLoader.jsx  # High-tech animated radar scanner
│   │   │   ├── ResultCard.jsx      # Score ring, red flags, URL report, toggle
│   │   │   ├── Dashboard.jsx       # Threat telemetry & category distribution
│   │   │   ├── RedFlagGuide.jsx    # Educational guide on scam patterns
│   │   │   └── Footer.jsx          # Disclaimer and credits
│   │   ├── services/
│   │   │   └── api.js              # API client methods
│   │   ├── utils/
│   │   │   └── helpers.js          # Highlights builder & report exporter
│   │   ├── App.jsx                 # Main state coordinator
│   │   ├── index.css               # Tailwind CSS & cyber theme tokens
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js              # Vite server & backend proxy configuration
│   └── package.json
│
├── package.json                    # Root package scripts
└── README.md                       # Complete documentation
```

---

## ⚙️ Environment Variables

Create or configure `backend/.env`:

```env
# Server Port
PORT=5000

# Google Gemini API Key (Get a free key from https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key_here

# Configurable Gemini Model (e.g. gemini-1.5-flash, gemini-2.0-flash, gemini-1.5-pro)
GEMINI_MODEL=gemini-1.5-flash

# Frontend Origin for CORS
CORS_ORIGIN=http://localhost:5173

# Demo Mode (if true or if API key is blank, runs realistic local AI simulation)
DEMO_MODE=true
```

> **Note on API Key Security:** The `GEMINI_API_KEY` is loaded exclusively inside `backend/` and is never sent to or bundled with the frontend client.

---

## 🚀 How to Run Locally

### 1. Install Dependencies

In the root directory, install dependencies for both backend and frontend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start Backend & Frontend

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
# Runs at http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# Runs at http://localhost:5173
```

Now open **http://localhost:5173** in your browser!

---

## 🧪 Testing the 4 Hackathon Demo Samples

On the homepage, click any of the 4 demo cards to automatically load sample text into the input:

1. **Fake Bank / Account Verification**
   - *Message:* Urgent notification claiming Chase account suspension with a fake `.xyz` link.
   - *Expected Result:* Risk: `CRITICAL` (Score 94), Category: `Credential theft`, Flags: Panic countdown, Spoofed domain, Fake restriction threat.
2. **Fake Prize / Giveaway**
   - *Message:* iPhone 16 Pro Max prize claim requesting a $4.99 "customs fee" via `bit.ly`.
   - *Expected Result:* Risk: `CRITICAL` (Score 88), Category: `Fake prize/giveaway`, Flags: Advance-fee fraud pattern, Unsolicited lottery, Shortened URL.
3. **Work-From-Home Job Scam**
   - *Message:* $600/day for 30 minutes of online product review tasks, moving to Telegram.
   - *Expected Result:* Risk: `CRITICAL` (Score 82), Category: `Job scam`, Flags: Unrealistic pay-to-effort ratio, Telegram off-platform steering, Crypto payroll cues.
4. **Suspicious Investment Opportunity**
   - *Message:* "Quantum algorithmic bot" guaranteeing 25% daily compounding profit with zero risk.
   - *Expected Result:* Risk: `CRITICAL` (Score 91), Category: `Investment scam`, Flags: Guaranteed profits claim (Ponzi signature), Irreversible BTC deposit demands.

---

## 🔒 Security & Privacy Guarantees

- **Prompt Injection Hardening:** The system prompt treats all submitted text strictly as untrusted passive data wrapped in isolation delimiters.
- **Sensitive Data Redaction:** Any numbers resembling credit cards (13-16 digits), OTPs, or passwords are automatically scrubbed (`[REDACTED]`) before generating history snippets.
- **Static Heuristic URL Inspection:** The URL analyzer inspects domain strings and patterns purely with regex and standard URL parsing. It **never makes network requests** to target URLs, protecting users and servers from drive-by downloads or IP tracking.
- **Advisory Safety Notice:** ScamShield AI explicitly displays safety disclaimers reminding users that AI is an advisory aid and not a legal guarantee.

---

## 🔮 Future Improvements

- **Browser Extension:** Inline highlighting directly inside Gmail, WhatsApp Web, and Outlook.
- **Visual QR Code Analyzer:** Upload a QR code image to decode and inspect destination URLs before opening.
- **Multilingual Support:** Localized plain-English explanations in Spanish, Hindi, French, and Mandarin.
- **Crowdsourced Scam Intelligence:** Anonymized community reporting feeds to alert local communities of active phishing waves.
