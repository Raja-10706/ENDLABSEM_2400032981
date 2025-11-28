# Event Booking Demo — Vite + React

This project demonstrates passing stable click handlers (via `useCallback` and a ref cache) to memoized children to avoid unnecessary re-renders.

How to run:

1. Open PowerShell in the project folder:

```powershell
cd c:\Users\RAJA\Downloads\KLU\labend\event-demo-vite
npm install
npm run dev
```

2. Open the URL shown by Vite (usually `http://localhost:5173`).
3. Open DevTools Console to watch `EventButton render` logs.

What to observe:
- Toggle the "Use stable handlers" checkbox.
- With the checkbox off, each parent render recreates handler functions and memoized children re-render.
- With it on, stable handlers are created once per id and memoized children do not re-render on parent re-renders.
