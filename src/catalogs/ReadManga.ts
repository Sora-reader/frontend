import { load } from 'cheerio';
import { BaseCatalog, SearchResults } from './baseCatalog';
import { CORSProxyUrl } from '../config';
import axios from 'axios';

const searchRequest = async (query: string) => {
  const body = `q=${query}`;
  let output = '';

  const request = axios.post(CORSProxyUrl + ReadManga.getSearchUrl(), body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });

  const response = await request;
  output = response.data;

  return output;
};

const searchParser = (query: string, html: string): SearchResults => {
  const $ = load(html);
  const tiles = $('.tiles .tile');
  const output: SearchResults = {
    query,
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

    const cleanText = (data?: string): string => data?.trim() || '';
    const cleanRating = (data?: string): number =>
      // Js...
      Number(Number(data?.split(' ')[0]).toFixed(2));
    const cleanGenres = (data?: cheerio.Cheerio): Array<string> => {
      const output: Array<string> = [];
      data?.each((i, e) => {
        const element = $(e);
        output.push(cleanText(element.text()));
      });
      return output;
    };

    const descriptionParent = descClass.find('.long-description')[0];
    let description: cheerio.Element[] = [];
    if ('children' in descriptionParent) {
      description = descriptionParent.children.filter((node) => 'name' in node && node.name !== 'h5');
    }

    output.items.push({
      title: cleanText(descClass.find('h3').text()),
      imageUrl: cleanText(imgClass.find('img').data('original')),
      link: cleanText(imgClass.find('a').attr('href')),

      alternateTitle: cleanText(descClass.find('h4').text()),
      description: cleanText($(description).text()),
      author: cleanText(descClass.find('.person-link').text()),
      starRate: cleanRating(descClass.find('.rating').attr('title')),
      genres: cleanGenres(descClass.find('.element-link')),
    });
  });

  console.log('Search results', output);
  return output;
};

export const ReadManga: BaseCatalog = {
  url: 'https://readmanga.live/',

  getSearchUrl() {
    return `${this.url}search`;
  },
  getDetailsUrl(link: string) {
    return this.url + link;
  },
  getChapterUrl(link: string) {
    return this.url + link;
  },

  search: {
    async run(query: string) {
      const html = await this.searchRequest(query);
      return this.searchParser(query, html);
    },
    searchRequest,
    searchParser,
  },
};
