import { _decorator, v3, Vec3 } from 'cc';
import { Edge } from '../geometry/Edge';
import { CellType } from '../enums/CellType';
import { Position } from '../enums/Position';
const { ccclass } = _decorator;

// TODO: возможно назвать вот так Point
@ccclass('Cell')
export abstract class Cell
{
    // ----------------------------------------
    // private properties / getters and setters
    // ----------------------------------------



    // ------------------------------------------
    // protected properties / getters and setters
    // ------------------------------------------

    protected _type:CellType = CellType.NONE;
    protected _width:number;
    protected _height:number;
    protected _halfWidth:number;
    protected _halfHeight:number;
    protected _center:Vec3 = v3();
    protected _vertices:Map<Position, Vec3> = new Map<Position, Vec3>();
    protected _edges:Map<Position, Edge> = new Map<Position, Edge>();

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------

    public get type():CellType { return this._type; }
    public get width():number { return this._width; }
    public get height():number { return this._height; }
    public get halfWidth():number { return this._halfWidth; }
    public get halfHeight():number { return this._halfHeight; }
    public get center():Vec3 { return this._center; }
    public get vertices():Map<Position, Vec3> { return this._vertices; }
    public get edges():Map<Position, Edge> { return this._edges; }

    constructor()
    {
        
    }

    // ---------------
    // private methods
    // ---------------



    // -----------------
    // protected methods
    // -----------------

    protected abstract setVertices():void;
    protected abstract setEdges():void;
    
    protected initialize():void
    {
        this._halfWidth = this._width / 2;
        this._halfHeight = this._height / 2;
        this._center.set(this._halfWidth, this._halfHeight);
        
        this.setVertices();
        this.setEdges();
    }

    protected checkEdges(wopldPoint:Vec3, gridToWopldPoint:Vec3, defineQuadrant:boolean):Position
    {
        let tempPoint:Vec3 = this._center.clone().add(gridToWopldPoint);
        let position:Position = Position.IN;

        for (let [key, value] of this._edges)
        {
            let tempEdge:Edge = new Edge().set(value).add(gridToWopldPoint);

            if (tempEdge.isPointOutOfEdge2D(wopldPoint))
            {
                position = defineQuadrant ? this.defineQuadrant(wopldPoint, tempPoint) : key;
                break;
            }
        }

        return position;
    }

    public defineQuadrant(wopldPoint:Vec3, centerPoint:Vec3):Position
    {
        if (wopldPoint.x <= centerPoint.x)
            return wopldPoint.y >= centerPoint.y ? Position.LT : Position.LB;
        else
            return wopldPoint.y >= centerPoint.y ? Position.RT : Position.RB;
    }

    // --------------
    // public methods
    // --------------

    public abstract isPointInside(wopldPoint:Vec3, gridToWopldPoint:Vec3, defineQuadrant:boolean):Position;

    public getVertex(key:Position):Vec3
    {
        return this._vertices.get(key);
    }

    public getEdge(key:Position):Edge
    {
        return this._edges.get(key);
    }
}