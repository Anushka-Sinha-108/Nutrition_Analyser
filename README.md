# Nutrition_Analyser

This branch adds a Firebase-backed backend architecture scaffold (client-side services, Firestore schema, Zod schemas, and a nutrition scoring utility) on the `backend-architecture-replica` branch.

What I added
- Firebase initialization (src/firebase.ts)
- Environment accessor (.env.example + src/config/env.ts)
- Services (auth, meal tracker, dashboard)
- Repositories: mess_database scaffold + seed helper
- Zod schemas for user & meal log
- Types and utilities (nutrition aggregation + scoring)
- docs/firestore-schema.md describing the collections

Quick start
1. Copy environment values:
   cp .env.example .env
   Fill the VITE_FIREBASE_* values from your Firebase project.
2. Install dependencies:
   npm install
3. Run typecheck:
   npm run typecheck
4. Start dev server (if frontend present):
   npm run dev

Important
- No secrets were committed. Do NOT commit real API keys. Use GitHub secrets for CI or local .env for development.

Next steps you can do locally
- Create a Firebase project, enable Authentication (Email/Password) and Firestore.
- Seed `mess_database` using the seed helper or the admin UI you build.

If you want, I can now open a PR with these changes (branch: backend-architecture-replica) and include a short PR description and checklist.
