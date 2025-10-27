import { Enum } from 'cc';

// File CellType.ts created am_empty
// Date of creation Mon Jul 28 2025 17:53:19 GMT+0300 (Москва, стандартное время),

export enum CellType
{
    NONE,
    RECTANGLE,
    ELLIPSE,
    HEXAGON_FLAT,
    HEXAGON_POINTY,
    RHOMB,
    ISO_HEXAGON_FLAT,
    ISO_HEXAGON_POINTY,
}
Enum(CellType);