import { species as speciesUtils } from '@ibot/utils';

const LosName = ({ data, format = 'plain' }) => {
  if (!data) {
    return '';
  }
  return speciesUtils.listOfSpeciesForComponent(data, format);
};

export default LosName;
