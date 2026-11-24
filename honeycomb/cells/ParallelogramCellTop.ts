import { _decorator, v3 } from 'cc';
import { ParallelogramCell } from './ParallelogramCell';
import { CellType } from '../enums/CellType';
import { Location } from '../enums/Location';
import { Edge } from '../geometry/Edge';
const { ccclass, property } = _decorator;

@ccclass('ParallelogramCellTop')
export class ParallelogramCellTop extends ParallelogramCell
{
    constructor(width:number, height:number, widthSkew:number, heightSkew:number)
    {
        super(width, height, widthSkew, heightSkew);

        this._type = CellType.PARALLELOGRAM_TOP;
        
        this.initialize();
    }

    protected override setVertices():void
    {
        // INFO: точки углов формируем против часовой стрелки слева направо и снизу вверх
        this._vertices.set(Location.LB, v3(this._width * this._widthSkew, 0));
        this._vertices.set(Location.RB, v3(this._width, this._height * this._heightSkew));
        this._vertices.set(Location.RT, v3(this._width * (1 - this._widthSkew), this._height));
        this._vertices.set(Location.LT, v3(0, this._height * (1 - this._heightSkew)));
    }

    protected override setEdges():void
    {
        // INFO: рёбра нужно формировать против часовой стрелки для корректной работы алгоритма PointToEdgeDistance слева направо снизу вверх
        this._edges.set(Location.B, new Edge(this.getVertex(Location.LB), this.getVertex(Location.RB)));
        this._edges.set(Location.R, new Edge(this.getVertex(Location.RB), this.getVertex(Location.RT)));
        this._edges.set(Location.T, new Edge(this.getVertex(Location.RT), this.getVertex(Location.LT)));
        this._edges.set(Location.L, new Edge(this.getVertex(Location.LT), this.getVertex(Location.LB)));
    }
}