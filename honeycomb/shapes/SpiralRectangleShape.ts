import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { IPlacement } from '../placements/IPlacement';
import { Position } from '../enums/Position';
const { ccclass } = _decorator;

// File SpiralRectangleShape.ts created am_empty
// Date of creation Thu Oct 23 2025 13:35:11 GMT+0300 (Москва, стандартное время),

@ccclass('SpiralRectangleShape')
export class SpiralRectangleShape<T extends IPlacement> extends Shape<T>
{
    // ----------------------------------------
    // private properties / getters and setters
    // ----------------------------------------



    // ------------------------------------------
    // protected properties / getters and setters
    // ------------------------------------------

    

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------



    constructor(placementConstructor: new (gridPos?:Vec3, position?:Position, index?:number) => T,
                centerPos:Vec3, radius:number, clockwise:boolean)
    {
        super(placementConstructor);

        let x:number = 0;
        let y:number = 0;
        let dx:number = 0;
        let dy:number = -1;
        let temp:number;
        const halfRadius:number = radius / 2;
        
        for (let i = Math.pow(radius, 2); i > 0; i--)
        {
            if (Math.abs(x) <= halfRadius && Math.abs(y) <= halfRadius)
            {
                if (clockwise)
                    this.add(v3(centerPos.x + x, centerPos.y - y));
                else
                    this.add(v3(centerPos.x + x, centerPos.y + y))
            }
            
            if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y))
            {
                temp = dx;
                dx = -dy;
                dy = temp;
            }
            
            x += dx;
            y += dy;
        }
    }

    // ---------------
    // private methods
    // ---------------

    

    // --------------
    // public methods
    // --------------

    
}