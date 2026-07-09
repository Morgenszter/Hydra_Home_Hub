# HYDRA v7.1 — Toolchain Integration Pack

## Narzędzia uwzględnione

- GitHub
- TypeScript
- React / React Native
- Convex
- OpenAI Platform
- Figma
- Airtable
- Ace Knowledge Graph
- Acumen
- Photoshop / Canva / Adobe Express / Apixel
- Replit
- Lovable
- Base44
- AI Voice Generator

## Decyzja architektoniczna

HYDRA pozostaje local-first.
Narzędzia cloud/no-code są opcjonalnymi adapterami, nie zależnością core runtime.

## Dodane warstwy

### Core Dev
- GitHub CI workflow
- TypeScript contracts

### Frontend
- toolchain contracts
- Figma token export
- external data adapter interfaces

### Backend
- OpenAI intent adapter boundary
- Knowledge Graph / Acumen adapter boundary
- `/toolchain/status`
- `/toolchain/intent/parse`
- `/toolchain/knowledge/export`

### Voice
- AI Voice Generator MP3 pipeline docs

### Rapid Build
- Replit / Lovable / Base44 jako prototyping shell, bez mieszania z core runtime.
