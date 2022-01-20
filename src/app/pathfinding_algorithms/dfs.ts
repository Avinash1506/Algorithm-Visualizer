import { isValid,initializeVisArray } from './commonwork';

let row_inc = [0,1,0,-1];
let col_inc = [1,0,-1,0];
let vis:number[][] = [];

export function dfs_test(start_i:number, start_j:number, noOfRows:number, noOfCols:number){
    // for(let i = 0)
    vis = initializeVisArray(noOfRows,noOfCols,vis); 
    dfs_rec_test(start_i, start_j, noOfRows, noOfCols); 
}

function dfs_rec_test(start_i:number, start_j:number, noOfRows:number, noOfCols:number){
    vis[start_i][start_j] = 1;
    console.log(start_i+" "+start_j);
    for(let i = 0;i < row_inc.length; i++){
        let new_i:number = start_i + row_inc[i];
        let new_j:number = start_j + col_inc[i];
        if(isValid(new_i, new_j, noOfRows, noOfCols) && vis[new_i][new_j] == 0) {
            dfs_rec_test(new_i, new_j, noOfRows, noOfCols);
        }
    }
}

/*
let c:number = 0;
let val1:[number,number,number][] = [];
let listOfNodes:number[] = [];
export function dfs(start_i:number, start_j:number, end_i:number, end_j:number, noOfRows:number, noOfCols:number, blocks:any, blockedIndices:boolean[], speed:number){
    listOfNodes = [];
    listOfNodes[start_i*noOfCols + start_j] = -1;
    vis = [];
    c = 0;
    // vis = initializeVisArray(noOfRows,noOfCols,vis); // initializes the visited to 0's
    // initializing the vis array with all 0's since no node is visited initially
    if(vis.length == 0) {
        for(let i = 0; i < noOfRows; i++){
            let val = [];
            for(let j = 0; j < noOfCols; j++){
                val.push(0);
            }
            vis.push(val);
        }
    }   
    else{
        for(let i=0;i<noOfRows;i++) {
            for(let j=0;j<noOfCols;j++) {
                vis[i][j] = 0;
            }
        }
    }
    for(let i=0;i<noOfRows;i++) for(let j=0;j<noOfCols;j++) console.log(vis[i][j]);
    val1 = [];
    dfs_rec(start_i, start_j, end_i,end_j,noOfRows, noOfCols, blocks, speed, blockedIndices);
}

function dfs_rec(start_i:number, start_j:number, end_i:number, end_j:number, noOfRows:number, noOfCols:number, blocks:any, speed:number, blockedIndices:boolean[]){
    vis[start_i][start_j] = 1; // marking the node as visited      
    console.log(start_i+" "+start_j);
    for(let i = 0;i < row_inc.length; i++){
        let new_i:number = start_i + row_inc[i]; // calculates the new i
        let new_j:number = start_j + col_inc[i]; // calculates the new j
        if(isValid(new_i, new_j, noOfRows, noOfCols) && vis[new_i][new_j] == 0) { // checks whether the new i and j are valid or not and whether it is not visited before
            if(blockedIndices[new_i*noOfCols+new_j]) continue;
            val1.push([new_i, new_j, noOfCols]); // adding new indices and no of columns into val1 array which is used inside setTimeout
            let timerVar = setTimeout(() => { 
                if(val1.length!==0){ // if val1 is not empty then we will visualize it else we will not because once the target node is visited then the visited array is cleared and initialized to empty array
                    let [new_i, new_j, noOfCols]:[number,number,number] = val1[0]; // taking the first element of val1
                    val1.shift(); // deleting the first element of the val1 array 
                    blocks[new_i*noOfCols + new_j].style.backgroundColor = "turquoise"; // changing the color of visited nodes
                    console.log(start_i+" "+start_j);
                    listOfNodes[new_i*noOfCols + new_j] = start_i*noOfCols + start_j; // adding the previous node into listOfNodes
                    if(new_i == end_i && new_j == end_j) { // checking if we have reached the destination
                        val1 = [];
                        for(let i = (+timerVar); i <= 1000; i++) {
                            clearTimeout(i); // clearing the timeout of all the future setTimeout's
                        }
                        let path:number[] = []; 
                        let idx:number = new_i * noOfCols + new_j; 
                        path.push(idx);
                        console.log(idx);
                        while(listOfNodes[idx] != -1 && listOfNodes[idx] != undefined){
                            console.log("Hello");
                            console.log(listOfNodes[idx]);
                            path.push(listOfNodes[idx]); // pushing all the listOfNodes into path array to get the path
                            idx = listOfNodes[idx];
                        }
                        // path.push(idx);
                        console.log(path);
                        let val2:number[] = [];
                        let c2:number = 0;
                        // markign the path with green color
                        for(let i = path.length - 1; i >= 0; i--) {
                            val2.push(path[i]);
                            setTimeout(()=>{
                                let idx:number = val2[0];
                                val2.shift();
                                console.log(idx);
                                console.log(blocks[idx]);
                                blocks[idx].style.backgroundColor="green";
                            }, c2 * speed);
                            c2 += 0.05;
                        }
                        return;
                    }
                }
            }, c * speed);
            c += 0.05;
            dfs_rec(new_i, new_j, end_i, end_j, noOfRows, noOfCols, blocks, speed, blockedIndices); // calling the function recursively for visiting new nodes
        }
    }   
}
*/


