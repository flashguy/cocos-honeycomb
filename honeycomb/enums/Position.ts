import { Enum } from 'cc';

// File Position.ts created am_empty
// Date of creation Tue Jun 10 2025 19:31:44 GMT+0300 (Москва, стандартное время),

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

export enum Position
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
Enum(Position);