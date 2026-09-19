# Bookshelf

Static site (Astro) for my Minecraft resource packs, data packs, plugins and mods, hosted on GitHub Pages.
The files themselves are **not** stored here: each download is a link to a GitHub Release.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Adding a project

The **folder** decides the section:

| Section | File |
|---|---|
| Resource pack | `src/content/projects/resourcepacks/<name>.md` |
| Data pack | `src/content/projects/datapacks/<name>.md` |
| Plugin | `src/content/projects/plugins/<name>.md` |
| Mod | `src/content/projects/mods/<name>.md` |

1. Publish the file as a **GitHub Release** in the project's own repo (Releases → Draft a new release → tag, e.g. `v1.0.0` → attach the `.zip` / `.jar`).
2. Copy the asset's link (right-click the file on the release page → copy link). It looks like
   `https://github.com/<user>/<repo>/releases/download/v1.0.0/<file>.zip`
3. Copy an existing `.md` into the right folder above and put that link in `file:`.
4. `git add . && git commit -m "Add <name>" && git push` — GitHub Actions rebuilds the site.

## Keeping older versions

Every version is one entry in `versions:`. Never delete old ones; add a new entry on top for each release.
The newest `date` becomes the big "Download" button; all entries appear in the project's **Versions** tab.

```yaml
versions:
  - version: 1.1.0
    mc: ["1.21.5"]
    file: https://github.com/<user>/<repo>/releases/download/v1.1.0/pack-1.1.0.zip
    date: 2026-10-01
    changelog: New GUI textures.
  - version: 1.0.0
    mc: ["1.21.4"]
    file: https://github.com/<user>/<repo>/releases/download/v1.0.0/pack-1.0.0.zip
    date: 2026-09-01
    changelog: Initial release.
```

Old GitHub Releases stay available as long as you don't delete them, so old links keep working.

## Icons and screenshots

Small images can live in `public/downloads/<type>/<name>/` and be referenced as `downloads/<type>/<name>/icon.png`,
or use a full `https://` URL. `file:` may also be a path under `public/` if you ever want to host a file in the repo.

Filter options (categories, loaders, resolutions) are in `src/data/site.ts`.

## Deploying

Repo → Settings → Pages → Source: **GitHub Actions**. `.github/workflows/deploy.yml` sets the base path from the repo name.

## All-in-one projects (resource pack + data pack)

Some downloads are several kinds at once. Keep the file in its **main** folder and list the other sections with `alsoIn`:

```yaml
# src/content/projects/resourcepacks/my-combo.md
title: My Combo
alsoIn: [datapacks]
```

It then appears in **both** the Resource Packs and Data Packs sections (one project page, under its main folder), with a yellow dot on its icon, an "All-in-one" tag on the card, and a yellow warning on the page telling people to install it in both folders.

## All-in-one projects (resource pack + data pack)

Some downloads are several kinds at once. Keep the file in its **main** folder and list the other sections with `alsoIn`:

```yaml
# src/content/projects/resourcepacks/my-combo.md
title: My Combo
alsoIn: [datapacks]
```

It then appears in **both** the Resource Packs and Data Packs sections (one project page, under its main folder), with a yellow dot on its icon, an "All-in-one" tag on the card, and a yellow warning on the page telling people to install it in both folders.
