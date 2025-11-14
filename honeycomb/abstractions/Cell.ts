import { _decorator, v3, Vec3 } from 'cc';
import { Edge } from '../geometry/Edge';
import { CellType } from '../enums/CellType';
import { Location } from '../enums/Location';
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
    protected _vertices:Map<Location, Vec3> = new Map<Location, Vec3>();
    protected _edges:Map<Location, Edge> = new Map<Location, Edge>();

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------

    public get type():CellType { return this._type; }
    public get width():number { return this._width; }
    public get height():number { return this._height; }
    public get halfWidth():number { return this._halfWidth; }
    public get halfHeight():number { return this._halfHeight; }
    public get center():Vec3 { return this._center; }
    public get vertices():Map<Location, Vec3> { return this._vertices; }
    public get edges():Map<Location, Edge> { return this._edges; }

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

    protected checkEdges(wopldPoint:Vec3, gridToWopldPoint:Vec3, defineQuadrant:boolean):Location
    {
        let tempPoint:Vec3 = this._center.clone().add(gridToWopldPoint);
        let location:Location = Location.IN;

        for (let [key, value] of this._edges)
        {
            let tempEdge:Edge = new Edge().set(value).add(gridToWopldPoint);

            if (tempEdge.isPointOutOfEdge2D(wopldPoint))
            {
                location = defineQuadrant ? this.defineQuadrant(wopldPoint, tempPoint) : key;
                break;
            }
        }

        return location;
    }

    public defineQuadrant(wopldPoint:Vec3, centerPoint:Vec3):Location
    {
        if (wopldPoint.x <= centerPoint.x)
            return wopldPoint.y >= centerPoint.y ? Location.LT : Location.LB;
        else
            return wopldPoint.y >= centerPoint.y ? Location.RT : Location.RB;
    }

    // --------------
    // public methods
    // --------------

    public abstract isPointInside(wopldPoint:Vec3, gridToWopldPoint:Vec3, defineQuadrant:boolean):Location;

    public getVertex(key:Location):Vec3
    {
        return this._vertices.get(key);
    }

    public getEdge(key:Location):Edge
    {
        return this._edges.get(key);
    }
}