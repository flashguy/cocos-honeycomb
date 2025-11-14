import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { Grid } from '../abstractions/Grid';
import { Location } from '../enums/Location';
import { HalfShiftedGrid } from '../grids/HalfShiftedGrid';
import { ShiftedGridType } from '../enums/ShiftedGridType';
import { IPlacement } from '../placements/IPlacement';
const { ccclass } = _decorator;

@ccclass('TriangleShape')
export class TriangleShape<T extends IPlacement> extends Shape<T>
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
                grid:Grid<T>, startPos:Vec3, distance:number, directionTo:Location)
    {
        super(placementConstructor)

        if (grid instanceof HalfShiftedGrid)
        {
            let startRowPos:Vec3 = v3();
            let currentPos:Vec3;
            let nextStepX:Location;
            let nextStepY:Location;
            let stepX:number = distance - 1;
            let stepY:number = distance;

            if (grid.shiftGridType == ShiftedGridType.RIGHT_EVEN
                || grid.shiftGridType == ShiftedGridType.RIGHT_ODD
                || grid.shiftGridType == ShiftedGridType.LEFT_EVEN
                || grid.shiftGridType == ShiftedGridType.LEFT_ODD
            )
            {
                if (directionTo == Location.RT)
                {
                    startRowPos.set(startPos);
                    nextStepX = Location.R;
                    nextStepY = Location.RT;
                }
                else if (directionTo == Location.TC)
                {
                    startRowPos.x = startPos.x - Math.floor((distance - 1) / 2);
                    startRowPos.y = startPos.y;
                    nextStepX = Location.R;
                    nextStepY = Location.RT;
                }
                else if (directionTo == Location.LT)
                {
                    startRowPos.x = startPos.x - (distance - 1);
                    startRowPos.y = startPos.y;
                    nextStepX = Location.R;
                    nextStepY = Location.RT;
                }
                else if (directionTo == Location.RB)
                {
                    startRowPos.set(startPos);
                    nextStepX = Location.R;
                    nextStepY = Location.RB;
                }
                else if (directionTo == Location.BC)
                {
                    startRowPos.x = startPos.x - Math.floor((distance - 1) / 2);
                    startRowPos.y = startPos.y;
                    nextStepX = Location.R;
                    nextStepY = Location.RB;
                }
                else if (directionTo == Location.LB)
                {
                    startRowPos.x = startPos.x - (distance - 1);
                    startRowPos.y = startPos.y;
                    nextStepX = Location.R;
                    nextStepY = Location.RB;
                }
                else
                {
                    return;
                }
            }

            if (grid.shiftGridType == ShiftedGridType.TOP_EVEN
                || grid.shiftGridType == ShiftedGridType.TOP_ODD
                || grid.shiftGridType == ShiftedGridType.BOTTOM_EVEN
                || grid.shiftGridType == ShiftedGridType.BOTTOM_ODD
            )
            {
                if (directionTo == Location.RT)
                {
                    startRowPos.set(startPos);
                    nextStepX = Location.RT;
                    nextStepY = Location.T;
                }
                else if (directionTo == Location.RC)
                {
                    startRowPos.x = startPos.x;
                    startRowPos.y = startPos.y - Math.floor((distance - 1) / 2);
                    nextStepX = Location.RT;
                    nextStepY = Location.T;
                }
                else if (directionTo == Location.LT)
                {
                    startRowPos.x = startPos.x;
                    startRowPos.y = startPos.y;
                    nextStepX = Location.LT;
                    nextStepY = Location.T;
                }
                else if (directionTo == Location.RB)
                {
                    startRowPos.x = startPos.x;
                    startRowPos.y = startPos.y - (distance - 1);
                    nextStepX = Location.RT;
                    nextStepY = Location.T;
                }
                else if (directionTo == Location.LC)
                {
                    startRowPos.x = startPos.x;
                    startRowPos.y = startPos.y - Math.floor((distance - 1) / 2);
                    nextStepX = Location.LT;
                    nextStepY = Location.T;
                }
                else if (directionTo == Location.LB)
                {
                    startRowPos.x = startPos.x;
                    startRowPos.y = startPos.y - (distance - 1);
                    nextStepX = Location.LT;
                    nextStepY = Location.T;
                }
                else
                {
                    return;
                }
            }

            currentPos = startRowPos.clone();

            for (let i = 0; i < stepY; i++)
            {
                this.add(currentPos);
                
                for (let j = 0; j < stepX; j++)
                {
                    currentPos = grid.getCellNeighbor(currentPos, nextStepX);
                    this.add(currentPos);
                }

                currentPos = grid.getCellNeighbor(startRowPos.clone(), nextStepY);
                startRowPos.set(currentPos);
                stepX--;
            }
        }
    }

    // ---------------
    // private methods
    // ---------------



    // -----------------
    // protected methods
    // -----------------

    

    // --------------
    // public methods
    // --------------


}