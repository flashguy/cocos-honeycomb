import { Enum } from 'cc';

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
    PARALLELOGRAM_TOP,
    PARALLELOGRAM_BOTTOM,
}
Enum(CellType);