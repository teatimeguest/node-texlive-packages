import { mergeConfig } from 'vitest/config';

import defaultConfig from '@node-texlive-packages/config/vitest.config.mjs';
import checkIfUpdating from '@node-texlive-packages/config/vitest/if-updating.mjs';

export default mergeConfig(defaultConfig, { plugins: [checkIfUpdating()] });
