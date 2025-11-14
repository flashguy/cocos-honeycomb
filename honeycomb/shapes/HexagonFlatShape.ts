import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { IPlacement } from '../placements/IPlacement';
import { Location } from '../enums/Location';
import { Grid } from '../abstractions/Grid';
const { ccclass } = _decorator;

@ccclass('HexagonFlatShape')
export class HexagonFlatShape<T extends IPlacement> extends Shape<T>
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
                grid:Grid<T>, centerPos:Vec3, radius:number, fill:boolean = false)
    {
        super(placementConstructor);
        
        if (radius <= 0)
        {
            this.add(centerPos);
            return;
        }

        let startPos:Vec3 = centerPos.clone();
        
        for (let i = 0; i < radius; i++)
        {
            startPos = grid.getCellNeighbor(startPos, Location.LB);
            
            if (startPos == null)
                return;
        }

        if (fill)
        {
            let lineIter:number = radius + 1;
            let linesIter:number = radius * 2 + 1;
            let gridPos:Vec3 = v3();

            for (let lines = 0; lines < linesIter; lines++)
            {
                gridPos.set(startPos);

                for (let line = 0; line < lineIter; line++)
                {
                    this.add(gridPos);
                    gridPos.set(grid.getCellNeighbor(gridPos, Location.R));
                }

                if (lines < radius)
                {
                    lineIter += 1;
                    startPos.set(grid.getCellNeighbor(startPos, Location.LT));
                }
                else
                {
                    lineIter -= 1;
                    startPos.set(grid.getCellNeighbor(startPos, Location.RT));
                }
            }
        }
        else
        {
            const directions:Location[] = [Location.R, Location.RT, Location.LT, Location.L, Location.LB, Location.RB];

            for (let i = 0; i < directions.length; i++)
            {
                for (let j = 0; j < radius; j++)
                {
                    this.add(startPos);
                    startPos.set(grid.getCellNeighbor(startPos, directions[i]));
                }
            }
        }
    }

    // ---------------
    // private methods
    // ---------------

    

    // --------------
    // public methods
    // --------------

    
}