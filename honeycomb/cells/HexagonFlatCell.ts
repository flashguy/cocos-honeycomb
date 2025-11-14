import { _decorator } from 'cc';
import { HexagonCell } from './HexagonCell';
import { Edge } from '../geometry/Edge';
import { CellType } from '../enums/CellType';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

@ccclass('HexagonFlatCell')
export class HexagonFlatCell extends HexagonCell
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

        this._type = CellType.HEXAGON_FLAT;
        
        this._verticalOffset = this._outerRadius - this._innerRadius;
        this._horizontalOffset = 0;

        if (this._asRegularPolygon)
        {
            this._verticalRatio = 1;
            this._horizontalRatio = 1;

            this._width = this._outerRadius * 2;
            this._height = this._innerRadius * 2;
        }
        else
        {
            this._verticalRatio = height / (this._innerRadius * 2);
            this._horizontalRatio = 1;
            
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
        this.vertices.set(Location.R,  this.calculateVertex(0));
        this.vertices.set(Location.RT, this.calculateVertex(60));
        this.vertices.set(Location.LT, this.calculateVertex(120));
        this.vertices.set(Location.L,  this.calculateVertex(180));
        this.vertices.set(Location.LB, this.calculateVertex(240));
        this.vertices.set(Location.RB, this.calculateVertex(300));
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


}