import { _decorator, v3, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('Edge')
export class Edge
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

    public v1:Vec3;
    public v2:Vec3;

    // ----------------------------------
    // Access methods getters and setters
    // ----------------------------------

    // private _a: = ;
    // public set a(value:)
    // {
    //     this._a = value;
    // }
    // public get a():
    // {
    //     return this._a;
    // }

    constructor(v1?:Vec3, v2?:Vec3)
    {
        this.v1 = v1 ? v1.clone() : v3();
        this.v2 = v2 ? v2.clone() : v3();
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

    public set(e:Edge):Edge
    {
        this.v1.set(e.v1);
        this.v2.set(e.v2);

        return this;
    }

    public add(v:Vec3):Edge
    {
        this.v1.add(v);
        this.v2.add(v);

        return this;
    }

    public clone():Edge
    {
        return new Edge(this.v1.clone(), this.v2.clone());
    }

    /**
     * Определяет дистанцию до ребра
     * Если значение меньше 0, то находимся за линией
     * Если значение больше или равно 0, то находимся перед или на линии соответственно
     * @param v 
     * @returns 
     */
    public pointToEdgeDistance2D(v:Vec3):number
    {
        return (this.v2.x - this.v1.x) * (v.y - this.v1.y) - (this.v2.y - this.v1.y) * (v.x - this.v1.x);
    }

    public isPointOutOfEdge2D(v:Vec3):boolean
    {
        return this.pointToEdgeDistance2D(v) < 0;
    }

    public toString(): string
    {
        return "{ v1 " + this.v1.toString() + ", v2 " + this.v2.toString() + " }";
    }
}