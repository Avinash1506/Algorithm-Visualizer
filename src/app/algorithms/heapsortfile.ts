export function heapsortfunctest(array: number[]) {
  heapsorttest(array);
  return array;
}

let c: number = 0;
let cnt:number = 0;
let vis:boolean = false;
let value1: [number, number, number, number][] = [];
let value2: [number, number, number, number, number, number, number][] = [];
let value21: [number, number, number, number, number, number, number][] = [];
let value3: [number, number, number, number, number, number, number][] = [];
let value31: [number, number, number, number, number, number, number][] = [];
let value4: [number, number, number, number, number, number][] = [];
let value5: [number, number, number, number][] = [];
// let prev: number[] = [];
let deColoring: [number, number][] = [];
function heapsorttest(array: number[]) {
  let lenOfArray: number = array.length;
  buildHeapTest(array, lenOfArray);

  for (let i = lenOfArray - 1; i > 0; i--) {
    swapTest(array, i, 0);
    heapifyTest(array, i, 0);
  }
}
function buildHeapTest(array: number[], lenOfArray: number) {
  for (let i = Math.floor(lenOfArray / 2) - 1; i >= 0; i--) {
    heapifyTest(array, lenOfArray, i);
  }
}

function heapifyTest(array: number[], lenOfArray: number, root: number) {
  let leftChild: number = 2 * root + 1;
  let rightChild: number = 2 * root + 2;
  let largest: number = root;
  if (leftChild < lenOfArray && array[leftChild] > array[largest]) {
    largest = leftChild;
  }

  if (rightChild < lenOfArray && array[rightChild] > array[largest]) {
    largest = rightChild;
  }

  if (largest !== root) {
    swap(array, largest, root);
    heapifyTest(array, lenOfArray, largest);
  }
}

function swapTest(array: number[], idx1: number, idx2: number) {
  let tmp;
  tmp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = tmp;
}

export function heapsortfunc(array: number[], arrayBars: any, speed: number, obj:any) {
  c = 0;
  cnt = 0;
  vis = false;
  heapsort(array, arrayBars, speed, obj);
  return array;
}

function heapsort(array: number[], arrayBars: any, speed: number, obj:any) {
  let lenOfArray: number = array.length;
  buildHeap(array, lenOfArray, arrayBars, speed);

  for (let i = lenOfArray - 1; i >= 0; i--) {
    value5.push([i, 0, array[i], array[0]]);
    setTimeout(() => {
      let [idx1, idx2, num1, num2] = value5[0];
      value5.shift();
      arrayBars[idx1].style.height = `${num2 * 15}px`;
      arrayBars[idx1].innerHTML = `${num2}`;
      arrayBars[idx1].style.backgroundColor = '#8187dc';
      cnt++;
      if(cnt == array.length - 1 && vis == false) {
        vis = true;
        obj.unblockElements();
      }
      //to make the color of first bar remain #8187dc
      if (idx1 !== idx2) {
        arrayBars[idx2].style.height = `${num1 * 15}px`;
        arrayBars[idx2].innerHTML = `${num1}`;
        arrayBars[idx2].style.backgroundColor = '#48cae4';
      }
    }, c * speed);
    c++;
    swap(array, i, 0);
    // prev.push(-1);
    heapify(array, i, 0, arrayBars, speed);
  }
}
function buildHeap(
  array: number[],
  lenOfArray: number,
  arrayBars: any,
  speed: number
) {
  for (let i = Math.floor(lenOfArray / 2) - 1; i >= 0; i--) {
    // setTimeout(()=>{

    // })
    // prev.push(-1);
    heapify(array, lenOfArray, i, arrayBars, speed);
  }
}