export function dfs(start_i:number, start_j:number, end_i:number, end_j:number, noOfRows:number, noOfCols:number, blocks:any, blockedIndices:boolean[], speed:number, obj:any){
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
    let c:number = 0; // for adjusting of the speed of the visualization
    let stack:[number, number, number, number][] = [[start_i,start_j, -1, -1]]; // queue is used to stroe the nodes that are being visited
    let path:number[] = []; // used to store the indexes of the path once the 
    let vis:number[][] = []; // stores 1 when a box is visited else 0
    let listOfNodes:number[] = []; // for each box it stores the index of the previous box from which we came to this box
    // listOfNodes[i * noOfCols + j] = -1; // for starting box it is initialized to -1
    let visEnd:boolean = false;
    // initializing the vis array with all 0's since no node is visited initially
    for(let i = 0; i < noOfRows; i++){
        let val = [];
        for(let j = 0; j < noOfCols; j++){
            val.push(0);
        }
        vis.push(val);
    }

    vis[start_i][start_j] = 1;
    
    let val1:[number, number, number, number, number][] = []; // used to access inside setTimeout
    // looping until all the nodes are visited
    while(stack.length != 0) {
        let node:any = stack.pop(); // gives the front element of the queue i.e., the currently visualizing node
        // vis[i][j] = 1; // marking the current node as visited
        let new_i:number = node[0];
        let new_j:number = node[1];
        let prev_i:number = node[2];
        let prev_j:number = node[3];
        val1.push([new_i, new_j, noOfCols, prev_i, prev_j]); // adding new indices, no of columns and current indeices into array to access them inside setTimeout
        counter++;
        let timerVar = setTimeout(() => {
            if(val1.length !== 0) { // if val1 is not empty then we will visualize it else we will not because once the target node is visited then the visited array is cleared and initialized to empty array
                let [new_i, new_j, noOfCols, prev_i, prev_j]:[number, number, number, number, number] = val1[0]; // accessing the starting element from the val1 array
                val1.shift(); //deleting the first leement of val1 array
                counter--;
                // given i and j i.e., indices of row and column of 2d array, find corresponding index in 1d array
                if(counter == 0 && !(new_i == end_i && new_j == end_j)) {
                    obj.blockEventFunc();
                }
                let idx:number = (+new_i)*(+noOfCols)+(+new_j);
                if(idx != start_i*noOfCols + start_j && idx != end_i*noOfCols + end_j){
                    blocks[idx].style.backgroundColor = '#48cae4'; // changing the background color of newly visited node
                }
                if(prev_i == -1) {
                    console.log("Hello in -1");
                    listOfNodes[idx] = -1;
                    console.log(idx+" "+listOfNodes[idx]);
                }
                else{
                    listOfNodes[idx] = prev_i*noOfCols + prev_j; // adding the index of the previous node
                    console.log(idx+" "+listOfNodes[idx]);
                }
                if(new_i == end_i && new_j == end_j) { // if the target node is reached
                    console.log("Hello world!");
                    // for(let i = (+timerVar); i <= 780; i++){ // once the target ndoe is reached then the setTimeout of further node is cleared
                    //     clearTimeout(i);
                    // }
                    path.push(idx); // addign the target node into path array
                    while(listOfNodes[idx] != -1){
                        console.log("Hello");
                        console.log(listOfNodes[idx]);
                        path.push(listOfNodes[idx]); // adding the previously visited node which are on the path from starting node to target node
                        idx = listOfNodes[idx];
                    }
                    path.push(idx); // finally inserting the starting node index into the array
                    let val2:number[] = [];
                    let c1:number = 0; // used to adjust the speed of setTimeout of inner
                    for(let i = path.length-1; i >= 0; i--){
                        // if(path[i] != start_i * noOfCols + start_j && path[i] != end_i * noOfCols + end_j) {
                        val2.push(path[i]); //pushing the value of the index to be coloured
                        setTimeout(()=>{
                            let idx:number = val2[0]; // accessing the front element
                            if(idx == end_i*noOfCols + end_j && visEnd==false) {
                                console.log("Hello in if");
                                visEnd = true;
                                // let obj:SpeedAndArrayComponent = new SpeedAndArrayComponent();
                                obj.blockEventFunc();
                            }
                            val2.shift(); //deleting the front element
                            if(idx != start_i * noOfCols + start_j && idx != end_i * noOfCols + end_j)
                                blocks[idx].style.backgroundColor = '#891A45'; // changing the color of path to green
                            console.log("Hello");
                        }, c1 * speed);
                        c1 += 0.1;
                    }
                    val1 = []; // clearing val1 array since the target node is reached
                    // break;
                    console.log("Hello outside");
                    // return 1000;
                }
            }
            // return 100;
        }, c * speed); 
        c += 0.1;
        for(let i = 0; i < row_inc.length; i++) { 
            let new_i:number = node[0] + row_inc[i]; //new index i
            let new_j:number = node[1] + col_inc[i]; //new index j
            //checking if the new indices are valid and whether that node is not already visited
            if(isValid(new_i, new_j, noOfRows, noOfCols) && vis[new_i][new_j] == 0) {
                if(blockedIndices[new_i*noOfCols+new_j]) continue;
                vis[new_i][new_j] = 1; //that current node i smarked as visited
                // val1.push([new_i, new_j, noOfCols, node[0], node[1]]); // adding new indices, no of columns and current indeices into array to access them inside setTimeout
                // let timerVar = setTimeout(() =>{
                //     if(val1.length !== 0) { // if val1 is not empty then we will visualize it else we will not because once the target node is visited then the visited array is cleared and initialized to empty array
                //         let [new_i, new_j, noOfCols, prev_i, prev_j]:[number, number, number, number, number] = val1[0]; // accessing the starting element from the val1 array
                //         val1.shift(); //deleting the first leement of val1 array
                //         // given i and j i.e., indices of row and column of 2d array, find corresponding index in 1d array
                //         let idx:number = (+new_i)*(+noOfCols)+(+new_j);
                //         blocks[idx].style.backgroundColor = 'turquoise'; // changing the background color of newly visited node
                //         listOfNodes[idx] = prev_i*noOfCols + prev_j; // adding the index of the previous node
                //         if(new_i == end_i && new_j == end_j) { // if the target node is reached
                //             for(let i = (+timerVar); i <= 780; i++){ // once the target ndoe is reached then the setTimeout of further node is cleared
                //                 clearTimeout(i);
                //             }
                //             path.push(idx); // addign the target node into path array
                //             while(listOfNodes[idx] != -1){
                //                 path.push(listOfNodes[idx]); // adding the previously visited node which are on the path from starting node to target node
                //                 idx = listOfNodes[idx];
                //             }
                //             path.push(idx); // finally inserting the starting node index into the array
                //             let val2:number[] = [];
                //             let c1:number = 0; // used to adjust the speed of setTimeout of inner
                //             for(let i = path.length-1; i >= 0; i--){
                //                 val2.push(path[i]); //pushing the value of the index to be coloured
                //                 setTimeout(()=>{
                //                     node = val2[0]; // accessing the front element
                //                     val2.shift(); //deleting the front element
                //                     blocks[node].style.backgroundColor = "green"; // changing the color of path to green
                //                 }, c1 * speed);
                //                 c1 += 0.05;
                //             }
                //             val1 = []; // clearing val1 array since the target node is reached
                //         }
                //     }

                // }, c * speed); 
                // c += 0.1;

                stack.push([new_i, new_j, node[0], node[1]]); // add the current node into the queue
                // break;
            }
        }
    }
    return 10;
}
