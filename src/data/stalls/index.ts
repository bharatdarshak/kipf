export { hallAConfig } from './hallA';
export { hallBConfig } from './hallB';
export type { HallConfig, Stall, StallStatus, StallSize, Entrance } from './types';

import { hallAConfig } from './hallA';
import { hallBConfig } from './hallB';
import type { HallConfig } from './types';

export const hallConfigs: Record<string, HallConfig> = {
  A: hallAConfig,
  B: hallBConfig,
};

export function getHallConfig(hallId: string): HallConfig | undefined {
  return hallConfigs[hallId];
}
