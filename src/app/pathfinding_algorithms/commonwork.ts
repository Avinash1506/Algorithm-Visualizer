export function isValid(i:number, j:number, noOfRows:number, noOfCols:number){
    return (i >= 0 && i < noOfRows && j >= 0 && j < noOfCols);
}

export function initializeVisArray(noOfRows:number, noOfCols:number, vis:number[][]){
    for(let i=0; i<noOfRows; i++){
        let val = [];
        for(let j=0; j<noOfCols; j++){
            val.push(0);
        }
        vis.push(val);
    }

    return vis;
}

export function calculateIndex(i:number, j:number, noOfCols:number) {
    return i * noOfCols + j;
}