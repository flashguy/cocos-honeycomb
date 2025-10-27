import { _decorator } from 'cc';
import { HexagonCell } from './HexagonCell';
import { Edge } from '../geometry/Edge';
import { CellType } from '../enums/CellType';
import { Position } from '../enums/Position';
const { ccclass } = _decorator;

// File HexagonFlatCell.ts created am_empty
// Date of creation Wed Jul 30 2025 19:57:42 GMT+0300 (Москва, стандартное время),

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
        this.vertices.set(Position.R,  this.calculateVertex(0));
        this.vertices.set(Position.RT, this.calculateVertex(60));
        this.vertices.set(Position.LT, this.calculateVertex(120));
        this.vertices.set(Position.L,  this.calculateVertex(180));
        this.vertices.set(Position.LB, this.calculateVertex(240));
        this.vertices.set(Position.RB, this.calculateVertex(300));
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


}