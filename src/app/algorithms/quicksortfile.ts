let c: number = 0;
let value1: number[] = [];
let value2: [number, number, number][] = [];
let value3: [number, number, number, number][] = [];
let value4: number[] = [];
let value5: [number, number, number][] = [];
let value6: [number, number, number, number, number][] = [];
let vis:boolean = false;
let cnt:number = 0;
export function quicksortfunc(array: number[], arrayBars: any, speed: number, obj:any) {
  vis = false;
  c = 0;
  cnt = 0;
  quicksorthelper(array, 0, array.length - 1, arrayBars, speed, obj);

  return array;
}

function quicksorthelper(
  array: number[],
  lo: number,
  hi: number,
  arrayBars: any,
  speed: number, 
  obj:any
) {
  if (lo <= hi) {
    let pi: number = partition(array, lo, hi, arrayBars, speed, obj);
    quicksorthelper(array, lo, pi - 1, arrayBars, speed, obj);
    quicksorthelper(array, pi + 1, hi, arrayBars, speed, obj);
  }
}

function partition(
  array: number[],
  lo: number,
  hi: number,
  arrayBars: any,
  speed: number, 
  obj:any
) {
  let partitionElement: number = array[hi];

  value1.push(hi);
  setTimeout(() => {
    let idx: number = value1[0];
    value1.shift();
    arrayBars[idx].style.backgroundColor = '#e76f51';
  }, c * speed);
  c++;
  let i: number = lo - 1,
    tmp: number;
  // value4.push(i);
  // setTimeout(() => {
  //   let idx: number = value4[0];
  //   value4.shift();
  //   if (idx >= 0) arrayBars[idx].style.backgroundColor = '#0077b6';
  // }, c * speed);
  // c++;
  for (let j = lo; j <= hi - 1; j++) {
    value5.push([j, lo, i]);
    setTimeout(() => {
      let [idx, low, i] = value5[0];
      value5.shift();
      arrayBars[idx].style.backgroundColor = '#0077b6';
      if (idx !== low && idx - 1 != i)
        arrayBars[idx - 1].style.backgroundColor = '#48cae4';
    }, c * speed);
    c++;
    if (array[j] < partitionElement) {
      i++;
      value2.push([i, lo, j]);
      value3.push([i, array[i], j, array[j]]);
      tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
      setTimeout(() => {
        let [idx1, lo, j] = value2[0];
        value2.shift();
        arrayBars[idx1].style.backgroundColor = '#e9c46a';
        arrayBars[j].style.backgroundColor = '#e9c46a';
        //remove previous color
        if (
          j - 1 >= lo &&
          arrayBars[idx1 - 1].style.backgroundColor !== 'rgb(129, 135, 220)'
        )
          arrayBars[idx1 - 1].style.backgroundColor = '#48cae4';
      }, c * speed);
      c++;
      setTimeout(() => {
        let [idx1, val1, idx2, val2] = value3[0];
        value3.shift();
        //swap elements
        arrayBars[idx1].style.height = `${val2 * 15}px`;
        arrayBars[idx1].innerHTML = `${val2}`;
        arrayBars[idx2].style.height = `${val1 * 15}px`;
        arrayBars[idx2].innerHTML = `${val1}`;
        arrayBars[idx1].style.backgroundColor = '#0077b6';
        arrayBars[idx2].style.backgroundColor = '#0077b6';
      }, c * speed);
      c++;
    }
  }

  value6.push([hi, partitionElement, i + 1, array[i + 1], lo]);

  array[hi] = array[i + 1];
  array[i + 1] = partitionElement;

  setTimeout(() => {
    let [idx1, val1, idx2, val2, lo] = value6[0];
    value6.shift();
    if (idx1 == idx2) {
      console.log(idx1);
      arrayBars[idx1].style.backgroundColor = '#8187dc';
      cnt++;
      if(cnt == array.length - 1 && vis == false) {
        vis = true;
        obj.unblockElements();
      }
      console.log("LLLasssttt");
    } else {
      arrayBars[idx1].style.backgroundColor = '#48cae4';
      if (
        idx1 - 1 >= lo &&
        arrayBars[idx1 - 1].style.backgroundColor !== 'rgb(129, 135, 220)'
      )
        arrayBars[idx1 - 1].style.backgroundColor = '#48cae4';
      arrayBars[idx1].style.height = `${val2 * 15}px`;
      arrayBars[idx1].innerHTML = `${val2}`;
      arrayBars[idx2].style.backgroundColor = '#8187dc';
      cnt++;
      arrayBars[idx2].style.height = `${val1 * 15}px`;
      arrayBars[idx2].innerHTML = `${val1}`;
      if(cnt == array.length - 1 && vis == false) {
        vis = true;
        obj.unblockElements();
      }
    }
  }, c * speed);
  c++;
  return i + 1;
}

export function quicksortfunctest(array: number[]) {
  quicksorthelpertest(array, 0, array.length - 1);

  return array;
}

function quicksorthelpertest(array: number[], lo: number, hi: number) {
  if (lo < hi) {
    let pi: number = partitiontest(array, lo, hi);
    quicksorthelpertest(array, lo, pi - 1);
    quicksorthelpertest(array, pi + 1, hi);
  }
}

function partitiontest(array: number[], lo: number, hi: number) {
  let partitionElement: number = array[hi];
  let i: number = lo - 1,
    tmp: number;
  for (let j = lo; j <= hi - 1; j++) {
    if (array[j] < partitionElement) {
      i++;
      tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
  }

  array[hi] = array[i + 1];
  array[i + 1] = partitionElement;
  return i + 1;
}
