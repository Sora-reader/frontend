/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/api/auth/sign-in/': {
    /** Sign in with user credentials */
    post: operations['SignIn'];
  };
  '/api/auth/sign-out/': {
    /** Sign user out and blacklist his token */
    get: operations['SignOut'];
  };
  '/api/auth/sign-up/': {
    /** Sign up and receive JWT token pair and a username */
    post: operations['SignUp'];
  };
  '/api/auth/token-refresh/': {
    /**
     * Takes a refresh type JSON web token and returns an access type JSON web
     * token if the refresh token is valid.
     */
    post: operations['RefreshToken'];
  };
  '/api/auth/token-verify/': {
    /**
     * Takes a token and indicates if it is valid.  This view provides no
     * information about a token's fitness for a particular use.
     */
    post: operations['VerifyToken'];
  };
  '/api/manga/{mangaId}': {
    /** Returns detailed info about manga */
    get: operations['mangaDetail'];
  };
  '/api/manga/{mangaId}/volumes': {
    /** Returns volumes for manga */
    get: operations['mangaChapters'];
  };
  '/api/manga/{mangaId}/{volumeId}/{chapterId}': {
    /** Returns images for chapter */
    get: operations['mangaChapterImages'];
  };
  '/api/manga/search': {
    /** Returns a list of manga items */
    get: operations['search'];
  };
  '/api/docs/schema/': {
    /**
     * OpenApi3 schema for this API. Format can be selected via content negotiation.
     *
     * - YAML: application/vnd.oai.openapi
     * - JSON: application/vnd.oai.openapi+json
     */
    get: operations['GetSchema'];
  };
}

export interface components {
  schemas: {
    Manga: {
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
    };
    MangaList: components['schemas']['Manga'][];
    MangaChapter: string;
    MangaChapterImage: string;
    MangaChapterImages: components['schemas']['MangaChapterImage'][];
    MangaVolume: components['schemas']['MangaChapter'][];
    MangaVolumes: { [key: string]: components['schemas']['MangaVolume'] };
    VerifyToken: {
      token: string;
    };
    AccessToken: {
      access: string;
    };
    RefreshToken: {
      refresh?: string;
    };
    UserCredentials: {
      /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
      username: string;
      password: string;
    };
    TokenResponse: {
      refresh: string;
      access: string;
      username: string;
    };
  };
}

export interface operations {
  /** Sign in with user credentials */
  SignIn: {
    responses: {
      /** successful operation */
      200: {
        content: {
          'application/json': components['schemas']['TokenResponse'];
        };
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UserCredentials'];
      };
    };
  };
  /** Sign user out and blacklist his token */
  SignOut: {
    responses: {
      /** No response body */
      200: unknown;
    };
  };
  /** Sign up and receive JWT token pair and a username */
  SignUp: {
    responses: {
      /** successful operation */
      200: {
        content: {
          'application/json': components['schemas']['TokenResponse'];
        };
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['UserCredentials'];
      };
    };
  };
  /**
   * Takes a refresh type JSON web token and returns an access type JSON web
   * token if the refresh token is valid.
   */
  RefreshToken: {
    responses: {
      /** successful operation */
      200: {
        content: {
          'application/json': components['schemas']['AccessToken'];
        };
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['RefreshToken'];
      };
    };
  };
  /**
   * Takes a token and indicates if it is valid.  This view provides no
   * information about a token's fitness for a particular use.
   */
  VerifyToken: {
    responses: {
      /** successful operation */
      200: {
        content: {
          'application/json': components['schemas']['VerifyToken'];
        };
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['VerifyToken'];
      };
    };
  };
  /** Returns detailed info about manga */
  mangaDetail: {
    parameters: {
      path: {
        /** ID of manga to return */
        mangaId: number;
      };
    };
    responses: {
      /** successful operation */
      200: {
        content: {
          'application/json': components['schemas']['Manga'];
        };
      };
      /** Manga not found */
      404: unknown;
    };
  };
  /** Returns volumes for manga */
  mangaChapters: {
    parameters: {
      path: {
        /** ID of manga to get volumes for */
        mangaId: number;
      };
    };
    responses: {
      /** successful operation */
      200: {
        content: {
          'application/json': components['schemas']['MangaVolumes'];
        };
      };
      /** Manga not found */
      404: unknown;
    };
  };
  /** Returns images for chapter */
  mangaChapterImages: {
    parameters: {
      path: {
        /** ID of manga to get volumes for */
        mangaId: number;
        /** ID of volume to get images for */
        volumeId: number;
        /** ID of chapter to get images for */
        chapterId: number;
      };
    };
    responses: {
      /** successful operation */
      200: {
        content: {
          'application/json': components['schemas']['MangaChapterImages'];
        };
      };
      /** Manga or volume not found */
      404: unknown;
    };
  };
  /** Returns a list of manga items */
  search: {
    parameters: {
      query: {
        /** Manga title */
        title: string;
      };
    };
    responses: {
      /** successful operation */
      200: {
        content: {
          'application/json': { [key: string]: any }[];
        };
      };
    };
  };
  /**
   * OpenApi3 schema for this API. Format can be selected via content negotiation.
   *
   * - YAML: application/vnd.oai.openapi
   * - JSON: application/vnd.oai.openapi+json
   */
  GetSchema: {
    parameters: {
      query: {
        format?: 'json' | 'yaml';
        lang?:
          | 'af'
          | 'ar'
          | 'ar-dz'
          | 'ast'
          | 'az'
          | 'be'
          | 'bg'
          | 'bn'
          | 'br'
          | 'bs'
          | 'ca'
          | 'cs'
          | 'cy'
          | 'da'
          | 'de'
          | 'dsb'
          | 'el'
          | 'en'
          | 'en-au'
          | 'en-gb'
          | 'eo'
          | 'es'
          | 'es-ar'
          | 'es-co'
          | 'es-mx'
          | 'es-ni'
          | 'es-ve'
          | 'et'
          | 'eu'
          | 'fa'
          | 'fi'
          | 'fr'
          | 'fy'
          | 'ga'
          | 'gd'
          | 'gl'
          | 'he'
          | 'hi'
          | 'hr'
          | 'hsb'
          | 'hu'
          | 'hy'
          | 'ia'
          | 'id'
          | 'ig'
          | 'io'
          | 'is'
          | 'it'
          | 'ja'
          | 'ka'
          | 'kab'
          | 'kk'
          | 'km'
          | 'kn'
          | 'ko'
          | 'ky'
          | 'lb'
          | 'lt'
          | 'lv'
          | 'mk'
          | 'ml'
          | 'mn'
          | 'mr'
          | 'my'
          | 'nb'
          | 'ne'
          | 'nl'
          | 'nn'
          | 'os'
          | 'pa'
          | 'pl'
          | 'pt'
          | 'pt-br'
          | 'ro'
          | 'ru'
          | 'sk'
          | 'sl'
          | 'sq'
          | 'sr'
          | 'sr-latn'
          | 'sv'
          | 'sw'
          | 'ta'
          | 'te'
          | 'tg'
          | 'th'
          | 'tk'
          | 'tr'
          | 'tt'
          | 'udm'
          | 'uk'
          | 'ur'
          | 'uz'
          | 'vi'
          | 'zh-hans'
          | 'zh-hant';
      };
    };
    responses: {
      /** successful operation */
      200: {
        content: {
          'application/vnd.oai.openapi': { [key: string]: any };
          'application/yaml': { [key: string]: any };
          'application/vnd.oai.openapi+json': { [key: string]: any };
          'application/json': { [key: string]: any };
        };
      };
    };
  };
}

export interface external {}