import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { Cell } from '../abstractions/Cell';
import { Location } from '../enums/Location';
import { HitResult } from '../enums/HitResult';
import { RhombGridType } from '../enums/RhombGridType';
import { CellType } from '../enums/CellType';
import { HexagonCell } from '../cells/HexagonCell';
import { IPlacement } from '../placements/IPlacement';
const { ccclass } = _decorator;

@ccclass('RhombGrid')
export class RhombGrid<T extends IPlacement> extends Grid<T>
{
    protected _shift:Vec3 = v3();
    protected _rhombGridType:RhombGridType = RhombGridType.NONE;

    constructor(placementConstructor: new (cellPos?:Vec3, hit?:HitResult, index?:number) => T,
                rhombType:RhombGridType, cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
    {
        super(placementConstructor, cell, anchor, gap);

        this._rhombGridType = rhombType;
        this.initialize();
    }

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

    protected override calculateGridSpecificParameters():void
    {
        switch (this._cell.type)
        {
            case CellType.RECTANGLE:
            {
                if (this._rhombGridType == RhombGridType.HORIZONTAL)
                {
                    this._shift.set(this._cell.width, this._cell.halfHeight);
                }
                else if (this._rhombGridType == RhombGridType.VERTICAL)
                {
                    this._shift.set(this._cell.halfWidth, this._cell.height);
                }

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

    public override gridToWorld(cellPos:Vec3, out?:Vec3):Vec3
    {
        let result:Vec3 = out ?? v3();

        if (this._cell.type == CellType.ISO_HEXAGON_FLAT)
        {
            result.x = this._anchor.x + (cellPos.x - cellPos.y) * (this._shift.x + this._gap.x) + cellPos.y * (this._shift.x * 2 - this._cell.width - this._gap.x);
            result.y = this._anchor.y + (cellPos.x - cellPos.y) * (this._cell.height - this._shift.y + this._gap.y) + cellPos.y * (this._cell.height - this._shift.y * 2 + this._gap.y);
        }
        else if (this._cell.type == CellType.ISO_HEXAGON_POINTY)
        {
            result.x = this._anchor.x + (cellPos.x + cellPos.y) * (this._shift.x - this._cell.width - this._gap.x) + cellPos.x * (this._cell.width - this._shift.x * 2 + this._gap.x);
            result.y = this._anchor.y + (cellPos.x + cellPos.y) * (this._shift.y + this._gap.y) + cellPos.x * (this._cell.height - this._shift.y * 2 + this._gap.y);
        }
        else
        {
            result.x = this._anchor.x + (cellPos.x - cellPos.y) * (this._shift.x + this._gap.x);
            result.y = this._anchor.y + (cellPos.x + cellPos.y) * (this._shift.y + this._gap.y);
        }

        return result;
    }

    public override worldToGrid(worldPoint:Vec3):T
    {
        let result:Vec3 = v3();
        let hitResult:HitResult | Location;
        let placement:T = new this.placementConstructor(null, HitResult.OUT);

        if (this._cell.type == CellType.ISO_HEXAGON_FLAT)
        {
            const a:number = this._shift.x + this._gap.x;
            const b:number = this._shift.x * 2 - this._cell.width - this._gap.x;
            const c:number = this._cell.height - this._shift.y + this._gap.y;
            const d:number = this._cell.height - this._shift.y * 2 + this._gap.y;
            const determinant:number = a * d - b * c;
            const u:number = worldPoint.x - this._anchor.x;
            const v:number = worldPoint.y - this._anchor.y;

            const centerX:number = (d * this._cell.halfWidth - b * this._cell.halfHeight) / determinant;
            const centerY:number = (-c * this._cell.halfWidth + a * this._cell.halfHeight) / determinant;

            const gridY:number = (a * v - c * u) / determinant - centerY;
            const gridX:number = (d * u - b * v) / determinant + (a * v - c * u) / determinant - centerX - centerY; // x = (x - y) + y

            result.set(Math.round(gridX), Math.round(gridY));

            let cellPos:Vec3 = null;

            for (let dx = -1; dx <= 1 && cellPos == null; dx++)
            {
                for (let dy = -1; dy <= 1 && cellPos == null; dy++)
                {
                    const candidate:Vec3 = v3(result.x + dx, result.y + dy);

                    if (this._cell.isPointInside(worldPoint, this.gridToWorld(candidate), false) == HitResult.IN)
                        cellPos = candidate;
                }
            }

            if (cellPos != null)
                result = cellPos;
        }
        else if (this._cell.type == CellType.ISO_HEXAGON_POINTY)
        {
            const a:number = this._shift.x - this._cell.width - this._gap.x;
            const b:number = this._cell.width - this._shift.x * 2 + this._gap.x;
            const c:number = this._shift.y + this._gap.y;
            const d:number = this._cell.height - this._shift.y * 2 + this._gap.y;
            const determinant:number = a * d - b * c;
            const u:number = worldPoint.x - this._anchor.x;
            const v:number = worldPoint.y - this._anchor.y;

            const centerS:number = (d * this._cell.halfWidth - b * this._cell.halfHeight) / determinant;
            const centerX:number = (a * this._cell.halfHeight - c * this._cell.halfWidth) / determinant;

            const gridX:number = (a * v - c * u) / determinant - centerX;
            const gridS:number = (d * u - b * v) / determinant - centerS;
            const gridY:number = gridS - gridX; // y = (x + y) - x

            result.set(Math.round(gridX), Math.round(gridY));

            let cellPos:Vec3 = null;

            for (let dx = -1; dx <= 1 && cellPos == null; dx++)
            {
                for (let dy = -1; dy <= 1 && cellPos == null; dy++)
                {
                    const candidate:Vec3 = v3(result.x + dx, result.y + dy);

                    if (this._cell.isPointInside(worldPoint, this.gridToWorld(candidate), false) == HitResult.IN)
                        cellPos = candidate;
                }
            }

            if (cellPos != null)
                result = cellPos;
        }
        else
        {
            const shiftWithGap:Vec3 = this._shift.clone().add(this._gap); // добавляем _gap
            const worldPointWithAnchor:Vec3 = worldPoint.clone().subtract(this._anchor); // добавляем _anchor

            result.x = Math.floor((worldPointWithAnchor.y / shiftWithGap.y + (worldPointWithAnchor.x - shiftWithGap.x) / shiftWithGap.x) * 0.5);
            result.y = Math.floor((worldPointWithAnchor.y / shiftWithGap.y - (worldPointWithAnchor.x - shiftWithGap.x) / shiftWithGap.x) * 0.5);
        }

        hitResult = this._cell.isPointInside(worldPoint, this.gridToWorld(result), true);

        switch (hitResult)
        {
            case HitResult.IN:
            {
                placement = new this.placementConstructor(result, HitResult.IN);
                break;
            }
            default:
            {
                if (hitResult != HitResult.OUT)
                    result.add(this.neighbors.get(hitResult));

                hitResult = this._cell.isPointInside(worldPoint, this.gridToWorld(result), false); // Эта проверка нужна если между ячейками есть отступ

                if (hitResult == HitResult.IN)
                    placement = new this.placementConstructor(result, HitResult.IN);

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