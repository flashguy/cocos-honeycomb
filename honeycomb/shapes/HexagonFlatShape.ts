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
                    gridPos.set(grid.getCellNeighbor(gridPos, Position.R));
                }

                if (lines < radius)
                {
                    lineIter += 1;
                    startPos.set(grid.getCellNeighbor(startPos, Position.LT));
                }
                else
                {
                    lineIter -= 1;
                    startPos.set(grid.getCellNeighbor(startPos, Position.RT));
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