import { _decorator, v3, Vec3 } from 'cc';
import { Cell } from './Cell';
import { Location } from '../enums/Location';
import { IPlacement } from '../placements/IPlacement';
const { ccclass } = _decorator;

@ccclass('Grid')
export abstract class Grid<T extends IPlacement>
{
    // ----------------------------------------
    // private properties / getters and setters
    // ----------------------------------------



    // ------------------------------------------
    // protected properties / getters and setters
    // ------------------------------------------

    protected _cell:Cell;
    protected _gap:Vec3 = v3();
    protected _anchor:Vec3 = v3();

    protected readonly neighbors:Map<Location, Vec3> = new Map<Location, Vec3>();
    protected readonly diagonals:Map<Location, Vec3> = new Map<Location, Vec3>();
    
    protected readonly neighborsShifted:Map<Location, Vec3> = new Map<Location, Vec3>();
    protected readonly diagonalsShifted:Map<Location, Vec3> = new Map<Location, Vec3>();

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------

    public get cell():Cell { return this._cell; }
    public get gap():Vec3 { return this._gap; }
    public get anchor():Vec3 { return this._anchor; }

    constructor(protected placementConstructor: new (cellPos?:Vec3, location?:Location, index?:number) => T, cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
    {
        this._cell = cell;
        this._anchor = anchor;
        this._gap = gap;
    }

    // ---------------
    // private methods
    // ---------------

    

    // -----------------
    // protected methods
    // -----------------

    protected abstract setNeighbors():void;
    protected abstract calculateGridSpecificPrameters():void;

    protected createPlacement():T
    {
        return new this.placementConstructor(v3(), Location.NONE, 0);
    }

    protected initialize():void
    {
        this.setNeighbors();
        this.calculateGridSpecificPrameters();
    }

    protected getNeighbor(cellPos:Vec3, location:Location):Vec3
    {
        let resultPlacement:Vec3 = cellPos.clone();
        
        if (this.neighbors.has(location))
            return resultPlacement.add(this.neighbors.get(location));
        else
            return null;
    }

    protected getNeighborShifted(cellPos:Vec3, location:Location, notFromShifted:boolean):Vec3
    {
        let result:Vec3 = cellPos.clone();
        
        if (notFromShifted)
        {
            if (this.neighbors.has(location))
                return result.add(this.neighbors.get(location));
            else
                return null;
        }
        else
        {
            if (this.neighborsShifted.has(location))
                return result.add(this.neighborsShifted.get(location));
            else
                return null;
        }
    }

    protected getNeighborShiftedByX(cellPos:Vec3, location:Location):Vec3
    {
        return this.getNeighborShifted(cellPos, location, cellPos.x % 2 == 0);
    }

    protected getNeighborShiftedByY(cellPos:Vec3, location:Location):Vec3
    {
        return this.getNeighborShifted(cellPos, location, cellPos.y % 2 == 0);
    }
    
    protected getNeighbors(gridPoint:Vec3):Map<Location, Vec3>
    {
        return this.neighbors;
    }

    protected getNeighborsShifted(notFromShifted:boolean):Map<Location, Vec3>
    {
        if (notFromShifted)
            return this.neighbors;
        else
            return this.neighborsShifted;
    }

    protected getNeighborsShiftedByX(cellPos:Vec3):Map<Location, Vec3>
    {
        return this.getNeighborsShifted(cellPos.x % 2 == 0);
    }
    
    protected getNeighborsShiftedByY(cellPos:Vec3):Map<Location, Vec3>
    {
        return this.getNeighborsShifted(cellPos.y % 2 == 0);
    }

    // --------------
    // public methods
    // --------------

    public abstract gridToWorld(cellPos:Vec3):Vec3;
    public abstract worldToGrid(wopldPoint:Vec3):T;
    public abstract getCellNeighbor(cellPos:Vec3, location:Location):Vec3;
    public abstract getCellNeighbors(cellPos:Vec3):Map<Location, Vec3>;

    public getDistance(gridStartPos:Vec3, gridEndPos:Vec3):number
    {
        return Vec3.distance(gridStartPos, gridEndPos);
    }
    
    public offsetToCube(vec:Vec3)
    {
        return vec;
    }
    
    public cubeToOffset(vec:Vec3)
    {
        return vec;
    }
}