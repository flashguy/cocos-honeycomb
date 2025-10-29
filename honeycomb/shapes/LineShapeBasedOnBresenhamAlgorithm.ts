import { _decorator, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { ILocation } from '../locations/ILocation';
import { Position } from '../enums/Position';
const { ccclass } = _decorator;

// File LineShapeBasedOnBresenhamAlgorithm.ts created am_empty
// Date of creation Mon Oct 20 2025 09:32:47 GMT+0300 (Москва, стандартное время),

@ccclass('LineShapeBasedOnBresenhamAlgorithm')
export class LineShapeBasedOnBresenhamAlgorithm<T extends ILocation> extends Shape<T>
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



    constructor(locationConstructor: new (gridPos?:Vec3, position?:Position, index?:number) => T,
                startPos:Vec3, endPos:Vec3)
    {
        super(locationConstructor);
        
        /* const dx:number = Math.abs(endPos.x - startPos.x);
        const dy:number = Math.abs(endPos.y - startPos.y);
        const length:number = dx > dy ? dx : dy; // diagonal_distance

        for (let i = 0; i <= length; ++i)
        {
            const t:number = i / length;
            const x = startPos.x + Math.trunc(t * (endPos.x - startPos.x)); // lerp
            const y = startPos.y + Math.trunc(t * (endPos.y - startPos.y)); // lerp
            
            this.add(v3(x, y));
        } */

        const deltaX:number = Math.abs(endPos.x - startPos.x);
        const deltaY:number = Math.abs(endPos.y - startPos.y);
        const sign_x:number = startPos.x < endPos.x ? 1 : -1;
        const sign_y:number = startPos.y < endPos.y ? 1 : -1;
        let error1:number = deltaX - deltaY;
        let error2:number;
        let calculatedPoint = startPos.clone();
        
        while (calculatedPoint.x != endPos.x || calculatedPoint.y != endPos.y)
        {
            this.add(calculatedPoint.clone());
            
            error2 = error1 * 2;
            
            if (error2 > -deltaY)
            {
                error1 -= deltaY;
                calculatedPoint.x += sign_x;
            }
            
            if (error2 < deltaX)
            {
                error1 += deltaX;
                calculatedPoint.y += sign_y;
            }
        }

        this.add(endPos.clone());
    }

    // ---------------
    // private methods
    // ---------------

    

    // --------------
    // public methods
    // --------------

    
}