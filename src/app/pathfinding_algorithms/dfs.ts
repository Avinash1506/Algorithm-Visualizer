import { isValid,initializeVisArray } from './commonwork';

let row_inc = [0,1,0,-1];
let col_inc = [1,0,-1,0];
let vis:number[][] = [];

export function dfs_test(start_i:number, start_j:number, noOfRows:number, noOfCols:number){
    vis = initializeVisArray(noOfRows,noOfCols,vis); 
    dfs_rec_test(start_i, start_j, noOfRows, noOfCols); 
}

function dfs_rec_test(start_i:number, start_j:number, noOfRows:number, noOfCols:number){
    vis[start_i][start_j] = 1;
    for(let i = 0;i < row_inc.length; i++){
        let new_i:number = start_i + row_inc[i];
        let new_j:number = start_j + col_inc[i];
        if(isValid(new_i, new_j, noOfRows, noOfCols) && vis[new_i][new_j] == 0) {
            dfs_rec_test(new_i, new_j, noOfRows, noOfCols);
        }
    }
}

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
                    listOfNodes[idx] = -1;
                }
                else{
                    listOfNodes[idx] = prev_i*noOfCols + prev_j; // adding the index of the previous node
                }
                if(new_i == end_i && new_j == end_j) { // if the target node is reached
                    path.push(idx); // addign the target node into path array
                    while(listOfNodes[idx] != -1){
                        path.push(listOfNodes[idx]); // adding the previously visited node which are on the path from starting node to target node
                        idx = listOfNodes[idx];
                    }
                    path.push(idx); // finally inserting the starting node index into the array
                    let val2:number[] = [];
                    let c1:number = 0; // used to adjust the speed of setTimeout of inner
                    for(let i = path.length-1; i >= 0; i--){
                        val2.push(path[i]); //pushing the value of the index to be coloured
                        setTimeout(()=>{
                            let idx:number = val2[0]; // accessing the front element
                            if(idx == end_i*noOfCols + end_j && visEnd==false) {
                                visEnd = true;
                                obj.blockEventFunc();
                            }
                            val2.shift(); //deleting the front element
                            if(idx != start_i * noOfCols + start_j && idx != end_i * noOfCols + end_j)
                                blocks[idx].style.backgroundColor = '#891A45'; // changing the color of path to green
                        }, c1 * speed);
                        c1 += 0.1;
                    }
                    val1 = []; // clearing val1 array since the target node is reached
                }
            }
        }, c * speed); 
        c += 0.1;
        for(let i = 0; i < row_inc.length; i++) { 
            let new_i:number = node[0] + row_inc[i]; //new index i
            let new_j:number = node[1] + col_inc[i]; //new index j
            //checking if the new indices are valid and whether that node is not already visited
            if(isValid(new_i, new_j, noOfRows, noOfCols) && vis[new_i][new_j] == 0) {
                if(blockedIndices[new_i*noOfCols+new_j]) continue;
                vis[new_i][new_j] = 1; //that current node i smarked as visited

                stack.push([new_i, new_j, node[0], node[1]]); // add the current node into the queue
            }
        }
    }
    return 10;
}
