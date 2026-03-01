# Clarix Deployment Guide (Frontend & Backend Separately)

To deploy the frontend and backend separately, we will use **Render** for the Node.js backend (since it runs a server) and **Vercel** or **Netlify** for the frontend (since it's static HTML/CSS/JS).

---

## Part 1: Deploying the Backend (on Render)

Render is great for Node.js backends.

1. **Create an account on [Render](https://render.com/)**.
2. Go to your Dashboard and click **New +** -> **Web Service**.
3. Connect your GitHub repository (`kanikasharma-18/Clarix`).
4. **Configuration Settings**:
   - **Name**: `clarix-backend` (or whatever you like)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Environment Variables**:
   Scroll down to *Environment Variables* and click **Add Environment Variable**. Add the precise keys and values from your `server/.env` file:
   - `GEMINI_API_KEY` = `your_gemini_key_here`
   - `MONGO_URI` = `your_mongodb_uri_here`
   - `PORT` = (You can leave this blank, Render sets it automatically)
6. Click **Create Web Service**.
7. Wait a few minutes for the build to finish. Once it's live, **copy the backend URL** provided by Render (e.g., `https://clarix-backend.onrender.com`).

---

## Part 2: Updating the Frontend Code

Before deploying the frontend, it needs to know where your newly hosted backend lives!

1. Open `script.js` in your local project.
2. At the very top of the file, find the `API_BASE_URL` variable.
3. Replace the placeholder URL with the actual URL you copied from Render in Step 1.
   ```javascript
   // Change this to your actual Render URL
   const API_BASE_URL = 'https://clarix-backend.onrender.com';
   ```
4. Save the file.
5. In your terminal, run the following commands to push this change to GitHub:
   ```bash
   git add script.js
   git commit -m "Update API_BASE_URL for production"
   git push
   ```

---

## Part 3: Deploying the Frontend (on Vercel)

Vercel is perfect for the static frontend.

1. **Create an account on [Vercel](https://vercel.com/)** (log in with GitHub).
2. Go to your Dashboard and click **Add New...** -> **Project**.
3. Import your `kanikasharma-18/Clarix` repository.
4. **Configuration Settings**:
   - **Project Name**: `clarix-frontend` (or similar)
   - **Framework Preset**: `Other`
   - **Root Directory**: Leave it as `./` (the root folder).
   - **Build & Development Settings**: Leave these as their defaults (Vercel automatically detects it's an HTML/JS/CSS site without a build step).
5. Click **Deploy**.
6. That's it! Vercel will give you a live URL for your frontend (e.g., `https://clarix.vercel.app`), and because you updated `script.js` in Part 2, it will successfully talk to your Render backend.
