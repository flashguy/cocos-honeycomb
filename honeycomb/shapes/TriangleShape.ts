import { _decorator, Component, Node, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { Location } from '../locations/Location';
import { Grid } from '../abstractions/Grid';
import { Position } from '../enums/Position';
import { HalfShiftedGrid } from '../grids/HalfShiftedGrid';
import { ShiftedGridType } from '../enums/ShiftedGridType';
const { ccclass } = _decorator;

// File TriangleShape.ts created am_empty
// Date of creation Thu Oct 23 2025 21:43:38 GMT+0300 (Москва, стандартное время),

@ccclass('TriangleShape')
export class TriangleShape extends Shape<Location>
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



    constructor(grid:Grid, startPos:Vec3, distance:number, directionTo:Position)
    {
        super()

        if (grid instanceof HalfShiftedGrid)
        {
            let startRowPos:Vec3 = v3();
            let currentPos:Vec3;
            let nextStepX:Position;
            let nextStepY:Position;
            let stepX:number = distance - 1;
            let stepY:number = distance;

            if (grid.shiftGridType == ShiftedGridType.RIGHT_EVEN
                || grid.shiftGridType == ShiftedGridType.RIGHT_ODD
                || grid.shiftGridType == ShiftedGridType.LEFT_EVEN
                || grid.shiftGridType == ShiftedGridType.LEFT_ODD
            )
            {
                if (directionTo == Position.RT)
                {
                    startRowPos.set(startPos);
                    nextStepX = Position.R;
                    nextStepY = Position.RT;
                }
                else if (directionTo == Position.TC)
                {
                    startRowPos.x = startPos.x - Math.floor((distance - 1) / 2);
                    startRowPos.y = startPos.y;
                    nextStepX = Position.R;
                    nextStepY = Position.RT;
                }
                else if (directionTo == Position.LT)
                {
                    startRowPos.x = startPos.x - (distance - 1);
                    startRowPos.y = startPos.y;
                    nextStepX = Position.R;
                    nextStepY = Position.RT;
                }
                else if (directionTo == Position.RB)
                {
                    startRowPos.set(startPos);
                    nextStepX = Position.R;
                    nextStepY = Position.RB;
                }
                else if (directionTo == Position.BC)
                {
                    startRowPos.x = startPos.x - Math.floor((distance - 1) / 2);
                    startRowPos.y = startPos.y;
                    nextStepX = Position.R;
                    nextStepY = Position.RB;
                }
                else if (directionTo == Position.LB)
                {
                    startRowPos.x = startPos.x - (distance - 1);
                    startRowPos.y = startPos.y;
                    nextStepX = Position.R;
                    nextStepY = Position.RB;
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
                if (directionTo == Position.RT)
                {
                    startRowPos.set(startPos);
                    nextStepX = Position.RT;
                    nextStepY = Position.T;
                }
                else if (directionTo == Position.RC)
                {
                    startRowPos.x = startPos.x;
                    startRowPos.y = startPos.y - Math.floor((distance - 1) / 2);
                    nextStepX = Position.RT;
                    nextStepY = Position.T;
                }
                else if (directionTo == Position.LT)
                {
                    startRowPos.x = startPos.x;
                    startRowPos.y = startPos.y;
                    nextStepX = Position.LT;
                    nextStepY = Position.T;
                }
                else if (directionTo == Position.RB)
                {
                    startRowPos.x = startPos.x;
                    startRowPos.y = startPos.y - (distance - 1);
                    nextStepX = Position.RT;
                    nextStepY = Position.T;
                }
                else if (directionTo == Position.LC)
                {
                    startRowPos.x = startPos.x;
                    startRowPos.y = startPos.y - Math.floor((distance - 1) / 2);
                    nextStepX = Position.LT;
                    nextStepY = Position.T;
                }
                else if (directionTo == Position.LB)
                {
                    startRowPos.x = startPos.x;
                    startRowPos.y = startPos.y - (distance - 1);
                    nextStepX = Position.LT;
                    nextStepY = Position.T;
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

    protected override createLocation():Location
    {
        return new Location();
    }

    // --------------
    // public methods
    // --------------


}