import { _decorator, v3, Vec3 } from 'cc';
import { Position } from '../enums/Position';
import { IPlacement } from './IPlacement';
const { ccclass } = _decorator;

@ccclass('Placement')
export class Placement implements IPlacement
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

    public gridPos:Vec3;
    public position:Position;
    public index:number;

    constructor(gridPos:Vec3 = v3(), position:Position = Position.NONE, index:number = 0)
    {
        this.gridPos = gridPos;
        this.position = position;
        this.index = index;
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