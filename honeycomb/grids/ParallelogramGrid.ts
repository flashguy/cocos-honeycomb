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
    protected _shift:Vec3 = v3();
    protected _parallelogramGridType:ParallelogramGridType = ParallelogramGridType.NONE;

    constructor(placementConstructor: new (cellPos?:Vec3, location?:Location, index?:number) => T,
                parallelogramType:ParallelogramGridType, cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
    {
        super(placementConstructor, cell, anchor, gap);

        this._parallelogramGridType = parallelogramType;
        this.initialize();
    }

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

    protected override calculateGridSpecificParameters():void
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
            case CellType.ISO_HEXAGON_FLAT:
            case CellType.ISO_HEXAGON_POINTY:
            {
                const offsetX:number = (this._cell.width - this._cell.width * (this._cell as HexagonCell).ISO_RATIO) / 2;
                const offsetY:number = (this._cell.height - this._cell.height * (this._cell as HexagonCell).ISO_RATIO) / 2;

                this._shift.set(offsetX, offsetY);
                break;
            }
        }
    }

    public override gridToWorld(cellPos:Vec3):Vec3
    {
        let result:Vec3 = v3();

        switch (this._parallelogramGridType)
        {
            case ParallelogramGridType.LEFT:
            {
                if (this._cell.type == CellType.ISO_HEXAGON_POINTY)
                {
                    result.x = this._anchor.x + cellPos.x * (this._cell.width - this._shift.x * 2 + this._gap.x) - cellPos.y * (this._cell.width - this._shift.x + this._gap.x);
                    result.y = this._anchor.y + cellPos.x * (this._cell.height - this._shift.y * 2 + this._gap.y) + cellPos.y * (this._shift.y + this._gap.y);
                }
                else
                {
                    result.x = (this._anchor.x + cellPos.x * (this._cell.width + this._gap.x)) - cellPos.y * this._shift.x;
                    result.y = (this._anchor.y + cellPos.y * (this._cell.height + this._gap.y)) - cellPos.y * this._shift.y;
                }
                break;
            }
            case ParallelogramGridType.RIGHT:
            {
                if (this._cell.type == CellType.ISO_HEXAGON_POINTY)
                {
                    result.x = this._anchor.x + cellPos.x * (this._cell.width - this._shift.x * 2 + this._gap.x) - cellPos.y * (this._shift.x + this._gap.x);
                    result.y = this._anchor.y + cellPos.x * (this._cell.height - this._shift.y * 2 + this._gap.y) + cellPos.y * (this._cell.height - this._shift.y + this._gap.y);
                }
                else
                {
                    result.x = (this._anchor.x + cellPos.x * (this._cell.width + this._gap.x)) + cellPos.y * this._shift.x;
                    result.y = (this._anchor.y + cellPos.y * (this._cell.height + this._gap.y)) - cellPos.y * this._shift.y;
                }
                break;
            }
            case ParallelogramGridType.BOTTOM:
            {
                if (this._cell.type == CellType.ISO_HEXAGON_FLAT)
                {
                    result.x = this._anchor.x + cellPos.x * (this._cell.width - this._shift.x + this._gap.x) - cellPos.y * (this._cell.width - this._shift.x * 2 + this._gap.x);
                    result.y = this._anchor.y + cellPos.x * (this._shift.y + this._gap.y) + cellPos.y * (this._cell.height - this._shift.y * 2 + this._gap.y);
                }
                else
                {
                    result.x = (this._anchor.x + cellPos.x * (this._cell.width + this._gap.x)) - cellPos.x * this._shift.x;
                    result.y = (this._anchor.y + cellPos.y * (this._cell.height + this._gap.y)) - cellPos.x * this._shift.y;
                }
                break;
            }
            case ParallelogramGridType.TOP:
            {
                if (this._cell.type == CellType.ISO_HEXAGON_FLAT)
                {
                    result.x = this._anchor.x + cellPos.x * (this._shift.x + this._gap.x) - cellPos.y * (this._cell.width - this._shift.x * 2 + this._gap.x);
                    result.y = this._anchor.y + cellPos.x * (this._cell.height - this._shift.y + this._gap.y) + cellPos.y * (this._cell.height - this._shift.y * 2 + this._gap.y);
                }
                else
                {
                    result.x = (this._anchor.x + cellPos.x * (this._cell.width + this._gap.x)) - cellPos.x * this._shift.x;
                    result.y = (this._anchor.y + cellPos.y * (this._cell.height + this._gap.y)) + cellPos.x * this._shift.y;
                }
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
                if (this._cell.type == CellType.ISO_HEXAGON_POINTY)
                {
                    const a:number = this._cell.width - this._shift.x * 2 + this._gap.x;
                    const b:number = -(this._cell.width - this._shift.x + this._gap.x);
                    const c:number = this._cell.height - this._shift.y * 2 + this._gap.y;
                    const d:number = this._shift.y + this._gap.y;
                    const determinant:number = a * d - b * c;
                    const u:number = wopldPoint.x - this._anchor.x;
                    const v:number = wopldPoint.y - this._anchor.y;

                    const centerX:number = (d * this._cell.halfWidth - b * this._cell.halfHeight) / determinant;
                    const centerY:number = (-c * this._cell.halfWidth + a * this._cell.halfHeight) / determinant;

                    const gridX:number = (d * u - b * v) / determinant - centerX;
                    const gridY:number = (-c * u + a * v) / determinant - centerY;

                    result.set(Math.round(gridX), Math.round(gridY));

                    let cellPos:Vec3 = null;

                    for (let dx = -1; dx <= 1 && cellPos == null; dx++)
                    {
                        for (let dy = -1; dy <= 1 && cellPos == null; dy++)
                        {
                            const candidate:Vec3 = v3(result.x + dx, result.y + dy);

                            if (this._cell.isPointInside(wopldPoint, this.gridToWorld(candidate), false) == Location.IN)
                                cellPos = candidate;
                        }
                    }

                    if (cellPos != null)
                        result = cellPos;
                }
                else
                {
                    result.y = Math.floor((wopldPoint.y - this._anchor.y) / (this._cell.height + this._gap.y - this._shift.y));
                    result.x = Math.floor(((wopldPoint.x - this._anchor.x) + result.y * this._cell.halfWidth) / (this._cell.width + this._gap.x));
                }
                break;
            }
            case ParallelogramGridType.RIGHT:
            {
                if (this._cell.type == CellType.ISO_HEXAGON_POINTY)
                {
                    const a:number = this._cell.width - this._shift.x * 2 + this._gap.x;
                    const b:number = -(this._shift.x + this._gap.x);
                    const c:number = this._cell.height - this._shift.y * 2 + this._gap.y;
                    const d:number = this._cell.height - this._shift.y + this._gap.y;
                    const determinant:number = a * d - b * c;
                    const u:number = wopldPoint.x - this._anchor.x;
                    const v:number = wopldPoint.y - this._anchor.y;

                    const centerX:number = (d * this._cell.halfWidth - b * this._cell.halfHeight) / determinant;
                    const centerY:number = (-c * this._cell.halfWidth + a * this._cell.halfHeight) / determinant;

                    const gridX:number = (d * u - b * v) / determinant - centerX;
                    const gridY:number = (-c * u + a * v) / determinant - centerY;

                    result.set(Math.round(gridX), Math.round(gridY));

                    let cellPos:Vec3 = null;

                    for (let dx = -1; dx <= 1 && cellPos == null; dx++)
                    {
                        for (let dy = -1; dy <= 1 && cellPos == null; dy++)
                        {
                            const candidate:Vec3 = v3(result.x + dx, result.y + dy);

                            if (this._cell.isPointInside(wopldPoint, this.gridToWorld(candidate), false) == Location.IN)
                                cellPos = candidate;
                        }
                    }

                    if (cellPos != null)
                        result = cellPos;
                }
                else
                {
                    result.y = Math.floor((wopldPoint.y - this._anchor.y) / (this._cell.height + this._gap.y - this._shift.y));
                    result.x = Math.floor(((wopldPoint.x - this._anchor.x) - result.y * this._cell.halfWidth) / (this._cell.width + this._gap.x));
                }
                break;
            }
            case ParallelogramGridType.BOTTOM:
            {
                if (this._cell.type == CellType.ISO_HEXAGON_FLAT)
                {
                    const a:number = this._cell.width - this._shift.x + this._gap.x;
                    const b:number = -(this._cell.width - this._shift.x * 2 + this._gap.x);
                    const c:number = this._shift.y + this._gap.y;
                    const d:number = this._cell.height - this._shift.y * 2 + this._gap.y;
                    const determinant:number = a * d - b * c;
                    const u:number = wopldPoint.x - this._anchor.x;
                    const v:number = wopldPoint.y - this._anchor.y;

                    const centerX:number = (d * this._cell.halfWidth - b * this._cell.halfHeight) / determinant;
                    const centerY:number = (-c * this._cell.halfWidth + a * this._cell.halfHeight) / determinant;

                    const gridX:number = (d * u - b * v) / determinant - centerX;
                    const gridY:number = (-c * u + a * v) / determinant - centerY;

                    result.set(Math.round(gridX), Math.round(gridY));

                    let cellPos:Vec3 = null;

                    for (let dx = -1; dx <= 1 && cellPos == null; dx++)
                    {
                        for (let dy = -1; dy <= 1 && cellPos == null; dy++)
                        {
                            const candidate:Vec3 = v3(result.x + dx, result.y + dy);

                            if (this._cell.isPointInside(wopldPoint, this.gridToWorld(candidate), false) == Location.IN)
                                cellPos = candidate;
                        }
                    }

                    if (cellPos != null)
                        result = cellPos;
                }
                else
                {
                    result.x = Math.floor((wopldPoint.x - this._anchor.x) / (this._cell.width + this._gap.x - this._shift.x));
                    result.y = Math.floor(((wopldPoint.y - this._anchor.y) + result.x * this._cell.halfHeight) / (this._cell.height + this._gap.y));
                }
                break;
            }
            case ParallelogramGridType.TOP:
            {
                if (this._cell.type == CellType.ISO_HEXAGON_FLAT)
                {
                    const a:number = this._shift.x + this._gap.x;
                    const b:number = -(this._cell.width - this._shift.x * 2 + this._gap.x);
                    const c:number = this._cell.height - this._shift.y + this._gap.y;
                    const d:number = this._cell.height - this._shift.y * 2 + this._gap.y;
                    const determinant:number = a * d - b * c;
                    const u:number = wopldPoint.x - this._anchor.x;
                    const v:number = wopldPoint.y - this._anchor.y;

                    const centerX:number = (d * this._cell.halfWidth - b * this._cell.halfHeight) / determinant;
                    const centerY:number = (-c * this._cell.halfWidth + a * this._cell.halfHeight) / determinant;

                    const gridX:number = (d * u - b * v) / determinant - centerX;
                    const gridY:number = (-c * u + a * v) / determinant - centerY;

                    result.set(Math.round(gridX), Math.round(gridY));

                    let cellPos:Vec3 = null;

                    for (let dx = -1; dx <= 1 && cellPos == null; dx++)
                    {
                        for (let dy = -1; dy <= 1 && cellPos == null; dy++)
                        {
                            const candidate:Vec3 = v3(result.x + dx, result.y + dy);

                            if (this._cell.isPointInside(wopldPoint, this.gridToWorld(candidate), false) == Location.IN)
                                cellPos = candidate;
                        }
                    }

                    if (cellPos != null)
                        result = cellPos;
                }
                else
                {
                    result.x = Math.floor((wopldPoint.x - this._anchor.x) / (this._cell.width + this._gap.x - this._shift.x));
                    result.y = Math.floor(((wopldPoint.y - this._anchor.y) - result.x * this._cell.halfHeight) / (this._cell.height + this._gap.y));
                }
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

    public override getCellNeighbor(cellPos:Vec3, location:Location):Vec3
    {
        return this.getNeighbor(cellPos, location);
    }

    public override getCellNeighbors(cellPos:Vec3):Map<Location, Vec3>
    {
        return this.getNeighbors(cellPos);
    }
}