import { _decorator, v3, Vec3 } from 'cc';
import { IPlacement } from './IPlacement';
const { ccclass } = _decorator;

@ccclass('PlacementSorter')
export class PlacementSorter
{
    /**
     * |0|1|2|
     * |3|4|5|
     * |6|7|8|
     */
    public static LT_RT_B(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.y < b.cellPos.y)
            return 1;
        else if (a.cellPos.y > b.cellPos.y)
            return -1;

        if (a.cellPos.x < b.cellPos.x)
            return -1;
        else if (a.cellPos.x > b.cellPos.x)
            return 1;
        
        return 0;
    }

    /**
     * |6|7|8|
     * |3|4|5|
     * |0|1|2|
     */
    public static LB_RB_T(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.y < b.cellPos.y)
            return -1;
        else if (a.cellPos.y > b.cellPos.y)
            return 1;

        if (a.cellPos.x < b.cellPos.x)
            return -1;
        else if (a.cellPos.x > b.cellPos.x)
            return 1;
        
        return 0;
    }

    /**
     * |8|7|6|
     * |5|4|3|
     * |2|1|0|
     */
    public static RB_LB_T(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.y < b.cellPos.y)
            return -1;
        else if (a.cellPos.y > b.cellPos.y)
            return 1;

        if (a.cellPos.x < b.cellPos.x)
            return 1;
        else if (a.cellPos.x > b.cellPos.x)
            return -1;
        
        return 0;
    }

    /**
     * |2|1|0|
     * |5|4|3|
     * |8|7|6|
     */
    public static RT_LT_B(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.y < b.cellPos.y)
            return 1;
        else if (a.cellPos.y > b.cellPos.y)
            return -1;

        if (a.cellPos.x < b.cellPos.x)
            return 1;
        else if (a.cellPos.x > b.cellPos.x)
            return -1;
        
        return 0;
    }

    /**
     * |2|5|8|
     * |1|4|7|
     * |0|3|6|
     */
    public static LB_LT_R(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.x < b.cellPos.x)
            return -1;
        else if (a.cellPos.x > b.cellPos.x)
            return 1;

        if (a.cellPos.y < b.cellPos.y)
            return -1;
        else if (a.cellPos.y > b.cellPos.y)
            return 1;
        
        return 0;
    }

    /**
     * |0|3|6|
     * |1|4|7|
     * |2|5|8|
     */
    public static LT_LB_R(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.x < b.cellPos.x)
            return -1;
        else if (a.cellPos.x > b.cellPos.x)
            return 1;

        if (a.cellPos.y < b.cellPos.y)
            return 1;
        else if (a.cellPos.y > b.cellPos.y)
            return -1;
        
        return 0;
    }

    /**
     * |6|3|0|
     * |7|4|1|
     * |8|5|2|
     */
    public static RT_RB_L(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.x > b.cellPos.x)
            return -1;
        else if (a.cellPos.x < b.cellPos.x)
            return 1;

        if (a.cellPos.y > b.cellPos.y)
            return -1;
        else if (a.cellPos.y < b.cellPos.y)
            return 1;
        
        return 0;
    }

    /**
     * |8|5|2|
     * |7|4|1|
     * |6|3|0|
     */
    public static RB_RT_L(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.x > b.cellPos.x)
            return -1;
        else if (a.cellPos.x < b.cellPos.x)
            return 1;

        if (a.cellPos.y > b.cellPos.y)
            return 1;
        else if (a.cellPos.y < b.cellPos.y)
            return -1;
        
        return 0;
    }

    /**
     * |8|7|6|
     * |3|4|5|
     * |2|1|0|
     */
    public static ZIGZAG_RB_LB_T(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.y < b.cellPos.y)
            return -1;
        else if (a.cellPos.y > b.cellPos.y)
            return 1;

        if (a.cellPos.x < b.cellPos.x)
            return a.cellPos.y % 2 == 0 ? 1 : -1;
        else if (a.cellPos.x > b.cellPos.x)
            return a.cellPos.y % 2 == 0 ? -1 : 1;
        
        return 0;
    }

    /**
     * |6|7|8|
     * |5|4|3|
     * |0|1|2|
     */
    public static ZIGZAG_LB_RB_T(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.y < b.cellPos.y)
            return -1;
        else if (a.cellPos.y > b.cellPos.y)
            return 1;

        if (a.cellPos.x < b.cellPos.x)
            return a.cellPos.y % 2 == 0 ? -1 : 1;
        else if (a.cellPos.x > b.cellPos.x)
            return a.cellPos.y % 2 == 0 ? 1 : -1;
        
        return 0;
    }

    /**
     * |0|1|2|
     * |5|4|3|
     * |6|7|8|
     */
    public static ZIGZAG_LT_RT_B(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.y < b.cellPos.y)
            return 1;
        else if (a.cellPos.y > b.cellPos.y)
            return -1;

        if (a.cellPos.x < b.cellPos.x)
            return a.cellPos.y % 2 == 0 ? -1 : 1;
        else if (a.cellPos.x > b.cellPos.x)
            return a.cellPos.y % 2 == 0 ? 1 : -1;
        
        return 0;
    }

    /**
     * |2|1|0|
     * |3|4|5|
     * |8|7|6|
     */
    public static ZIGZAG_RT_LT_B(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.y < b.cellPos.y)
            return 1;
        else if (a.cellPos.y > b.cellPos.y)
            return -1;

        if (a.cellPos.x < b.cellPos.x)
            return a.cellPos.y % 2 == 0 ? 1 : -1;
        else if (a.cellPos.x > b.cellPos.x)
            return a.cellPos.y % 2 == 0 ? -1 : 1;
        
        return 0;
    }

    /**
     * |0|5|6|
     * |1|4|7|
     * |2|3|8|
     */
    public static ZIGZAG_LT_LB_R(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.x < b.cellPos.x)
            return -1;
        else if (a.cellPos.x > b.cellPos.x)
            return 1;

        if (a.cellPos.y < b.cellPos.y)
            return a.cellPos.x % 2 == 0 ? 1 : -1;
        else if (a.cellPos.y > b.cellPos.y)
            return a.cellPos.x % 2 == 0 ? -1 : 1;
        
        return 0;
    }

    /**
     * |2|3|8|
     * |1|4|7|
     * |0|5|6|
     */
    public static ZIGZAG_LB_LT_R(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.x < b.cellPos.x)
            return -1;
        else if (a.cellPos.x > b.cellPos.x)
            return 1;

        if (a.cellPos.y < b.cellPos.y)
            return a.cellPos.x % 2 == 0 ? -1 : 1;
        else if (a.cellPos.y > b.cellPos.y)
            return a.cellPos.x % 2 == 0 ? 1 : -1;
        
        return 0;
    }

    /**
     * |8|3|2|
     * |7|4|1|
     * |6|5|0|
     */
    public static ZIGZAG_RB_RT_L(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.x > b.cellPos.x)
            return -1;
        else if (a.cellPos.x < b.cellPos.x)
            return 1;

        if (a.cellPos.y > b.cellPos.y)
            return a.cellPos.x % 2 == 0 ? -1 : 1;
        else if (a.cellPos.y < b.cellPos.y)
            return a.cellPos.x % 2 == 0 ? 1 : -1;
        
        return 0;
    }

    /**
     * |6|5|0|
     * |7|4|1|
     * |8|3|2|
     */
    public static ZIGZAG_RT_RB_L(a:IPlacement, b:IPlacement):number
    {
        if (a.cellPos.x > b.cellPos.x)
            return -1;
        else if (a.cellPos.x < b.cellPos.x)
            return 1;

        if (a.cellPos.y > b.cellPos.y)
            return a.cellPos.x % 2 == 0 ? 1 : -1;
        else if (a.cellPos.y < b.cellPos.y)
            return a.cellPos.x % 2 == 0 ? -1 : 1;
        
        return 0;
    }

    public static readonly RADIAL_QUADRANT_R:Vec3 = v3(-1, 0, 0);
    public static readonly RADIAL_QUADRANT_L:Vec3 = v3(1, 0, 0);
    public static readonly RADIAL_QUADRANT_T:Vec3 = v3(0, -1, 0);
    public static readonly RADIAL_QUADRANT_B:Vec3 = v3(0, 1, 0);
    public static readonly RADIAL_QUADRANT_RT:Vec3 = v3(-1, -1, 0);
    public static readonly RADIAL_QUADRANT_RB:Vec3 = v3(-1, 1, 0);
    public static readonly RADIAL_QUADRANT_LB:Vec3 = v3(1, 1, 0);
    public static readonly RADIAL_QUADRANT_LT:Vec3 = v3(1, -1, 0);
    
    public static RADIAL(centerPos:Vec3, referenceDir:Vec3, clockwise:boolean)
    {
        // Вспомогательная функция для вычисления знакового угла
        function getSignedAngle(from:Vec3, to:Vec3):number
        {
            const angleFrom = Math.atan2(from.y, from.x);
            const angleTo = Math.atan2(to.y, to.x);
            
            let angle = angleTo - angleFrom;
            
            if (angle > Math.PI) angle -= 2 * Math.PI;
            if (angle < -Math.PI) angle += 2 * Math.PI;
            
            return angle;
        };

        return (a:IPlacement, b:IPlacement):number => {
            const vecA:Vec3 = new Vec3(a.cellPos.x - centerPos.x, a.cellPos.y - centerPos.y);
            const vecB:Vec3 = new Vec3(b.cellPos.x - centerPos.x, b.cellPos.y - centerPos.y);

            // const angleA:number = Math.atan2(vecA.y, vecA.x);
            // const angleB:number = Math.atan2(vecB.y, vecB.x);
            const angleA = getSignedAngle(referenceDir, vecA);
            const angleB = getSignedAngle(referenceDir, vecB);
            
            if (clockwise)
                return angleB - angleA;
            else
                return angleA - angleB;
        };
    }
}