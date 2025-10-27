import { Enum } from 'cc';

// File ShiftedGridType.ts created am_empty
// Date of creation Tue Jul 29 2025 20:37:48 GMT+0300 (Москва, стандартное время),

export enum ShiftedGridType
{
    NONE,
    RIGHT_EVEN,  // вправо чётные
    RIGHT_ODD,   // вправо нечетные
    LEFT_EVEN,   // влево чётные
    LEFT_ODD,    // влево нечетные
    TOP_EVEN,    // вверх чётные
    TOP_ODD,     // вверх нечетные
    BOTTOM_EVEN, // вниз чётные
    BOTTOM_ODD,  // вниз нечетные
}
Enum(ShiftedGridType);