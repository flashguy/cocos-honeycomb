import { _decorator, v3, Vec3 } from 'cc';
import { Position } from '../enums/Position';
import { ILocation } from './ILocation';
const { ccclass } = _decorator;

// File Location.ts created am_empty
// Date of creation Tue Jun 10 2025 21:06:13 GMT+0300 (Москва, стандартное время),

// Place
@ccclass('Location')
export class Location implements ILocation
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