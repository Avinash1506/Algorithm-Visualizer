import { isValid, initializeVisArray, calculateIndex } from './commonwork';
import {PriorityQueue} from './priority_queue';
let row_inc = [0,1,0,-1];
let col_inc = [1,0,-1,0];
let priority = [1, 2, 3, 4];
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

export function dijkstra(start_i:number, start_j:number, end_i:number, end_j:number, noOfRows:number, noOfCols:number, blocks:any, blockedIndices:boolean[], speed:number, obj:any, weights:number[]) {
    let flag:boolean = true;
    for(let i = 0; i < row_inc.length; i++) {
        let new_i = start_i + row_inc[i];
        let new_j = start_i + col_inc[i];
        if(isValid(new_i, new_j, noOfRows, noOfCols)) {
            if(!blockedIndices[new_i*noOfCols + new_j]) {
                flag = false;
                break;
            }
        }
    }

    if(flag) {
        obj.blockEventFunc();
    }

    let counter:number = 0;
    let visEnd:boolean = false;
    c = 0;
    c1 = 0;
    let val1:[number, number, number][] = [];
    let val2:number[] = [];
    let listOfNodes:number[] = [];
    let path:number[] = [];
    console.log(weights.length);
    console.log(weights);
    let vis:number[][] = [];
    vis = initializeVisArray(noOfRows,noOfCols,vis);
    // let q:PriorityQueue = new PriorityQueue();
    let q:[number, number, number][] = [];
    let distance:number[] = [];
    for(let i = 0; i < noOfRows * noOfCols; i++) {
        distance.push(1000000000);
    }
    q.push([weights[start_i*noOfCols + start_j], start_i, start_j]);
    distance[start_i*noOfCols + start_j] = weights[start_i*noOfCols+start_j];
    listOfNodes[start_i*noOfCols + start_j] = -1;
    console.log(start_i*noOfCols + start_j);
    while(q.length !== 0){
        let dist:number = 1000000000;
        let prev_i:number = 0; 
        let prev_j:number = 0;
        let index:number = 0;
        for(let i = 0; i < q.length; i++) {
            if(q[i][0] < dist) {
                dist = q[i][0];
                prev_i = q[i][1];
                prev_j = q[i][2];
                index = i;
            }
        }

        q.splice(index, 1);
        // let [dist, prev_i, prev_j]:any = q.shift();
        // q.pop();
        // console.log("Hello");
        for(let i = 0; i < row_inc.length; i++) {
            let new_i:number = row_inc[i] + prev_i;
            let new_j:number = col_inc[i] + prev_j; 
            // console.log(new_i,new_j);
            // console.log("Hello");
            if(isValid(new_i, new_j, noOfRows, noOfCols)) {
                // let idx:number = calculateIndex(new_i, new_j, noOfCols);
                // console.log(idx);
                if(blockedIndices[new_i*noOfCols + new_j]) continue;
                let idx:number = new_i*noOfCols + new_j;
                if(dist + weights[new_i*noOfCols + new_j] < distance[idx]) {
                    console.log(new_i,new_j);
                    val1.push([new_i, new_j, noOfCols]);
                    console.log(q.length);
                    counter++;
                    let timerVar = setTimeout(()=>{
                        if(val1 != []) {
                            let [new_i1, new_j1, noOfCols]:[number, number, number] = val1[0];
                            console.log("new_i, new_j", new_i1, new_j1);
                            // console.log(new_i+" "+new_j);
                            val1.shift();
                            counter--;
                            console.log(counter);
                            console.log(visEnd);
                            let idx:number = new_i1 * noOfCols + new_j1;
                            // console.log("idx: ", idx);
                            if(idx != end_i*noOfCols+end_j)
                                blocks[idx].style.backgroundColor = "#48cae4";
                            else{
                                visEnd = true;   
                            }
                            if(counter == 0 && visEnd == false) {
                                console.log("HEllo");
                                obj.blockEventFunc();
                                return;
                            }
                            if(val1.length == 0) {
                                let idx:number = end_i*noOfCols + end_j;
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
                                        if(idx != start_i*noOfCols +start_j && idx!=end_i*noOfCols+end_j)
                                            blocks[idx].style.backgroundColor = '#891A45';
                                        if(idx === end_i*noOfCols + end_j) {
                                            obj.blockEventFunc();
                                        }
                                    }, c1 * speed);
                                    c1 += 0.1;
                                }
                            }
                        }
                    }, c * speed);
                    c += 0.1;
                    distance[idx] = dist + weights[new_i*noOfCols + new_j];
                    listOfNodes[idx] = prev_i*noOfCols + prev_j;
                    q.push([dist + weights[new_i*noOfCols + new_j], new_i, new_j]);
                }
            }
        }
    }

    // if(new_i == end_i && new_j == end_j) {
    
// }

console.log(path);
}

// function drawPath() {
//     let idx:number = end_i*noOfCols + end_j;
//     val1 = [];

//     path.push(idx);

//     while(listOfNodes[idx] != -1) {
//         path.push(listOfNodes[idx]);
//         idx = listOfNodes[idx];
//     }

//     path.push(idx);

//     for(let i = path.length - 1; i >= 0; i--) {
//         val2.push(path[i]);
//         setTimeout(()=>{
//             let idx = val2[0];
//             val2.shift();
//             blocks[idx].style.backgroundColor = '#891A45';
//             if(idx === end_i*noOfCols + end_j) {
//                 obj.blockEventFunc();
//             }
//         }, c1 * speed);
//         c1+=0.5;
//     }
// }