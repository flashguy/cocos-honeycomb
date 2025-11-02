import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { Shape } from '../abstractions/Shape';
import { ILocation } from '../locations/ILocation';
import { HMath } from '../utils/HMath';
import { Position } from '../enums/Position';
const { ccclass } = _decorator;

// File LineCubeShapeBasedOnGetRedBlobGamesAlgorithm.ts created am_empty
// Date of creation Wed Oct 22 2025 10:45:43 GMT+0300 (Москва, стандартное время),

@ccclass('LineCubeShapeBasedOnGetRedBlobGamesAlgorithm')
export class LineCubeShapeBasedOnGetRedBlobGamesAlgorithm<T extends ILocation> extends Shape<T>
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
                grid:Grid<T>, startPos:Vec3, endPos:Vec3)
    {
        super(locationConstructor);

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