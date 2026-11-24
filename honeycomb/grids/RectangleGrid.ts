import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { Cell } from '../abstractions/Cell';
import { Location } from '../enums/Location';
import { IPlacement } from '../placements/IPlacement';
import { CellType } from '../enums/CellType';
import { ParallelogramCell } from '../cells/ParallelogramCell';
const { ccclass } = _decorator;

@ccclass('RectangleGrid')
export class RectangleGrid<T extends IPlacement> extends Grid<T>
{
    protected _shift:Vec3 = v3();

    constructor(placementConstructor: new (cellPos?:Vec3, location?:Location, index?:number) => T,
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

    protected override calculateGridSpecificPrameters():void
    {
        switch (this._cell.type)
        {
            case CellType.PARALLELOGRAM_TOP:
            case CellType.PARALLELOGRAM_BOTTOM:
            {
                this._shift.set(this._cell.width * (this._cell as ParallelogramCell).widthSkew,
                                this._cell.height * (this._cell as ParallelogramCell).heightSkew,
                                0);
                break;
            }
            default:
            {
                break;
            }
        }
    }

    public override gridToWorld(cellPos:Vec3):Vec3
    {
        let result:Vec3 = v3();
        
        switch (this._cell.type)
        {
            case CellType.PARALLELOGRAM_TOP:
            {
                result.x = this._anchor.x + cellPos.x * (this._cell.width - this._shift.x + this._gap.x) - cellPos.y * this._shift.x;
                result.y = this._anchor.y + cellPos.y * (this._cell.height - this._shift.y + this._gap.y) + cellPos.x * this._shift.y;
                break;
            }
            case CellType.PARALLELOGRAM_BOTTOM:
            {
                result.x = this._anchor.x + cellPos.x * (this._cell.width - this._shift.x + this._gap.x) + cellPos.y * this._shift.x;
                result.y = this._anchor.y + cellPos.y * (this._cell.height - this._shift.y + this._gap.y) - cellPos.x * this._shift.y;
                break;
            }
            default:
            {
                result.x = this._anchor.x + cellPos.x * (this._cell.width + this._gap.x);
                result.y = this._anchor.y + cellPos.y * (this._cell.height + this._gap.y);
            }
        }

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

    public override getCellNeighbor(cellPos:Vec3, location:Location):Vec3
    {
        return this.getNeighbor(cellPos, location);
    }

    public override getCellNeighbors(cellPos:Vec3):Map<Location, Vec3>
    {
        return this.getNeighbors(cellPos);
    }
}