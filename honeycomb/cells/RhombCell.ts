import { _decorator, v3, Vec3 } from 'cc';
import { Cell } from '../abstractions/Cell';
import { Edge } from '../geometry/Edge';
import { CellType } from '../enums/CellType';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

// File RhombCell.ts created am_empty
// Date of creation Tue Oct 07 2025 9:57:11 GMT+0300 (Москва, стандартное время),

@ccclass('RhombCell')
export class RhombCell extends Cell
{
    // ----------------------------------------
    // private properties / getters and setters
    // ----------------------------------------


    // ------------------------------------------
    // protected properties / getters and setters
    // ------------------------------------------

    

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------



    constructor(width:number, height:number)
    {
        super();

        this._type = CellType.RHOMB;

        this._width = width;
        this._height = height;
        
        this.initialize();
    }

    // ---------------
    // private methods
    // ---------------



    // -----------------
    // protected methods
    // -----------------

    protected override setVertices():void
    {
        // INFO: точки углов формируем против часовой стрелки слева направо и снизу вверх
        this._vertices.set(Location.L, v3(0, this._halfHeight));
        this._vertices.set(Location.T, v3(this._halfWidth, this._height));
        this._vertices.set(Location.R, v3(this._width, this._halfHeight));
        this._vertices.set(Location.B, v3(this._halfWidth, 0));
    }

    protected override setEdges():void
    {
        // INFO: рёбра нужно формировать против часовой стрелки для корректной работы алгоритма PointToEdgeDistance слева направо снизу вверх
        this._edges.set(Location.LB, new Edge(this.getVertex(Location.L), this.getVertex(Location.B)));
        this._edges.set(Location.RB, new Edge(this.getVertex(Location.B), this.getVertex(Location.R)));
        this._edges.set(Location.RT, new Edge(this.getVertex(Location.R), this.getVertex(Location.T)));
        this._edges.set(Location.LT, new Edge(this.getVertex(Location.T), this.getVertex(Location.L)));
    }

    // --------------
    // public methods
    // --------------

    public override isPointInside(wopldPoint:Vec3, gridToWopldPoint:Vec3, defineQuadrant:boolean):Location
    {
        return this.checkEdges(wopldPoint, gridToWopldPoint, defineQuadrant);
    }
}