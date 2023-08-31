export const lottoModel = {
  totalRows: 0,
  items: [
    {
      drawSystemId: 6927,
      drawDate: '2000-01-01T00:00:00Z',
      gameType: 'Lotto',
      multiplierValue: 0,
      results: [
        {
          drawDate: '2000-01-01T00:00:00Z',
          drawSystemId: 6927,
          gameType: 'Lotto',
          resultsJson: [0, 0, 0, 0, 0, 0],
          specialResults: [],
        },
        {
          drawDate: '2000-01-01T00:00:00Z',
          drawSystemId: 6927,
          gameType: 'LottoPlus',
          resultsJson: [0, 0, 0, 0, 0, 0],
          specialResults: [],
        },
      ],
      showSpecialResults: true,
      isNewEuroJackpotDraw: false,
    },
  ],
  meta: {},
  code: 200,
};

export type LottoModel = typeof lottoModel;