function heapify(
  array: number[],
  lenOfArray: number,
  root: number,
  arrayBars: any,
  speed: number
) {
  let leftChild: number = 2 * root + 1;
  let rightChild: number = 2 * root + 2;
  let largest: number = root;
  if (leftChild < lenOfArray) {
    value1.push([leftChild, rightChild, root, lenOfArray]);
    setTimeout(() => {
      // let prev_root = prev[0];
      // prev.shift();
      // console.log(prev_root);
      // if (prev_root !== -1) {
      //   let prev_left = 2 * prev_root + 1;
      //   let prev_right = 2 * prev_root + 2;
      //   arrayBars[prev_root].style.backgroundColor = '#48cae4';
      //   if (prev_left < lenOfArray)
      //     arrayBars[prev_left].style.backgroundColor = '#48cae4';
      //   if (prev_right < lenOfArray)
      //     arrayBars[prev_right].style.backgroundColor = '#48cae4';
      // }
      let [leftChild, rightChild, root, lenOfArray] = value1[0];
      value1.shift();
      arrayBars[root].style.backgroundColor = '#e76f51';
      console.log('Hello');
      if (leftChild < lenOfArray)
        arrayBars[leftChild].style.backgroundColor = '#0077b6';
      if (rightChild < lenOfArray)
        arrayBars[rightChild].style.backgroundColor = '#0077b6';
    }, c * speed);
    c++;

    value2.push([
      leftChild,
      rightChild,
      root,
      largest,
      lenOfArray,
      array[leftChild],
      array[largest],
    ]);
    value21.push([
      leftChild,
      rightChild,
      root,
      largest,
      lenOfArray,
      array[leftChild],
      array[largest],
    ]);
    if (leftChild < lenOfArray && array[leftChild] > array[largest]) {
      largest = leftChild;
    }
    value3.push([
      leftChild,
      rightChild,
      root,
      largest,
      lenOfArray,
      array[rightChild],
      array[largest],
    ]);
    value31.push([
      leftChild,
      rightChild,
      root,
      largest,
      lenOfArray,
      array[rightChild],
      array[largest],
    ]);
    if (rightChild < lenOfArray && array[rightChild] > array[largest]) {
      largest = rightChild;
    }
    setTimeout(() => {
      let [
        leftChild,
        rightChild,
        root,
        largest,
        lenOfArray,
        arrayOfLeftChild,
        arrayOfLargest,
      ] = value21[0];
      value21.shift();

      arrayBars[root].style.backgroundColor = '#e9c46a';
      if (leftChild < lenOfArray)
        arrayBars[leftChild].style.backgroundColor = '#e9c46a';
    }, c * speed);
    c++;
    setTimeout(() => {
      let [
        leftChild,
        rightChild,
        root,
        largest,
        lenOfArray,
        arrayOfLeftChild,
        arrayOfLargest,
      ] = value2[0];
      value2.shift();
      if (leftChild < lenOfArray && arrayOfLeftChild > arrayOfLargest) {
        arrayBars[largest].style.backgroundColor = '#0077b6';
        arrayBars[leftChild].style.backgroundColor = '#e76f51';
        console.log('Hello');
        if (rightChild < lenOfArray)
          arrayBars[rightChild].style.backgroundColor = '#0077b6';
      } else {
        arrayBars[largest].style.backgroundColor = '#e76f51';
        if (leftChild < lenOfArray)
          arrayBars[leftChild].style.backgroundColor = '#0077b6';
      }
    }, c * speed);
    c++;

    setTimeout(() => {
      let [
        leftChild,
        rightChild,
        root,
        largest,
        lenOfArray,
        arrayOfLeftChild,
        arrayOfLargest,
      ] = value31[0];
      value31.shift();

      arrayBars[largest].style.backgroundColor = '#e9c46a';
      if (rightChild < lenOfArray)
        arrayBars[rightChild].style.backgroundColor = '#e9c46a';
    }, c * speed);
    c++;

    setTimeout(() => {
      let [
        leftChild,
        rightChild,
        root,
        largest,
        lenOfArray,
        arrayOfRightChild,
        arrayOfLargest,
      ] = value3[0];
      value3.shift();
      if (rightChild < lenOfArray && arrayOfRightChild > arrayOfLargest) {
        arrayBars[largest].style.backgroundColor = '#0077b6';
        if (leftChild < lenOfArray)
          arrayBars[leftChild].style.backgroundColor = '#0077b6';
        arrayBars[rightChild].style.backgroundColor = '#e76f51';
        console.log('Hello');
      } else {
        arrayBars[largest].style.backgroundColor = '#e76f51';
        if (rightChild < lenOfArray)
          arrayBars[rightChild].style.backgroundColor = '#0077b6';
      }
    }, c * speed);
    c++;

    // prev.push(root);
    if (largest !== root) {
      value4.push([
        largest,
        root,
        leftChild,
        rightChild,
        array[largest],
        array[root],
      ]);
      setTimeout(() => {
        let [largest, root, leftChild, rightChild, largest_val, root_val] =
          value4[0];
        value4.shift();
        arrayBars[largest].innerHTML = `${root_val}`;
        arrayBars[largest].style.height = `${root_val * 15}px`;
        arrayBars[root].innerHTML = `${largest_val}`;
        arrayBars[root].style.height = `${largest_val * 15}px`;
        arrayBars[root].style.backgroundColor = '#e76f51';
        console.log('Hello');
        arrayBars[largest].style.backgroundColor = '#0077b6';
        console.log(largest);
      }, c * speed);
      c++;
      swap(array, largest, root);

      deColoring.push([root, lenOfArray]);
      setTimeout(() => {
        let [root, lenOfArray] = deColoring[0];
        deColoring.shift();
        arrayBars[root].style.backgroundColor = '#48cae4';
        let leftChild = 2 * root + 1;
        if (leftChild < lenOfArray)
          arrayBars[leftChild].style.backgroundColor = '#48cae4';
        let rightChild = 2 * root + 2;
        if (rightChild < lenOfArray)
          arrayBars[rightChild].style.backgroundColor = '#48cae4';
      }, c * speed);
      c++;
      heapify(array, lenOfArray, largest, arrayBars, speed);
    } else {
      deColoring.push([root, lenOfArray]);
      setTimeout(() => {
        let [root, lenOfArray] = deColoring[0];
        deColoring.shift();
        arrayBars[root].style.backgroundColor = '#48cae4';
        let leftChild = 2 * root + 1;
        if (leftChild < lenOfArray)
          arrayBars[leftChild].style.backgroundColor = '#48cae4';
        let rightChild = 2 * root + 2;
        if (rightChild < lenOfArray)
          arrayBars[rightChild].style.backgroundColor = '#48cae4';
      }, c * speed);
      c++;
    }
  }
}

function swap(array: number[], idx1: number, idx2: number) {
  let tmp;
  tmp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = tmp;
}
