# Animated Solutions

A collection of standalone, browser-based algorithm visualizations. Open
[`index.html`](./index.html) locally or publish the project as a static website.

## Run locally

No build tools or package installation are needed. Open `index.html` in a browser,
or serve the project directory with any static file server. Some visualizations
load Three.js from a CDN, so an internet connection is needed for those pages.

## Publish with GitHub Pages

This repository includes a GitHub Actions workflow that publishes the site on
pushes to `main`.

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Open the **Actions** tab and wait for the **Deploy to GitHub Pages** workflow
   to finish. The site URL will appear in the Pages settings.

To start versioning this folder and connect it to a new GitHub repository:

```sh
git init
git add .
git commit -m "Prepare Animated Solutions for hosting"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Replace `USERNAME/REPOSITORY` with the repository you created. Git is required
for these commands; it is already installed in the current development
environment.
