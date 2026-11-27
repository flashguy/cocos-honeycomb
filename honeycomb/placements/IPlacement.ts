import { Vec3 } from 'cc';
import { HitResult } from '../enums/HitResult';

export interface IPlacement
{
   index:number;
   cellPos:Vec3;
   hit:HitResult; // Попали в клетку или не попали. Клетки могут быть друг от друга на расстоянии gap и можно кликнуть между ними.
}
