# StudyChat — Local Docker Deployment

This repository contains a minimal StudyChat frontend (Vite + React) and backend (Express) with a `/api/solve` endpoint that integrates with the Gemini API.

## Prerequisites
- Docker and docker-compose installed on your machine
- A valid Gemini API key set in `server/.env` as `GEMINI_API_KEY` (the repo contains a placeholder)

## Build and run locally with Docker Compose

From the `studychat` folder run:

```bash
docker-compose up --build -d
```

This starts:
- Frontend at http://localhost:3000
- Backend at http://localhost:5000

## Expose locally to the internet (optional)
If you need a public URL for testing, use ngrok:

```bash
# install and authenticate ngrok first
ngrok http 3000
```

## Quick public frontend (GitHub Pages)

You can publish the frontend quickly using GitHub Pages. A workflow is provided at `.github/workflows/pages.yml` which builds the client and publishes `client/dist` to the `gh-pages` branch on push to `main`.

After the workflow runs successfully, the frontend will be available at:

- `https://<your-github-username>.github.io/<your-repo-name>/`

### Required repository secrets for fast publish

- `VITE_BACKEND_URL` — the public URL of your deployed backend (e.g. https://studychat-backend.onrender.com). This will be embedded at build time so the GitHub Pages frontend can call the API.
- `RENDER_API_KEY` and `RENDER_SERVICE_ID` — required only if you use the Render deploy workflow to auto-deploy the backend.

After adding those secrets in your GitHub repository Settings → Secrets, push to `main` and the following will happen:

- The Pages workflow (`.github/workflows/pages.yml`) will build the client with `VITE_BACKEND_URL` and publish `client/dist` to `gh-pages`.
- The Render workflow (`.github/workflows/deploy-render.yml`) will trigger a backend deploy if `RENDER_API_KEY` and `RENDER_SERVICE_ID` are set.

Quick push commands:

```bash
cd "c:\Users\Shubham Kumar\OneDrive\Desktop\Coding\C language\studychat"
git init
git add .
git commit -m "Add StudyChat app and deployment workflows"
git branch -M main
git remote add origin git@github.com:<your-username>/<your-repo>.git
git push -u origin main
```


Note: the backend must be hosted separately (e.g., Render, Railway, or a container host) and its URL configured in the client (or proxied). The repo also contains a CI workflow to build Docker images for the backend and client and push them to GitHub Container Registry.

## Deploy Backend to Render (quick)

The repo includes `.github/workflows/deploy-render.yml` which triggers a Render deploy for the backend when you push to `main`.

To use this workflow:

1. Create a Render service for the backend (connect your GitHub repo or choose manual deploy). Note the Service ID from the Render dashboard.
2. In your GitHub repository, add two secrets: `RENDER_API_KEY` (an API key from Render) and `RENDER_SERVICE_ID`.
3. Push to `main`. The workflow will call the Render API to start a deploy.

Render docs: https://render.com/docs/api



## Deploying to cloud
You can push this repo to GitHub and deploy the services separately:
- Frontend: Vercel, Netlify, or Render static site from `client/dist`
- Backend: Render, Railway, or DigitalOcean App Platform (set `GEMINI_API_KEY` in environment settings)

If you want, I can prepare a GitHub Actions workflow to build and push container images to a registry and deploy to Render automatically.
