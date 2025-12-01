import type { Act } from './types';
import { constitutionOfIndia } from './acts/constitution-of-india';
import { indianPenalCode } from './acts/indian-penal-code';
import { bharatiyaNyayaSanhita2023 } from './acts/bharatiya-nyaya-sanhita';
import {theCoastingvesselsAct1838} from './acts/coasting-vessels-act';
import {carriageOfGoodsBySeaAct2025} from './acts/carriage-goods';
export const legalActs: Act[] = [
  constitutionOfIndia,
  indianPenalCode,
  bharatiyaNyayaSanhita2023,
  theCoastingvesselsAct1838,
  carriageOfGoodsBySeaAct2025,
];
