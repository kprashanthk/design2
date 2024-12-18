export const Fonts = {
  notoSans: 'NatoSans',
  boldFamily: 'NotoSans-Bold',
  semiBoldFamiy: 'NotoSans-SemiBold',
  regularFamily: 'NotoSans-Regular',
  mediumFamily: 'NotoSans-Medium',
} as const;

export type FontName = keyof typeof Fonts;
