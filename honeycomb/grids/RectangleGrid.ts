import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { Cell } from '../abstractions/Cell';
import { Location } from '../enums/Location';
import { IPlacement } from '../placements/IPlacement';
const { ccclass } = _decorator;

// File RectangleGrid.ts created am_empty
// Date of creation Tue Jun 10 2025 22:10:36 GMT+0300 (Москва, стандартное время),

@ccclass('RectangleGrid')
export class RectangleGrid<T extends IPlacement> extends Grid<T>
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
                cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
    {
        super(placementConstructor, cell, anchor, gap);
        
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
        this.neighbors.set(Location.L, v3(-1, 0));
        this.neighbors.set(Location.T, v3(0, 1));
        this.neighbors.set(Location.R, v3(1, 0));
        this.neighbors.set(Location.B, v3(0, -1));
        
        this.diagonals.set(Location.LB, v3(-1, -1));
        this.diagonals.set(Location.LT, v3(-1, 1));
        this.diagonals.set(Location.RT, v3(1, 1));
        this.diagonals.set(Location.RB, v3(1, -1));
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

    public override worldToGrid(wopldPoint:Vec3):T
    {
        let result:Vec3 = v3();

        result.x = Math.floor((wopldPoint.x - this._anchor.x) / (this._cell.width + this._gap.x));
        result.y = Math.floor((wopldPoint.y - this._anchor.y) / (this._cell.height + this._gap.y));
        
        let location:Location = this._cell.isPointInside(wopldPoint, this.gridToWorld(result), false);
     
        switch (location)
        {
            case Location.IN:
            {
                return new this.placementConstructor(result, Location.IN);
            }
            case Location.OUT:
            default:
            {
                return new this.placementConstructor(null, Location.OUT);
            }
        }
    }

    public override getCellNeighbor(gridPos:Vec3, location:Location):Vec3
    {
        return this.getNeighbor(gridPos, location);
    }

    public override getCellNeighbors(gridPos:Vec3):Map<Location, Vec3>
    {
        return this.getNeighbors(gridPos);
    }
}