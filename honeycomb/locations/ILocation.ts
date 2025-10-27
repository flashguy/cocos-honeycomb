import { _decorator, Vec3 } from 'cc';
import { Position } from '../enums/Position';

export interface ILocation
{
   index:number;
   gridPos:Vec3;
   position:Position; // Позиция клика, попали в какую-то клетку или не попали. Клетки могут быть друг от дгура на растоянии gap и можно кликнуть меджу ними.
}