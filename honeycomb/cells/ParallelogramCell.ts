import { _decorator, Vec3 } from 'cc';
import { Cell } from '../abstractions/Cell';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

@ccclass('ParallelogramCell')
export abstract class ParallelogramCell extends Cell
{
    protected _widthSkew:number;
    protected _heightSkew:number;

    public get widthSkew():number { return this._widthSkew; }
    public get heightSkew():number { return this._heightSkew; }

    constructor(width:number, height:number, widthSkew:number, heightSkew:number)
    {
        super();

        this._width = width;
        this._height = height;

        this._widthSkew = widthSkew;
        this._heightSkew = heightSkew;
        
        this.initialize();
    }

    protected override setVertices():void
    {
        
    }

    protected override setEdges():void
    {
        
    }

    public override isPointInside(wopldPoint:Vec3, gridToWopldPoint:Vec3, defineQuadrant:boolean):Location
    {
        return this.checkEdges(wopldPoint, gridToWopldPoint, defineQuadrant);
    }

    public override getVerticesOrder():Location[]
    {
        const result:Location[] = [Location.LB, Location.RB, Location.RT, Location.LT];

        return result;
    }
}