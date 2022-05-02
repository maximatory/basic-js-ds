const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
 function removeKFromList(l, k) {
  let arr = [];

  function getArr(l) {
    if (l.next != null) {
      arr.push(l.value)
      return getArr(l.next)
    } else {
      arr.push(l.value)
      return arr
    }
  }

  let arr2 = getArr(l)
  let copy = []
  for (let i = 0; i < arr2.length; i++) {
    if (arr2[i] !== k) {
      copy.push(arr2[i])
    }
  }


  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }

  class LinkedList {
    constructor() {
      this.head = null; // нет еще первого элемента
      this.length = 0; // вспомогательный параметр длинны 
    }


    // для добавления элемента создадим метод add
    // ================ добавление элемента ===========
    add(value) {
      if (this.length === 0) { // если список пустой
        this.head = new Node(value) // создается узел и head = новому узлу
      } else { // если список не пустой
        let current = this.head // то получаем ссылку на текущий узел, который уже был в списке

        // далее вперед по списку
        while (current.next) { // если впереди есть узел 
          current = current.next // меняем ссылку на след элемент и пробегаемся по списку пока не дойдем до конца = null
        }
        // достигнув конца уже добавляем новый едемент
        current.next = new Node(value)
      }
      // и увеличиваем длинну
      this.length++
    }
  }

  let result = new LinkedList()
  for (let elem of copy) {
    result.add(elem)
  }
  return result.head
}

module.exports = {
  removeKFromList
};
