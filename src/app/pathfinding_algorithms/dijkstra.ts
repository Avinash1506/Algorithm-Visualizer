import { isValid, initializeVisArray, calculateIndex } from './commonwork';
import {PriorityQueue} from './priority_queue';
let row_inc = [0,1,0,-1];
let col_inc = [1,0,-1,0];
let priority = [1, 2, 3, 4];
let val1:[number, number, number][] = [];
let val2:number[] = [];
let listOfNodes:number[] = [];
let path:number[] = [];
let c:number = 0;
let c1:number = 0;

export function dijkstra_test(start_i:number, start_j:number, end_i:number, end_j:number, noOfRows:number, noOfCols:number){
    let vis:number[][] = [];
    vis = initializeVisArray(noOfRows,noOfCols,vis);
    let q:PriorityQueue = new PriorityQueue();
    let distance:number[] = [];
    for(let i = 0; i < noOfRows * noOfCols; i++) {
        distance.push(1000000000);
    }
    q.push([0, start_i, start_j, 1]);
    distance[start_i*noOfCols + start_j] = 0;
    console.log(start_i*noOfCols + start_j);
    while(!q.empty()){
        let [dist, prev_i, prev_j, pri]:[number, number, number, number] = q.top();
        q.pop();
        // console.log("Hello");
        for(let i = 0; i < row_inc.length; i++) {
            let new_i:number = row_inc[i] + prev_i;
            let new_j:number = col_inc[i] + prev_j; 
            // console.log("Hello");
            if(isValid(new_i, new_j, noOfRows, noOfCols)) {
                let idx:number = calculateIndex(new_i, new_j, noOfCols);
                // console.log(idx);
                if(dist + 1 < distance[idx]) {
                    distance[idx] = dist + 1;
                    q.push([dist + 1, new_i, new_j, priority[i]]);
                }
            }
        }
    }

    // console.log("Hello");

}

export function dijkstra(start_i:number, start_j:number, end_i:number, end_j:number, noOfRows:number, noOfCols:number, blocks:any, speed:number) {
    c = 0;
    c1 = 0;
    let vis:number[][] = [];
    vis = initializeVisArray(noOfRows,noOfCols,vis);
    let q:PriorityQueue = new PriorityQueue();
    let distance:number[] = [];
    for(let i = 0; i < noOfRows * noOfCols; i++) {
        distance.push(1000000000);
    }
    q.push([0, start_i, start_j, 1]);
    distance[start_i*noOfCols + start_j] = 0;
    listOfNodes[start_i*noOfCols + start_j] = -1;
    console.log(start_i*noOfCols + start_j);
    while(!q.empty()){
        let [dist, prev_i, prev_j, pri]:[number, number, number, number] = q.top();
        q.pop();
        // console.log("Hello");
        for(let i = 0; i < row_inc.length; i++) {
            let new_i:number = row_inc[i] + prev_i;
            let new_j:number = col_inc[i] + prev_j; 
            // console.log("Hello");
            if(isValid(new_i, new_j, noOfRows, noOfCols)) {
                let idx:number = calculateIndex(new_i, new_j, noOfCols);
                // console.log(idx);

                if(dist + 1 < distance[idx]) {
                    val1.push([new_i, new_j, noOfCols]);
                    let timerVar = setTimeout(()=>{
                        if(val1 != []) {
                            let [new_i, new_j, noOfCols]:[number, number, number] = val1[0];
                            console.log(new_i+" "+new_j);
                            val1.shift();
                            let idx:number = new_i * noOfCols + new_j;
                            console.log("idx: ", idx);
                            blocks[idx].style.backgroundColor = "turquoise";
                            if(new_i == end_i && new_j == end_j) {
                                for(let i = (+timerVar); i <= 780; i++){ // once the target ndoe is reached then the setTimeout of further node is cleared
                                    clearTimeout(i);
                                }

                                val1 = [];

                                path.push(idx);

                                while(listOfNodes[idx] != -1) {
                                    path.push(listOfNodes[idx]);
                                    idx = listOfNodes[idx];
                                }

                                path.push(idx);

                                for(let i = path.length - 1; i >= 0; i--) {
                                    val2.push(path[i]);
                                    setTimeout(()=>{
                                        let idx = val2[0];
                                        val2.shift();
                                        blocks[idx].style.backgroundColor = 'green';
                                    }, c1 * speed);
                                    c1 += 0.5;
                                }
                            }
                        }
                    }, c * speed);
                    c += 0.01;
                    distance[idx] = dist + 1;
                    listOfNodes[idx] = prev_i*noOfCols + prev_j;
                    q.push([dist + 1, new_i, new_j, priority[i]]);
                }
            }
        }
    }
}