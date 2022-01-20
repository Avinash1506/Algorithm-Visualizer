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


export function astar(start_i:number, start_j:number, end_i:number, end_j:number, noOfRows:number, noOfCols:number, blocks:any, blockedIndices:boolean[], speed:number, obj:any) {
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
    console.log(open); //{start_i:{start_j:{0:0}}}
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
        let min_h:any; //{start_i:{start_j:{0:0}}}
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

        console.log(min_i, min_j, key);
        // console.log(key);

        // console.log("HEllo");

        open.splice(key,1);

        console.log(min_i,min_j);

        // console.log(open.length);
        // console.log(open);

        let min_dist1 = 1000000000;

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
                let idx:number = new_i*noOfCols + new_j;
                // let c1:number = 0;
                // for(let val in blockedIndices) {
                //     if(+val == idx) {
                //         c1=1;
                //         break;
                //     }
                // }
                if(blockedIndices[idx]) continue;
                let curr_dist:any;
                // path[+((+min_i)*noOfCols + (+min_j))] = +((+new_i)*noOfCols + (+new_j));
                
                // curr_dist = min_dist + 1;
                let curr_g:number = +min_g + 1;
                let curr_h:number;
                if(new_i == end_i && new_j == end_j) {
                    curr_h = 0;
                }
                else{
                    if(new_i == end_i) {
                        if(new_j < end_j) {
                            let k = 1;
                            let flag:boolean = false;
                            while(1) {
                                if(new_j + k != end_j && blockedIndices[new_i*noOfCols + new_j + k] == true) {
                                    flag = true;
                                    break;
                                }
                                else if(new_j + k == end_j) {
                                    break;
                                }
                                k++;
                            }
                            if(flag) {
                                curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) + 2;
                            }
                            else{
                                curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j);
                            }
                        }
                        else { 
                            let k = 1;
                            let flag:boolean = false;
                            while(1) {
                                if(new_j - k != end_j && blockedIndices[new_i*noOfCols + new_j - k] == true) {
                                    flag = true;
                                    break;
                                }
                                else if(new_j - k == end_j) {
                                    break;
                                }
                                k++;
                            }
                            if(flag) {
                                curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) + 2;
                            }
                            else{
                                curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) ;
                            }
                        }
                    }

                    else if(new_j == end_j) {
                        if(new_i < end_i) {
                            let k = 1;
                            let flag:boolean = false;
                            while(1) {
                                if(new_i + k != end_i && blockedIndices[(new_i + k)*noOfCols + new_j] == true) {
                                    flag = true;
                                    break;
                                }
                                else if(new_i + k == end_i) {
                                    break;
                                }
                                k++;
                            }
                            if(flag) {
                                curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) + 2;
                            }
                            else{
                                curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j);
                            }
                        }
                        else { 
                            let k = 1;
                            let flag:boolean = false;
                            while(1) {
                                if(new_i - k != end_i && blockedIndices[(new_i - k)*noOfCols + new_j] == true) {
                                    flag = true;
                                    break;
                                }
                                else if(new_i - k == end_i) {
                                    break;
                                }
                                k++;
                            }
                            if(flag) {
                                curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) + 2;
                            }
                            else{
                                curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) ;
                            }
                        }
                    }
                    else{
                        if(new_i < end_i && new_j < end_j) {
                            let tmp_i:number = new_i;
                            let tmp_j:number = new_j;
                            let co1:number = 0;
                            while(tmp_j != end_j) {
                                if(blockedIndices[tmp_i*noOfCols+tmp_j]) {
                                    co1 = 1;
                                    break;
                                }
                                tmp_j++;
                            }

                            while(tmp_i != end_i) {
                                if(blockedIndices[tmp_i*noOfCols + tmp_j]) {
                                    co1 = 1;
                                    break;
                                }
                                tmp_i++;
                            }

                            // if(co1 != 1) {
                            tmp_i = new_i;
                            tmp_j = new_j;
                            let co2:number = 0;
                            while(tmp_i != end_i) {
                                if(blockedIndices[tmp_i*noOfCols+tmp_j]) {
                                    co2 = 1;
                                    break;
                                }
                                tmp_i++;
                            }
                            while(tmp_j != end_j) {
                                if(blockedIndices[tmp_i*noOfCols + tmp_j]) {
                                    co2 = 1;
                                    break;
                                }
                                tmp_j++;
                            }
                            // }
                            
                            if(co1 == 1 && co2 == 1) {
                                curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) + 2;
                            }
                            else {
                                curr_h= +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j);
                            }
                        }
                        else if(new_i < end_i && new_j > end_j) {
                            // if(blockedIndices[new_i*noOfCols + new_j - 1] && blockedIndices[(new_i+1)*noOfCols + new_j]) {
                            //     curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) + 2;
                            // }
                            // else {
                            //     curr_h= +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j);
                            // }
                            let tmp_i:number = new_i;
                            let tmp_j:number = new_j;
                            let co1:number = 0;
                            while(tmp_j != end_j) {
                                if(blockedIndices[tmp_i*noOfCols+tmp_j]) {
                                    co1 = 1;
                                    break;
                                }
                                tmp_j--;
                            }

                            while(tmp_i != end_i) {
                                if(blockedIndices[tmp_i*noOfCols + tmp_j]) {
                                    co1 = 1;
                                    break;
                                }
                                tmp_i++;
                            }

                            // if(co1 != 1) {
                            tmp_i = new_i;
                            tmp_j = new_j;
                            let co2:number = 0;
                            while(tmp_i != end_i) {
                                if(blockedIndices[tmp_i*noOfCols+tmp_j]) {
                                    co2 = 1;
                                    break;
                                }
                                tmp_i++;
                            }
                            while(tmp_j != end_j) {
                                if(blockedIndices[tmp_i*noOfCols + tmp_j]) {
                                    co2 = 1;
                                    break;
                                }
                                tmp_j--;
                            }
                            // }
                            
                            if(co1 == 1 && co2 == 1) {
                                curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) + 2;
                            }
                            else {
                                curr_h= +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j);
                            }
                        }
                        else if(new_i > end_i && new_j < end_j) {
                            // if(blockedIndices[new_i*noOfCols + new_j + 1] && blockedIndices[(new_i-1)*noOfCols + new_j]) {
                            //     curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) + 2;
                            // }
                            // else {
                            //     curr_h= +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j);
                            // }
                            let tmp_i:number = new_i;
                            let tmp_j:number = new_j;
                            let co1:number = 0;
                            while(tmp_j != end_j) {
                                if(blockedIndices[tmp_i*noOfCols+tmp_j]) {
                                    co1 = 1;
                                    break;
                                }
                                tmp_j++;
                            }

                            while(tmp_i != end_i) {
                                if(blockedIndices[tmp_i*noOfCols + tmp_j]) {
                                    co1 = 1;
                                    break;
                                }
                                tmp_i--;
                            }

                            // if(co1 != 1) {
                            tmp_i = new_i;
                            tmp_j = new_j;
                            let co2:number = 0;
                            while(tmp_i != end_i) {
                                if(blockedIndices[tmp_i*noOfCols+tmp_j]) {
                                    co2 = 1;
                                    break;
                                }
                                tmp_i--;
                            }
                            while(tmp_j != end_j) {
                                if(blockedIndices[tmp_i*noOfCols + tmp_j]) {
                                    co2 = 1;
                                    break;
                                }
                                tmp_j++;
                            }
                            // }
                            
                            if(co1 == 1 && co2 == 1) {
                                curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) + 2;
                            }
                            else {
                                curr_h= +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j);
                            }
                        }
                        else {
                            // if(blockedIndices[new_i*noOfCols + new_j - 1] && blockedIndices[(new_i - 1)*noOfCols + new_j]) {
                            //     curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) + 2;
                            // }
                            // else {
                            //     curr_h= +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j);
                            // }
                            let tmp_i:number = new_i;
                            let tmp_j:number = new_j;
                            let co1:number = 0;
                            while(tmp_j != end_j) {
                                if(blockedIndices[tmp_i*noOfCols+tmp_j]) {
                                    co1 = 1;
                                    break;
                                }
                                tmp_j--;
                            }

                            while(tmp_i != end_i) {
                                if(blockedIndices[tmp_i*noOfCols + tmp_j]) {
                                    co1 = 1;
                                    break;
                                }
                                tmp_i--;
                            }

                            // if(co1 != 1) {
                            tmp_i = new_i;
                            tmp_j = new_j;
                            let co2:number = 0;
                            while(tmp_i != end_i) {
                                if(blockedIndices[tmp_i*noOfCols+tmp_j]) {
                                    co2 = 1;
                                    break;
                                }
                                tmp_i--;
                            }
                            while(tmp_j != end_j) {
                                if(blockedIndices[tmp_i*noOfCols + tmp_j]) {
                                    co2 = 1;
                                    break;
                                }
                                tmp_j--;
                            }
                            // }
                            
                            if(co1 == 1 && co2 == 1) {
                                curr_h = +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j) + 2;
                            }
                            else {
                                curr_h= +Math.abs(new_i - end_i) + +Math.abs(new_j - end_j);
                            }
                        }
                    }
                }   
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

                if(curr_g + curr_h < min_dist1) {
                    min_dist1 = curr_g + curr_h;
                    path[+((+min_i)*noOfCols + (+min_j))] = +((+new_i)*noOfCols + (+new_j));
                }

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
        if(idx == path[path[idx]]) {
            console.log("inf");
            break;
        }
        setTimeout(()=>{
            let idx:number = val1[0];
            val1.shift();
            blocks[idx].style.backgroundColor = 'turquoise';
        }, c*300);
        c+=0.5;
        idx = +path[idx];
    }

    setTimeout(()=>{
        val1.shift();
        blocks[end_i*noOfCols+end_j].style.backgroundColor = 'turquoise';
        obj.blockEventFunc();
    }, c*300);
}

