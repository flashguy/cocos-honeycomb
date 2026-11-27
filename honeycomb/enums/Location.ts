import { Enum } from 'cc';

// вид сверху
// LT -- T -- RT
// |     |     |
// L  -- C --  R
// |     |     |
// LB -- B -- RB

// INFO: числовые значения сохранены от прежней версии enum — в .scene/.prefab viewer'а
// значения Location сериализуются числами, менять нумерацию нельзя
export enum Location
{
    C = 3,   // CENTER - horizontal and vertical or horizontal and vertical and up and down

    L = 4,   // LEFT
    T = 5,   // TOP
    R = 6,   // RIGHT
    B = 7,   // BOTTOM

    BC = 8,  // BOTTOM CENTER
    RC = 9,  // RIGHT CENTER
    TC = 10, // TOP CENTER
    LC = 11, // LEFT CENTER

    LB = 12, // LEFT BOTTOM
    RB = 13, // RIGHT BOTTOM
    RT = 14, // RIGHT TOP
    LT = 15, // LEFT TOP
}
Enum(Location);
