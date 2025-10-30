import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { Cell } from '../abstractions/Cell';
import { Position } from '../enums/Position';
import { RhombGridType } from '../enums/RhombGridType';
import { CellType } from '../enums/CellType';
import { HexagonCell } from '../cells/HexagonCell';
import { ILocation } from '../locations/ILocation';
const { ccclass } = _decorator;

// File RhombGrid.ts created am_empty
// Date of creation Wed Oct 08 2025 20:57:59 GMT+0300 (Москва, стандартное время),

@ccclass('RhombGrid')
export class RhombGrid<T extends ILocation> extends Grid<T>
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



    constructor(locationConstructor: new (gridPos?:Vec3, position?:Position, index?:number) => T,
                rhombType:RhombGridType, cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
    {
        super(locationConstructor, cell, anchor, gap);

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
            this.neighbors.set(Position.LB, v3(-1, 0));
            this.neighbors.set(Position.LT, v3(0, 1));
            this.neighbors.set(Position.RT, v3(1, 0));
            this.neighbors.set(Position.RB, v3(0, -1));
        }
        else
        {
            this.neighbors.set(Position.B, v3(-1, -1));
            this.neighbors.set(Position.LB, v3(-1, 0));
            this.neighbors.set(Position.LT, v3(0, 1));
            this.neighbors.set(Position.T, v3(1, 1));
            this.neighbors.set(Position.RT, v3(1, 0));
            this.neighbors.set(Position.RB, v3(0, -1));
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
        let position:Position;
        let location:T = new this.locationConstructor(null, Position.OUT);

        // работет без _anchor и _gap
        // result.x = Math.floor((wopldPoint.y / this._shift.y + (wopldPoint.x - this._shift.x) / this._shift.x) * 0.5);
        // result.y = Math.floor((wopldPoint.y / this._shift.y - (wopldPoint.x - this._shift.x) / this._shift.x) * 0.5);

        const shiftWithGap:Vec3 = this._shift.clone().add(this._gap); // добавляем _gap
        const wopldPointWithAnchor:Vec3 = wopldPoint.clone().subtract(this._anchor); // добавляем _anchor

        result.x = Math.floor((wopldPointWithAnchor.y / shiftWithGap.y + (wopldPointWithAnchor.x - shiftWithGap.x) / shiftWithGap.x) * 0.5);
        result.y = Math.floor((wopldPointWithAnchor.y / shiftWithGap.y - (wopldPointWithAnchor.x - shiftWithGap.x) / shiftWithGap.x) * 0.5);

        position = this._cell.isPointInside(wopldPoint, this.gridToWorld(result), true);

        switch (position)
        {
            case Position.IN:
            {
                location = new this.locationConstructor(result, Position.IN);
                break;
            }
            default:
            {
                result.add(this.neighbors.get(position));

                position = this._cell.isPointInside(wopldPoint, this.gridToWorld(result), false); // Эта проверка нужна если между ячейками есть отступ
                
                if (position == Position.IN)
                    location = new this.locationConstructor(result, Position.IN);

                break;
            }
        }

        return location;
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