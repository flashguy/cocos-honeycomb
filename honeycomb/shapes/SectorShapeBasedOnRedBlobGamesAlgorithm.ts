import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { IPlacement } from '../placements/IPlacement';
import { HMath } from '../utils/HMath';
import { Location } from '../enums/Location';
const { ccclass } = _decorator;

// https://www.redblobgames.com/grids/circle-drawing/ (раздел "Cones / sectors")

@ccclass('SectorShapeBasedOnRedBlobGamesAlgorithm')
export class SectorShapeBasedOnRedBlobGamesAlgorithm<T extends IPlacement> extends Shape<T>
{
    constructor(placementConstructor: new (cellPos?:Vec3, location?:Location, index?:number) => T,
                centerPos:Vec3, radius:number, angle:number, sector:number, coneExpansion:number)
    {
        super(placementConstructor);

        // INFO: bounding box вокруг круга
        const top:number = Math.ceil(centerPos.y - radius);
        const bottom:number = Math.floor(centerPos.y + radius);
        const left:number = Math.ceil(centerPos.x - radius);
        const right:number = Math.floor(centerPos.x + radius);

        const halfSector:number = sector / 2;
        const radiusSquared:number = radius * radius;

        for (let y = top; y <= bottom; y++)
        {
            for (let x = left; x <= right; x++)
            {
                const dx:number = x - centerPos.x;
                const dy:number = y - centerPos.y;

                // условие по радиусу
                if (dx * dx + dy * dy > radiusSquared)
                    continue;

                // центральная ячейка конуса входит всегда
                if (dx == 0 && dy == 0)
                {
                    this.add(v3(x, y));
                    continue;
                }

                // условие по углу: строгое — только центр ячейки;
                // при coneExpansion > 0 мягкое — ещё 4 точки вокруг ячейки, входит любая попавшая
                let include:boolean = this.isInSector(angle, halfSector, dx, dy);

                if (!include && coneExpansion > 0)
                {
                    for (const corner of [[-coneExpansion, -coneExpansion], [-coneExpansion, coneExpansion],
                                          [coneExpansion, -coneExpansion], [coneExpansion, coneExpansion]])
                    {
                        if (this.isInSector(angle, halfSector, dx + corner[0], dy + corner[1]))
                        {
                            include = true;
                            break;
                        }
                    }
                }

                if (include)
                    this.add(v3(x, y));
            }
        }
    }

    private isInSector(angle:number, halfSector:number, dx:number, dy:number):boolean
    {
        const theta:number = 180 / Math.PI * Math.atan2(dy, dx);

        // degreesApart учитывает переход через 0°/360°
        return HMath.degreesApart(angle, theta) <= halfSector;
    }
}