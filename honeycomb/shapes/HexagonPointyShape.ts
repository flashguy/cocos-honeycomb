import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { Grid } from '../abstractions/Grid';
import { Location } from '../enums/Location';
import { IPlacement } from '../placements/IPlacement';
const { ccclass } = _decorator;

@ccclass('HexagonPointyShape')
export class HexagonPointyShape<T extends IPlacement> extends Shape<T>
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

        let neighborPos:Vec3;

        if (fill)
        {
            let stepX:number = radius * 2 + 1;
            let stepY:number = radius + 1;
            let gridPos:Vec3 = v3();

            for (let x = 0; x < stepX; x++)
            {
                gridPos.x = startPos.x;

                for (let y = 0; y < stepY; y++)
                {
                    gridPos.y = startPos.y + y;
                    this.add(gridPos);
                }

                if (x < radius)
                {
                    stepY += 1;
                    neighborPos = grid.getCellNeighbor(startPos, Location.RB);

                    if (neighborPos != null)
                        startPos.set(neighborPos);
                }
                else
                {
                    stepY -= 1;
                    neighborPos = grid.getCellNeighbor(startPos, Location.RT)

                    if (neighborPos != null)
                        startPos.set(neighborPos);
                }
            }
        }
        else
        {
            const directions:Location[] = [Location.RB, Location.RT, Location.T, Location.LT, Location.LB, Location.B];

            for (let i = 0; i < directions.length; i++)
            {
                for (let j = 0; j < radius; j++)
                {
                    this.add(startPos);

                    neighborPos = grid.getCellNeighbor(startPos, directions[i]);
                    
                    if (neighborPos != null)
                        startPos.set(neighborPos);
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