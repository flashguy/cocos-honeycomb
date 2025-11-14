import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { IPlacement } from '../placements/IPlacement';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

@ccclass('CircleShapeBasedOnMidpointAlgorithm')
export class CircleShapeBasedOnMidpointAlgorithm<T extends IPlacement> extends Shape<T>
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

    constructor(placementConstructor: new (cellPos?:Vec3, location?:Location, index?:number) => T,
                centerPos:Vec3, radius:number, fill:boolean = false)
    {
        super(placementConstructor);
        
        if (radius <= 0)
        {
            this.add(centerPos.clone());
        }
        else
        {
            let x:number = 0;
            let y:number = -radius;
            let p:number = -radius;

            while (x < -y)
            {
                if (p > 0)
                {
                    y += 1;
                    p += 2 * (x + y) + 1;
                }
                else
                {
                    p += 2 * x + 1;
                }

                if (fill)
                {
                    this.addRow(centerPos.x - x, centerPos.x + x, centerPos.y + y);
                    this.addRow(centerPos.x - x, centerPos.x + x, centerPos.y - y);

                    this.addRow(centerPos.x - y, centerPos.x + y, centerPos.y + x);
                    this.addRow(centerPos.x - y, centerPos.x + y, centerPos.y - x);
                }
                else
                {
                    this.add(v3(centerPos.x - x, centerPos.y + y)); // LB
                    this.add(v3(centerPos.x + x, centerPos.y + y)); // RB
                    this.add(v3(centerPos.x - x, centerPos.y - y)); // LT
                    this.add(v3(centerPos.x + x, centerPos.y - y)); // RT

                    this.add(v3(centerPos.x + y, centerPos.y + x)); // MLT
                    this.add(v3(centerPos.x + y, centerPos.y - x)); // MLB
                    this.add(v3(centerPos.x - y, centerPos.y + x)); // MRT
                    this.add(v3(centerPos.x - y, centerPos.y - x)); // MRB
                }

                x += 1;
            }
        }
    }

    // ---------------
    // private methods
    // ---------------



    // -----------------
    // protected methods
    // -----------------

    

    // --------------
    // public methods
    // --------------

    
}