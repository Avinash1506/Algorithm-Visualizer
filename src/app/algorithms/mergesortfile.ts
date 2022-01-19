let c: number = 0;
let vis:boolean = false;
export function mergesortfunc(
  array: number[],
  arrayBars: number[],
  speed: number, 
  obj:any
) {
  vis = false;
  c = 0;
  let copy: number[] = array;
  console.log('inside mergeSort');
  console.log(array);
  mergesorthelper(array, copy, 0, array.length - 1, arrayBars, speed, obj);
  console.log(array);
  return array;
}

function mergesorthelper(
  array: number[],
  copy: number[],
  startIdx: number,
  endIdx: number,
  arrayBars: number[],
  speed: number, 
  obj:any
) {
  if (startIdx >= endIdx) return;

  let mid = Math.floor((startIdx + endIdx) / 2);
  mergesorthelper(array, copy, startIdx, mid, arrayBars, speed, obj);
  mergesorthelper(array, copy, mid + 1, endIdx, arrayBars, speed, obj);
  mergesort(array, copy, startIdx, mid, endIdx, arrayBars, speed, obj);
}
let value1: number[] = [];
let value2: number[] = [];
let value3: number[] = [];
let value4: number[] = [];
let value5: number[] = [];
function mergesort(
  array: number[],
  copy: number[],
  startIdx: number,
  mid: number,
  endIdx: number,
  arrayBars: any,
  speed: number, 
  obj:any
) {
  let i = startIdx,
    k = 0,
    j = mid + 1;
  let new_array: number[] = [];

  while (i <= mid && j <= endIdx) {
    if (array[i] < array[j]) {
      value1.push(i);
      setTimeout(() => {
        console.log('hello-1');
        arrayBars[value1[0]].style.backgroundColor = '#e76f51';
        value1.shift();
      }, c * speed);
      new_array[k++] = array[i];
      c++;
      i++;
    } else {
      value2.push(j);
      setTimeout(() => {
        console.log('hello-2');
        arrayBars[value2[0]].style.backgroundColor = '#e76f51';
        value2.shift();
      }, c * speed);
      c++;
      new_array[k++] = array[j];
      j++;
    }
  }

  while (i <= mid) {
    value3.push(i);
    setTimeout(() => {
      console.log('hello-1');
      arrayBars[value3[0]].style.backgroundColor = '#e76f51';
      value3.shift();
    }, c * speed);
    c++;
    new_array[k++] = array[i];
    i++;
  }

  while (j <= endIdx) {
    value4.push(j);
    setTimeout(() => {
      console.log('hello-2');
      arrayBars[value4[0]].style.backgroundColor = '#e76f51';
      value4.shift();
    }, c * speed);
    c++;
    new_array[k++] = array[j];
    j++;
  }

  if (startIdx == 0 && endIdx == array.length - 1) {
    for (let i = startIdx; i <= endIdx; i++) {
      array[i] = new_array[i - startIdx];
      value5.push(i);
      setTimeout(() => {
        console.log('hello-3 ' + i);
        arrayBars[value5[0]].style.backgroundColor = '#8187dc';
        arrayBars[value5[0]].style.height = `${
          new_array[value5[0] - startIdx] * 15
        }px`;
        arrayBars[value5[0]].innerHTML = `${new_array[value5[0] - startIdx]}`;
        if(value5[0] == array.length - 1 && vis == false) {
          vis = true;
          obj.unblockElements();
        }
        console.log('array val: ', new_array[i - startIdx]);
        value5.shift();
      }, c * speed);
      c++;
    }
  } else {
    for (let i = startIdx; i <= endIdx; i++) {
      array[i] = new_array[i - startIdx];
      value5.push(i);
      setTimeout(() => {
        console.log('hello-3 ' + i);
        arrayBars[value5[0]].style.backgroundColor = '#0077b6';
        arrayBars[value5[0]].style.height = `${
          new_array[value5[0] - startIdx] * 15
        }px`;
        arrayBars[value5[0]].innerHTML = `${new_array[value5[0] - startIdx]}`;
        console.log('array val: ', new_array[i - startIdx]);
        value5.shift();
      }, c * speed);
      c++;
    }
  }
}

export function mergesorttest(array: number[]) {
  mergesorthelpertest(array, 0, array.length - 1);

  return array;
}

function mergesorthelpertest(
  array: number[],
  startIdx: number,
  endIdx: number
) {
  if (startIdx >= endIdx) return;

  let mid = Math.floor((startIdx + endIdx) / 2);
  mergesorthelpertest(array, startIdx, mid);
  mergesorthelpertest(array, mid + 1, endIdx);
  mergetest(array, startIdx, mid, endIdx);
}

function mergetest(
  array: number[],
  startIdx: number,
  mid: number,
  endIdx: number
) {
  let i = startIdx,
    k = 0,
    j = mid + 1;
  let new_array: number[] = [];

  while (i <= mid && j <= endIdx) {
    if (array[i] < array[j]) {
      new_array[k++] = array[i];
      i++;
    } else {
      new_array[k++] = array[j];
      j++;
    }
  }

  while (i <= mid) {
    new_array[k++] = array[i];
    i++;
  }

  while (j <= endIdx) {
    new_array[k++] = array[j];
    j++;
  }

  for (let i = startIdx; i <= endIdx; i++) {
    array[i] = new_array[i - startIdx];
  }
}
//48,34,10,35,11,20,10,4,27,41
