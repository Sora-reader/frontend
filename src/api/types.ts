export interface Manga {
  id: number;
  title: string;
  alt_title?: string;
  rating?: number;
  thumbnail?: string;
  image?: string;
  description: string;
  source?: string;
  source_url?: string;
  authors?: string[];
  genres?: string[];
  categories?: string[];
  status?: string;
  year?: string;
  detailNeedsUpdate?: boolean;
  chapters?: MangaChapters;
}
export interface MangaList extends Array<Manga> {}
export interface MangaChapter {
  id: number;
  title: string;
  link?: string;
  volume: number;
  chapter: number;
}
export interface MangaChapterImage extends String {}
export interface MangaChapterImages extends Array<MangaChapterImage> {}
export interface MangaChapters extends Array<MangaChapter> {}
export interface VerifyToken {
  token: string;
}
export interface AccessToken {
  access: string;
}
export interface RefreshToken {
  refresh?: string;
}
export interface UserCredentials {
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: string;
  password: string;
}
export interface TokenResponse {
  refresh: string;
  access: string;
  username: string;
}
