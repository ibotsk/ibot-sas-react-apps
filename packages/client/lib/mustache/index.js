import Mustache from 'mustache';

import config from '../../config';

const { mustacheTags } = config;

Mustache.tags = mustacheTags;

export default Mustache;
