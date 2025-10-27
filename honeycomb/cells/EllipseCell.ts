import { _decorator, Vec3 } from 'cc';
import { Cell } from '../abstractions/Cell';
import { Position } from '../enums/Position';
import { CellType } from '../enums/CellType';
const { ccclass } = _decorator;

// File EllipseCell.ts created am_empty
// Date of creation Wed Jul 30 2025 16:55:58 GMT+0300 (Москва, стандартное время),

@ccclass('EllipseCell')
export class EllipseCell extends Cell
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



    constructor(width:number, height:number)
    {
        super();

        this._type = CellType.ELLIPSE;

        this._width = width;
        this._height = height;
        
        this.initialize();
    }

    // ---------------
    // private methods
    // ---------------

    protected override setVertices():void
    {
        
    }

    protected override setEdges():void
    {
        
    }

    // -----------------
    // protected methods
    // -----------------

    

    // --------------
    // public methods
    // --------------

    public override isPointInside(wopldPoint:Vec3, gridToWopldPoint:Vec3, defineQuadrant:boolean):Position
    {
        let tempPoint:Vec3 = this._center.clone().add(gridToWopldPoint);
        let ellipseHit:number = Math.pow(wopldPoint.x - tempPoint.x, 2) / Math.pow(this.halfWidth, 2)
                              + Math.pow(wopldPoint.y - tempPoint.y, 2) / Math.pow(this.halfHeight, 2);
        
        // ellipseHit > 1 находимся за эллипсом
        // _tempOvalHit == 1 находимся на краю эллипса ellipseHit < 1 находимся внутри эллипса
        if (ellipseHit > 1)
            return defineQuadrant ? this.defineQuadrant(wopldPoint, tempPoint) : Position.OUT;
        else
            return Position.IN;
    }
}