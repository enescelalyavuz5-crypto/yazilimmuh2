# FluentBee Deployment Guide

## 1. Backend (Render Deployment)
1. Go to [Render](https://render.com) and click **New > Web Service**.
2. Connect your GitHub repository and select the target branch.
3. Use the following settings:
   * **Root Directory:** `backend`
   * **Environment:** `Docker` (Render will automatically detect the `Dockerfile` inside the `backend` folder).
4. **Environment Variables (Optional but Recommended for Production):**
   * If you want to use **Microsoft SQL Server**, add:
     * `ConnectionStrings__DefaultConnection` -> `<Your_SQL_Server_Connection_String>`
   * *Note: If you don't add this, it will run using SQLite which works but will reset on every deployment on Render's free tier. The auto-migration (`EnsureCreated()`) is already set up and will build the tables automatically for SQL Server.*

## 2. Frontend (Vercel Deployment)
1. Go to [Vercel](https://vercel.com) and click **Add New > Project**.
2. Connect your GitHub repository.
3. Configure the Project:
   * **Framework Preset:** `Next.js`
   * **Root Directory:** `frontend`
4. **Environment Variables (Crucial):**
   * You **MUST** add the following environment variable so the frontend knows where the Render backend is:
     * `NEXT_PUBLIC_API_URL` -> `https://your-render-backend-url.onrender.com` *(Replace this with the actual URL Render gives you for your backend!)*
5. Click **Deploy**. Vercel will automatically build and publish your Next.js app.

## Notes on Changes Made:
- Removed static Netlify plugins and export statements since Vercel natively supports all Next.js features and API architectures.
- Normalized the `NEXT_PUBLIC_API_URL` fallback structure across all frontend fetch requests to cleanly use your external APIs.
- Updated `Program.cs` in the backend so it dynamically senses when you provide an external Database URL (like SQL Server) and automatically migrates the database (`EnsureCreated()`) upon Render startup.
- Kept the CORS policy wide-open in the backend (`AllowAnyOrigin`) to guarantee any frontend client can connect without blocks.
