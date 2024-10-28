import { mergeConfig } from 'vitest/config';

import defaultConfig from '@node-texlive-packages/config/vitest.config.mjs';
import pluginUpdate from '@teatimeguest/vitest-plugin-update';

export default mergeConfig(defaultConfig, { plugins: [pluginUpdate()] });
