import {readFile,stat} from 'node:fs/promises';
import {registry} from '../site/registry.js';
const base=new URL('../site/',import.meta.url);
for(const x of registry){
  const html=await readFile(new URL(`calculators/${x.slug}/index.html`,base),'utf8');
  if(!html.includes(x.name.replace('&','&amp;'))||!html.includes(`calculators/${x.slug}/`))throw Error(`Invalid route metadata: ${x.slug}`);
  await stat(new URL(`features/${x.slug}.js`,base));
}
const sitemap=await readFile(new URL('sitemap.xml',base),'utf8');
for(const x of registry)if(!sitemap.includes(`calculators/${x.slug}/`))throw Error(`Missing sitemap URL: ${x.slug}`);
console.log(`Static build validated: ${registry.length} calculator pages, feature modules, and sitemap entries.`);
