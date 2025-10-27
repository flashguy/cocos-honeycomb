import { _decorator, v3, Vec3 } from 'cc';
import { Cell } from '../abstractions/Cell';
import { Edge } from '../geometry/Edge';
import { CellType } from '../enums/CellType';
import { Position } from '../enums/Position';
const { ccclass } = _decorator;

// File RectangleCell.ts created am_empty
// Date of creation Tue Jun 10 2025 21:59:01 GMT+0300 (Москва, стандартное время),

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
        this._vertices.set(Position.LB, v3(0, 0));
        this._vertices.set(Position.RB, v3(this._width, 0));
        this._vertices.set(Position.RT, v3(this._width, this._height));
        this._vertices.set(Position.LT, v3(0, this._height));
    }

    protected override setEdges():void
    {
        // INFO: рёбра нужно формировать против часовой стрелки для корректной работы алгоритма PointToEdgeDistance слева направо снизу вверх
        this._edges.set(Position.B, new Edge(this.getVertex(Position.LB), this.getVertex(Position.RB)));
        this._edges.set(Position.R, new Edge(this.getVertex(Position.RB), this.getVertex(Position.RT)));
        this._edges.set(Position.T, new Edge(this.getVertex(Position.RT), this.getVertex(Position.LT)));
        this._edges.set(Position.L, new Edge(this.getVertex(Position.LT), this.getVertex(Position.LB)));
    }

    // --------------
    // public methods
    // --------------

    public override isPointInside(wopldPoint:Vec3, gridToWopldPoint:Vec3, defineQuadrant:boolean):Position
    {
        return this.checkEdges(wopldPoint, gridToWopldPoint, defineQuadrant);
    }
}