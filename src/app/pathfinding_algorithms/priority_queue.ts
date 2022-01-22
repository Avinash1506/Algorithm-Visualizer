export class PriorityQueue{
    capacity:number;
    size:number;
    a:[number,number,number,number][];

    constructor(){
        this.capacity = 100000;
        this.size = 0;
        this.a = [];
    }

    push([ele1, ele2, ele3, ele4]:[number, number, number, number]):void {
        this.a[this.size] = [ele1, ele2, ele3, ele4];
        this.size++;
        let i:number = this.size - 1;
        while(i > 0 && (this.a[this.parent(i)][0] > this.a[i][0] || this.a[this.parent(i)][3] > this.a[i][3]) ) {
            this.swap(this.a[this.parent(i)], this.a[i]);
            i = this.parent(i);
        }
    }

    top():[number, number, number, number] {
        return this.a[0];
    }

    pop() {
        this.a[0] = this.a[this.size - 1];
        this.size--;
        let i:number = 0;
        let mx:number = 0;
        while(i < this.size){
            if(this.leftChild(i) < this.size && (this.a[this.leftChild(i)][0] < this.a[mx][0] || this.a[this.leftChild(i)][3] < this.a[mx][3])) {
                mx = this.leftChild(i);
            }
            
            if(this.rightChild(i) < this.size && (this.a[this.rightChild(i)][0] < this.a[mx][0] || this.a[this.rightChild(i)][3] < this.a[mx][3])) {
                mx = this.rightChild(i);
            }

            if(mx != i) {
                this.swap(this.a[mx], this.a[i]);
                i = mx;
            }
            else{
                break;
            }
        }
    }

    leftChild(i : number) : number {
        return 2 * i + 1;
    }

    rightChild(i : number) : number {
        return 2 * i + 2;
    }

    parent(i:number):number {
        return Math.floor((i - 1) / 2);
    }

    empty():boolean{
        return this.size == 0;
    }

    swap(num1:[number, number, number, number], num2:[number, number, number, number]) {
        let tmp = num1;
        num1 = num2;
        num2 = tmp;
    }
}