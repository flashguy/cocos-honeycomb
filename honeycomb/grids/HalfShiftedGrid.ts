import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { Cell } from '../abstractions/Cell';
import { Location } from '../enums/Location';
import { HitResult } from '../enums/HitResult';
import { CellType } from '../enums/CellType';
import { ShiftedGridType } from '../enums/ShiftedGridType';
import { HexagonCell } from '../cells/HexagonCell';
import { HMath } from '../utils/HMath';
import { IPlacement } from '../placements/IPlacement';
const { ccclass } = _decorator;

@ccclass('HalfShiftedGrid')
export class HalfShiftedGrid<T extends IPlacement> extends Grid<T>
{
    protected _shift:Vec3 = v3();
    protected _shiftGridType:ShiftedGridType = ShiftedGridType.NONE;

    public get shiftGridType():ShiftedGridType { return this._shiftGridType; }

    constructor(placementConstructor: new (cellPos?:Vec3, hit?:HitResult, index?:number) => T,
                shiftType:ShiftedGridType, cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
    {
        super(placementConstructor, cell, anchor, gap);

        this._shiftGridType = shiftType;
        this.initialize();
    }

    protected override setNeighbors():void
    {
        switch (this._shiftGridType)
        {
            case ShiftedGridType.RIGHT_EVEN:
            case ShiftedGridType.RIGHT_ODD:
            case ShiftedGridType.LEFT_EVEN:
            case ShiftedGridType.LEFT_ODD:
            {
                if (this._cell.type == CellType.RECTANGLE
                 || this._cell.type == CellType.ELLIPSE
                 || this._cell.type == CellType.HEXAGON_POINTY
                )
                {
                    this.neighbors.set(Location.L, v3(-1, 0));
                    this.neighbors.set(Location.R, v3(1, 0));

                    this.neighborsShifted.set(Location.L, v3(-1, 0));
                    this.neighborsShifted.set(Location.R, v3(1, 0));
                }

                break;
            }
        }
        
        switch (this._shiftGridType)
        {
            case ShiftedGridType.TOP_EVEN:
            case ShiftedGridType.TOP_ODD:
            case ShiftedGridType.BOTTOM_EVEN:
            case ShiftedGridType.BOTTOM_ODD:
            {
                if (this._cell.type == CellType.RECTANGLE
                 || this._cell.type == CellType.ELLIPSE
                 || this._cell.type == CellType.HEXAGON_FLAT
                )
                {
                    this.neighbors.set(Location.T, v3(0, 1));
                    this.neighbors.set(Location.B, v3(0, -1));

                    this.neighborsShifted.set(Location.T, v3(0, 1));
                    this.neighborsShifted.set(Location.B, v3(0, -1));
                }

                break;
            }
        }

        switch (this._shiftGridType)
        {
            case ShiftedGridType.RIGHT_EVEN:
            case ShiftedGridType.RIGHT_ODD:
            {
                this.neighbors.set(Location.LB, v3(-1, -1));
                this.neighbors.set(Location.LT, v3(-1, 1));
                this.neighbors.set(Location.RT, v3(0, 1));
                this.neighbors.set(Location.RB, v3(0, -1));

                this.neighborsShifted.set(Location.LB, v3(0, -1));
                this.neighborsShifted.set(Location.LT, v3(0, 1));
                this.neighborsShifted.set(Location.RT, v3(1, 1));
                this.neighborsShifted.set(Location.RB, v3(1, -1));

                break;
            }
            case ShiftedGridType.LEFT_EVEN:
            case ShiftedGridType.LEFT_ODD:
            {
                this.neighbors.set(Location.LB, v3(0, -1));
                this.neighbors.set(Location.LT, v3(0, 1));
                this.neighbors.set(Location.RT, v3(1, 1));
                this.neighbors.set(Location.RB, v3(1, -1));

                this.neighborsShifted.set(Location.LB, v3(-1, -1));
                this.neighborsShifted.set(Location.LT, v3(-1, 1));
                this.neighborsShifted.set(Location.RT, v3(0, 1));
                this.neighborsShifted.set(Location.RB, v3(0, -1));
                
                break;
            }
            case ShiftedGridType.TOP_EVEN:
            case ShiftedGridType.TOP_ODD:
            {
                this.neighbors.set(Location.LB, v3(-1, -1));
                this.neighbors.set(Location.LT, v3(-1, 0));
                this.neighbors.set(Location.RT, v3(1, 0));
                this.neighbors.set(Location.RB, v3(1, -1));

                this.neighborsShifted.set(Location.LB, v3(-1, 0));
                this.neighborsShifted.set(Location.LT, v3(-1, 1));
                this.neighborsShifted.set(Location.RT, v3(1, 1));
                this.neighborsShifted.set(Location.RB, v3(1, 0));
                
                break;
            }
            case ShiftedGridType.BOTTOM_EVEN:
            case ShiftedGridType.BOTTOM_ODD:
            {
                this.neighbors.set(Location.LB, v3(-1, 0));
                this.neighbors.set(Location.LT, v3(-1, 1));
                this.neighbors.set(Location.RT, v3(1, 1));
                this.neighbors.set(Location.RB, v3(1, 0));

                this.neighborsShifted.set(Location.LB, v3(-1, -1));
                this.neighborsShifted.set(Location.LT, v3(-1, 0));
                this.neighborsShifted.set(Location.RT, v3(1, 0));
                this.neighborsShifted.set(Location.RB, v3(1, -1));
                
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
                this._shift.set(this._cell.halfWidth, this._cell.halfHeight);
                break;
            }
            case CellType.ELLIPSE:
            {
                switch (this._shiftGridType)
                {
                    case ShiftedGridType.RIGHT_EVEN:
                    case ShiftedGridType.RIGHT_ODD:
                    case ShiftedGridType.LEFT_EVEN:
                    case ShiftedGridType.LEFT_ODD:
                    {
                        const median:number = this._cell.height * (Math.sqrt(3) / 2);
                        this._shift.set(this._cell.halfWidth, this._cell.height - median);
                        break;
                    }
                    case ShiftedGridType.TOP_EVEN:
                    case ShiftedGridType.TOP_ODD:
                    case ShiftedGridType.BOTTOM_EVEN:
                    case ShiftedGridType.BOTTOM_ODD:
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
                switch (this._shiftGridType)
                {
                    case ShiftedGridType.TOP_EVEN:
                    case ShiftedGridType.TOP_ODD:
                    case ShiftedGridType.BOTTOM_EVEN:
                    case ShiftedGridType.BOTTOM_ODD:
                    {
                        this._shift.set(((this._cell as HexagonCell).side / 2), this._cell.halfHeight);
                        break;
                    }
                }

                break;
            }
            case CellType.HEXAGON_POINTY:
            {
                switch (this._shiftGridType)
                {
                    case ShiftedGridType.RIGHT_EVEN:
                    case ShiftedGridType.RIGHT_ODD:
                    case ShiftedGridType.LEFT_EVEN:
                    case ShiftedGridType.LEFT_ODD:
                    {
                        this._shift.set(this._cell.halfWidth, ((this._cell as HexagonCell).side / 2));
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
            {
                switch (this._shiftGridType)
                {
                    case ShiftedGridType.TOP_EVEN:
                    case ShiftedGridType.TOP_ODD:
                    case ShiftedGridType.BOTTOM_EVEN:
                    case ShiftedGridType.BOTTOM_ODD:
                    {
                        const offsetX:number = (this._cell.width - this._cell.width * (this._cell as HexagonCell).ISO_RATIO) / 2;
                        const offsetY:number = (this._cell.height - this._cell.height * (this._cell as HexagonCell).ISO_RATIO) / 2;
                        
                        this._shift.set(offsetX, offsetY);
                        break;
                    }
                }

                break;
            }
            case CellType.ISO_HEXAGON_POINTY:
            {
                switch (this._shiftGridType)
                {
                    case ShiftedGridType.LEFT_EVEN:
                    case ShiftedGridType.LEFT_ODD:
                    case ShiftedGridType.RIGHT_EVEN:
                    case ShiftedGridType.RIGHT_ODD:
                    {
                        const offsetX:number = (this._cell.width - this._cell.width * (this._cell as HexagonCell).ISO_RATIO) / 2;
                        const offsetY:number = (this._cell.height - this._cell.height * (this._cell as HexagonCell).ISO_RATIO) / 2;
                        
                        this._shift.set(offsetX, offsetY);
                        break;
                    }
                }

                break;
            }
        }
    }

    public override gridToWorld(cellPos:Vec3, out?:Vec3):Vec3
    {
        let result:Vec3 = out ?? v3();

        if (this._cell.type == CellType.ISO_HEXAGON_FLAT)
        {
            if (this._shiftGridType == ShiftedGridType.TOP_ODD
                || this._shiftGridType == ShiftedGridType.BOTTOM_EVEN)
            {
                result.x = this._anchor.x
                            + (cellPos.x - cellPos.y)
                            * (this._cell.width - this._shift.x * 2 + this._gap.x)
                            + Math.abs(cellPos.x % 2 * (this._cell.halfWidth - this._shift.x))
                            - this._shift.x * cellPos.x;
                    
                result.y = this._anchor.y
                            + (cellPos.x + cellPos.y)
                            * (this._cell.height - this._shift.y * 2 + this._gap.y)
                            - Math.abs(cellPos.x % 2 * (this._cell.halfHeight - this._shift.y))
                            - this._shift.y * cellPos.x;
            }
            else if (this._shiftGridType == ShiftedGridType.TOP_EVEN
                || this._shiftGridType == ShiftedGridType.BOTTOM_ODD)
            {
                result.x = this._anchor.x
                            + (cellPos.x - cellPos.y)
                            * (this._cell.width - this._shift.x * 2 + this._gap.x)
                            - Math.abs(cellPos.x % 2 * (this._cell.halfWidth - this._shift.x))
                            - this._shift.x * cellPos.x;
                    
                result.y = this._anchor.y
                            + (cellPos.x + cellPos.y)
                            * (this._cell.height - this._shift.y * 2 + this._gap.y)
                            + Math.abs(cellPos.x % 2 * (this._cell.halfHeight - this._shift.y))
                            - this._shift.y * cellPos.x;
            }
        }
        else if (this._cell.type == CellType.ISO_HEXAGON_POINTY)
        {
            if (this._shiftGridType == ShiftedGridType.RIGHT_EVEN
                || this._shiftGridType == ShiftedGridType.LEFT_ODD)
            {
                result.x = this._anchor.x
                            + (cellPos.x - cellPos.y)
                            * (this._cell.width - this._shift.x * 2 + this._gap.x)
                            + Math.abs(cellPos.y % 2 * (this._cell.halfWidth - this._shift.x))
                            + cellPos.y * this._shift.x;

                result.y = this._anchor.y
                            + (cellPos.x + cellPos.y)
                            * (this._cell.height - this._shift.y * 2 + this._gap.y)
                            + Math.abs(cellPos.y % 2 * (this._cell.halfHeight - this._shift.y))
                            - cellPos.y * this._shift.y;
            }
            else if (this._shiftGridType == ShiftedGridType.RIGHT_ODD
                || this._shiftGridType == ShiftedGridType.LEFT_EVEN)
            {
                result.x = this._anchor.x
                            + (cellPos.x - cellPos.y)
                            * (this._cell.width - this._shift.x * 2 + this._gap.x)
                            - Math.abs(cellPos.y % 2 * (this._cell.halfWidth - this._shift.x))
                            + cellPos.y * this._shift.x;

                result.y = this._anchor.y
                            + (cellPos.x + cellPos.y)
                            * (this._cell.height - this._shift.y * 2 + this._gap.y)
                            - Math.abs(cellPos.y % 2 * (this._cell.halfHeight - this._shift.y))
                            - cellPos.y * this._shift.y;
            }
        }
        else
        {
            let offsetPos:Vec3 = v3(); // Учет смещений по позиции ячеек
            let gapOffset:Vec3 = v3(); // Учет смещений по расстаянию между ячейками (gap)
            
            if      (this._shiftGridType == ShiftedGridType.RIGHT_EVEN)  { if (Math.abs(cellPos.y % 2) == 1) { offsetPos.x =  this._shift.x; gapOffset.x =  this._gap.x / 2; } }
            else if (this._shiftGridType == ShiftedGridType.RIGHT_ODD)   { if (Math.abs(cellPos.y % 2) == 0) { offsetPos.x =  this._shift.x; gapOffset.x =  this._gap.x / 2; } }
            else if (this._shiftGridType == ShiftedGridType.LEFT_EVEN)   { if (Math.abs(cellPos.y % 2) == 1) { offsetPos.x = -this._shift.x; gapOffset.x = -this._gap.x / 2; } }
            else if (this._shiftGridType == ShiftedGridType.LEFT_ODD)    { if (Math.abs(cellPos.y % 2) == 0) { offsetPos.x = -this._shift.x; gapOffset.x = -this._gap.x / 2; } }
            else if (this._shiftGridType == ShiftedGridType.TOP_EVEN)    { if (Math.abs(cellPos.x % 2) == 1) { offsetPos.y =  this._shift.y; gapOffset.y =  this._gap.y / 2; } }
            else if (this._shiftGridType == ShiftedGridType.TOP_ODD)     { if (Math.abs(cellPos.x % 2) == 0) { offsetPos.y =  this._shift.y; gapOffset.y =  this._gap.y / 2; } }
            else if (this._shiftGridType == ShiftedGridType.BOTTOM_EVEN) { if (Math.abs(cellPos.x % 2) == 1) { offsetPos.y = -this._shift.y; gapOffset.y = -this._gap.y / 2; } }
            else if (this._shiftGridType == ShiftedGridType.BOTTOM_ODD)  { if (Math.abs(cellPos.x % 2) == 0) { offsetPos.y = -this._shift.y; gapOffset.y = -this._gap.y / 2; } }

            if (this._cell.type == CellType.ELLIPSE
            || this._cell.type == CellType.HEXAGON_FLAT
            || this._cell.type == CellType.HEXAGON_POINTY
            || this._cell.type == CellType.RHOMB
            )
            {
                switch (this._shiftGridType)
                {
                    case ShiftedGridType.RIGHT_EVEN:
                    case ShiftedGridType.RIGHT_ODD:
                    case ShiftedGridType.LEFT_EVEN:
                    case ShiftedGridType.LEFT_ODD:
                    {
                        offsetPos.y = -(cellPos.y * this._shift.y);
                        break;
                    }
                    case ShiftedGridType.TOP_EVEN:
                    case ShiftedGridType.TOP_ODD:
                    case ShiftedGridType.BOTTOM_EVEN:
                    case ShiftedGridType.BOTTOM_ODD:
                    {
                        offsetPos.x = -(cellPos.x * this._shift.x);
                        break;
                    }
                }
            }
            
            result.x = this._anchor.x + cellPos.x * (this._cell.width + this._gap.x) + offsetPos.x + gapOffset.x;
            result.y = this._anchor.y + cellPos.y * (this._cell.height + this._gap.y) + offsetPos.y + gapOffset.y;
        }

        return result;
    }

    public override worldToGrid(worldPoint:Vec3):T
    {
        let result:Vec3 = v3();
        let offsetPos:Vec3 = v3(); // Учёт смещений по позиции ячеек
        let offsetSize:Vec3 = v3(); // Учёт смещений по размеру ячеек
        let hitResult:HitResult | Location;
        let placement:T = new this.placementConstructor(null, HitResult.OUT);
        
        if (this._cell.type == CellType.ISO_HEXAGON_FLAT)
        {
            // INFO: обратное преобразование формул из gridToWorld;
            // центр гексагона смещён от узла решётки на (centerX, centerY), поэтому вычитаем его перед округлением
            const stepX:number = this._cell.width - this._shift.x * 2 + this._gap.x;
            const stepY:number = this._cell.height - this._shift.y * 2 + this._gap.y;
            const columnX:number = stepX - this._shift.x;
            const columnY:number = stepY - this._shift.y;
            const determinant:number = columnX * stepY + columnY * stepX;
            const centerX:number = (stepY * this._cell.halfWidth + stepX * this._cell.halfHeight) / determinant;
            const centerY:number = (columnX * this._cell.halfHeight - columnY * this._cell.halfWidth) / determinant;
            const u:number = worldPoint.x - this._anchor.x;
            const v:number = worldPoint.y - this._anchor.y;

            const gridX:number = (stepY * u + stepX * v) / determinant - centerX;
            const gridY:number = (columnX * v - columnY * u) / determinant - centerY;

            result.set(Math.round(gridX), Math.round(gridY));

            // INFO: гексагон шире единичного квадрата решётки, поэтому после округления искомую ячейку
            // уточняем тем же приёмом, что и в хвосте метода: isPointInside + переход к соседу
            hitResult = this._cell.isPointInside(worldPoint, this.gridToWorld(result), true);

            let attempts:number = 0;

            while (hitResult != HitResult.IN && attempts < 4)
            {
                if (hitResult != HitResult.OUT)
                {
                    const neighbor:Vec3 = this.getCellNeighbor(result, hitResult);

                    if (Vec3.equals(neighbor, result)) // соседа в этом направлении нет
                        break;

                    result = neighbor;
                }

                hitResult = this._cell.isPointInside(worldPoint, this.gridToWorld(result), true);
                attempts++;
            }
        }
        else if (this._cell.type == CellType.ISO_HEXAGON_POINTY)
        {
            // INFO: обратное преобразование формул из gridToWorld — решение линейной системы
            // без члена чётности, округление вокруг центра гексагона и уточнение перебором
            // соседей через isPointInside (член |cellPos.y % 2 * ...| учитывается самим gridToWorld)
            const stepX:number = this._cell.width - this._shift.x * 2 + this._gap.x;
            const stepY:number = this._cell.height - this._shift.y * 2 + this._gap.y;
            const rowX:number = stepX - this._shift.x; // коэффициент при cellPos.y в x (член +cellPos.y * shift.x)
            const rowY:number = stepY - this._shift.y; // коэффициент при cellPos.y в y (член -cellPos.y * shift.y)
            const determinant:number = stepX * rowY + rowX * stepY;
            const centerX:number = (rowY * this._cell.halfWidth + rowX * this._cell.halfHeight) / determinant;
            const centerY:number = (stepX * this._cell.halfHeight - stepY * this._cell.halfWidth) / determinant;
            const u:number = worldPoint.x - this._anchor.x;
            const v:number = worldPoint.y - this._anchor.y;

            const gridX:number = (rowY * u + rowX * v) / determinant - centerX;
            const gridY:number = (stepX * v - stepY * u) / determinant - centerY;

            result.set(Math.round(gridX), Math.round(gridY));

            // INFO: гексагон шире единичного квадрата решётки, поэтому после округления искомую ячейку
            // уточняем тем же приёмом, что и в хвосте метода: isPointInside + переход к соседю
            hitResult = this._cell.isPointInside(worldPoint, this.gridToWorld(result), true);

            let attempts:number = 0;

            while (hitResult != HitResult.IN && attempts < 4)
            {
                if (hitResult != HitResult.OUT)
                {
                    const neighbor:Vec3 = this.getCellNeighbor(result, hitResult);

                    if (Vec3.equals(neighbor, result)) // соседа в этом направлении нет
                        break;

                    result = neighbor;
                }

                hitResult = this._cell.isPointInside(worldPoint, this.gridToWorld(result), true);
                attempts++;
            }
        }
        else if (this._shiftGridType == ShiftedGridType.RIGHT_EVEN
         || this._shiftGridType == ShiftedGridType.RIGHT_ODD
         || this._shiftGridType == ShiftedGridType.LEFT_EVEN
         || this._shiftGridType == ShiftedGridType.LEFT_ODD)
        {
            if (this._cell.type == CellType.ELLIPSE
             || this._cell.type == CellType.HEXAGON_POINTY
             || this._cell.type == CellType.RHOMB)
            {
                offsetSize.y = -this._shift.y;
            }
            
            result.y = Math.floor((worldPoint.y - this._anchor.y) / (this._cell.height + this._gap.y + offsetSize.y));

            if (this._shiftGridType == ShiftedGridType.RIGHT_EVEN)
            {
                if (Math.abs(result.y % 2) == 1) offsetPos.x = -this._shift.x;
            }

            if (this._shiftGridType == ShiftedGridType.RIGHT_ODD)
            {
                if (Math.abs(result.y % 2) == 0) offsetPos.x = -this._shift.x;
            }

            if (this._shiftGridType == ShiftedGridType.LEFT_EVEN)
            {
                if (Math.abs(result.y % 2) == 1) offsetPos.x = this._shift.x;
            }

            if (this._shiftGridType == ShiftedGridType.LEFT_ODD)
            {
                if (Math.abs(result.y % 2) == 0) offsetPos.x = this._shift.x;
            }

            result.x = Math.floor((worldPoint.x - this._anchor.x + offsetPos.x) / (this._cell.width + this._gap.x));
        }
        else if (this._shiftGridType == ShiftedGridType.TOP_EVEN
         || this._shiftGridType == ShiftedGridType.TOP_ODD
         || this._shiftGridType == ShiftedGridType.BOTTOM_EVEN
         || this._shiftGridType == ShiftedGridType.BOTTOM_ODD)
        {
            if (this._cell.type == CellType.ELLIPSE
             || this._cell.type == CellType.HEXAGON_FLAT
             || this._cell.type == CellType.RHOMB)
            {
                offsetSize.x = -this._shift.x;
            }

            result.x = Math.floor((worldPoint.x - this._anchor.x) / (this._cell.width + this._gap.x + offsetSize.x));

            if (this._shiftGridType == ShiftedGridType.TOP_EVEN)
            {
                if (Math.abs(result.x % 2) == 1) offsetPos.y = -this._shift.y;
            }

            if (this._shiftGridType == ShiftedGridType.TOP_ODD)
            {
                if (Math.abs(result.x % 2) == 0) offsetPos.y = -this._shift.y;
            }

            if (this._shiftGridType == ShiftedGridType.BOTTOM_EVEN)
            {
                if (Math.abs(result.x % 2) == 1) offsetPos.y = this._shift.y;
            }

            if (this._shiftGridType == ShiftedGridType.BOTTOM_ODD)
            {
                if (Math.abs(result.x % 2) == 0) offsetPos.y = this._shift.y;
            }

            result.y = Math.floor((worldPoint.y - this._anchor.y + offsetPos.y) / (this._cell.height + this._gap.y));
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
                    result = this.getCellNeighbor(result, hitResult);

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
        let result:Vec3 = cellPos.clone();
        let neighbor:Vec3;

        if (this._shiftGridType == ShiftedGridType.RIGHT_EVEN || this._shiftGridType == ShiftedGridType.LEFT_EVEN)
        {
            if (Math.abs(cellPos.y % 2) == 0)
                neighbor = this.neighbors.get(location);
            else
                neighbor = this.neighborsShifted.get(location);
        }
        else if (this._shiftGridType == ShiftedGridType.RIGHT_ODD || this._shiftGridType == ShiftedGridType.LEFT_ODD)
        {
            if (Math.abs(cellPos.y % 2) == 0)
                neighbor = this.neighborsShifted.get(location);
            else
                neighbor = this.neighbors.get(location);
        }
        else if (this._shiftGridType == ShiftedGridType.TOP_EVEN || this._shiftGridType == ShiftedGridType.BOTTOM_EVEN)
        {
            if (Math.abs(cellPos.x % 2) == 0)
                neighbor = this.neighbors.get(location);
            else
                neighbor = this.neighborsShifted.get(location);
        }
        else if (this._shiftGridType == ShiftedGridType.TOP_ODD || this._shiftGridType == ShiftedGridType.BOTTOM_ODD)
        {
            if (Math.abs(cellPos.x % 2) == 0)
                neighbor = this.neighborsShifted.get(location);
            else
                neighbor = this.neighbors.get(location);
        }

        if (neighbor != null)
            result.add(neighbor);

        return result;
    }

    public override getCellNeighbors(cellPos:Vec3):Map<Location, Vec3>
    {
        let result:Map<Location, Vec3> = new Map<Location, Vec3>();

        if (this._shiftGridType == ShiftedGridType.RIGHT_EVEN || this._shiftGridType == ShiftedGridType.LEFT_EVEN)
        {
            if (Math.abs(cellPos.y % 2) == 0)
                return this.neighbors;
            else
                return this.neighborsShifted;
        }
        else if (this._shiftGridType == ShiftedGridType.RIGHT_ODD || this._shiftGridType == ShiftedGridType.LEFT_ODD)
        {
            if (Math.abs(cellPos.y % 2) == 0)
                return this.neighborsShifted;
            else
                return this.neighbors;
        }
        else if (this._shiftGridType == ShiftedGridType.TOP_EVEN || this._shiftGridType == ShiftedGridType.BOTTOM_EVEN)
        {
            if (Math.abs(cellPos.x % 2) == 0)
                return this.neighbors;
            else
                return this.neighborsShifted;
        }
        else if (this._shiftGridType == ShiftedGridType.TOP_ODD || this._shiftGridType == ShiftedGridType.BOTTOM_ODD)
        {
            if (Math.abs(cellPos.x % 2) == 0)
                return this.neighborsShifted;
            else
                return this.neighbors;
        }
        else
        {
            return result;
        }
    }

    public getDistance(gridStartPos:Vec3, gridEndPos:Vec3):number
    {
        return HMath.cubeDistance(this.offsetToCube(gridStartPos), this.offsetToCube(gridEndPos));
    }
    
    public offsetToCube(vec:Vec3):Vec3
    {
        let x:number = vec.x;
        let y:number = vec.y;
        let z:number = vec.z;

        if (this._shiftGridType == ShiftedGridType.RIGHT_EVEN || this._shiftGridType == ShiftedGridType.RIGHT_ODD)
        {
            x = vec.x - (vec.y - (vec.y & 1)) / 2;
            z = vec.y;
            y = -x - z;
        }
        else if (this._shiftGridType == ShiftedGridType.LEFT_EVEN || this._shiftGridType == ShiftedGridType.LEFT_ODD)
        {
            x = vec.x - (vec.y + (vec.y & 1)) / 2;
            z = vec.y;
            y = -x - z;
        }
        else if (this._shiftGridType == ShiftedGridType.BOTTOM_EVEN || this._shiftGridType == ShiftedGridType.BOTTOM_ODD)
        {
            x = vec.x;
            z = vec.y - (vec.x + (vec.x & 1)) / 2;
            y = -x - z;
        }
        else if (this._shiftGridType == ShiftedGridType.TOP_EVEN || this._shiftGridType == ShiftedGridType.TOP_ODD)
        {
            x = vec.x;
            z = vec.y - (vec.x - (vec.x & 1)) / 2;
            y = -x - z;
        }
        
        return v3(x, y, z);
    }
    
    public cubeToOffset(vec:Vec3):Vec3
    {
        let x:number = vec.x;
        let y:number = vec.y;

        if (this._shiftGridType == ShiftedGridType.RIGHT_EVEN)
        {
            x = vec.x + (vec.z - (vec.z & 1)) / 2;
            y = vec.z;
        }
        else if (this._shiftGridType == ShiftedGridType.LEFT_EVEN)
        {
            x = vec.x + (vec.z + (vec.z & 1)) / 2;
            y = vec.z;
        }
        else if (this._shiftGridType == ShiftedGridType.BOTTOM_EVEN)
        {
            x = vec.x;
            y = vec.z + (vec.x + (vec.x & 1)) / 2;
        }
        else if (this._shiftGridType == ShiftedGridType.TOP_EVEN)
        {
            x = vec.x;
            y = vec.z + (vec.x - (vec.x & 1)) / 2;
        }
        else if (this._shiftGridType == ShiftedGridType.RIGHT_ODD)
        {
            x = vec.x + (vec.z + (vec.z & 1)) / 2;
            y = vec.z;
        }
        else if (this._shiftGridType == ShiftedGridType.LEFT_ODD)
        {
            x = vec.x + (vec.z - (vec.z & 1)) / 2;
            y = vec.z;
        }
        else if (this._shiftGridType == ShiftedGridType.BOTTOM_ODD)
        {
            x = vec.x;
            y = vec.z + (vec.x - (vec.x & 1)) / 2;
        }
        else if (this._shiftGridType == ShiftedGridType.TOP_ODD)
        {
            x = vec.x;
            y = vec.z + (vec.x + (vec.x & 1)) / 2;
        }

        return v3(x, y);
    }
}