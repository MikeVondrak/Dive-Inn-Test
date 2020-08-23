export interface GoogleFontsApi {
  kind: string;
  family: string;
  category: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: { [key: string]: string; };
}

export interface GoogleFontsApiResponse {
  kind: string;
  items: GoogleFontsApi[];
}

/**
 * Values for optional sort parameter for Google Fonts API call
 */
export type GoogleFontsApiSort = 'alpha' | 'date' | 'popularity' | 'style' | 'trending';
