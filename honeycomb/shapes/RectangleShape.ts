import { _decorator, v3, Vec3 } from 'cc';
import { Shape } from '../abstractions/Shape';
import { Position } from '../enums/Position';
import { ILocation } from '../locations/ILocation';
const { ccclass } = _decorator;

// File RectangleShape.ts created am_empty
// Date of creation Tue Jun 10 2025 22:23:30 GMT+0300 (Москва, стандартное время),

@ccclass('RectangleShape')
export class RectangleShape<T extends ILocation> extends Shape<T>
{
    // ----------------------------------------
    // private properties / getters and setters
    // ----------------------------------------

    private _columns:number = 0;
    private _rows:number = 0;

    // ------------------------------------------
    // protected properties / getters and setters
    // ------------------------------------------

    

    // ---------------------------------------
    // public properties / getters and setters
    // ---------------------------------------

    public get columns():number { return this._columns; }
    public get rows():number { return this._rows; }

    constructor(locationConstructor: new (gridPos?:Vec3, position?:Position, index?:number) => T,
                columns:number, rows:number, startPos:Vec3, directionTo:Position, fill:boolean = false)
    {
        super(locationConstructor);

        this._columns = columns;
        this._rows = rows;

        let gridPos:Vec3 = startPos.clone();
        let multiplierX:number;
        let multiplierY:number;

        // directionTo определяет построение фигуры относительно начальной ячейки и центра координат
        switch (directionTo)
        {
            case Position.C:
            {
                multiplierX = 1;
                multiplierY = 1;
                gridPos.set(startPos.x - Math.floor(columns / 2), startPos.y - Math.floor(rows / 2));
                break;
            }
            case Position.BC:
            {
                multiplierX = 1;
                multiplierY = -1;
                gridPos.x = startPos.x - Math.floor(columns / 2);
                break;
            }
            case Position.TC:
            {
                multiplierX = 1;
                multiplierY = 1;
                gridPos.x = startPos.x - Math.floor(columns / 2);
                break;
            }
            case Position.LC:
            {
                multiplierX = -1;
                multiplierY = 1;
                gridPos.y = startPos.y - Math.floor(rows / 2);
                break;
            }
            case Position.RC:
            {
                multiplierX = 1;
                multiplierY = 1;
                gridPos.y = startPos.y - Math.floor(rows / 2);
                break;
            }
            case Position.RT:
            {
                multiplierX = 1;
                multiplierY = 1;
                break;
            }
            case Position.RB:
            {
                multiplierX = 1;
                multiplierY = -1;
                break;
            }
            case Position.LT:
            {
                multiplierX = -1;
                multiplierY = 1;
                break;
            }
            case Position.LB:
            {
                multiplierX = -1;
                multiplierY = -1;
                break;
            }
        }
        
        let stepX:number;
        let stepY:number;

        // Сначало инкрементируем колонки а потом строки или слева направо и снизу вверх
        for (let i:number = 0; i < (columns * rows); i++)
        {
            stepX = gridPos.x + (i % columns) * multiplierX;
            stepY = gridPos.y + Math.floor(i / columns) * multiplierY;

            if (fill)
            {
                this.add(v3(stepX, stepY));
            }
            else
            {
                if (   stepY == gridPos.y
                    || stepX == gridPos.x
                    || Math.abs(gridPos.x - stepX) == columns - 1
                    || Math.abs(gridPos.y - stepY) == rows - 1)
                {
                    this.add(v3(stepX, stepY));
                }
            }
        }
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

    public override getIndexByGridPos(gridPos:Vec3):number
    {
        return (gridPos.y * this._columns) + gridPos.x;
    }
}