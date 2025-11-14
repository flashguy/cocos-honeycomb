import { _decorator, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { IPlacement } from '../placements/IPlacement';
import { Position } from '../enums/Position';
const { ccclass } = _decorator;

// https://www.redblobgames.com/grids/line-drawing/
// File LineShapeBasedOnRedBlobGamesSuperCoverAlgorithm.ts created am_empty
// Date of creation Mon Oct 20 2025 09:03:03 GMT+0300 (Москва, стандартное время),

@ccclass('LineShapeBasedOnRedBlobGamesSuperCoverAlgorithm')
export class LineShapeBasedOnRedBlobGamesSuperCoverAlgorithm<T extends IPlacement> extends Shape<T>
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
                startPos:Vec3, endPos:Vec3)
    {
        super(placementConstructor);

        const dx:number = endPos.x - startPos.x;
        const dy:number = endPos.y - startPos.y;
        const nx:number = Math.abs(dx);
        const ny:number = Math.abs(dy);
        const sign_x:number = dx > 0 ? 1 : -1;
        const sign_y:number = dy > 0 ? 1 : -1;
        let currentPoint = startPos.clone();

        this.add(currentPoint.clone());

        for (let ix = 0, iy = 0; ix < nx || iy < ny;)
        {
            let decision = (1 + 2*ix) * ny - (1 + 2*iy) * nx;

            if (decision === 0)
            {
                // next step is diagonal
                currentPoint.x += sign_x;
                currentPoint.y += sign_y;
                ix++;
                iy++;
            }
            else if (decision < 0)
            {
                // next step is horizontal
                currentPoint.x += sign_x;
                ix++;
            }
            else
            {
                // next step is vertical
                currentPoint.y += sign_y;
                iy++;
            }

            this.add(currentPoint.clone());
        }
    }

    // ---------------
    // private methods
    // ---------------

    

    // --------------
    // public methods
    // --------------

    
}