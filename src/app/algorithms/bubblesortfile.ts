let c: number = 0;
export function bubblesortfunc(
  array: number[],
  arrayBars: any[],
  speed: number, 
  obj:any
) {
  c = 0;
  let visBlock:boolean = false;
  let n = array.length,
    tmp;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      setTimeout(() => {
        if (i != 0) {
          arrayBars[n - i].style.backgroundColor = '#8187dc';
          arrayBars[n - i - 1].style.backgroundColor = '#48cae4';
        }
        if (j != 0) {
          arrayBars[j - 1].style.backgroundColor = '#48cae4';
        }
        arrayBars[j].style.backgroundColor = '#48cae4';
        arrayBars[j].style.backgroundColor = '#e76f51';
        arrayBars[j + 1].style.backgroundColor = '#e76f51';
        if (array[j] > array[j + 1]) {
          tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;
          arrayBars[j].innerHTML = `${array[j]}`;
          arrayBars[j + 1].innerHTML = `${array[j + 1]}`;
          arrayBars[j].style.height = `${array[j] * 15}px`;
          arrayBars[j + 1].style.height = `${array[j + 1] * 15}px`;
        }
      }, c * speed);
      c++;
      let x: number = (n * (n - 1)) / 2;
      if (n > 1) {
        setTimeout(() => {
          arrayBars[1].style.backgroundColor = '#8187dc';
        }, x * speed);
      }
      setTimeout(() => {
        arrayBars[0].style.backgroundColor = '#8187dc';
        if(visBlock == false) {
          visBlock = true;
          obj.unblockElements();
        }
      }, (x + 1) * speed);
    }
  }

  return array;
}

export function bubblesorttest(array: number[]) {
  c = 0;
  let n = array.length,
    tmp;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
    }
  }

  return array;
}
