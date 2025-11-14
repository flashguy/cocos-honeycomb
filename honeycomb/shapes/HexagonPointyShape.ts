import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { Grid } from '../abstractions/Grid';
import { Position } from '../enums/Position';
import { IPlacement } from '../placements/IPlacement';
const { ccclass } = _decorator;

// File HexagonPointyShape.ts created am_empty
// Date of creation Wed Oct 22 2025 09:07:39 GMT+0300 (Москва, стандартное время),

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



    constructor(placementConstructor: new (gridPos?:Vec3, position?:Position, index?:number) => T,
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
            startPos = grid.getCellNeighbor(startPos, Position.LB);
            
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
                    neighborPos = grid.getCellNeighbor(startPos, Position.RB);

                    if (neighborPos != null)
                        startPos.set(neighborPos);
                }
                else
                {
                    stepY -= 1;
                    neighborPos = grid.getCellNeighbor(startPos, Position.RT)

                    if (neighborPos != null)
                        startPos.set(neighborPos);
                }
            }
        }
        else
        {
            const directions:Position[] = [Position.RB, Position.RT, Position.T, Position.LT, Position.LB, Position.B];

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