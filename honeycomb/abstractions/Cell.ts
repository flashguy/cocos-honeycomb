import { _decorator, v3, Vec3 } from 'cc';
import { Edge } from '../geometry/Edge';
import { CellType } from '../enums/CellType';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

@ccclass('Cell')
export abstract class Cell
{
    private _tempEdge:Edge = new Edge();
    
    protected _type:CellType = CellType.NONE;
    protected _width:number;
    protected _height:number;
    protected _halfWidth:number;
    protected _halfHeight:number;
    protected _center:Vec3 = v3();
    protected _vertices:Map<Location, Vec3> = new Map<Location, Vec3>();
    protected _edges:Map<Location, Edge> = new Map<Location, Edge>();

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

    protected checkEdges(worldPoint:Vec3, gridToWorldPoint:Vec3, defineQuadrant:boolean):Location
    {
        let tempPoint:Vec3 = this._center.clone().add(gridToWorldPoint);
        let location:Location = Location.IN;

        for (let [key, value] of this._edges)
        {
            this._tempEdge.set(value).add(gridToWorldPoint);

            if (this._tempEdge.isPointOutOfEdge2D(worldPoint))
            {
                location = defineQuadrant ? this.defineQuadrant(worldPoint, tempPoint) : key;
                break;
            }
        }

        return location;
    }

    public defineQuadrant(worldPoint:Vec3, centerPoint:Vec3):Location
    {
        if (worldPoint.x <= centerPoint.x)
            return worldPoint.y >= centerPoint.y ? Location.LT : Location.LB;
        else
            return worldPoint.y >= centerPoint.y ? Location.RT : Location.RB;
    }

    public abstract isPointInside(worldPoint:Vec3, gridToWorldPoint:Vec3, defineQuadrant:boolean):Location;
    public abstract getVerticesOrder():Location[];

    public getVertex(key:Location):Vec3
    {
        return this._vertices.get(key);
    }

    public getEdge(key:Location):Edge
    {
        return this._edges.get(key);
    }
}