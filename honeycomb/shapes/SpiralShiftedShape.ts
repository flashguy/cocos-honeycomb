import { _decorator, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { ILocation } from '../locations/ILocation';
import { Grid } from '../abstractions/Grid';
import { Position } from '../enums/Position';
import { HalfShiftedGrid } from '../grids/HalfShiftedGrid';
import { ShiftedGridType } from '../enums/ShiftedGridType';
const { ccclass } = _decorator;

// File SpiralShiftedShape.ts created am_empty
// Date of creation Thu Oct 23 2025 14:27:35 GMT+0300 (Москва, стандартное время),

@ccclass('SpiralShiftedShape')
export class SpiralShiftedShape<T extends ILocation> extends Shape<T>
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
                grid:Grid<T>, centerPos:Vec3, radius:number, startSpiralDirection:Position, clockwise:boolean)
    {
        super(locationConstructor);
        
        if (grid instanceof HalfShiftedGrid)
        {
            let directions:Position[] = [];
            let fixPosition:Position;
            let currentPos:Vec3 = centerPos.clone();
            let neighborPos:Vec3;

            if (grid.shiftGridType == ShiftedGridType.RIGHT_EVEN
                || grid.shiftGridType == ShiftedGridType.RIGHT_ODD
                || grid.shiftGridType == ShiftedGridType.LEFT_EVEN
                || grid.shiftGridType == ShiftedGridType.LEFT_ODD
            )
            {
                if (clockwise)
                {
                    if (startSpiralDirection == Position.LB)
                    {
                        directions = [Position.LT, Position.RT, Position.R, Position.RB, Position.LB];
                        fixPosition = Position.L;
                    }
                    else if (startSpiralDirection == Position.L)
                    {
                        directions = [Position.RT, Position.R, Position.RB, Position.LB, Position.L];
                        fixPosition = Position.LT;
                    }
                    else if (startSpiralDirection == Position.LT)
                    {
                        directions = [Position.R, Position.RB, Position.LB, Position.L, Position.LT];
                        fixPosition = Position.RT;
                    }
                    else if (startSpiralDirection == Position.RT)
                    {
                        directions = [Position.RB, Position.LB, Position.L, Position.LT, Position.RT];
                        fixPosition = Position.R;
                    }
                    else if (startSpiralDirection == Position.R)
                    {
                        directions = [Position.LB, Position.L, Position.LT, Position.RT, Position.R];
                        fixPosition = Position.RB;
                    }
                    else if (startSpiralDirection == Position.RB)
                    {
                        directions = [Position.L, Position.LT, Position.RT, Position.R, Position.RB];
                        fixPosition = Position.LB;
                    }
                }
                else
                {
                    if (startSpiralDirection == Position.LB)
                    {
                        directions = [Position.R, Position.RT, Position.LT, Position.L, Position.LB];
                        fixPosition = Position.RB;
                    }
                    else if (startSpiralDirection == Position.L)
                    {
                        directions = [Position.RB, Position.R, Position.RT, Position.LT, Position.L];
                        fixPosition = Position.LB;
                    }
                    else if (startSpiralDirection == Position.LT)
                    {
                        directions = [Position.LB, Position.RB, Position.R, Position.RT, Position.LT];
                        fixPosition = Position.L;
                    }
                    else if (startSpiralDirection == Position.RT)
                    {
                        directions = [Position.L, Position.LB, Position.RB, Position.R, Position.RT];
                        fixPosition = Position.LT;
                    }
                    else if (startSpiralDirection == Position.R)
                    {
                        directions = [Position.LT, Position.L, Position.LB, Position.RB, Position.R];
                        fixPosition = Position.RT;
                    }
                    else if (startSpiralDirection == Position.RB)
                    {
                        directions = [Position.RT, Position.LT, Position.L, Position.LB, Position.RB];
                        fixPosition = Position.R;
                    }
                }
            }

            if (grid.shiftGridType == ShiftedGridType.TOP_EVEN
                || grid.shiftGridType == ShiftedGridType.TOP_ODD
                || grid.shiftGridType == ShiftedGridType.BOTTOM_EVEN
                || grid.shiftGridType == ShiftedGridType.BOTTOM_ODD
            )
            {
                if (clockwise)
                {
                    if (startSpiralDirection == Position.LB)
                    {
                        directions = [Position.T, Position.RT, Position.RB, Position.B, Position.LB];
                        fixPosition = Position.LT;
                    }
                    else if (startSpiralDirection == Position.LT)
                    {
                        directions = [Position.RT, Position.RB, Position.B, Position.LB, Position.LT];
                        fixPosition = Position.T;
                    }
                    else if (startSpiralDirection == Position.T)
                    {
                        directions = [Position.RB, Position.B, Position.LB, Position.LT, Position.T];
                        fixPosition = Position.RT;
                    }
                    else if (startSpiralDirection == Position.RT)
                    {
                        directions = [Position.B, Position.LB, Position.LT, Position.T, Position.RT];
                        fixPosition = Position.RB;
                    }
                    else if (startSpiralDirection == Position.RB)
                    {
                        directions = [Position.LB, Position.LT, Position.T, Position.RT, Position.RB];
                        fixPosition = Position.B;
                    }
                    else if (startSpiralDirection == Position.B)
                    {
                        directions = [Position.LT, Position.T, Position.RT, Position.RB, Position.B];
                        fixPosition = Position.LB;
                    }
                }
                else
                {
                    if (startSpiralDirection == Position.LB)
                    {
                        directions = [Position.RB, Position.RT, Position.T, Position.LT, Position.LB];
                        fixPosition = Position.B;
                    }
                    else if (startSpiralDirection == Position.LT)
                    {
                        directions = [Position.B, Position.RB, Position.RT, Position.T, Position.LT];
                        fixPosition = Position.LB;
                    }
                    else if (startSpiralDirection == Position.T)
                    {
                        directions = [Position.LB, Position.B, Position.RB, Position.RT, Position.T];
                        fixPosition = Position.LT;
                    }
                    else if (startSpiralDirection == Position.RT)
                    {
                        directions = [Position.LT, Position.LB, Position.B, Position.RB, Position.RT];
                        fixPosition = Position.T;
                    }
                    else if (startSpiralDirection == Position.RB)
                    {
                        directions = [Position.T, Position.LT, Position.LB, Position.B, Position.RB];
                        fixPosition = Position.RT;
                    }
                    else if (startSpiralDirection == Position.B)
                    {
                        directions = [Position.RT, Position.T, Position.LT, Position.LB, Position.B];
                        fixPosition = Position.RB;
                    }
                }
            }

            this.add(centerPos);

            for (let r = 1; r < radius; r++)
            {
                neighborPos = grid.getCellNeighbor(currentPos, startSpiralDirection);

                if (neighborPos != null)
                    currentPos.set(neighborPos);

                this.add(currentPos);

                for (let fix = 0; fix < r - 1; fix++)
                {
                    neighborPos = grid.getCellNeighbor(currentPos, fixPosition);

                    if (neighborPos != null)
                        currentPos.set(neighborPos);

                    this.add(currentPos);
                }

                for (let i = 0; i < directions.length; i++)
                {
                    for (let j = 0; j < r; j++)
                    {
                        neighborPos = grid.getCellNeighbor(currentPos, directions[i]);

                        if (neighborPos != null)
                            currentPos.set(neighborPos);

                        this.add(currentPos);
                    }
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