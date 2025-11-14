import { _decorator, Vec3 } from 'cc';
import { Location } from '../enums/Location';

export interface IPlacement
{
   index:number;
   gridPos:Vec3;
   location:Location; // Позиция клика, попали в какую-то клетку или не попали. Клетки могут быть друг от дгура на растоянии gap и можно кликнуть меджу ними.
}