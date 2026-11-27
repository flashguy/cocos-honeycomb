import { Enum } from 'cc';

export enum HitResult
{
    OUT, // OUTSIDE - не попали в ячейку (например, клик в зазор между ячейками)
    IN,  // INSIDE - попали в ячейку
}
Enum(HitResult);
