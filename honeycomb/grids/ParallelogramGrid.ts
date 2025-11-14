import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { ParallelogramGridType } from '../enums/ParallelogramGridType';
import { Cell } from '../abstractions/Cell';
import { Location } from '../enums/Location';
import { CellType } from '../enums/CellType';
import { HexagonCell } from '../cells/HexagonCell';
import { IPlacement } from '../placements/IPlacement';
const { ccclass } = _decorator;

@ccclass('ParallelogramGrid')
export class ParallelogramGrid<T extends IPlacement> extends Grid<T>
{
    // ----------------------------------------
    // private properties / getters and setters
    // ----------------------------------------



    // ------------------------------------------
    // protected properties / getters and setters
    // ------------------------------------------

    protected _shift:Vec3 = v3();
    protected _parallelogramGridType:ParallelogramGridType = ParallelogramGridType.NONE;

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------



    constructor(placementConstructor: new (gridPos?:Vec3, location?:Location, index?:number) => T,
                parallelogramType:ParallelogramGridType, cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
    {
        super(placementConstructor, cell, anchor, gap);

        this._parallelogramGridType = parallelogramType;
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
        switch (this._parallelogramGridType)
        {
            case ParallelogramGridType.LEFT:
            {
                if (this._cell.type == CellType.RHOMB)
                {
                    this.neighbors.set(Location.LB, v3(-1, -1));
                    this.neighbors.set(Location.LT, v3(0, 1));
                    this.neighbors.set(Location.RT, v3(1, 1));
                    this.neighbors.set(Location.RB, v3(0, -1));
                }
                else
                {
                    this.neighbors.set(Location.LB, v3(-1, -1));
                    this.neighbors.set(Location.L, v3(-1, 0));
                    this.neighbors.set(Location.LT, v3(0, 1));
                    this.neighbors.set(Location.RT, v3(1, 1));
                    this.neighbors.set(Location.R, v3(1, 0));
                    this.neighbors.set(Location.RB, v3(0, -1));
                }
                break;
            }
            case ParallelogramGridType.RIGHT:
            {
                if (this._cell.type == CellType.RHOMB)
                {
                    this.neighbors.set(Location.LB, v3(0, -1));
                    this.neighbors.set(Location.LT, v3(-1, 1));
                    this.neighbors.set(Location.RT, v3(0, -1));
                    this.neighbors.set(Location.RB, v3(1, -1));
                }
                else
                {
                    this.neighbors.set(Location.LB, v3(0, -1));
                    this.neighbors.set(Location.L, v3(-1, 0));
                    this.neighbors.set(Location.LT, v3(-1, 1));
                    this.neighbors.set(Location.RT, v3(0, 1));
                    this.neighbors.set(Location.R, v3(1, 0));
                    this.neighbors.set(Location.RB, v3(1, -1));
                }
                break;
            }
            case ParallelogramGridType.BOTTOM:
            {
                if (this._cell.type == CellType.RHOMB)
                {
                    this.neighbors.set(Location.LB, v3(-1, -1));
                    this.neighbors.set(Location.LT, v3(-1, 0));
                    this.neighbors.set(Location.RT, v3(1, 1));
                    this.neighbors.set(Location.RB, v3(1, 0));
                }
                else
                {
                    this.neighbors.set(Location.LB, v3(1, -1));
                    this.neighbors.set(Location.LT, v3(-1, 0));
                    this.neighbors.set(Location.T, v3(0, 1));
                    this.neighbors.set(Location.RT, v3(1, 1));
                    this.neighbors.set(Location.RB, v3(1, 0));
                    this.neighbors.set(Location.B, v3(0, -1));
                }
                break;
            }
            case ParallelogramGridType.TOP:
            {
                if (this._cell.type == CellType.RHOMB)
                {
                    this.neighbors.set(Location.LB, v3(-1, 0));
                    this.neighbors.set(Location.LT, v3(-1, 1));
                    this.neighbors.set(Location.RT, v3(1, 0));
                    this.neighbors.set(Location.RB, v3(1, -1));
                }
                else
                {
                    this.neighbors.set(Location.LB, v3(-1, 0));
                    this.neighbors.set(Location.LT, v3(-1, 1));
                    this.neighbors.set(Location.T, v3(0, 1));
                    this.neighbors.set(Location.RT, v3(1, 0));
                    this.neighbors.set(Location.RB, v3(1, -1));
                    this.neighbors.set(Location.B, v3(0, 1));
                }
                break;
            }
        }
    }

    protected override calculateGridSpecificPrameters():void
    {
        switch (this._cell.type)
        {
            case CellType.RECTANGLE:
            {
                switch (this._parallelogramGridType)
                {
                    case ParallelogramGridType.LEFT:
                    case ParallelogramGridType.RIGHT:
                    {
                        this._shift.set(this._cell.halfWidth, 0);
                        break;
                    }
                    case ParallelogramGridType.BOTTOM:
                    case ParallelogramGridType.TOP:
                    {
                        this._shift.set(0, this._cell.halfHeight);
                        break;
                    }
                }

                break;
            }
            case CellType.ELLIPSE:
            {
                switch (this._parallelogramGridType)
                {
                    case ParallelogramGridType.LEFT:
                    case ParallelogramGridType.RIGHT:
                    {
                        const median:number = this._cell.height * (Math.sqrt(3) / 2);
                        this._shift.set(this._cell.halfWidth, this._cell.height - median);
                        break;
                    }
                    case ParallelogramGridType.BOTTOM:
                    case ParallelogramGridType.TOP:
                    {
                        const median:number = this._cell.width * (Math.sqrt(3) / 2);
                        this._shift.set(this._cell.width - median, this._cell.halfHeight);
                        break;
                    }
                }

                break;
            }
            case CellType.HEXAGON_FLAT:
            {
                switch (this._parallelogramGridType)
                {
                    case ParallelogramGridType.LEFT:
                    case ParallelogramGridType.RIGHT:
                    {
                        this._shift.set(this._cell.halfWidth, 0);
                        break;
                    }
                    case ParallelogramGridType.BOTTOM:
                    case ParallelogramGridType.TOP:
                    {
                        this._shift.set((this._cell as HexagonCell).side / 2, this._cell.halfHeight);
                        break;
                    }
                }

                break;
            }
            case CellType.HEXAGON_POINTY:
            {
                switch (this._parallelogramGridType)
                {
                    case ParallelogramGridType.LEFT:
                    case ParallelogramGridType.RIGHT:
                    {
                        this._shift.set(this._cell.halfWidth, (this._cell as HexagonCell).side / 2);
                        break;
                    }
                    case ParallelogramGridType.BOTTOM:
                    case ParallelogramGridType.TOP:
                    {
                        this._shift.set(0, this._cell.halfHeight);
                        break;
                    }
                }

                break;
            }
            case CellType.RHOMB:
            {
                this._shift.set(this._cell.halfWidth, this._cell.halfHeight);

                break;
            }
            // case CellType.ISO_HEXAGON_FLAT:
            // {
            //     const offsetX0:number = (this._cell.width - this._cell.width * (this._cell as HexagonCell).ISO_RATIO) / 2;
            //     const offsetY0:number = (this._cell.height - this._cell.height * (this._cell as HexagonCell).ISO_RATIO) / 2;

            //     const offsetX:number = ((this._cell.width * (this._cell as HexagonCell).ISO_RATIO) / 2)/*  - offsetX0 */;
            //     const offsetY:number = ((this._cell.height * (this._cell as HexagonCell).ISO_RATIO) / 2)/*  + offsetY0 */;
                
            //     this._shift.set(offsetX0, offsetY0);

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

        switch (this._parallelogramGridType)
        {
            case ParallelogramGridType.LEFT:
            {
                result.x = (this._anchor.x + gridPos.x * (this._cell.width + this._gap.x)) - gridPos.y * this._shift.x;
                result.y = (this._anchor.y + gridPos.y * (this._cell.height + this._gap.y)) - gridPos.y * this._shift.y;
                break;
            }
            case ParallelogramGridType.RIGHT:
            {
                result.x = (this._anchor.x + gridPos.x * (this._cell.width + this._gap.x)) + gridPos.y * this._shift.x;
                result.y = (this._anchor.y + gridPos.y * (this._cell.height + this._gap.y)) - gridPos.y * this._shift.y;
                break;
            }
            case ParallelogramGridType.BOTTOM:
            {
                if (this._cell.type == CellType.ISO_HEXAGON_FLAT)
                {
                    result.x = (this._anchor.x + gridPos.x * (this._cell.width + this._gap.x)) - gridPos.x * this._shift.x;
                    result.y = (this._anchor.y + gridPos.y * (this._cell.height + this._gap.y)) - gridPos.x * this._shift.y;
                }
                else
                {
                    result.x = (this._anchor.x + gridPos.x * (this._cell.width + this._gap.x)) - gridPos.x * this._shift.x;
                    result.y = (this._anchor.y + gridPos.y * (this._cell.height + this._gap.y)) - gridPos.x * this._shift.y;
                }
                break;
            }
            case ParallelogramGridType.TOP:
            {
                // if (this._cell.type == CellType.ISO_HEXAGON_FLAT)
                // {
                //     // result.x = (this._anchor.x + gridPos.x * (this._cell.width + this._gap.x)) - gridPos.x * this._shift.x + gridPos.y * this._shift.x;
                //     // result.y = (this._anchor.y + gridPos.y * (this._cell.height + this._gap.y)) + (gridPos.x - gridPos.y) * this._shift.y;

                //     result.x = (this._anchor.x + gridPos.x * (this._cell.width + this._gap.x)) - gridPos.x * this._shift.x;
                //     result.y = (this._anchor.y + gridPos.y * (this._cell.height + this._gap.y)) + gridPos.x * this._shift.y;
                // }
                // else
                // {
                    result.x = (this._anchor.x + gridPos.x * (this._cell.width + this._gap.x)) - gridPos.x * this._shift.x;
                    result.y = (this._anchor.y + gridPos.y * (this._cell.height + this._gap.y)) + gridPos.x * this._shift.y;
                // }
                break;
            }
        }
        
        return result;
    }

    public override worldToGrid(wopldPoint:Vec3):T
    {
        let result:Vec3 = v3();
        let location:Location;
        let placement:T = new this.placementConstructor(null, Location.OUT);

        switch (this._parallelogramGridType)
        {
            case ParallelogramGridType.LEFT:
            {
                result.y = Math.floor((wopldPoint.y - this._anchor.y) / (this._cell.height + this._gap.y - this._shift.y));
                result.x = Math.floor(((wopldPoint.x - this._anchor.x) + result.y * this._cell.halfWidth) / (this._cell.width + this._gap.x));
                break;
            }
            case ParallelogramGridType.RIGHT:
            {
                result.y = Math.floor((wopldPoint.y - this._anchor.y) / (this._cell.height + this._gap.y - this._shift.y));
                result.x = Math.floor(((wopldPoint.x - this._anchor.x) - result.y * this._cell.halfWidth) / (this._cell.width + this._gap.x));
                break;
            }
            case ParallelogramGridType.BOTTOM:
            {
                result.x = Math.floor((wopldPoint.x - this._anchor.x) / (this._cell.width + this._gap.x - this._shift.x));
                result.y = Math.floor(((wopldPoint.y - this._anchor.y) + result.x * this._cell.halfHeight) / (this._cell.height + this._gap.y));
                break;
            }
            case ParallelogramGridType.TOP:
            {
                result.x = Math.floor((wopldPoint.x - this._anchor.x) / (this._cell.width + this._gap.x - this._shift.x));
                result.y = Math.floor(((wopldPoint.y - this._anchor.y) - result.x * this._cell.halfHeight) / (this._cell.height + this._gap.y));
                break;
            }
        }

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