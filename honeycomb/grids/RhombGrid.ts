import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { Cell } from '../abstractions/Cell';
import { Location } from '../enums/Location';
import { RhombGridType } from '../enums/RhombGridType';
import { CellType } from '../enums/CellType';
import { HexagonCell } from '../cells/HexagonCell';
import { IPlacement } from '../placements/IPlacement';
const { ccclass } = _decorator;

@ccclass('RhombGrid')
export class RhombGrid<T extends IPlacement> extends Grid<T>
{
    // ----------------------------------------
    // private properties / getters and setters
    // ----------------------------------------



    // ------------------------------------------
    // protected properties / getters and setters
    // ------------------------------------------

    protected _shift:Vec3 = v3();
    protected _rhombGridType:RhombGridType = RhombGridType.NONE;

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------



    constructor(placementConstructor: new (gridPos?:Vec3, location?:Location, index?:number) => T,
                rhombType:RhombGridType, cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
    {
        super(placementConstructor, cell, anchor, gap);

        this._rhombGridType = rhombType;
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
        if (this._cell.type == CellType.RHOMB)
        {
            this.neighbors.set(Location.LB, v3(-1, 0));
            this.neighbors.set(Location.LT, v3(0, 1));
            this.neighbors.set(Location.RT, v3(1, 0));
            this.neighbors.set(Location.RB, v3(0, -1));
        }
        else
        {
            this.neighbors.set(Location.B, v3(-1, -1));
            this.neighbors.set(Location.LB, v3(-1, 0));
            this.neighbors.set(Location.LT, v3(0, 1));
            this.neighbors.set(Location.T, v3(1, 1));
            this.neighbors.set(Location.RT, v3(1, 0));
            this.neighbors.set(Location.RB, v3(0, -1));
        }
    }

    protected override calculateGridSpecificPrameters():void
    {
        switch (this._cell.type)
        {
            case CellType.RECTANGLE:
            {
                if (this._rhombGridType == RhombGridType.HORIZONTAL)
                    this._shift.set(this._cell.width, this._cell.halfHeight);
                else if (this._rhombGridType == RhombGridType.VERTICAL)
                    this._shift.set(this._cell.halfWidth, this._cell.height);

                break;
            }
            case CellType.ELLIPSE:
            {
                if (this._rhombGridType == RhombGridType.HORIZONTAL)
                {
                    const medianByWidth = this._cell.width * (Math.sqrt(3) / 2);
                    this._shift.set(medianByWidth, this._cell.halfHeight);
                }
                else if (this._rhombGridType == RhombGridType.VERTICAL)
                {
                    const medianByHeight = this._cell.height * (Math.sqrt(3) / 2);
                    this._shift.set(this._cell.halfWidth, medianByHeight);
                }

                break;
            }
            case CellType.HEXAGON_FLAT:
            {
                this._shift.set(this._cell.width - (this._cell as HexagonCell).side / 2, this._cell.halfHeight);

                break;
            }
            case CellType.HEXAGON_POINTY:
            {
                this._shift.set(this._cell.halfWidth, this._cell.height - (this._cell as HexagonCell).side / 2);

                break;
            }
            case CellType.RHOMB:
            {
                this._shift.set(this._cell.halfWidth, this._cell.halfHeight);
                break;
            }
            // case CellType.ISO_HEXAGON_FLAT:
            // {
            //     const offsetX:number = (this._cell.width * (this._cell as HexagonCell).ISO_RATIO) / 2;
            //     const offsetY:number = (this._cell.height * (this._cell as HexagonCell).ISO_RATIO) / 2;
            //     this._shift.set(offsetX, offsetY);
            //     break;
            // }
        }
    }

    // --------------
    // public methods
    // --------------

    public override gridToWorld(gridPos:Vec3):Vec3
    {
        let result:Vec3 = v3();

        result.x = this._anchor.x + (gridPos.x - gridPos.y) * (this._shift.x + this._gap.x);
        result.y = this._anchor.y + (gridPos.x + gridPos.y) * (this._shift.y + this._gap.y);

        return result;
    }

    public override worldToGrid(wopldPoint:Vec3):T
    {
        let result:Vec3 = v3();
        let location:Location;
        let placement:T = new this.placementConstructor(null, Location.OUT);

        // работет без _anchor и _gap
        // result.x = Math.floor((wopldPoint.y / this._shift.y + (wopldPoint.x - this._shift.x) / this._shift.x) * 0.5);
        // result.y = Math.floor((wopldPoint.y / this._shift.y - (wopldPoint.x - this._shift.x) / this._shift.x) * 0.5);

        const shiftWithGap:Vec3 = this._shift.clone().add(this._gap); // добавляем _gap
        const wopldPointWithAnchor:Vec3 = wopldPoint.clone().subtract(this._anchor); // добавляем _anchor

        result.x = Math.floor((wopldPointWithAnchor.y / shiftWithGap.y + (wopldPointWithAnchor.x - shiftWithGap.x) / shiftWithGap.x) * 0.5);
        result.y = Math.floor((wopldPointWithAnchor.y / shiftWithGap.y - (wopldPointWithAnchor.x - shiftWithGap.x) / shiftWithGap.x) * 0.5);

        location = this._cell.isPointInside(wopldPoint, this.gridToWorld(result), true);

        switch (location)
        {
            case Location.IN:
            {
                placement = new this.placementConstructor(result, Location.IN);
                break;
            }
            default:
            {
                result.add(this.neighbors.get(location));

                location = this._cell.isPointInside(wopldPoint, this.gridToWorld(result), false); // Эта проверка нужна если между ячейками есть отступ
                
                if (location == Location.IN)
                    placement = new this.placementConstructor(result, Location.IN);

                break;
            }
        }

        return placement;
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