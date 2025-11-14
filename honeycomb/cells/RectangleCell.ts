import { _decorator, v3, Vec3 } from 'cc';
import { Cell } from '../abstractions/Cell';
import { Edge } from '../geometry/Edge';
import { CellType } from '../enums/CellType';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

@ccclass('RectangleCell')
export class RectangleCell extends Cell
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

        this._type = CellType.RECTANGLE;

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
        this._vertices.set(Location.LB, v3(0, 0));
        this._vertices.set(Location.RB, v3(this._width, 0));
        this._vertices.set(Location.RT, v3(this._width, this._height));
        this._vertices.set(Location.LT, v3(0, this._height));
    }

    protected override setEdges():void
    {
        // INFO: рёбра нужно формировать против часовой стрелки для корректной работы алгоритма PointToEdgeDistance слева направо снизу вверх
        this._edges.set(Location.B, new Edge(this.getVertex(Location.LB), this.getVertex(Location.RB)));
        this._edges.set(Location.R, new Edge(this.getVertex(Location.RB), this.getVertex(Location.RT)));
        this._edges.set(Location.T, new Edge(this.getVertex(Location.RT), this.getVertex(Location.LT)));
        this._edges.set(Location.L, new Edge(this.getVertex(Location.LT), this.getVertex(Location.LB)));
    }

    // --------------
    // public methods
    // --------------

    public override isPointInside(wopldPoint:Vec3, gridToWopldPoint:Vec3, defineQuadrant:boolean):Location
    {
        return this.checkEdges(wopldPoint, gridToWopldPoint, defineQuadrant);
    }
}