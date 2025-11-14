import { Enum } from 'cc';

// вид сверху
// LT -- T -- RT
// |     |     |
// L  -- C --  R
// |     |     |
// LB -- B -- RB

// вид сзади
// LU -- U -- RU
// |     |     |
// L  -- C --  R
// |     |     |
// LD -- D -- RD

export enum Location
{
    NONE, // NONE

    OUT, // OUTSIDE
    IN,  // INSIDE
    
    C,   // CENTER - horizontal and vertical or horizontal and vertical and up and down
    
    L,   // LEFT
    T,   // TOP
    R,   // RIGHT
    B,   // BOTTOM
    
    BC,  // BOTTOM CENTER
    RC,  // RIGHT CENTER
    TC,  // TOP CENTER
    LC,  // LEFT CENTER

    LB,  // LEFT BOTTOM
    RB,  // RIGHT BOTTOM
    RT,  // RIGHT TOP
    LT,  // LEFT TOP
    
    U,   // UP
    D,   // DOWN

    LD,  // LEFT DOWN
    LU,  // LEFT UP
    RU,  // RIGHT UP
    RD,  // RIGHT DOWN
}
Enum(Location);