import { Enum } from 'cc';

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