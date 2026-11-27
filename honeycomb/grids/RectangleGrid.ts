import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { Cell } from '../abstractions/Cell';
import { Location } from '../enums/Location';
import { HitResult } from '../enums/HitResult';
import { IPlacement } from '../placements/IPlacement';
const { ccclass } = _decorator;

@ccclass('RectangleGrid')
export class RectangleGrid<T extends IPlacement> extends Grid<T>
{
    constructor(placementConstructor: new (cellPos?:Vec3, hit?:HitResult, index?:number) => T,
                cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
    {
        super(placementConstructor, cell, anchor, gap);
        
        this.initialize();
    }

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

    protected override calculateGridSpecificParameters():void
    {
        
    }

    public override gridToWorld(cellPos:Vec3, out?:Vec3):Vec3
    {
        let result:Vec3 = out ?? v3();
        
        result.x = this._anchor.x + cellPos.x * (this._cell.width + this._gap.x);
        result.y = this._anchor.y + cellPos.y * (this._cell.height + this._gap.y);

        return result;
    }

    public override worldToGrid(worldPoint:Vec3):T
    {
        let result:Vec3 = v3();

        result.x = Math.floor((worldPoint.x - this._anchor.x) / (this._cell.width + this._gap.x));
        result.y = Math.floor((worldPoint.y - this._anchor.y) / (this._cell.height + this._gap.y));
        
        const hitResult:HitResult | Location = this._cell.isPointInside(worldPoint, this.gridToWorld(result, this._gridToWorldScratch), false);

        if (hitResult == HitResult.IN)
            return new this.placementConstructor(result, HitResult.IN);
        else
            return new this.placementConstructor(null, HitResult.OUT);
    }

    public override getCellNeighbor(cellPos:Vec3, location:Location):Vec3
    {
        return this.getNeighbor(cellPos, location);
    }

    public override getCellNeighbors(cellPos:Vec3):Map<Location, Vec3>
    {
        return this.getNeighbors(cellPos);
    }
}