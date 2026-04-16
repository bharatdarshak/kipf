import type { Stall, Entrance, HallConfig } from './types';
import { block } from './types';

/* ─── Hall A Stall Layout (133 stalls) ───
   Grid: 16 cols × 19 rows, unitSize 44px
   Entrances on the right side
   Derived from the 2026 floor plan reference. */

const stalls: Stall[] = [
  /* ── Row 1 (top) ── */
  ...block(1, 0, [['A13', 'A12', 'A11']]),
  ...block(5, 0, [['A10', 'A9', 'A8', 'A7', 'A6', 'A5', 'A4', 'A3']]),
  ...block(14, 0, [['A2'], ['A1']]),

  /* ── Row 2 ── */
  ...block(0, 2, [['A14'], ['A33']]),
  ...block(2, 2, [['A15', 'A16'], ['A32', 'A31']]),
  ...block(5, 2, [['A17', 'A18', 'A19', 'A20'], ['A30', 'A29', 'A28', 'A27']]),
  ...block(10, 2, [['A21', 'A22', 'A23'], ['A26', 'A25', 'A24']]),

  /* ── Row 3 ── */
  ...block(0, 5, [['A34'], ['A51']]),
  ...block(2, 5, [['A35', 'A36'], ['A50', 'A49']]),
  ...block(5, 5, [['A37', 'A38'], ['A48', 'A47']]),
  ...block(8, 5, [['A39', 'A40'], ['A46', 'A45']]),
  ...block(11, 5, [['A41', 'A42'], ['A44', 'A43']]),

  /* ── Row 4 ── */
  ...block(0, 7, [['A52'], ['A69']]),
  ...block(2, 7, [['A53', 'A54'], ['A68', 'A67']]),
  ...block(5, 7, [['A55', 'A56'], ['A66', 'A65']]),
  ...block(8, 7, [['A57', 'A58'], ['A64', 'A63']]),
  ...block(11, 7, [['A59', 'A60'], ['A62', 'A61']]),

  /* ── Row 5 ── */
  ...block(1, 10, [['A70', 'A71', 'A72'], ['A89', 'A88', 'A87']]),
  ...block(5, 10, [['A73', 'A74', 'A75', 'A76'], ['A86', 'A85', 'A84', 'A83']]),
  ...block(10, 10, [['A77', 'A78', 'A79'], ['A82', 'A81', 'A80']]),

  /* ── Row 6 ── */
  ...block(0, 13, [['A90'], ['A109']]),
  ...block(2, 13, [['A91', 'A92'], ['A108', 'A107']]),
  ...block(5, 13, [['A93', 'A94', 'A95', 'A96'], ['A106', 'A105', 'A104', 'A103']]),
  ...block(10, 13, [['A97', 'A98', 'A99'], ['A102', 'A101', 'A100']]),

  /* ── Row 7 ── */
  ...block(0, 15, [['A110']]),
  ...block(2, 15, [['A111', 'A112']]),
  ...block(5, 15, [['A113', 'A114', 'A115', 'A116']]),
  ...block(10, 15, [['A117', 'A118', 'A119']]),
  ...block(14, 15, [['A120'], ['A121']]),

  /* ── Bottom row ── */
  ...block(0, 18, [['A133', 'A132', 'A131']]),
  ...block(4, 18, [['A130', 'A129', 'A128', 'A127', 'A126', 'A125', 'A124']]),
  ...block(12, 18, [['A123', 'A122']]),
];

/* ── Status overrides — available stalls from reference ── */
const availableIds = new Set([
  'A1', 'A2', 'A9', 'A14', 'A33', 'A34', 'A51',
  'A52', 'A69', 'A110', 'A111', 'A112', 'A120', 'A121', 'A122',
]);
stalls.forEach(s => {
  if (availableIds.has(s.id)) {
    s.status = 'available';
  }
});

/* ── Entrances ── */
const entrances: Entrance[] = [
  { id: 'ent-a-1', x: 14.5, y: 3.5, direction: 'right', type: 'both', label: 'IN / OUT' },
  { id: 'ent-a-2', x: 14.5, y: 8.5, direction: 'right', type: 'both', label: 'IN / OUT' },
];

export const hallAConfig: HallConfig = {
  id: 'A',
  name: 'Exhibition Hall A',
  year: 2026,
  gridCols: 16,
  gridRows: 19,
  unitSize: 44,
  stalls,
  entrances,
};
