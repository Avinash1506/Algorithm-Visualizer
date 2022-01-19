import { NgIfContext } from '@angular/common';
import { isValid,initializeVisArray } from './commonwork';
let row_inc = [0,1,0,-1];
let col_inc = [1,0,-1,0];
export function astar_test(start_i:number, start_j:number, end_i:number, end_j:number, noOfRows:number, noOfCols:number, blockedIndices:boolean[]) {
    // const open = new Set();
    // var ht = {};
    // // open();
    // open.add({cost: 0,nodeno: start_i*noOfCols+start_j});
    // open.add({cost: 4,nodeno: start_i*noOfCols+start_j+2});
    // open.add({cost: 1,nodeno: start_i*noOfCols+start_j+1});
    // open.add({cost: 3,nodeno: start_i*noOfCols+start_j+3});
    // console.log(open);
    let close:any = [];
    let cnt:number = 1;
    let cnt1:number = 0;
    // let x:number = start_i*noOfCols + start_j;
    let open:any = [];
    let obj1:any = {};
    obj1[0] = 0;
    let obj2:any = {};
    obj2[start_j] = obj1;
    let obj3:any = {};
    obj3[start_i] = obj2;
    open.push(obj3);
    // console.log(open);
    let dest:boolean = false;
    let path:any = [];
    while(open.length != 0) {
        // console.log(open[1]);
        let min_dist = 1000000000;
        let key:any;
        let g_val:any;
        let h_val:any;
        let min_i:any;
        let min_j:any;
        let curr_i:number = 0;
        let curr_j:number = 0;
        let f_obj:any;
        let obj:any;
        let min_g:any;
        let min_h:any;
        for(let val = 0; val < open.length; val++) {
            curr_i = +Object.keys(open[val])[0]; // start_i
            obj = open[val][curr_i]; // {start_j: {0 : 0}}
            curr_j = +Object.keys(obj)[0]; 
            f_obj = obj[curr_j]; // {0 : 0}
            g_val = Object.keys(f_obj)[0];
            h_val = f_obj[g_val];
            // h_val = obj[Object.keys()];
            if(+g_val + +h_val < +min_dist) {
                min_g = +g_val;
                min_h = +h_val;
                min_dist = +g_val + +h_val;
                min_i = +curr_i;
                min_j = +curr_j;
                key = +val;
            }
        }

        // console.log(min_i, min_j, key);
        // console.log(key);

        // console.log("HEllo");

        open.splice(key,1);

        console.log(min_i,min_j);

        // console.log(open.length);
        // console.log(open);

        for(let i = 0; i < row_inc.length; i++) {
            let new_i = (+min_i + +row_inc[i]);
            let new_j = (+min_j + +col_inc[i]);
            if(isValid(new_i, new_j, noOfRows, noOfCols)) {
                path[+((+new_i)*noOfCols + (+new_j))] = +((+min_i)*noOfCols + (+min_j));
                if(blockedIndices[new_i*noOfCols+new_j]) continue;
                // console.log("Hello-1");
                if(new_i == end_i && new_j == end_j) {
                    // console.log(new_i+' '+new_j);
                    dest = true;
                    break;
                }

                let curr_dist:any;
                
                // curr_dist = min_dist + 1;
                let curr_g:number = +min_g + 1;
                let curr_h:number = Math.abs(new_i - end_i) + Math.abs(new_j - end_j);
                // console.log(curr_h);    
                // for(let val in open) {
                //     let curr_i:any = Object.keys(open[val][0]);
                //     let obj:any = open[val][curr_i];
                //     let curr_j = Object.keys(obj)[0];
                //     dist = obj[Object.keys(obj)[0]];
                //     // if(dist < min_dist) {
                //     //     min_dist = dist;
                //     //     min_i = curr_i;
                //     //     min_j = curr_j;
                //     //     key = obj;
                //     // }
                //     if(curr_i == new_i && curr_j == new_j && dist < curr_dist) {

                //     }
                // }

                let c:number = 0;

                for(let val = 0; val < open.length; val++) {
                    let curr_i1:any = +Object.keys(open[val])[0]; // start_i
                    let obj:any = open[val][curr_i1]; // {start_j: {0 : 0}}
                    // console.log(obj);
                    let curr_j1 = +Object.keys(obj)[0]; 
                    // console.log(curr_j1);
                    let f_obj = obj[curr_j1]; // {0 : 0}
                    g_val = +Object.keys(f_obj)[0];
                    h_val = +f_obj[g_val];
                    // h_val = obj[Object.keys()];
                    // if(g_val + h_val < min_dist) {
                    //     min_dist = g_val + h_val;
                    //     min_i = curr_i;
                    //     min_j = curr_j;
                    //     key = obj;
                    // }
                    if(curr_i1 == new_i && curr_j1 == new_j &&  g_val + h_val <= +curr_g + +curr_h) {
                        c = 1;
                        break;
                    }
                }

                if(c == 1) {
                    // console.log("continue");
                    continue;
                }

                if(close.length != 0) {
                    for(let val = 0; val < close.length; val++) {
                        let curr_i:any = +Object.keys(close[val])[0]; // start_i
                        let obj:any = close[val][curr_i]; // {start_j: {0 : 0}}
                        let curr_j = +Object.keys(obj)[0]; 
                        let f_obj = obj[curr_j]; // {0 : 0}
                        g_val = +Object.keys(f_obj)[0];
                        h_val = +f_obj[g_val];
                        // h_val = obj[Object.keys()];
                        if(curr_i == new_i && curr_j == new_j &&  g_val + h_val <= +curr_g + +curr_h) {
                            c = 1;
                            break;
                        }
                    }
                }

                if(c == 1) {
                    // console.log(curr_i+" "+curr_j);
                    console.log("continue");
                    continue;
                }

                let obj1:any = {};
                obj1[curr_g] = curr_h;
                let obj2:any = {};
                obj2[new_j] = obj1;
                let obj3:any = {};
                obj3[new_i] = obj2;
                open.push(obj3);
                // console.log(open);
            }
        }

        let obj1:any = {};
        obj1[min_g] = min_h;
        let obj2:any = {};
        obj2[curr_j] = obj1;
        let obj3:any = {};
        obj3[curr_i] = obj2;
        close.push(obj3);

        // console.log(obj3);

        if(dest == true) {
            // console.log("Hi");
            break;
        }
        // close[cnt1++] = {curr_i:{curr_j:{g_val:h_val}}};

    }

    console.log(path);
}


