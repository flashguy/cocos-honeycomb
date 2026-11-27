import { _decorator, v3, Vec3 } from 'cc';
import { HitResult } from '../enums/HitResult';
import { IPlacement } from './IPlacement';
const { ccclass } = _decorator;

@ccclass('Placement')
export class Placement implements IPlacement
{
    public cellPos:Vec3;
    public hit:HitResult;
    public index:number;

    constructor(cellPos:Vec3 = v3(), hit:HitResult = HitResult.IN, index:number = 0)
    {
        this.cellPos = cellPos;
        this.hit = hit;
        this.index = index;
    }
}
