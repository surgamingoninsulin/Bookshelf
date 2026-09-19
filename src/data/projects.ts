import { getCollection } from 'astro:content';
import { types as typesInfo, type TypeKey } from './site';

export interface Project {
  slug: string;   // file name without .md
  type: TypeKey;  // main type, from the folder name (the project page lives under this type)
  types: TypeKey[]; // main type + any alsoIn sections; more than one = all-in-one
  data: any;      // validated frontmatter (see src/content.config.ts)
  entry: any;     // raw content entry, needed to render the Markdown body
}

export const latestVersion = (d: any) => [...d.versions].sort((a: any, b: any) => +b.date - +a.date)[0];
export const updated = (p: Project) => +latestVersion(p.data).date;

// Every project, optionally only one type, newest first.
export async function getProjects(type?: TypeKey): Promise<Project[]> {
  const entries = await getCollection('projects');
  return entries
    .map((entry) => {
      const [folder, ...rest] = entry.id.split('/');
      const t = folder as TypeKey;
      const types: TypeKey[] = [t, ...entry.data.alsoIn.filter((x: TypeKey) => x !== t)];
      return { slug: rest.join('/'), type: t, types, data: entry.data, entry };
    })
    .filter((p) => p.slug && p.type in typesInfo && (!type || p.types.includes(type)))
    .sort((a, b) => updated(b) - updated(a));
}
