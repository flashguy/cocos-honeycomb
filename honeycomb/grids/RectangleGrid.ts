import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { Cell } from '../abstractions/Cell';
import { Position } from '../enums/Position';
import { Location } from '../locations/Location';
const { ccclass } = _decorator;

// File RectangleGrid.ts created am_empty
// Date of creation Tue Jun 10 2025 22:10:36 GMT+0300 (Москва, стандартное время),

@ccclass('RectangleGrid')
export class RectangleGrid extends Grid
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



    constructor(cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
    {
        super(cell, anchor, gap);
        
        this.initialize();
    }

    // ---------------
    // private methods
    // ---------------



    // -----------------
    // protected methods
    // -----------------

    protected override setNeighbors():void
    {
        this.neighbors.set(Position.L, v3(-1, 0));
        this.neighbors.set(Position.T, v3(0, 1));
        this.neighbors.set(Position.R, v3(1, 0));
        this.neighbors.set(Position.B, v3(0, -1));
        
        this.diagonals.set(Position.LB, v3(-1, -1));
        this.diagonals.set(Position.LT, v3(-1, 1));
        this.diagonals.set(Position.RT, v3(1, 1));
        this.diagonals.set(Position.RB, v3(1, -1));
    }

    protected override calculateGridSpecificPrameters():void
    {
        
    }

    // --------------
    // public methods
    // --------------

    public override gridToWorld(gridPos:Vec3):Vec3
    {
        let result:Vec3 = v3();
        
        result.x = this._anchor.x + gridPos.x * (this._cell.width + this._gap.x);
        result.y = this._anchor.y + gridPos.y * (this._cell.height + this._gap.y);

        return result;
    }

    public override worldToGrid(wopldPoint:Vec3):Location
    {
        let result:Vec3 = v3();

        result.x = Math.floor((wopldPoint.x - this._anchor.x) / (this._cell.width + this._gap.x));
        result.y = Math.floor((wopldPoint.y - this._anchor.y) / (this._cell.height + this._gap.y));
        
        let position:Position = this._cell.isPointInside(wopldPoint, this.gridToWorld(result), false);
     
        switch (position)
        {
            case Position.IN:
            {
                return new Location(result, Position.IN);
            }
            case Position.OUT:
            default:
            {
                return new Location(null, Position.OUT);
            }
        }
    }

    public override getCellNeighbor(gridPos:Vec3, position:Position):Vec3
    {
        return this.getNeighbor(gridPos, position);
    }

    public override getCellNeighbors(gridPos:Vec3):Map<Position, Vec3>
    {
        return this.getNeighbors(gridPos);
    }
}