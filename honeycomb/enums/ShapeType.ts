import { Enum } from 'cc';

// File ShapeType.ts created am_empty
// Date of creation Mon Jul 28 2025 19:32:58 GMT+0300 (Москва, стандартное время),

export enum ShapeType
{
    NONE,
    RECTANGLE,
    CIRCLE_BRESENHAM,
    CIRCLE_MIDPOINT,
    CIRCLE_RED_BLOB_GAMES,
    SECTOR_RED_BLOB_GAMES,
    ELLIPSE,
    LINE_BRESENHAM,
    LINE_WALK_RED_BLOB_GAMES,
    LINE_SUPER_COVER_RED_BLOB_GAMES,
    LINE_CUBE_RED_BLOB_GAMES,
    HEXAGON_FLAT,
    HEXAGON_POINTY,
    SPIRAL_RECTANGLE,
    SPIRAL_SHIFTED,
    TRIANGLE,
}
Enum(ShapeType);