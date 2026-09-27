import catalog from '../../public/comic.json';

const featuredIds = ['undo-protocol', 'total-supply-deleted', 'meditate-coin', 'maximum-upside', 'the-first-rule', '107'];
export const comics = catalog.filter((comic) => comic.id !== '999');
export const featuredComics = featuredIds.map((id) => {
  const comic = catalog.find((entry) => entry.id === id);
  if (!comic) throw new Error(`Featured comic ${id} is missing from the catalog`);
  return { ...comic, thumbnail: `/images/comics/${id}-thumb.webp` };
});
export function comicImage(comic) {
  return featuredIds.includes(comic.id) ? `/images/comics/${comic.id}.webp` : comic.imageUrl;
}
