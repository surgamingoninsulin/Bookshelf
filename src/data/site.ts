export const site = {
  name: 'Bookshelf',
  tagline: 'An open home for my Minecraft resource packs, data packs, plugins and mods.',
  github: 'https://github.com/surgamingoninsulin',
  copyright: '© 2026 SurGamingOnInsulin',
  licenses: [
    { label: 'Site code: MIT', href: 'https://choosealicense.com/licenses/mit/' },
    //{ label: 'Content: CC BY 4.0', href: 'https://creativecommons.org/licenses/by/4.0/' },
  ],
  disclaimer: 'Not an official Minecraft product. Not approved by or associated with Mojang Studios',
};

// The folder name inside src/content/projects/ decides which section a project belongs to.
export type TypeKey = 'resourcepacks' | 'datapacks' | 'plugins' | 'mods';

export interface TypeInfo {
  key: TypeKey;
  label: string;      // plural, used in nav and headings
  singular: string;
  description: string;
  categories: string[];
  loaders: string[];  // platforms; empty = not applicable
  resolutions: string[]; // empty = not applicable
}

export const types: Record<TypeKey, TypeInfo> = {
  resourcepacks: {
    key: 'resourcepacks', label: 'Resource Packs', singular: 'Resource Pack',
    description: 'Textures, models, sounds and fonts that change how Minecraft looks.',
    categories: ['Vanilla-like', 'Cursed', 'Decoration', 'GUI', 'Fonts', 'Models', 'Audio', 'Utility', 'Themed'],
    loaders: [], resolutions: ['8x', '16x', '32x', '64x', '128x+'],
  },
  datapacks: {
    key: 'datapacks', label: 'Data Packs', singular: 'Data Pack',
    description: 'Vanilla-friendly gameplay changes: recipes, advancements, functions and more.',
    categories: ['Gameplay', 'Recipes', 'Worldgen', 'Utility', 'Tweaks', 'Library'],
    loaders: [], resolutions: [],
  },
  plugins: {
    key: 'plugins', label: 'Plugins', singular: 'Plugin',
    description: 'Server-side plugins for Paper, Spigot and friends.',
    categories: ['Admin', 'Economy', 'Gameplay', 'Chat', 'Utility', 'Library'],
    loaders: ['Paper', 'Spigot', 'Purpur', 'Folia', 'Velocity'], resolutions: [],
  },
  mods: {
    key: 'mods',  label: 'Mods', singular: 'Mod',
    description: 'Client and server mods for Fabric, Forge, NeoForge and Quilt.',
    categories: ['Adventure', 'Decoration', 'Equipment', 'Library', 'Optimization', 'Technology', 'Utility'],
    loaders: ['Fabric', 'Forge', 'NeoForge', 'Quilt'], resolutions: [],
  },
};

// Where each type is installed (used by the all-in-one warning).
export const installFolder: Record<TypeKey, string> = {
  resourcepacks: '.minecraft/resourcepacks',
  datapacks: 'saves/<world>/datapacks',
  plugins: 'the server plugins folder',
  mods: '.minecraft/mods',
};

export const typeList = Object.values(types);

export const isExternal = (p = '') => /^https?:\/\//i.test(p);

// Prefix a site-relative path with the configured base (GitHub Pages sub-path safe).
// Full http(s) URLs (e.g. GitHub release assets) are returned untouched.
export const url = (p = '') =>
  isExternal(p) ? p : (import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + p.replace(/^\//, ''));
