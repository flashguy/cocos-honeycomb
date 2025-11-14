import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { IPlacement } from '../placements/IPlacement';
import { HMath } from '../utils/HMath';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

// https://www.redblobgames.com/grids/circle-drawing/
// File SectorShapeBasedOnRedBlobGamesAlgorithm.ts created am_empty
// Date of creation Mon Oct 20 2025 10:27:41 GMT+0300 (Москва, стандартное время),

@ccclass('SectorShapeBasedOnRedBlobGamesAlgorithm')
export class SectorShapeBasedOnRedBlobGamesAlgorithm<T extends IPlacement> extends Shape<T>
{
    // ----------------------------------------
    // private properties / getters and setters
    // ----------------------------------------

// the class is based on 

    // ------------------------------------------
    // protected properties / getters and setters
    // ------------------------------------------

    

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------



    constructor(placementConstructor: new (gridPos?:Vec3, location?:Location, index?:number) => T,
                centerPos:Vec3, radius:number, angle:number, sector:number, coneExpansion:number)
    {
        super(placementConstructor);

        // !!! РАСКОМЕНТИРОВАТЬ СТРОЧКИ С СЕКТОРОМ В GridViewer

        // angle - angle - <input v-model="angle" type="range" min="0" max="360">
        // width - sector - <input v-model="sector" type="range" min="0" max="180">
        // conservative - coneExpansion - permissive - <input v-model="coneExpansion" type="range" min="0.0" max="0.5" step="0.01">

        // TODO: + 1 к ширине или высоте чтоб было четное число

        let columns:number = (radius * 2) + 1
        let rows:number = (radius * 2) + 1;

        let gridPos:Vec3 = v3();
        gridPos.set(centerPos.x - Math.floor(columns / 2), centerPos.y - Math.floor(rows / 2));

        let stepX:number;
        let stepY:number;

        for (let i:number = 0; i < (columns * rows); i++)
        {
            stepX = gridPos.x + (i % columns);
            stepY = gridPos.y + Math.floor(i / columns);

            if (Vec3.distance(v3(stepX, stepY), centerPos) > radius)
                continue;

            const inRange = ({x, y}) =>
            {
                let θ:number = 180 / Math.PI * Math.atan2(y - centerPos.y, x - centerPos.x);
                return HMath.degreesApart(angle, θ) <= sector / 2;
            };

            const R = coneExpansion;

            for (let corner of [[-R, -R], [-R, +R],
                                [+R, -R], [+R, +R]])
            {
                if (inRange({x: stepX + corner[0], y: stepY + corner[1]}))
                    this.add(v3(stepX, stepY));
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