export function astar(start_i:number, start_j:number, end_i:number, end_j:number, noOfRows:number, noOfCols:number, blocks:any, blockedIndices:boolean[], speed:number) {
    let close:any = [];
    let cnt:number = 1;
    let cnt1:number = 0;
    // let x:number = start_i*noOfCols + start_j;
    let open:any = [];
    let obj1:any = {};
    obj1[0] = 0;
    let obj2:any = {};
    obj2[start_j] = obj1;
    let obj3:any = {};
    obj3[start_i] = obj2;
    open.push(obj3);
    // console.log(open);
    let dest:boolean = false;
    let path:any = [];
    while(open.length != 0) {
        // console.log(open[1]);
        let min_dist = 1000000000;
        let key:any;
        let g_val:any;
        let h_val:any;
        let min_i:any;
        let min_j:any;
        let curr_i:number = 0;
        let curr_j:number = 0;
        let f_obj:any;
        let obj:any;
        let min_g:any;
        let min_h:any;
        for(let val = 0; val < open.length; val++) {
            curr_i = +Object.keys(open[val])[0]; // start_i
            obj = open[val][curr_i]; // {start_j: {0 : 0}}
            curr_j = +Object.keys(obj)[0]; 
            f_obj = obj[curr_j]; // {0 : 0}
            g_val = Object.keys(f_obj)[0];
            h_val = f_obj[g_val];
            // h_val = obj[Object.keys()];
            if(+g_val + +h_val < +min_dist) {
                min_g = +g_val;
                min_h = +h_val;
                min_dist = +g_val + +h_val;
                min_i = +curr_i;
                min_j = +curr_j;
                key = +val;
            }
        }

        // console.log(min_i, min_j, key);
        // console.log(key);

        // console.log("HEllo");

        open.splice(key,1);

        console.log(min_i,min_j);

        // console.log(open.length);
        // console.log(open);

        for(let i = 0; i < row_inc.length; i++) {
            let new_i = (+min_i + +row_inc[i]);
            let new_j = (+min_j + +col_inc[i]);
            if(isValid(new_i, new_j, noOfRows, noOfCols)) {
                // if(blockedIndices[new_i*noOfCols+new_j]) continue;
                // console.log("Hello-1");
                // if(new_i == end_i && new_j == end_j) {
                //     // console.log(new_i+' '+new_j);
                //     dest = true;
                //     break;
                // }

                let curr_dist:any;
                path[+((+min_i)*noOfCols + (+min_j))] = +((+new_i)*noOfCols + (+new_j));
                
                // curr_dist = min_dist + 1;
                let curr_g:number = +min_g + 1;
                let curr_h:number = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j);
                // console.log(curr_h);    
                // for(let val in open) {
                //     let curr_i:any = Object.keys(open[val][0]);
                //     let obj:any = open[val][curr_i];
                //     let curr_j = Object.keys(obj)[0];
                //     dist = obj[Object.keys(obj)[0]];
                //     // if(dist < min_dist) {
                //     //     min_dist = dist;
                //     //     min_i = curr_i;
                //     //     min_j = curr_j;
                //     //     key = obj;
                //     // }
                //     if(curr_i == new_i && curr_j == new_j && dist < curr_dist) {

                //     }
                // }

                let c:number = 0;

                for(let val = 0; val < open.length; val++) {
                    let curr_i1:any = +Object.keys(open[val])[0]; // start_i
                    let obj:any = open[val][curr_i1]; // {start_j: {0 : 0}}
                    // console.log(obj);
                    let curr_j1 = +Object.keys(obj)[0]; 
                    // console.log(curr_j1);
                    let f_obj = obj[curr_j1]; // {0 : 0}
                    g_val = +Object.keys(f_obj)[0];
                    h_val = +f_obj[g_val];
                    // h_val = obj[Object.keys()];
                    // if(g_val + h_val < min_dist) {
                    //     min_dist = g_val + h_val;
                    //     min_i = curr_i;
                    //     min_j = curr_j;
                    //     key = obj;
                    // }
                    if(curr_i1 == new_i && curr_j1 == new_j &&  g_val + h_val <= +curr_g + +curr_h) {
                        c = 1;
                        break;
                    }
                }

                if(c == 1) {
                    // console.log("continue");
                    continue;
                }

                if(close.length != 0) {
                    for(let val = 0; val < close.length; val++) {
                        let curr_i:any = +Object.keys(close[val])[0]; // start_i
                        let obj:any = close[val][curr_i]; // {start_j: {0 : 0}}
                        let curr_j = +Object.keys(obj)[0]; 
                        let f_obj = obj[curr_j]; // {0 : 0}
                        g_val = +Object.keys(f_obj)[0];
                        h_val = +f_obj[g_val];
                        // h_val = obj[Object.keys()];
                        if(curr_i == new_i && curr_j == new_j &&  g_val + h_val <= +curr_g + +curr_h) {
                            c = 1;
                            break;
                        }
                    }
                }

                if(c == 1) {
                    // console.log(curr_i+" "+curr_j);
                    console.log("continue");
                    continue;
                }

                let obj1:any = {};
                obj1[curr_g] = curr_h;
                let obj2:any = {};
                obj2[new_j] = obj1;
                let obj3:any = {};
                obj3[new_i] = obj2;
                open.push(obj3);
                // console.log(open);
            }
        }

        let obj1:any = {};
        obj1[min_g] = min_h;
        let obj2:any = {};
        obj2[curr_j] = obj1;
        let obj3:any = {};
        obj3[curr_i] = obj2;
        close.push(obj3);

        // console.log(obj3);

        // if(dest == true) {
        //     // console.log("Hi");
        //     break;
        // }
        // close[cnt1++] = {curr_i:{curr_j:{g_val:h_val}}};

    }

    console.log(path);
    let c:number = 0;
    let idx:number = +((+start_i)*noOfCols+ +start_j);
    let val1:number[] = [];
    while(path[idx] != +(+end_i*noOfCols + +end_j)) {
        console.log(idx);
        console.log(path[idx]);
        val1.push(path[idx]);
        setTimeout(()=>{
            let idx:number = val1[0];
            val1.shift();
            blocks[idx].style.backgroundColor = 'turquoise';
        }, c*1000);
        c++;
        idx = +path[idx];
    }

    setTimeout(()=>{
        val1.shift();
        blocks[end_i*noOfCols+end_j].style.backgroundColor = 'turquoise';
    }, c*1000);
}

