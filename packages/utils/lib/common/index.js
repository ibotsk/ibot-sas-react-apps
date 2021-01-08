import config from '../../config';

const {
  format: {
    italic: itf,
    plain: plf,
  },
} = config;

const o = (string, format) => {
  let s = '';
  if (string) {
    s = string.trim();
  }
  return { string: s, format };
};

// -------------- //

export const italic = (string) => o(string, itf);
export const plain = (string) => o(string, plf);

