import { _decorator, v3, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('Edge')
export class Edge
{
    public v1:Vec3;
    public v2:Vec3;

    constructor(v1?:Vec3, v2?:Vec3)
    {
        this.v1 = v1 ? v1.clone() : v3();
        this.v2 = v2 ? v2.clone() : v3();
    }

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

    public getParallelEdge(v:Vec3):Edge
    {
        // или в общем виде:
        // ax + by + c = 0
        // уравнение с угловым коэфициентом
        // y = kx + l => k = a / b
        
        const a:number = this.v2.y - this.v1.y;
        const b:number = this.v2.x - this.v1.x;

        if (b != 0)
        {
            const k:number = a / b;
            const l:number = v.y - (k * v.x);
            const x1:number = 0;
            const x2:number = 1;

            return new Edge(v3(x1, (k * x1 + l)), v3(x2, (k * x2 + l)));
        }
        else
        {
            return new Edge(v, v3(v.x, v.y + 1));
        }
    }

    public intersectedWithEdge(line:Edge):Vec3
    {
        const A1:number = this.v2.y - this.v1.y;
        const A2:number = line.v2.y - line.v1.y;
        const B1:number = this.v2.x - this.v1.x;
        const B2:number = line.v2.x - line.v1.x;
        const C1:number = (this.v2.y - this.v1.y) * this.v1.x -
                          (this.v2.x - this.v1.x) * this.v1.y;
        const C2:number = (line.v2.y - line.v1.y) * line.v1.x -
                          (line.v2.x - line.v1.x) * line.v1.y;

        return v3(((C1 * B2 - C2 * B1) / (A1 * B2 - A2 * B1)),
                 -((A1 * C2 - A2 * C1) / (A1 * B2 - A2 * B1))
        );
    }

    public distance():number
    {
        const num1:number = this.v1.x - this.v2.x;
        const num2:number = this.v1.y - this.v2.y;
        const num3:number = this.v1.z - this.v2.z;
        
        return Math.sqrt(num1 * num1 + num2 * num2 + num3 * num3);
    }

    public toString(): string
    {
        return "{ v1 " + this.v1.toString() + ", v2 " + this.v2.toString() + " }";
    }
}