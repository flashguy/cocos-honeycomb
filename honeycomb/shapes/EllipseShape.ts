import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { Location } from '../locations/Location';
const { ccclass } = _decorator;

// File EllipseShape.ts created am_empty
// Date of creation Sun Oct 19 2025 19:52:56 GMT+0300 (Москва, стандартное время),

@ccclass('EllipseShape')
export class EllipseShape extends Shape<Location>
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

    constructor(centerPos:Vec3, radiusX:number, radiusY:number, fill:boolean = false)
    {
        super();

        let x:number = 0;
        let y:number = radiusY;
        let width:number = 1;
        const a2:number = radiusX * radiusX;
        const b2:number = radiusY * radiusY;
        const crit1:number = -(a2 / 4 + radiusX % 2 + b2);
        const crit2:number = -(b2 / 4 + radiusY % 2 + a2);
        const crit3:number = -(b2 / 4 + radiusY % 2);
        let t:number = -a2 * y;
        let dxt:number = 2 * b2 * x;
        let dyt:number = -2 * a2 * y;
        const d2xt:number = 2 * b2;
        const d2yt:number = 2 * a2;

        if (fill)
        {
            while (y >= 0 && x <= radiusX)
            {
                if (t + b2 * x <= crit1 || t + a2 * y <= crit3)
                {
                    x++;
                    dxt += d2xt;
                    t += dxt;

                    width += 2;
                }
                else if (t - a2 * y > crit2)
                {
                    this.addRow2(centerPos.x - x, width, centerPos.y - y);

                    if (y != 0)
                    {
                        this.addRow2(centerPos.x - x, width, centerPos.y + y);
                    }

                    y--;
                    dyt += d2yt;
                    t += dyt;
                }
                else
                {
                    this.addRow2(centerPos.x - x, width, centerPos.y - y);

                    if (y != 0)
                    {
                        this.addRow2(centerPos.x - x, width, centerPos.y + y);
                    }

                    x++;
                    dxt += d2xt;
                    t += dxt;

                    y--;
                    dyt += d2yt;
                    t += dyt;

                    width += 2;
                }
            }

            if (radiusY == 0)
            {
                this.addRow2(centerPos.x - radiusX, 2 * radiusX + 1, centerPos.y);
            }
        }
        else
        {
            while (y >= 0 && x <= radiusX)
            {
                this.add(v3(centerPos.x + x, centerPos.y + y));

                if (x != 0 || y != 0)
                {
                    this.add(v3(centerPos.x - x, centerPos.y - y));
                }

                if (x != 0 && y != 0)
                {
                    this.add(v3(centerPos.x + x, centerPos.y - y));
                    this.add(v3(centerPos.x - x, centerPos.y + y));
                }

                if (t + b2 * x <= crit1 || t + a2 * y <= crit3)
                {
                    x++;
                    dxt += d2xt;
                    t += dxt;
                }
                else if (t - a2 * y > crit2)
                {
                    y--;
                    dyt += d2yt;
                    t += dyt;
                }
                else
                {
                    x++;
                    dxt += d2xt;
                    t += dxt;
                    y--;
                    dyt += d2yt;
                    t += dyt;
                }
            }
        }
    }

    // ---------------
    // private methods
    // ---------------

    protected override createLocation():Location
    {
        return new Location();
    }

    // --------------
    // public methods
    // --------------

    
}