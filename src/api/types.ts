export interface Manga {
  id: number;
  title: string;
  altTitle?: string;
  rating?: number;
  thumbnail?: string;
  image?: string;
  description: string;
  source?: string;
  sourceUrl?: string;
  authors?: string[];
  genres?: string[];
  categories?: string[];
  status?: string;
  year?: string;
  chapters?: MangaChapters;
  updatedDetail?: string;
  updatedChapters?: string;
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
