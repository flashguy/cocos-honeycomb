import { _decorator, v3, Vec3 } from 'cc';
import { Position } from '../enums/Position';
import { Edge } from '../geometry/Edge';
import { HexagonCell } from './HexagonCell';
import { CellType } from '../enums/CellType';
const { ccclass } = _decorator;

// File IsometricHexagonFlatCell.ts created am_empty
// Date of creation Sun Oct 12 2025 17:10:48 GMT+0300 (Москва, стандартное время),

@ccclass('IsometricHexagonFlatCell')
export class IsometricHexagonFlatCell extends HexagonCell
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
        super(width, height, false);

        this._type = CellType.ISO_HEXAGON_FLAT;

        this._width = width;
        this._height = height;

        this._horizontalOffset = (this._width - this._width * this.ISO_RATIO) / 2;
        this._verticalOffset = (this._height - this._height * this.ISO_RATIO) / 2;

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
        this.vertices.set(Position.R,  v3(this._width, this._height - this._height * this.ISO_RATIO));
        this.vertices.set(Position.RB, v3(this._width * this.ISO_RATIO, 0));
        this.vertices.set(Position.RT, v3(this._width - this._horizontalOffset, this._height - this._verticalOffset));
        this.vertices.set(Position.LT, v3(this._width - this._width * this.ISO_RATIO, this._height));
        this.vertices.set(Position.L,  v3(0, this._height * this.ISO_RATIO));
        this.vertices.set(Position.LB, v3(this._horizontalOffset, this._verticalOffset));
    }

    protected override setEdges():void
    {
        // INFO: рёбра нужно формировать против часовой стрелки для корректной работы алгоритма PointToEdgeDistance слева направо снизу вверх
        this.edges.set(Position.B,  new Edge(this.getVertex(Position.LB), this.getVertex(Position.RB)));
        this.edges.set(Position.RB, new Edge(this.getVertex(Position.RB), this.getVertex(Position.R)));
        this.edges.set(Position.RT, new Edge(this.getVertex(Position.R),  this.getVertex(Position.RT)));
        this.edges.set(Position.T,  new Edge(this.getVertex(Position.RT), this.getVertex(Position.LT)));
        this.edges.set(Position.LT, new Edge(this.getVertex(Position.LT), this.getVertex(Position.L)));
        this.edges.set(Position.LB, new Edge(this.getVertex(Position.L),  this.getVertex(Position.LB)));
    }

    // --------------
    // public methods
    // --------------

    public override isPointInside(wopldPoint:Vec3, gridToWopldPoint:Vec3, defineQuadrant:boolean):Position
    {
        return this.checkEdges(wopldPoint, gridToWopldPoint, defineQuadrant);
    }
}