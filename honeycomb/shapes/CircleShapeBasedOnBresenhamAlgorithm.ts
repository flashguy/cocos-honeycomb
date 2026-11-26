import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { IPlacement } from '../placements/IPlacement';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

@ccclass('CircleShapeBasedOnBresenhamAlgorithm')
export class CircleShapeBasedOnBresenhamAlgorithm<T extends IPlacement> extends Shape<T>
{
    constructor(placementConstructor: new (cellPos?:Vec3, location?:Location, index?:number) => T,
                centerPos:Vec3, radius:number, fill:boolean = false)
    {
        super(placementConstructor);
        
        let r:number = radius;
        let x:number = -r;
        let y:number = 0;
        let error:number = 2 - 2 * r;

        if (r <= 0)
        {
            this.add(centerPos.clone());
        }
        else
        {
            do
            {
                if (fill)
                {
                    this.addRow(centerPos.x + x, centerPos.x - x, centerPos.y + y);
                    this.addRow(centerPos.x + x, centerPos.x - x, centerPos.y - y);
                }
                else
                {
                    this.add(v3(centerPos.x - x, centerPos.y + y));
                    this.add(v3(centerPos.x - y, centerPos.y - x));
                    this.add(v3(centerPos.x + x, centerPos.y - y));
                    this.add(v3(centerPos.x + y, centerPos.y + x));
                }

                r = error;

                if (r <= y) 
                    error += ++y * 2 + 1;

                if (r > x || error > y)
                    error += ++x * 2 + 1;

            } while (x < 0);
        }
    }
}