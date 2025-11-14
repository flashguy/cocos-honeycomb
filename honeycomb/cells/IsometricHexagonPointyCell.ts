import { _decorator, v3, Vec3 } from 'cc';
import { Location } from '../enums/Location';
import { HexagonCell } from './HexagonCell';
import { Edge } from '../geometry/Edge';
import { CellType } from '../enums/CellType';
const { ccclass } = _decorator;

@ccclass('IsometricHexagonPointyCell')
export class IsometricHexagonPointyCell extends HexagonCell
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

        this._type = CellType.ISO_HEXAGON_POINTY;

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
        this.vertices.set(Location.B,  v3(this._width - this._width * this.ISO_RATIO));
        this.vertices.set(Location.RB, v3(this._width - this._horizontalOffset, this._verticalOffset));
        this.vertices.set(Location.RT, v3(this._width, this._height * this.ISO_RATIO));
        this.vertices.set(Location.T,  v3(this._width * this.ISO_RATIO, this._height));
        this.vertices.set(Location.LT, v3(this._horizontalOffset, this._height - this._verticalOffset));
        this.vertices.set(Location.LB, v3(0, this._height - this._height * this.ISO_RATIO));
    }

    protected override setEdges():void
    {
        // INFO: рёбра нужно формировать против часовой стрелки для корректной работы алгоритма PointToEdgeDistance слева направо снизу вверх
        this.edges.set(Location.RB, new Edge(this.getVertex(Location.B),  this.getVertex(Location.RB)));
        this.edges.set(Location.R,  new Edge(this.getVertex(Location.RB), this.getVertex(Location.RT)));
        this.edges.set(Location.RT, new Edge(this.getVertex(Location.RT), this.getVertex(Location.T)));
        this.edges.set(Location.LT, new Edge(this.getVertex(Location.T),  this.getVertex(Location.LT)));
        this.edges.set(Location.L,  new Edge(this.getVertex(Location.LT), this.getVertex(Location.LB)));
        this.edges.set(Location.LB, new Edge(this.getVertex(Location.LB), this.getVertex(Location.B)));
    }

    // --------------
    // public methods
    // --------------

    public override isPointInside(wopldPoint:Vec3, gridToWopldPoint:Vec3, defineQuadrant:boolean):Location
    {
        return this.checkEdges(wopldPoint, gridToWopldPoint, defineQuadrant);
    }
}