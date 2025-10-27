import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { Shape } from '../abstractions/Shape';
import { Location } from '../locations/Location';
import { HMath } from '../utils/HMath';
const { ccclass } = _decorator;

// File LineCubeShapeBasedOnGetRedBlobGamesAlgorithm.ts created am_empty
// Date of creation Wed Oct 22 2025 10:45:43 GMT+0300 (Москва, стандартное время),

@ccclass('LineCubeShapeBasedOnGetRedBlobGamesAlgorithm')
export class LineCubeShapeBasedOnGetRedBlobGamesAlgorithm extends Shape<Location>
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



    constructor(grid:Grid, startPos:Vec3, endPos:Vec3)
    {
        super();

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

    protected override createLocation():Location
    {
        return new Location();
    }

    // --------------
    // public methods
    // --------------

    
}