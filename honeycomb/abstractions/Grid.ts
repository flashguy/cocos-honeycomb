import { _decorator, v3, Vec3 } from 'cc';
import { Cell } from './Cell';
import { Position } from '../enums/Position';
import { ILocation } from '../locations/ILocation';
const { ccclass } = _decorator;

// File Grid.ts created am_empty
// Date of creation Tue Jun 10 2025 19:52:56 GMT+0300 (Москва, стандартное время),

@ccclass('Grid')
export abstract class Grid<T extends ILocation>
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

    protected readonly neighbors:Map<Position, Vec3> = new Map<Position, Vec3>();
    protected readonly diagonals:Map<Position, Vec3> = new Map<Position, Vec3>();
    
    protected readonly neighborsShifted:Map<Position, Vec3> = new Map<Position, Vec3>();
    protected readonly diagonalsShifted:Map<Position, Vec3> = new Map<Position, Vec3>();

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------

    public get cell():Cell { return this._cell; }
    public get gap():Vec3 { return this._gap; }
    public get anchor():Vec3 { return this._anchor; }

    constructor(protected locationConstructor: new (gridPos?:Vec3, position?:Position, index?:number) => T, cell:Cell, anchor:Vec3 = v3(), gap:Vec3 = v3())
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

    protected createLocation():T
    {
        return new this.locationConstructor(v3(), Position.NONE, 0);
    }

    protected initialize():void
    {
        this.setNeighbors();
        this.calculateGridSpecificPrameters();
    }

    protected getNeighbor(gridPos:Vec3, position:Position):Vec3
    {
        let resultLocation:Vec3 = gridPos.clone();
        
        if (this.neighbors.has(position))
            return resultLocation.add(this.neighbors.get(position));
        else
            return null;
    }

    protected getNeighborShifted(gridPos:Vec3, position:Position, notFromShifted:boolean):Vec3
    {
        let result:Vec3 = gridPos.clone();
        
        if (notFromShifted)
        {
            if (this.neighbors.has(position))
                return result.add(this.neighbors.get(position));
            else
                return null;
        }
        else
        {
            if (this.neighborsShifted.has(position))
                return result.add(this.neighborsShifted.get(position));
            else
                return null;
        }
    }

    protected getNeighborShiftedByX(gridPos:Vec3, position:Position):Vec3
    {
        return this.getNeighborShifted(gridPos, position, gridPos.x % 2 == 0);
    }

    protected getNeighborShiftedByY(gridPos:Vec3, position:Position):Vec3
    {
        return this.getNeighborShifted(gridPos, position, gridPos.y % 2 == 0);
    }
    
    protected getNeighbors(gridPoint:Vec3):Map<Position, Vec3>
    {
        return this.neighbors;
    }

    protected getNeighborsShifted(notFromShifted:boolean):Map<Position, Vec3>
    {
        if (notFromShifted)
            return this.neighbors;
        else
            return this.neighborsShifted;
    }

    protected getNeighborsShiftedByX(gridPos:Vec3):Map<Position, Vec3>
    {
        return this.getNeighborsShifted(gridPos.x % 2 == 0);
    }
    
    protected getNeighborsShiftedByY(gridPos:Vec3):Map<Position, Vec3>
    {
        return this.getNeighborsShifted(gridPos.y % 2 == 0);
    }

    // --------------
    // public methods
    // --------------

    public abstract gridToWorld(gridPos:Vec3):Vec3;
    public abstract worldToGrid(wopldPoint:Vec3):T;
    public abstract getCellNeighbor(gridPos:Vec3, position:Position):Vec3;
    public abstract getCellNeighbors(gridPos:Vec3):Map<Position, Vec3>;

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