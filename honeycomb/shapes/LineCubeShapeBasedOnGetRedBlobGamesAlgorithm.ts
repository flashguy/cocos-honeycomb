import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { Shape } from '../abstractions/Shape';
import { IPlacement } from '../placements/IPlacement';
import { HMath } from '../utils/HMath';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

@ccclass('LineCubeShapeBasedOnGetRedBlobGamesAlgorithm')
export class LineCubeShapeBasedOnGetRedBlobGamesAlgorithm<T extends IPlacement> extends Shape<T>
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
                grid:Grid<T>, startPos:Vec3, endPos:Vec3)
    {
        super(placementConstructor);

        const distance:number = grid.getDistance(startPos, endPos);
        const step:number = 1.0 / Math.max(distance, 1);
        const gridPoint1:Vec3 = grid.offsetToCube(startPos);
        const gridPoint2:Vec3 = grid.offsetToCube(endPos);

        for (let i = 0; i <= distance; i++)
        {
            let result:Vec3 = Vec3.lerp(v3(), gridPoint1, gridPoint2, step * i);
            result = HMath.cubeRound(result);
            
            this.add(grid.cubeToOffset(result));
        }
    }

    // ---------------
    // private methods
    // ---------------

    

    // --------------
    // public methods
    // --------------

    
}