# 🧪 Demo QA Automation – Playwright + TypeScript + pnpm

Repository ini berisi contoh automation testing menggunakan **Playwright**, **TypeScript**, dan **pnpm** sebagai package manager.  
Test scenario mencakup UI testing pada website DemoQA dan dijalankan melalui mode browser maupun headless.

---

## 📦 1. Clone Repository

```bash
git clone https://github.com/PanduWS94/playwright-demo-panduws94.git
cd NAMA-REPO

```

## 📁 2. Install pnpm (if not installed yet)
```bash
npm install -g pnpm
```
untuk check:
```bash
pnpm -v
```

## 🎯 3. Install dependencies
```bash
pnpm install
```

## ▶️ 4. Cara Menjalankan Test

UI Mode (membuka mode browser Playwright):
```bash
pnpm demo-qa:open
```
Headless Mode (jalan via CLI):
```bash
pnpm demo-qa:headless
```
## 🏗️ 5. Struktur Folder

```bash
project-root/
├── e2e/
│   ├── pages/
│   │   └── HomePage.ts
│   │
│   └── tests/
│       └── elements.spec.ts
│
├── playwright-report/
├── test-results/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── playwright.config.ts
└── README.md

```
## 📜 Lisensi & Hak Cipta

© 2025 — Pandu Wibisono Subroto
Project ini boleh di-clone, digunakan, dimodifikasi, dan dikembangkan selama tetap dilakukan secara bijak serta mencantumkan atribusi kepada pemilik repositori asli.

Penggunaan ulang untuk tujuan belajar, portfolio, dan pengembangan internal diperbolehkan.
Mohon untuk tidak menggunakan project ini untuk tujuan yang melanggar hukum atau merugikan pihak lain.