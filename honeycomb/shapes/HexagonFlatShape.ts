import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { ILocation } from '../locations/ILocation';
import { Position } from '../enums/Position';
import { Grid } from '../abstractions/Grid';
const { ccclass } = _decorator;

// File HexagonFlatShape.ts created am_empty
// Date of creation Tue Oct 21 2025 21:47:45 GMT+0300 (Москва, стандартное время),

@ccclass('HexagonFlatShape')
export class HexagonFlatShape<T extends ILocation> extends Shape<T>
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
                grid:Grid<T>, centerPos:Vec3, radius:number, fill:boolean = false)
    {
        super(locationConstructor);
        
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
            let stepX:number = radius + 1;
            let stepY:number = radius * 2 + 1;
            let gridPos:Vec3 = v3();

            for (let y = 0; y < stepY; y++)
            {
                gridPos.y = startPos.y;

                for (let x = 0; x < stepX; x++)
                {
                    gridPos.x = startPos.x + x;
                    this.add(gridPos);
                }

                if (y < radius)
                {
                    stepX += 1;
                    neighborPos = grid.getCellNeighbor(startPos, Position.LT);

                    if (neighborPos != null)
                        startPos.set(neighborPos);
                }
                else
                {
                    stepX -= 1;
                    neighborPos = grid.getCellNeighbor(startPos, Position.RT);

                    if (neighborPos != null)
                        startPos.set(neighborPos);
                }
            }
        }
        else
        {
            const directions:Position[] = [Position.R, Position.RT, Position.LT, Position.L, Position.LB, Position.RB];

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