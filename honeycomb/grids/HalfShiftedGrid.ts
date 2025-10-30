import { _decorator, v3, Vec3 } from 'cc';
import { Grid } from '../abstractions/Grid';
import { Cell } from '../abstractions/Cell';
import { Position } from '../enums/Position';
import { CellType } from '../enums/CellType';
import { ShiftedGridType } from '../enums/ShiftedGridType';
import { HexagonCell } from '../cells/HexagonCell';
import { HMath } from '../utils/HMath';
import { ILocation } from '../locations/ILocation';
const { ccclass } = _decorator;

// File HalfShiftedGrid.ts created am_empty
// Date of creation Tue Jul 29 2025 20:03:12 GMT+0300 (Москва, стандартное время),

@ccclass('HalfShiftedGrid')
export class HalfShiftedGrid<T extends ILocation> extends Grid<T>
{
    // ----------------------------------------
    // private properties / getters and setters
    // ----------------------------------------



    // ------------------------------------------
    // protected properties / getters and setters
    // ------------------------------------------

    protected _shift:Vec3 = v3();
    protected _shiftGridType:ShiftedGridType = ShiftedGridType.NONE;

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------

    public get shiftGridType():ShiftedGridType { return this._shiftGridType; }

    constructor(locationConstructor: new (gridPos?:Vec3, position?:Position, index?:number) => T,
                shiftType:ShiftedGridType, cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
    {
        super(locationConstructor, cell, anchor, gap);

        this._shiftGridType = shiftType;
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
                    this.neighbors.set(Position.L, v3(-1, 0));
                    this.neighbors.set(Position.R, v3(1, 0));

                    this.neighborsShifted.set(Position.L, v3(-1, 0));
                    this.neighborsShifted.set(Position.R, v3(1, 0));
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
                    this.neighbors.set(Position.T, v3(0, 1));
                    this.neighbors.set(Position.B, v3(0, -1));

                    this.neighborsShifted.set(Position.T, v3(0, 1));
                    this.neighborsShifted.set(Position.B, v3(0, -1));
                }

                break;
            }
        }

        switch (this._shiftGridType)
        {
            case ShiftedGridType.RIGHT_EVEN:
            case ShiftedGridType.RIGHT_ODD:
            {
                this.neighbors.set(Position.LB, v3(-1, -1));
                this.neighbors.set(Position.LT, v3(-1, 1));
                this.neighbors.set(Position.RT, v3(0, 1));
                this.neighbors.set(Position.RB, v3(0, -1));

                this.neighborsShifted.set(Position.LB, v3(0, -1));
                this.neighborsShifted.set(Position.LT, v3(0, 1));
                this.neighborsShifted.set(Position.RT, v3(1, 1));
                this.neighborsShifted.set(Position.RB, v3(1, -1));

                break;
            }
            case ShiftedGridType.LEFT_EVEN:
            case ShiftedGridType.LEFT_ODD:
            {
                this.neighbors.set(Position.LB, v3(0, -1));
                this.neighbors.set(Position.LT, v3(0, 1));
                this.neighbors.set(Position.RT, v3(1, 1));
                this.neighbors.set(Position.RB, v3(1, -1));

                this.neighborsShifted.set(Position.LB, v3(-1, -1));
                this.neighborsShifted.set(Position.LT, v3(-1, 1));
                this.neighborsShifted.set(Position.RT, v3(0, 1));
                this.neighborsShifted.set(Position.RB, v3(0, -1));
                
                break;
            }
            case ShiftedGridType.TOP_EVEN:
            case ShiftedGridType.TOP_ODD:
            {
                this.neighbors.set(Position.LB, v3(-1, -1));
                this.neighbors.set(Position.LT, v3(-1, 0));
                this.neighbors.set(Position.RT, v3(1, 0));
                this.neighbors.set(Position.RB, v3(1, -1));

                this.neighborsShifted.set(Position.LB, v3(-1, 0));
                this.neighborsShifted.set(Position.LT, v3(-1, 1));
                this.neighborsShifted.set(Position.RT, v3(1, 1));
                this.neighborsShifted.set(Position.RB, v3(1, 0));
                
                break;
            }
            case ShiftedGridType.BOTTOM_EVEN:
            case ShiftedGridType.BOTTOM_ODD:
            {
                this.neighbors.set(Position.LB, v3(-1, 0));
                this.neighbors.set(Position.LT, v3(-1, 1));
                this.neighbors.set(Position.RT, v3(1, 1));
                this.neighbors.set(Position.RB, v3(1, 0));

                this.neighborsShifted.set(Position.LB, v3(-1, -1));
                this.neighborsShifted.set(Position.LT, v3(-1, 0));
                this.neighborsShifted.set(Position.RT, v3(1, 0));
                this.neighborsShifted.set(Position.RB, v3(1, -1));
                
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
            // case CellType.ISO_HEXAGON_FLAT:
            // {
            //     switch (this._shiftGridType)
            //     {
            //         case ShiftedGridType.TOP_EVEN:
            //         case ShiftedGridType.TOP_ODD:
            //         case ShiftedGridType.BOTTOM_EVEN:
            //         case ShiftedGridType.BOTTOM_ODD:
            //         {
            //             // const offsetX:number = (this._cell.width - this._cell.width * (this._cell as HexagonCell).ISO_RATIO) / 2;
            //             // const offsetY:number = (this._cell.height - this._cell.height * (this._cell as HexagonCell).ISO_RATIO) / 2;
            //             const offsetX:number = (this._cell.width - this._cell.width * (this._cell as HexagonCell).ISO_RATIO) / 2;
            //             const offsetY:number = (this._cell.height - this._cell.height * (this._cell as HexagonCell).ISO_RATIO) / 2;
            //             // const offsetX:number = this._cell.width;
            //             // const offsetY:number = this._cell.height;
            //             this._shift.set(offsetX, offsetY);
            //             break;
            //         }
            //     }

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

        // if (this._cell.type == CellType.ISO_HEXAGON_FLAT)
        // {
        //     let offsetPos:Vec3 = v3(); // Учет смещений по позиции ячеек

        //     // result.x = this._anchor.x
        //     //             + (gridPos.x - gridPos.y)
        //     //             * (this._cell.width - this._shift.x * 2)
        //     //             + Math.abs(gridPos.x % 2 * (this._cell.halfWidth - this._shift.x))
        //     //             - this._shift.x * gridPos.x;

        //     // result.y = this._anchor.y
        //     //             + (gridPos.x + gridPos.y)
        //     //             * (this._cell.height - this._shift.y * 2)
        //     //             - Math.abs(gridPos.x % 2 * (this._cell.halfHeight - this._shift.y))
        //     //             - this._shift.y * gridPos.x;
                       
        //     // result.x = this._anchor.x + (gridPos.x - gridPos.y) * (this._shift.x + this._gap.x);
        //     // result.y = this._anchor.y + (gridPos.x + gridPos.y) * (this._shift.y + this._gap.y);

        //     if      (this._shiftGridType == ShiftedGridType.RIGHT_EVEN)  { if (Math.abs(gridPos.y % 2) == 1) offsetPos.x =  this._shift.x; }
        //     else if (this._shiftGridType == ShiftedGridType.RIGHT_ODD)   { if (Math.abs(gridPos.y % 2) == 0) offsetPos.x =  this._shift.x; }
        //     else if (this._shiftGridType == ShiftedGridType.LEFT_EVEN)   { if (Math.abs(gridPos.y % 2) == 1) offsetPos.x = -this._shift.x; }
        //     else if (this._shiftGridType == ShiftedGridType.LEFT_ODD)    { if (Math.abs(gridPos.y % 2) == 0) offsetPos.x = -this._shift.x; }
        //     else if (this._shiftGridType == ShiftedGridType.TOP_EVEN)    { //if (Math.abs(gridPos.x % 2) == 1)
        //     {
        //         // offsetPos.x =  -Math.abs(gridPos.x % 2 * this._shift.x) - this._shift.x * gridPos.x;
        //         // offsetPos.y =  this._shift.y/*  * gridPos.y */;
        //         console.log(gridPos.toString(), (gridPos.x - gridPos.y))
        //         offsetPos.x = this._shift.x;
        //         offsetPos.y = this._shift.y;
        //     } }
        //     else if (this._shiftGridType == ShiftedGridType.TOP_ODD)     { if (Math.abs(gridPos.x % 2) == 0) offsetPos.y =  this._shift.y; }
        //     else if (this._shiftGridType == ShiftedGridType.BOTTOM_EVEN) { if (Math.abs(gridPos.x % 2) == 1) offsetPos.y = -this._shift.y; }
        //     else if (this._shiftGridType == ShiftedGridType.BOTTOM_ODD)  { if (Math.abs(gridPos.x % 2) == 0) offsetPos.y = -this._shift.y; }

        //     result.x = this._anchor.x + gridPos.x * (this._cell.width + this._gap.x) + offsetPos.x;
        //     result.y = this._anchor.y + gridPos.y * (this._cell.height + this._gap.y) + offsetPos.y;
        // }
        // else
        {
            let offsetPos:Vec3 = v3(); // Учет смещений по позиции ячеек
            
            if      (this._shiftGridType == ShiftedGridType.RIGHT_EVEN)  { if (Math.abs(gridPos.y % 2) == 1) offsetPos.x =  this._shift.x; }
            else if (this._shiftGridType == ShiftedGridType.RIGHT_ODD)   { if (Math.abs(gridPos.y % 2) == 0) offsetPos.x =  this._shift.x; }
            else if (this._shiftGridType == ShiftedGridType.LEFT_EVEN)   { if (Math.abs(gridPos.y % 2) == 1) offsetPos.x = -this._shift.x; }
            else if (this._shiftGridType == ShiftedGridType.LEFT_ODD)    { if (Math.abs(gridPos.y % 2) == 0) offsetPos.x = -this._shift.x; }
            else if (this._shiftGridType == ShiftedGridType.TOP_EVEN)    { if (Math.abs(gridPos.x % 2) == 1) offsetPos.y =  this._shift.y; }
            else if (this._shiftGridType == ShiftedGridType.TOP_ODD)     { if (Math.abs(gridPos.x % 2) == 0) offsetPos.y =  this._shift.y; }
            else if (this._shiftGridType == ShiftedGridType.BOTTOM_EVEN) { if (Math.abs(gridPos.x % 2) == 1) offsetPos.y = -this._shift.y; }
            else if (this._shiftGridType == ShiftedGridType.BOTTOM_ODD)  { if (Math.abs(gridPos.x % 2) == 0) offsetPos.y = -this._shift.y; }

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
                        offsetPos.y = -(gridPos.y * this._shift.y);
                        break;
                    }
                    case ShiftedGridType.TOP_EVEN:
                    case ShiftedGridType.TOP_ODD:
                    case ShiftedGridType.BOTTOM_EVEN:
                    case ShiftedGridType.BOTTOM_ODD:
                    {
                        offsetPos.x = -(gridPos.x * this._shift.x);
                        break;
                    }
                }
            }

            result.x = this._anchor.x + gridPos.x * (this._cell.width + this._gap.x) + offsetPos.x;
            result.y = this._anchor.y + gridPos.y * (this._cell.height + this._gap.y) + offsetPos.y;
        }

        return result;
    }

    public override worldToGrid(wopldPoint:Vec3):T
    {
        let result:Vec3 = v3();
        let offsetPos:Vec3 = v3(); // Учёт смещений по позиции ячеек
        let offsetSize:Vec3 = v3(); // Учёт смещений по размеру ячеек
        let position:Position;
        let location:T = new this.locationConstructor(null, Position.OUT);
        
        if (this._shiftGridType == ShiftedGridType.RIGHT_EVEN
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
            
            result.y = Math.floor((wopldPoint.y - this._anchor.y) / (this._cell.height + this._gap.y + offsetSize.y));

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

            result.x = Math.floor((wopldPoint.x - this._anchor.x + offsetPos.x) / (this._cell.width + this._gap.x));
        }

        if (this._shiftGridType == ShiftedGridType.TOP_EVEN
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

            result.x = Math.floor((wopldPoint.x - this._anchor.x) / (this._cell.width + this._gap.x + offsetSize.x));

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

            result.y = Math.floor((wopldPoint.y - this._anchor.y + offsetPos.y) / (this._cell.height + this._gap.y));
        }

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
                result = this.getCellNeighbor(result, position);
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
        let result:Vec3 = gridPos.clone();
        let neighbor:Vec3;

        if (this._shiftGridType == ShiftedGridType.RIGHT_EVEN || this._shiftGridType == ShiftedGridType.LEFT_EVEN)
        {
            if (Math.abs(gridPos.y % 2) == 0)
                neighbor = this.neighbors.get(position);
            else
                neighbor = this.neighborsShifted.get(position);
        }
        else if (this._shiftGridType == ShiftedGridType.RIGHT_ODD || this._shiftGridType == ShiftedGridType.LEFT_ODD)
        {
            if (Math.abs(gridPos.y % 2) == 0)
                neighbor = this.neighborsShifted.get(position);
            else
                neighbor = this.neighbors.get(position);
        }
        else if (this._shiftGridType == ShiftedGridType.TOP_EVEN || this._shiftGridType == ShiftedGridType.BOTTOM_EVEN)
        {
            if (Math.abs(gridPos.x % 2) == 0)
                neighbor = this.neighbors.get(position);
            else
                neighbor = this.neighborsShifted.get(position);
        }
        else if (this._shiftGridType == ShiftedGridType.TOP_ODD || this._shiftGridType == ShiftedGridType.BOTTOM_ODD)
        {
            if (Math.abs(gridPos.x % 2) == 0)
                neighbor = this.neighborsShifted.get(position);
            else
                neighbor = this.neighbors.get(position);
        }

        if (neighbor != null)
            result.add(neighbor);

        return result;
    }

    public override getCellNeighbors(gridPos:Vec3):Map<Position, Vec3>
    {
        let result:Map<Position, Vec3> = new Map<Position, Vec3>();

        if (this._shiftGridType == ShiftedGridType.RIGHT_EVEN || this._shiftGridType == ShiftedGridType.LEFT_EVEN)
        {
            if (Math.abs(gridPos.y % 2) == 0)
                return this.neighbors;
            else
                return this.neighborsShifted;
        }
        else if (this._shiftGridType == ShiftedGridType.RIGHT_ODD || this._shiftGridType == ShiftedGridType.LEFT_ODD)
        {
            if (Math.abs(gridPos.y % 2) == 0)
                return this.neighborsShifted;
            else
                return this.neighbors;
        }
        else if (this._shiftGridType == ShiftedGridType.TOP_EVEN || this._shiftGridType == ShiftedGridType.BOTTOM_EVEN)
        {
            if (Math.abs(gridPos.x % 2) == 0)
                return this.neighbors;
            else
                return this.neighborsShifted;
        }
        else if (this._shiftGridType == ShiftedGridType.TOP_ODD || this._shiftGridType == ShiftedGridType.BOTTOM_ODD)
        {
            if (Math.abs(gridPos.x % 2) == 0)
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
    
    public offsetToCube(vec:Vec3)
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
    
    public cubeToOffset(vec:Vec3)
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