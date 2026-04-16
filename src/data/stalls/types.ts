/* ─── Stall Data Types ─── */

export type StallStatus = 'available' | 'booked' | 'blocked' | 'selected';
export type StallSize = 'standard' | 'premium' | 'corner' | 'large';

export interface Stall {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  status: StallStatus;
  size: StallSize;
  price?: number;
  bookedBy?: string;
  stallType?: string;
}

export interface Entrance {
  id: string;
  x: number;
  y: number;
  direction: 'left' | 'right' | 'top' | 'bottom';
  type: 'in' | 'out' | 'both';
  label?: string;
}

export interface HallConfig {
  id: string;
  name: string;
  year: number;
  gridCols: number;
  gridRows: number;
  unitSize: number;
  stalls: Stall[];
  entrances: Entrance[];
}

/* ─── Block Helper ─── */
/** Expands a compact 2-D array of stall IDs into positioned Stall objects. */
export function block(
  ox: number,
  oy: number,
  ids: (string | null)[][],
  overrides?: Partial<Stall>,
): Stall[] {
  return ids.flatMap((row, dy) =>
    row.flatMap((id, dx) =>
      id
        ? [{
            id,
            label: id,
            x: ox + dx,
            y: oy + dy,
            w: 1,
            h: 1,
            status: 'booked' as StallStatus,
            size: 'standard' as StallSize,
            price: 25000,
            stallType: '3m × 3m Open Stall',
            ...overrides,
          } satisfies Stall]
        : []
    ),
  );
}

/** Creates a vertical column of stalls at a fixed x-position. */
export function edgeColumn(
  x: number,
  startY: number,
  ids: string[],
  overrides?: Partial<Stall>,
): Stall[] {
  return ids.map((id, i) => ({
    id,
    label: id,
    x,
    y: startY + i,
    w: 1,
    h: 1,
    status: 'booked' as StallStatus,
    size: 'standard' as StallSize,
    price: 20000,
    stallType: 'Edge Stall',
    ...overrides,
  }));
}
