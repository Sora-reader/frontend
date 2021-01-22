import {load} from 'cheerio';
import {BaseCatalog, SearchResultsType} from './baseCatalog';
import {CORSProxyUrl} from '../config';

const searchRequest = async (query: string) => {
  const body = 'q=' + query;
  let output = '';

  const request = fetch(CORSProxyUrl + ReadManga.getSearchUrl(), {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });

  try {
    const response = await request;
    output = await response.text();
  } catch (e) {
    console.log('Request error\n' + e);
  }

  return output;
};

const searchParser = (html: string): SearchResultsType => {
  const $ = load(html);
  let tiles = $('.tiles .tile');
  let output: SearchResultsType = {
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
};

export const ReadManga: BaseCatalog = {
  url: 'https://readmanga.live/',

  getSearchUrl: function() {
    return this.url + '/search';
  },
  getDetailsUrl: function(link: string) {
    return this.url + link;
  },
  getChapterUrl: function(link: string) {
    return this.url + link;
  },

  search: {
    run: async function(query: string) {
      const html = await this.searchRequest(query);
      return this.searchParser(html);
    },
    searchRequest: searchRequest,
    searchParser: searchParser,
  },
};
