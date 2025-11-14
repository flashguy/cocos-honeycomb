import { _decorator, v3, Vec3 } from 'cc';
import { IPlacement } from '../placements/IPlacement';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

// File Shape.ts created am_empty
// Date of creation Tue Jun 10 2025 21:28:14 GMT+0300 (Москва, стандартное время),

// x - column
// y - row

@ccclass('Shape')
export abstract class Shape<T extends IPlacement>
{
    // ----------------------------------------
    // private properties / getters and setters
    // ----------------------------------------



    // ------------------------------------------
    // protected properties / getters and setters
    // ------------------------------------------

    protected readonly _placements:Array<T> = new Array<T>();
    protected readonly _placementsMap:Map<string, T> = new Map<string, T>();

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------

    constructor(protected placementConstructor: new (gridPos?:Vec3, location?:Location, index?:number) => T)
    {
        
    }

    // ---------------
    // private methods
    // ---------------

    

    // -----------------
    // protected methods
    // -----------------

    protected createPlacement():T
    {
        return new this.placementConstructor(v3(), Location.NONE, 0);
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
        const key:string = this.vec3ToKey(gridPos);

        return this._placementsMap.has(key);
    }

    public getPlacementByGridPos(gridPos:Vec3):T
    {
        const key:string = this.vec3ToKey(gridPos);

        return this._placementsMap.get(key)
    }

    public getIndexByGridPos(gridPos:Vec3):number
    {
        // TODO: расчитать для всех сеток
        return 0;
    }

    public add(gridPos:Vec3):boolean
    {
        if (gridPos == null)
            return false;
        
        const key:string = this.vec3ToKey(gridPos);

        if (this._placementsMap.has(key))
            return false;

        let placement:T = this.createPlacement();
        placement.gridPos = gridPos.clone();
        
        this._placementsMap.set(key, placement);
        this._placements.push(placement);

        return true;
    }

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
        return this._placements;
    }

    public size():number
    {
        return this._placements.length;
    }

    public sort(sortFunc:(a:IPlacement, b:IPlacement) => number):void
    {
        this._placements.sort(sortFunc);
    }
}