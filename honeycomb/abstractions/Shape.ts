import { _decorator, v3, Vec3 } from 'cc';
import { ILocation } from '../locations/ILocation';
import { Position } from '../enums/Position';
const { ccclass } = _decorator;

// File Shape.ts created am_empty
// Date of creation Tue Jun 10 2025 21:28:14 GMT+0300 (Москва, стандартное время),

// x - column
// y - row

@ccclass('Shape')
export abstract class Shape<T extends ILocation>
{
    // ----------------------------------------
    // private properties / getters and setters
    // ----------------------------------------



    // ------------------------------------------
    // protected properties / getters and setters
    // ------------------------------------------

    protected readonly _locations:Array<T> = new Array<T>();
    protected readonly _locationMap:Map<string, T> = new Map<string, T>();

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------

    constructor(protected locationConstructor: new (gridPos?:Vec3, position?:Position, index?:number) => T)
    {
        
    }

    // ---------------
    // private methods
    // ---------------

    

    // -----------------
    // protected methods
    // -----------------

    protected createLocation():T
    {
        return new this.locationConstructor(v3(), Position.NONE, 0);
    }

    protected vec3ToKey(vec3:Vec3):string
    {
        return `${vec3.x},${vec3.y},${vec3.z}`;
    }

    // --------------
    // public methods
    // --------------

    public isInShape(gridPos:Vec3):boolean
    {
        return this._locationMap.has(this.vec3ToKey(gridPos));
    }

    public getIndexByGridPos(pos:Vec3):number
    {
        // TODO: расчитать для всех сеток
        return 0;
    }

    public add(gridPos:Vec3):boolean
    {
        if (gridPos == null)
            return false;
        
        const key:string = this.vec3ToKey(gridPos);

        if (this._locationMap.has(key))
            return false;

        let location:T = this.createLocation();
        location.gridPos = gridPos.clone();
        
        this._locationMap.set(key, location);
        this._locations.push(location);

        return true;
    }

    // public insert(index:number, gridPos:Vec3):void
    // {
    //     let location:T = this.createLocation();
    //     location.gridPos = gridPos.clone();

    //     this._locations.splice(index, 0, location);
    // }

    // public addRow(startCell:Vec3, column:number, row:number):void
    // {
    //     for (let i:number = -column; i <= column; i++)
    //     {
    //         this.add(v3(startCell.x + i, startCell.y + row));
    //     }
    // }

    public addRow(columnFrom:number, columnTo:number, row:number):void
    {
        if (columnTo < columnFrom)
        {
            columnFrom *= -1;
            columnTo *= -1;
        }

        for (let c:number = columnFrom; c <= columnTo; c++)
        {
            this.add(v3(c, row));
        }
    }

    public addRow2(column:number, width:number, row:number)
    {
        for (let c = 0; c < width; c++)
        {
            this.add(v3(column + c, row));
        }
    }

    public get():Array<T>
    {
        return this._locations;
    }

    public size():number
    {
        return this._locations.length;
    }

    public sort(sortFunc:(a:ILocation, b:ILocation) => number):void
    {
        this._locations.sort(sortFunc);
    }
}