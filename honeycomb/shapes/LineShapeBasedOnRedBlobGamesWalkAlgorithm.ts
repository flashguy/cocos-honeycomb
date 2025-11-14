import { _decorator, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { IPlacement } from '../placements/IPlacement';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

// https://www.redblobgames.com/grids/line-drawing/

@ccclass('LineShapeBasedOnRedBlobGamesWalkAlgorithm')
export class LineShapeBasedOnRedBlobGamesWalkAlgorithm<T extends IPlacement> extends Shape<T>
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



    constructor(placementConstructor: new (gridPos?:Vec3, location?:Location, index?:number) => T,
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
            if ((0.5+ix) / nx < (0.5+iy) / ny)
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