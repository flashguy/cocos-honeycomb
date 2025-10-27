import { _decorator } from 'cc';
import { HexagonCell } from './HexagonCell';
import { Position } from '../enums/Position';
import { Edge } from '../geometry/Edge';
import { CellType } from '../enums/CellType';
const { ccclass } = _decorator;

// File HexagonPointyCell.ts created am_empty
// Date of creation Wed Jul 30 2025 19:57:55 GMT+0300 (Москва, стандартное время),

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
        this.vertices.set(Position.RT, this.calculateVertex(30));
        this.vertices.set(Position.T,  this.calculateVertex(90));
        this.vertices.set(Position.LT, this.calculateVertex(150));
        this.vertices.set(Position.LB, this.calculateVertex(210));
        this.vertices.set(Position.B,  this.calculateVertex(270));
        this.vertices.set(Position.RB, this.calculateVertex(330));
    }

    protected override setEdges():void
    {
        // INFO: рёбра нужно формировать против часовой стрелки для корректной работы алгоритма PointToEdgeDistance слева направо снизу вверх
        this.edges.set(Position.LB, new Edge(this.getVertex(Position.LB), this.getVertex(Position.B)));
        this.edges.set(Position.RB, new Edge(this.getVertex(Position.B),  this.getVertex(Position.RB)));
        this.edges.set(Position.R,  new Edge(this.getVertex(Position.RB), this.getVertex(Position.RT)));
        this.edges.set(Position.RT, new Edge(this.getVertex(Position.RT), this.getVertex(Position.T)));
        this.edges.set(Position.LT, new Edge(this.getVertex(Position.T),  this.getVertex(Position.LT)));
        this.edges.set(Position.L,  new Edge(this.getVertex(Position.LT), this.getVertex(Position.LB)));
    }

    // --------------
    // public methods
    // --------------


}