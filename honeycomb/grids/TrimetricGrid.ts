import { _decorator, v3, Vec3 } from 'cc';
import { Cell } from '../abstractions/Cell';
import { Location } from '../enums/Location';
import { HitResult } from '../enums/HitResult';
import { IPlacement } from '../placements/IPlacement';
import { CellType } from '../enums/CellType';
import { ParallelogramCell } from '../cells/ParallelogramCell';
import { RectangleGrid } from './RectangleGrid';
const { ccclass } = _decorator;

@ccclass('TrimetricGrid')
export class TrimetricGrid<T extends IPlacement> extends RectangleGrid<T>
{
    constructor(placementConstructor: new (cellPos?:Vec3, hit?:HitResult, index?:number) => T,
                cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
    {
        super(placementConstructor, cell, anchor, gap);
    }

    protected override calculateGridSpecificParameters():void
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
            case CellType.RHOMB:
            {
                this._shift.set(this._cell.halfWidth, this._cell.halfHeight);
                break;
            }
            case CellType.RECTANGLE:
            {
                this._shift.set(0, 0);
                break;
            }
            default:
            {
                break;
            }
        }
    }

    public override gridToWorld(cellPos:Vec3, out?:Vec3):Vec3
    {
        let result:Vec3 = out ?? v3();
        
        switch (this._cell.type)
        {
            case CellType.PARALLELOGRAM_TOP:
            case CellType.RHOMB:
            case CellType.RECTANGLE:
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
                break;
            }
        }

        return result;
    }

    public override worldToGrid(worldPoint:Vec3):T
    {
        let result:Vec3 = v3();

        switch (this._cell.type)
        {
            case CellType.PARALLELOGRAM_TOP:
            case CellType.RHOMB:
            case CellType.RECTANGLE:
            {
                const a:number = this._cell.width - this._shift.x + this._gap.x;
                const b:number = -this._shift.x;
                const c:number = this._shift.y;
                const d:number = this._cell.height - this._shift.y + this._gap.y;
                const determinant:number = a * d - b * c;
                const u:number = worldPoint.x - this._anchor.x;
                const v:number = worldPoint.y - this._anchor.y;

                const centerX:number = (d * this._cell.halfWidth - b * this._cell.halfHeight) / determinant;
                const centerY:number = (-c * this._cell.halfWidth + a * this._cell.halfHeight) / determinant;

                const gridX:number = (d * u - b * v) / determinant - centerX;
                const gridY:number = (-c * u + a * v) / determinant - centerY;

                result.set(Math.round(gridX), Math.round(gridY));
                break;
            }
            case CellType.PARALLELOGRAM_BOTTOM:
            {
                const a:number = this._cell.width - this._shift.x + this._gap.x;
                const b:number = this._shift.x;
                const c:number = -this._shift.y;
                const d:number = this._cell.height - this._shift.y + this._gap.y;
                const determinant:number = a * d - b * c;
                const u:number = worldPoint.x - this._anchor.x;
                const v:number = worldPoint.y - this._anchor.y;

                const centerX:number = (d * this._cell.halfWidth - b * this._cell.halfHeight) / determinant;
                const centerY:number = (-c * this._cell.halfWidth + a * this._cell.halfHeight) / determinant;

                const gridX:number = (d * u - b * v) / determinant - centerX;
                const gridY:number = (-c * u + a * v) / determinant - centerY;

                result.set(Math.round(gridX), Math.round(gridY));
                break;
            }
            default:
            {
                break;
            }
        }
        
        const hitResult:HitResult | Location = this._cell.isPointInside(worldPoint, this.gridToWorld(result, this._gridToWorldScratch), false);

        if (hitResult == HitResult.IN)
            return new this.placementConstructor(result, HitResult.IN);
        else
            return new this.placementConstructor(null, HitResult.OUT);
    }
}