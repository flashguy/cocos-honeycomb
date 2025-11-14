import { _decorator, v3, Vec3 } from 'cc';
import { Location } from '../enums/Location';
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
        this.vertices.set(Location.R,  v3(this._width, this._height - this._height * this.ISO_RATIO));
        this.vertices.set(Location.RB, v3(this._width * this.ISO_RATIO, 0));
        this.vertices.set(Location.RT, v3(this._width - this._horizontalOffset, this._height - this._verticalOffset));
        this.vertices.set(Location.LT, v3(this._width - this._width * this.ISO_RATIO, this._height));
        this.vertices.set(Location.L,  v3(0, this._height * this.ISO_RATIO));
        this.vertices.set(Location.LB, v3(this._horizontalOffset, this._verticalOffset));
    }

    protected override setEdges():void
    {
        // INFO: рёбра нужно формировать против часовой стрелки для корректной работы алгоритма PointToEdgeDistance слева направо снизу вверх
        this.edges.set(Location.B,  new Edge(this.getVertex(Location.LB), this.getVertex(Location.RB)));
        this.edges.set(Location.RB, new Edge(this.getVertex(Location.RB), this.getVertex(Location.R)));
        this.edges.set(Location.RT, new Edge(this.getVertex(Location.R),  this.getVertex(Location.RT)));
        this.edges.set(Location.T,  new Edge(this.getVertex(Location.RT), this.getVertex(Location.LT)));
        this.edges.set(Location.LT, new Edge(this.getVertex(Location.LT), this.getVertex(Location.L)));
        this.edges.set(Location.LB, new Edge(this.getVertex(Location.L),  this.getVertex(Location.LB)));
    }

    // --------------
    // public methods
    // --------------

    public override isPointInside(wopldPoint:Vec3, gridToWopldPoint:Vec3, defineQuadrant:boolean):Location
    {
        return this.checkEdges(wopldPoint, gridToWopldPoint, defineQuadrant);
    }
}