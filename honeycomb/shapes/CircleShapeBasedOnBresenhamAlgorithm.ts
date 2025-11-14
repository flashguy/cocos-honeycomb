import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { IPlacement } from '../placements/IPlacement';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

@ccclass('CircleShapeBasedOnBresenhamAlgorithm')
export class CircleShapeBasedOnBresenhamAlgorithm<T extends IPlacement> extends Shape<T>
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
        
        let x:number = -radius;
        let y:number = 0;
        let error:number = 2 - 2 * radius;
        let index:number = 0;

        if (radius <= 0)
        {
            this.add(centerPos.clone());
        }
        else
        {
            do
            {
                if (fill)
                {
                    this.addRow(centerPos.x - x, centerPos.x + x, centerPos.y + y);
                    this.addRow(centerPos.x - x, centerPos.x + x, centerPos.y - y);
                }
                else
                {
                    this.add(v3(centerPos.x - x, centerPos.y + y));
                    this.add(v3(centerPos.x - y, centerPos.y - x));
                    this.add(v3(centerPos.x + x, centerPos.y - y));
                    this.add(v3(centerPos.x + y, centerPos.y + x));
                }

                index++;
                radius = error;

                if (radius <= y) 
                    error += ++y * 2 + 1;

                if (radius > x || error > y)
                    error += ++x * 2 + 1;
            } while (x < 0);
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