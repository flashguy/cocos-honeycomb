import { _decorator } from 'cc';
import { HexagonCell } from './HexagonCell';
import { Location } from '../enums/Location';
import { Edge } from '../geometry/Edge';
import { CellType } from '../enums/CellType';
const { ccclass } = _decorator;

@ccclass('HexagonPointyCell')
export class HexagonPointyCell extends HexagonCell
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



    constructor(width:number, height:number, asRegularPolygon:boolean)
    {
        super(width, height, asRegularPolygon);

        this._type = CellType.HEXAGON_POINTY;

        this._verticalOffset = 0;
        this._horizontalOffset = this._outerRadius - this._innerRadius;

        if (this._asRegularPolygon)
        {
            this._verticalRatio = 1;
            this._horizontalRatio = 1;
            
            this._width = this._innerRadius * 2;
            this._height = this._outerRadius * 2;
        }
        else
        {
            this._verticalRatio = height / width;
            this._horizontalRatio = width / (this._innerRadius * 2);
            
            this._width = width;
            this._height = height;
        }
        
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
        this.vertices.set(Location.RT, this.calculateVertex(30));
        this.vertices.set(Location.T,  this.calculateVertex(90));
        this.vertices.set(Location.LT, this.calculateVertex(150));
        this.vertices.set(Location.LB, this.calculateVertex(210));
        this.vertices.set(Location.B,  this.calculateVertex(270));
        this.vertices.set(Location.RB, this.calculateVertex(330));
    }

    protected override setEdges():void
    {
        // INFO: рёбра нужно формировать против часовой стрелки для корректной работы алгоритма PointToEdgeDistance слева направо снизу вверх
        this.edges.set(Location.LB, new Edge(this.getVertex(Location.LB), this.getVertex(Location.B)));
        this.edges.set(Location.RB, new Edge(this.getVertex(Location.B),  this.getVertex(Location.RB)));
        this.edges.set(Location.R,  new Edge(this.getVertex(Location.RB), this.getVertex(Location.RT)));
        this.edges.set(Location.RT, new Edge(this.getVertex(Location.RT), this.getVertex(Location.T)));
        this.edges.set(Location.LT, new Edge(this.getVertex(Location.T),  this.getVertex(Location.LT)));
        this.edges.set(Location.L,  new Edge(this.getVertex(Location.LT), this.getVertex(Location.LB)));
    }

    // --------------
    // public methods
    // --------------


}