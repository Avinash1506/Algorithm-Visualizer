let c: number = 0;
export function insertionsortfunc(
  array: number[],
  arrayBars: any,
  speed: number, 
  obj:any
) {
  let vis:boolean = false;
  let value1: [number, number, number][] = [];
  let value2: number[] = [];
  let value3: [number, number, number][] = [];
  let value4:number[] = [];
  c = 0;
  for (let i = 0; i < array.length; i++) {
    let key: number = 0,
      j: number = 0;
    setTimeout(() => {
      arrayBars[i].style.backgroundColor = '#e76f51';
    }, c * speed);
    key = array[i];
    j = i - 1;
    c++;
    while (j >= 0 && array[j] > key) {
      value1.push([j, array[j], i]);
      array[j + 1] = array[j];
      setTimeout(() => {
        let [k, val, i] = value1[0];
        value1.shift();
        if(i == array.length - 1) {
          arrayBars[k + 1].style.backgroundColor = '#8187dc';
        }
        else {
          arrayBars[k + 1].style.backgroundColor = '#0077b6';
        }
        arrayBars[k + 1].style.height = `${val * 15}px`;
        arrayBars[k + 1].innerHTML = `${val}`;
      }, c * speed);
      j--;
      c++;
    }

    value3.push([j, key, i]);
    array[j + 1] = key;
    setTimeout(() => {
      let [k1, k2, i] = value3[0];
      value3.shift();
      if(i == array.length - 1) {
        arrayBars[k1 + 1].style.backgroundColor = '#8187dc';
      }
      else {
        arrayBars[k1 + 1].style.backgroundColor = '#0077b6';
      }
      arrayBars[k1 + 1].style.height = `${k2 * 15}px`;
      arrayBars[k1 + 1].innerHTML = `${k2}`;
    }, c * speed);
    c++;

    if(i == array.length - 1) {
      while(j >= 0) {
        value4.push(j);
        setTimeout(()=>{
          let idx:number = value4[0];
          value4.shift();
          arrayBars[idx].style.backgroundColor = '#8187dc';
          if(idx == 0 && vis == false) {
            vis = true;
            obj.unblockElements();
          }
        }, c*speed);
        c++;
        j--;
      }
    }
  }

  return array;
}

export function insertionsortfunctest(array: number[]) {
  for (let i = 0; i < array.length; i++) {
    let key: number = array[i];
    let j: number = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }

    array[j + 1] = key;
  }

  return array;
}
