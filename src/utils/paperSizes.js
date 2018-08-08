export const paperSizes = {
  landscape: {
    A0: {
      height: '841mm',
      width: '1189mm'
    },
    A1: {
      height: '594mm',
      width: '841mm'
    },
    A2: {
      height: '420mm',
      width: '594mm'
    },
    A3: {
      height: '297mm',
      width: '420mm'
    },
    A4: {
      height: '210mm',
      width: '297mm'
    },
    A5: {
      height: '148mm',
      width: '210mm'
    },
    A6: {
      height: '105mm',
      width: '148mm'
    },
    A7: {
      height: '74mm',
      width: '105mm'
    },
    A8: {
      height: '52mm',
      width: '74mm'
    },
    A9: {
      height: '37mm',
      width: '52mm'
    },
    A10: {
      height: '26mm',
      width: '37mm'
    },
    card: {
      height: '40mm',
      width: '55mm',
    },
    smallCard: {
      height: '30mm',
      width: '40mm',
    },
    miniCard: {
      height: '1.65in',
      width: '2.5in',
    }
  }
};

paperSizes.portrait = Object.keys(paperSizes.landscape).reduce((map, key) => ({
  ...map,
  [key]: {
    width: paperSizes.landscape[key].height,
    height: paperSizes.landscape[key].width,
  }
}), {});
