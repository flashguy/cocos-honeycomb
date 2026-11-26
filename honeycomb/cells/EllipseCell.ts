import { _decorator, Vec3 } from 'cc';
import { Cell } from '../abstractions/Cell';
import { Location } from '../enums/Location';
import { CellType } from '../enums/CellType';
const { ccclass } = _decorator;

@ccclass('EllipseCell')
export class EllipseCell extends Cell
{
    constructor(width:number, height:number)
    {
        super();

        this._type = CellType.ELLIPSE;

        this._width = width;
        this._height = height;
        
        this.initialize();
    }

    protected override setVertices():void
    {
        
    }

    protected override setEdges():void
    {
        
    }

    public override isPointInside(worldPoint:Vec3, gridToWorldPoint:Vec3, defineQuadrant:boolean):Location
    {
        let tempPoint:Vec3 = this._center.clone().add(gridToWorldPoint);
        let ellipseHit:number = Math.pow(worldPoint.x - tempPoint.x, 2) / Math.pow(this.halfWidth, 2)
                              + Math.pow(worldPoint.y - tempPoint.y, 2) / Math.pow(this.halfHeight, 2);
        
        // ellipseHit > 1 находимся за эллипсом
        // _tempOvalHit == 1 находимся на краю эллипса ellipseHit < 1 находимся внутри эллипса
        if (ellipseHit > 1)
            return defineQuadrant ? this.defineQuadrant(worldPoint, tempPoint) : Location.OUT;
        else
            return Location.IN;
    }

    public override getVerticesOrder():Location[]
    {
        const result:Location[] = [];

        return result;
    }
}