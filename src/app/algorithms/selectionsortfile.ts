let value1: number[] = [];
let value2: [number, number][] = [];
let value3: [number, number, number, number][] = [];
let value4: number[] = [];
let c: number = 0;
export function selectionsortfunc(
  array: number[],
  arrayBars: any,
  speed: number,
  arrayData: number[],
  obj:any
) {
  //to start from 0 sec when user presses on sort for the second time
  c = 0;
  let vis:boolean = false;
  for (let i = 0; i < array.length; i++) {
    let idx: number = i;
    value1.push(i);
    setTimeout(() => {
      let idx11: number = value1[0];
      value1.shift();
      arrayBars[idx11].style.backgroundColor = '#e76f51';
    }, c * speed);
    c++;
    let prev: number = -1;
    for (let j = i + 1; j < array.length; j++) {
      value4.push(j);
      setTimeout(() => {
        let idx: number = value4[0];
        value4.shift();
        arrayBars[idx].style.backgroundColor = '#0077b6';
        if (
          arrayBars[idx - 1].style.backgroundColor !== 'rgb(231, 111, 81)' &&
          arrayBars[idx - 1].style.backgroundColor !== 'rgb(233, 196, 106)'
        ) {
          arrayBars[idx - 1].style.backgroundColor = '#48cae4';
        }
        prev = idx;
      }, c * speed);
      c++;
      if (array[j] < array[idx]) {
        value2.push([j, idx]);
        idx = j;
        setTimeout(() => {
          let [idx1, idx2] = value2[0];
          value2.shift();
          arrayBars[idx1].style.backgroundColor = '#e9c46a';
          if (arrayBars[idx2].style.backgroundColor !== 'rgb(231, 111, 81)')
            arrayBars[idx2].style.backgroundColor = '#48cae4';
        }, c * speed);
        c++;
      } else {
      }
    }

    let tmp;
    value3.push([array[i], i, array[idx], idx]);
    tmp = array[i];
    array[i] = array[idx];
    array[idx] = tmp;
    setTimeout(() => {
      let [val1, idx1, val2, idx2] = value3[0];
      arrayBars[array.length - 1].style.backgroundColor = '#48cae4';
      value3.shift();
      arrayBars[idx2].style.backgroundColor = '#48cae4';
      arrayBars[idx2].style.height = `${val1 * 15}px`;
      arrayBars[idx2].innerHTML = `${val1}`;
      arrayBars[idx1].style.backgroundColor = '#8187dc';
      if(i == array.length - 1 && vis == false) {
        vis = true;
        obj.unblockElements();
      }
      arrayBars[idx1].style.height = `${val2 * 15}px`;
      arrayBars[idx1].innerHTML = `${val2}`;
    }, c * speed);
    c++;
  }
  return array;
}

export function returnArray(array: number[]) {
  return array;
}

export function selectionsortfunctest(array: number[]) {
  for (let i = 0; i < array.length; i++) {
    let idx: number = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[idx]) {
        idx = j;
      }
    }

    let tmp;
    tmp = array[i];
    array[i] = array[idx];
    array[idx] = tmp;
  }

  //   for (let val of array) {
  //     console.log(val);
  //   }
  return array;
}
