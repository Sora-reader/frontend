import {load} from 'cheerio';

export const searchUrl = 'https://readmanga.live/search';

type ListItem = {
  title: string,
  alternateTitle?: string,
  description?: string,
  imageUrl: string,
  link: string,
  starRate?: number,
  author?: string,
  genres?: Array<string>,
}

export type ListDataType = {
  results: number,
  invalidResults: number,
  items: Array<ListItem>,
}

export function getListData(html: string): ListDataType {
  const $ = load(html);
  let tiles = $('.tiles .tile');
  let output: ListDataType = {
    results: tiles.length,
    invalidResults: 0,
    items: [],
  };

  tiles.each((index, element) => {
    const tile = $(element);

    const descClass = tile.find('.desc');
    const imgClass = tile.find('.img');

    // If the tile is a cross site ref/user
    const notManga = descClass.find('.tile-info .fa')[0];
    if (notManga) {
      output.invalidResults++;
      return true;
    }

    const cleanText = (data?: string): string => {
      return data?.trim() || '';
    };
    const cleanRating = (data?: string): number => {
      // Js...
      return Number(Number(data?.split(' ')[0]).toFixed(2));
    };
    const cleanGenres = (data?: cheerio.Cheerio): Array<string> => {
      let output: Array<string> = [];
      data?.each(((i, e) => {
        const element = $(e);
        output.push(cleanText(element.text()));
      }));
      return output;
    };

    output.items.push({
      title: cleanText(descClass.find('h3').text()),
      imageUrl: cleanText(imgClass.find('img').data('original')),
      link: cleanText(imgClass.find('a').attr('href')),

      alternateTitle: cleanText(descClass.find('h4').text()),
      description: cleanText(
          descClass.find('.long-description-holder').text()),
      author: cleanText(descClass.find('.person-link').text()),
      starRate: cleanRating(descClass.find('.rating').attr('title')),
      genres: cleanGenres(descClass.find('.element-link')),
    });
  });

  console.log(output);
  return output;
}