export const Fonts = {
  notoSans: 'NatoSans',
} as const;

export type FontName = keyof typeof Fonts;
