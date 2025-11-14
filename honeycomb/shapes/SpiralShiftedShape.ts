import { _decorator, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { IPlacement } from '../placements/IPlacement';
import { Grid } from '../abstractions/Grid';
import { Location } from '../enums/Location';
import { HalfShiftedGrid } from '../grids/HalfShiftedGrid';
import { ShiftedGridType } from '../enums/ShiftedGridType';
const { ccclass } = _decorator;

@ccclass('SpiralShiftedShape')
export class SpiralShiftedShape<T extends IPlacement> extends Shape<T>
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



    constructor(placementConstructor: new (cellPos?:Vec3, location?:Location, index?:number) => T,
                grid:Grid<T>, centerPos:Vec3, radius:number, startSpiralDirection:Location, clockwise:boolean)
    {
        super(placementConstructor);
        
        if (grid instanceof HalfShiftedGrid)
        {
            let directions:Location[] = [];
            let fixLocation:Location;
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
                    if (startSpiralDirection == Location.LB)
                    {
                        directions = [Location.LT, Location.RT, Location.R, Location.RB, Location.LB];
                        fixLocation = Location.L;
                    }
                    else if (startSpiralDirection == Location.L)
                    {
                        directions = [Location.RT, Location.R, Location.RB, Location.LB, Location.L];
                        fixLocation = Location.LT;
                    }
                    else if (startSpiralDirection == Location.LT)
                    {
                        directions = [Location.R, Location.RB, Location.LB, Location.L, Location.LT];
                        fixLocation = Location.RT;
                    }
                    else if (startSpiralDirection == Location.RT)
                    {
                        directions = [Location.RB, Location.LB, Location.L, Location.LT, Location.RT];
                        fixLocation = Location.R;
                    }
                    else if (startSpiralDirection == Location.R)
                    {
                        directions = [Location.LB, Location.L, Location.LT, Location.RT, Location.R];
                        fixLocation = Location.RB;
                    }
                    else if (startSpiralDirection == Location.RB)
                    {
                        directions = [Location.L, Location.LT, Location.RT, Location.R, Location.RB];
                        fixLocation = Location.LB;
                    }
                }
                else
                {
                    if (startSpiralDirection == Location.LB)
                    {
                        directions = [Location.R, Location.RT, Location.LT, Location.L, Location.LB];
                        fixLocation = Location.RB;
                    }
                    else if (startSpiralDirection == Location.L)
                    {
                        directions = [Location.RB, Location.R, Location.RT, Location.LT, Location.L];
                        fixLocation = Location.LB;
                    }
                    else if (startSpiralDirection == Location.LT)
                    {
                        directions = [Location.LB, Location.RB, Location.R, Location.RT, Location.LT];
                        fixLocation = Location.L;
                    }
                    else if (startSpiralDirection == Location.RT)
                    {
                        directions = [Location.L, Location.LB, Location.RB, Location.R, Location.RT];
                        fixLocation = Location.LT;
                    }
                    else if (startSpiralDirection == Location.R)
                    {
                        directions = [Location.LT, Location.L, Location.LB, Location.RB, Location.R];
                        fixLocation = Location.RT;
                    }
                    else if (startSpiralDirection == Location.RB)
                    {
                        directions = [Location.RT, Location.LT, Location.L, Location.LB, Location.RB];
                        fixLocation = Location.R;
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
                    if (startSpiralDirection == Location.LB)
                    {
                        directions = [Location.T, Location.RT, Location.RB, Location.B, Location.LB];
                        fixLocation = Location.LT;
                    }
                    else if (startSpiralDirection == Location.LT)
                    {
                        directions = [Location.RT, Location.RB, Location.B, Location.LB, Location.LT];
                        fixLocation = Location.T;
                    }
                    else if (startSpiralDirection == Location.T)
                    {
                        directions = [Location.RB, Location.B, Location.LB, Location.LT, Location.T];
                        fixLocation = Location.RT;
                    }
                    else if (startSpiralDirection == Location.RT)
                    {
                        directions = [Location.B, Location.LB, Location.LT, Location.T, Location.RT];
                        fixLocation = Location.RB;
                    }
                    else if (startSpiralDirection == Location.RB)
                    {
                        directions = [Location.LB, Location.LT, Location.T, Location.RT, Location.RB];
                        fixLocation = Location.B;
                    }
                    else if (startSpiralDirection == Location.B)
                    {
                        directions = [Location.LT, Location.T, Location.RT, Location.RB, Location.B];
                        fixLocation = Location.LB;
                    }
                }
                else
                {
                    if (startSpiralDirection == Location.LB)
                    {
                        directions = [Location.RB, Location.RT, Location.T, Location.LT, Location.LB];
                        fixLocation = Location.B;
                    }
                    else if (startSpiralDirection == Location.LT)
                    {
                        directions = [Location.B, Location.RB, Location.RT, Location.T, Location.LT];
                        fixLocation = Location.LB;
                    }
                    else if (startSpiralDirection == Location.T)
                    {
                        directions = [Location.LB, Location.B, Location.RB, Location.RT, Location.T];
                        fixLocation = Location.LT;
                    }
                    else if (startSpiralDirection == Location.RT)
                    {
                        directions = [Location.LT, Location.LB, Location.B, Location.RB, Location.RT];
                        fixLocation = Location.T;
                    }
                    else if (startSpiralDirection == Location.RB)
                    {
                        directions = [Location.T, Location.LT, Location.LB, Location.B, Location.RB];
                        fixLocation = Location.RT;
                    }
                    else if (startSpiralDirection == Location.B)
                    {
                        directions = [Location.RT, Location.T, Location.LT, Location.LB, Location.B];
                        fixLocation = Location.RB;
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
                    neighborPos = grid.getCellNeighbor(currentPos, fixLocation);

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