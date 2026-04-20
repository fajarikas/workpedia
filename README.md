# Worpedia — Work Dictionary
**Internal App PT Asia Surya Perkasa (Honda Main Dealer)**

## Tech Stack
- Next.js 15 (App Router)
- Tailwind CSS v3
- Framer Motion v11
- TypeScript
- Lucide React

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Jalankan dev server
npm run dev

# 3. Buka browser
# http://localhost:3000
```

## Alur Sistem
```
/login → /dashboard → /division/[id] → /division/[id]/[lessonId]
```

## Login Demo
- Isi ID Karyawan apa saja (contoh: `ASP-2024-0142`)
- Password: apa saja
- Klik "Masuk ke Worpedia"

## Fitur
- ✅ Login Page dengan animasi
- ✅ Dashboard dengan progress per divisi
- ✅ 6 Divisi: Admin Retail, Servis, Sparepart, Kasir, Sales, HRD
- ✅ 34 Tutorial Mock Data relevan Honda
- ✅ Video Player (YouTube embed)
- ✅ CMD+K Command Palette Search
- ✅ Framer Motion page transitions
- ✅ Glassmorphism cards
- ✅ Mobile-first responsive
- ✅ Prev/Next lesson navigation
- ✅ Mark as Complete per lesson

## Struktur File
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx (redirect → /login)
│   ├── login/page.tsx
│   ├── dashboard/page.tsx
│   └── division/
│       └── [divisionId]/
│           ├── page.tsx
│           └── [lessonId]/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── CommandPalette.tsx
│   ├── DivisionCard.tsx
│   ├── VideoPlayer.tsx
│   └── MotionProvider.tsx
└── lib/
    └── mockData.ts
```
# workpedia
