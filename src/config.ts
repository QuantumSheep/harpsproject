"use strict";

import * as fs from 'fs';
import Config from './interfaces/ConfigInterface';

const config: Config = Object.assign({}, JSON.parse(fs.readFileSync('./config.json', 'utf-8')));
export default config;