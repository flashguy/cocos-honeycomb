import { _decorator, Vec3 } from 'cc';
import { Cell } from '../abstractions/Cell';
import { Location } from '../enums/Location';
import { HitResult } from '../enums/HitResult';
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

    public override isPointInside(worldPoint:Vec3, gridToWorldPoint:Vec3, defineQuadrant:boolean):HitResult | Location
    {
        return this.checkEdges(worldPoint, gridToWorldPoint, defineQuadrant);
    }

    public override getVerticesOrder():Location[]
    {
        const result:Location[] = [Location.LB, Location.RB, Location.RT, Location.LT];

        return result;
    }
}