import config from '../../config';

const {
  format: {
    formatted: ff,
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

export const formatted = (string) => o(string, ff);
export const plain = (string) => o(string, plf);
