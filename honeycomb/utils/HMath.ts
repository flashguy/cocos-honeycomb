import { _decorator, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('HMath')
export class HMath
{
    public static isEven(num:number):boolean
    {
        return num % 2 === 0;
    }

    public static isOdd(num:number):boolean
    {
        return num % 2 !== 0;
    }

    public static wrap(value:number, modulo:number):number
    {
        return ((value % modulo) + modulo) % modulo;
    }

    public static degreesLeft(startDeg:number, endDeg:number):number
    {
        return this.wrap(endDeg - startDeg, 360);
    }

    public static degreesRight(startDeg:number, endDeg:number):number
    {
        return this.wrap(startDeg - endDeg, 360);
    }

    public static degreesApart(startDeg:number, endDeg:number):number
    {
        return Math.min(this.degreesLeft(startDeg, endDeg), this.degreesRight(startDeg, endDeg));
    }

    public static cubeDistance(from:Vec3, to:Vec3):number
    {
        return Math.max(Math.abs(from.x - to.x), Math.abs(from.y - to.y), Math.abs(from.z - to.z));
    }

    public static cubeRound(vec:Vec3):Vec3
    {
        let rx = Math.round(vec.x);
        let ry = Math.round(vec.y);
        let rz = Math.round(vec.z);
        
        const x_diff = Math.abs(rx - vec.x);
        const y_diff = Math.abs(ry - vec.y);
        const z_diff = Math.abs(rz - vec.z);
        
        if (x_diff > y_diff && x_diff > z_diff)
            rx = -ry - rz;
        else if (y_diff > z_diff)
            ry = -rx - rz;
        else
            rz = -rx - ry;
        
        vec.x = rx;
        vec.y = ry;
        vec.z = rz;

        return vec;
    }
}