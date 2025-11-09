# Deploying Your MagicNook App with Netlify

This guide provides simple steps to deploy your React application to the web for free using [Netlify](https://www.netlify.com/).

## Prerequisites

1. **A Netlify Account:** [Sign up for a free account](https://app.netlify.com/signup) if you don't have one.
2. **Code on GitHub/GitLab:** Your project code should be in a repository on a service like GitHub.

---

## Step-by-Step Deployment Guide

### Step 1: Start a New Project

Log in to your Netlify account. From your dashboard, click **"Add new site"** and then select **"Import an existing project"**.

### Step 2: Connect to Your Git Provider

Click the button for the service where your code is hosted (e.g., GitHub). You will be asked to authorize Netlify to access your repositories.

### Step 3: Select Your Repository

After connecting, you will see a list of your Git repositories. Find and select your `MagicNook` project repository.

### Step 4: Configure Your Build Settings

Netlify is smart and will likely detect that you are using Vite. It should automatically fill in the correct settings. If not, or to verify, use the following:

* **Build command:** `npm run build`
* **Publish directory:** `dist`

![Netlify Build Settings](https://i.imgur.com/aC3yB3y.png)

### Step 5: Add Your Environment Variables

This is the most important step to connect your live app to Firebase.

1. Before deploying, click **"Show advanced"**, then **"New variable"**.
2. You will now copy the keys and values from your local `.env.local` file into Netlify's environment variables.
3. For each line in your `.env.local` file, create a new variable in Netlify.

    * **Key:** `VITE_FIREBASE_API_KEY`
    * **Value:** `AIzaSy...` (your actual key)

    Repeat this for all the `VITE_FIREBASE_...` variables.

![Netlify Environment Variables](https://i.imgur.com/yGkG6p9.png)

### Step 6: Deploy Your Site

Once the build settings and environment variables are configured, click the **"Deploy site"** button.

Netlify will start building your project. This may take a minute or two. When it's done, your site will be live!

### Step 7: Configure Firebase Storage CORS

This final, crucial step allows your live website to load images and audio from Firebase Storage.

1. **Find Your Bucket Name:** Look in your `.env.local` file. Your bucket name is the value for `VITE_FIREBASE_STORAGE_BUCKET`.

2. **Apply the CORS settings:** In your terminal, inside the `MagicNook` project folder, run the following command. Replace `YOUR_BUCKET_NAME_HERE` with the value from your `.env.local` file.

    ```bash
    firebase storage:buckets:set-cors cors.json --bucket YOUR_BUCKET_NAME_HERE
    ```

    This command uses the `cors.json` file in your project to tell Firebase that it's okay to serve files to your Netlify website URL.

---

## That's It

Netlify will give you a random URL (like `adjective-noun-12345.netlify.app`) where you can see your live application. You can customize this URL later in "Site settings".

From now on, every time you push a change to your Git repository, Netlify will automatically rebuild and redeploy your site.
