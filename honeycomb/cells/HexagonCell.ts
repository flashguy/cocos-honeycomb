import { _decorator, toRadian, v3, Vec3 } from 'cc';
import { Cell } from '../abstractions/Cell';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

@ccclass('HexagonCell')
export abstract class HexagonCell extends Cell
{
    protected _asRegularPolygon:boolean = false;
    protected _outerRadius:number;
    protected _innerRadius:number;

    protected _side:number = 0;

    protected _verticalRatio:number;
    protected _horizontalRatio:number;

    protected _verticalOffset:number;
    protected _horizontalOffset:number;

    public readonly ISO_RATIO:number = 0.6666666666667;

    public get side():number { return this._side; };

    constructor(width:number, height:number, asRegularPolygon:boolean)
    {
        super();

        this._asRegularPolygon = asRegularPolygon;

        this._outerRadius = width / 2;
        this._innerRadius = this._outerRadius * Math.cos(Math.PI / 6);
        this._side = 2 * this._outerRadius * Math.sin(Math.PI / 6);
    }

    protected calculateVertex(degrees:number):Vec3
    {
        const radians:number = toRadian(degrees);

        return v3(((this._outerRadius + Math.cos(radians) * this._outerRadius) - this._horizontalOffset) * this._horizontalRatio,
                  ((this._outerRadius + Math.sin(radians) * this._outerRadius) - this._verticalOffset) * this._verticalRatio);
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
        const result:Location[] = [];

        return result;
    }
}