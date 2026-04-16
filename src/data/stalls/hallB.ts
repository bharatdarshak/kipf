import type { Stall, Entrance, HallConfig } from './types';
import { block, edgeColumn } from './types';

/* ─── Hall B Stall Layout (~290 stalls) ───
   Grid: 28 cols × 22 rows, unitSize 38px
   Entrances on the left side
   Derived from the 2026 floor plan reference. */

const stalls: Stall[] = [
  /* ── Top edge row (y=0) ── */
  ...block(0, 0, [['B3','B4','B5','B6','B7','B8','B9','B10','B11','B12','B13','B14','B15']]),
  ...block(15, 0, [['B16','B17','B18','B19','B20','B21','B22','B23','B24','B25','B26','B27']]),

  /* ── Left edge ── */
  ...block(0, 1, [['B2'], ['B1']]),

  /* ── Block 2 (y=2-3) — 40 stalls ── */
  ...block(1, 2, [['B47','B46','B45','B44'], ['B48','B49','B50','B51']]),
  ...block(6, 2, [['B43','B42','B41','B40'], ['B52','B53','B54','B55']]),
  ...block(11, 2, [['B39','B38'], ['B56','B57']]),
  ...block(14, 2, [['B37','B36','B35'], ['B58','B59','B60']]),
  ...block(18, 2, [['B34','B33'], ['B61','B62']]),
  ...block(21, 2, [['B32','B31'], ['B63','B64']]),
  ...block(24, 2, [['B30','B29','B28'], ['B65','B66','B67']]),

  /* ── Block 3 (y=5-7) — 60 stalls, three rows ── */
  ...block(1, 5, [['B87','B86','B85','B84'],['B88','B89','B90','B91'],['B127','B126','B125','B124']]),
  ...block(6, 5, [['B83','B82','B81'],['B92','B93','B94'],['B123','B122','B121']]),
  ...block(10, 5, [['B80','B79','B78'],['B95','B96','B97'],['B120','B119','B118']]),
  ...block(14, 5, [['B77','B76','B75'],['B98','B99','B100'],['B117','B116','B115']]),
  ...block(18, 5, [['B74','B73'],['B101','B102'],['B114','B113']]),
  ...block(21, 5, [['B72','B71'],['B103','B104'],['B112','B111']]),
  ...block(24, 5, [['B70','B69','B68'],['B105','B106','B107'],['B110','B109','B108']]),

  /* ── Block 4 (y=9-12) — 80 stalls, four rows ── */
  ...block(1, 9, [['B128','B129','B130'],['B167','B166','B165'],['B168','B169','B170'],['B207','B206','B205']]),
  ...block(5, 9, [['B131','B132','B133'],['B164','B163','B162'],['B171','B172','B173'],['B204','B203','B202']]),
  ...block(9, 9, [['B134','B135','B136','B137'],['B161','B160','B159','B158'],['B174','B175','B176','B177'],['B201','B200','B199','B198']]),
  ...block(14, 9, [['B138','B139','B140'],['B157','B156','B155'],['B178','B179','B180'],['B197','B196','B195']]),
  ...block(18, 9, [['B141','B142'],['B154','B153'],['B181','B182'],['B194','B193']]),
  ...block(21, 9, [['B143','B144'],['B152','B151'],['B183','B184'],['B192','B191']]),
  ...block(24, 9, [['B145','B146','B147'],['B150','B149','B148'],['B185','B186','B187'],['B190','B189','B188']]),

  /* ── Block 5 (y=14-16) — 42 stalls ── */
  ...block(0, 15, [['B248']]),
  ...block(1, 14, [['B208','B209','B210','B211'],['B247','B246','B245','B244']]),
  ...block(6, 14, [['B212','B213','B214','B215'],['B243','B242','B241','B240']]),
  ...block(11, 14, [['B216','B217'],['B239','B238']]),
  ...block(14, 14, [['B218','B219','B220'],['B237','B236','B235']]),
  ...block(18, 14, [['B221','B222'],['B234','B233']]),
  ...block(21, 14, [['B223','B224'],['B232','B231']]),
  ...block(24, 14, [['B225','B226','B227'],['B230','B229','B228']]),
  ...block(0, 16, [['B249']]),

  /* ── Bottom row (y=18) — 19 stalls ── */
  ...block(1, 18, [['B250','B251','B252']]),
  ...block(6, 18, [['B253','B254','B255','B256','B257','B258','B259']]),
  ...block(14, 18, [['B260','B261','B262','B263','B264','B265','B266']]),
  ...block(24, 18, [['B267','B268']]),

  /* ── Right edge BB stalls (x=27, y=0-21) — 22 stalls ── */
  ...edgeColumn(27, 0, [
    'BB1','BB2','BB3','BB4','BB5','BB6','BB7','BB8','BB9','BB10','BB11',
    'BB12','BB13','BB14','BB15','BB16','BB17','BB18','BB19','BB20','BB21','BB22',
  ]),
];

/* ── Status overrides — available stalls ── */
const availableIds = new Set([
  'B1','B2','B44','B51','B211','B249','B250','B251','B252',
  'BB1','BB3','BB5','BB17','BB18','BB19','BB20','BB21','BB22',
]);
stalls.forEach(s => {
  if (availableIds.has(s.id)) s.status = 'available';
});

/* ── Entrances ── */
const entrances: Entrance[] = [
  { id: 'ent-b-1', x: -0.5, y: 2.5, direction: 'left', type: 'both', label: 'IN / OUT' },
  { id: 'ent-b-2', x: -0.5, y: 14.5, direction: 'left', type: 'both', label: 'IN / OUT' },
];

export const hallBConfig: HallConfig = {
  id: 'B',
  name: 'Exhibition Hall B',
  year: 2026,
  gridCols: 28,
  gridRows: 22,
  unitSize: 38,
  stalls,
  entrances,
};
