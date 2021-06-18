export type MangaType = {
  // TODO: add moreResults which tells if more chapters are loadable
  //
  title: string;
  link: string;
  imageUrl: string;

  alternateTitle?: string;
  description?: string;
  starRate?: number;
  author?: string;
  genres?: Array<string>;
};

export type SearchResults<TSearchItem = MangaType> = {
  results: number;
  invalidResults: number;
  items: Array<TSearchItem>;
};

export type ChapterType = {
  title: string;
  link: string;
  date?: string;
};

export type ChapterListType = {
  chapters: Array<ChapterType>;
};

export interface BaseCatalog {
  url: string;
  getSearchUrl: () => string;
  getDetailsUrl: (link: string) => string;
  getChapterUrl: (link: string, chapter?: string) => string;

  search: {
    run: (query: string) => Promise<SearchResults>;
    searchRequest: (query: string) => Promise<string>;
    searchParser: (html: string) => SearchResults;
  };

  // TODO
  detail?: {
    getChapterList: (catalog: string, link: string) => Promise<ChapterListType>;
    requestChapterList: (catalog: string, link: string) => Promise<string>;
    parseChapterList: (html: string) => ChapterListType;
  };
}
