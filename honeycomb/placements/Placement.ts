import { _decorator, v3, Vec3 } from 'cc';
import { Location } from '../enums/Location';
import { IPlacement } from './IPlacement';
const { ccclass } = _decorator;

@ccclass('Placement')
export class Placement implements IPlacement
{
    public cellPos:Vec3;
    public location:Location;
    public index:number;

    constructor(cellPos:Vec3 = v3(), location:Location = Location.NONE, index:number = 0)
    {
        this.cellPos = cellPos;
        this.location = location;
        this.index = index;
    }
}