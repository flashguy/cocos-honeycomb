import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { IPlacement } from '../placements/IPlacement';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

// https://www.redblobgames.com/grids/circle-drawing/
// File CircleShapeBasedOnRedBlobGamesAlgorithm.ts created am_empty
// Date of creation Mon Oct 20 2025 07:54:58 GMT+0300 (Москва, стандартное время),

@ccclass('CircleShapeBasedOnRedBlobGamesAlgorithm')
export class CircleShapeBasedOnRedBlobGamesAlgorithm<T extends IPlacement> extends Shape<T>
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

    constructor(placementConstructor: new (gridPos?:Vec3, location?:Location, index?:number) => T,
                centerPos:Vec3, radius:number, smooth:boolean = false, fill:boolean = false)
    {
        super(placementConstructor);

        const distancef:number = radius + (smooth ? 0.5 : 0);

        if (fill)
        {
            const top:number = Math.trunc(centerPos.y - distancef);
            const bottom:number = Math.trunc(centerPos.y + distancef);

            for (let y = top; y <= bottom; y++)
            {
                const dy:number = y - centerPos.y;
                const dx:number = Math.sqrt(distancef * distancef - dy * dy);
                const left:number = Math.ceil(centerPos.x - dx);
                const right:number = Math.floor(centerPos.x + dx);

                for (let x = left; x <= right; x++)
                {
                    this.add(v3(x, y));
                }
            }
        }
        else
        {
            for (let r = 0; r <= Math.floor(distancef * Math.sqrt(0.5)); r++)
            {
                const d:number = Math.floor(Math.sqrt(distancef * distancef - r * r));

                this.add(v3(centerPos.x - d, centerPos.y + r));
                this.add(v3(centerPos.x + d, centerPos.y + r));
                this.add(v3(centerPos.x - d, centerPos.y - r));
                this.add(v3(centerPos.x + d, centerPos.y - r));
                this.add(v3(centerPos.x + r, centerPos.y - d));
                this.add(v3(centerPos.x + r, centerPos.y + d));
                this.add(v3(centerPos.x - r, centerPos.y - d));
                this.add(v3(centerPos.x - r, centerPos.y + d));
            }
        }
    }

    // ---------------
    // private methods
    // ---------------

    

    // --------------
    // public methods
    // --------------

    
}