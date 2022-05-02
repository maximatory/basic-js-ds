const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
 class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null; // нет еще первого элемента
    this.length = 0; // вспомогательный параметр длинны 
  }

  getUnderlyingList() {
    return this.head
  }

  enqueue(value) {
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

  dequeue() {
    let result = this.head.value
    let current = this.head;
    this.head = current.next;
    this.length--;
    return result
  }
}

module.exports = {
  Queue
};
