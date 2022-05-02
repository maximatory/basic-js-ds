const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null; // потомок слева
    this.right = null; // потомок справа
  }
}

class BinarySearchTree {
  constructor() {
    this.roots = null // корень
  }

  root() {
    return this.roots
  }

  add(data) {
    this.roots = addWithin(this.roots, data); // положи в корень то, что вернет функция


    function addWithin(node, data) {
      // 1 проверка - если узла нет добавляем узел
      if (!node) {
        return new Node(data)
      }
      // 2 проверка - если видим что такое значение уже есть, то ничего не делаем
      if (node.data === data) {
        return node
      }
      // 3 проверка - если значение меньше, чем текущем узле, то идем влево, если больше - то вправо
      if (data < node.data) {
        node.left = addWithin(node.left, data)
      } else {
        node.right = addWithin(node.right, data)
      }
      // и далее возвращаем текущий узео
      return node;
    }
  }

  has(data) {
    // начинаем поиск с главного дерева
    return searchWithin(this.roots, data)

    // если узла не оказалось 
    function searchWithin(node, data) {
      if (!node) {
        return false
      }
      // если нашли значение - вернет тру
      if (node.data === data) {
        return true
      }
      // если узел есть, но значение не совпадает с искомым, то проверим если значение меньще искомого, то ищем в левом узле, а если больше то в правом
      return data < node.data ?
        searchWithin(node.left, data) :
        searchWithin(node.right, data)
    }
  }

  find(data) {
    // начинаем поиск с главного дерева
    return searchNode(this.roots, data)

    // если узла не оказалось 
    function searchNode(node, data) {
      if (!node) {
        return null
      }
      // если нашли значение - вернем node
      if (node.data === data) {
        return node
      }
      // если узел есть, но значение не совпадает с искомым, то проверим если значение меньще искомого, то ищем в левом узле, а если больше то в правом
      return data < node.data ?
        searchNode(node.left, data) :
        searchNode(node.right, data)
    }
  }

  remove(data) {
    // кладем в рут что вернет функция
    // т.е. удали узел в таком то поддереве с таким то значением
    this.roots = removeNode(this.roots, data);

    function removeNode(node, data) {
      // если нет узла то null и оставляем - точка остановки рекурсии
      if (!node) {
        return null;
      }

      // определяем в какую сторону пойти
      // если искомое значение меньше значения в узле то идем влево
      // вытаскиваем поддерево на уровень выше путем удаления верхнего узла
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
        // если значание больше, то те же шаги, только вправо 
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
        // если значение равно тому, что в узле
      } else {
        // 1 проверка - если узел является листом
        if (!node.left && !node.right) {
          // вместо узла возвращаем null
          return null;
        }
        // 2 проверка - проверяем отсутствие левого потомка
        if (!node.left) {
          // если левого потомка нет, то вмещаем в node правое поддерево и получается возвращаем эту ветвь наверх
          node = node.right;
          return node;
        }
        // 3 проверка - - проверяем отсутствие правого потомка
        if (!node.right) {
          // если правого потомка нет, то вмещаем в node левое поддерево и получается возвращаем эту ветвь наверх
          node = node.left;
          return node;
        }

        // если есть оба поддерева, то ищем минимум в правом поддереве (есть еще способ искать максимальное значение в левом поддереве, тут либо одно либо второе)

        // начинаем с корня правого поддерева
        let minFromRight = node.right;
        // идем влево до конца и ищем самый маленький элемент
        while (minFromRight.left) {
          // процесс перемещения к мин элементу
          minFromRight = minFromRight.left;
        }
        // когда нашли минимальный, то его значение перемещаем в значение удаляемого узла т.е. скопировать
        node.data = minFromRight.data;
        // теперь удаляем узел минимального значения из правого поддерева
        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    // проверяем есть ли вообще элементы
    if (!this.roots) {
      return;
    }

    // заведем переменную, которая будет ходить и искать мин элемент
    let node = this.roots;
    // начинаем поиск с корня
    // есть ли кто левее
    while (node.left) {
      // если есть то перемещаемся к нему
      node = node.left;
    }
    // как дойдем до конца и найдем элемент - возвращаем
    return node.data;
  }

  max() {
    // проверяем есть ли вообще элементы
    if (!this.roots) {
      return;
    }

    // заведем переменную, которая будет ходить и искать макс элемент
    let node = this.roots;
    // начинаем поиск с корня
    // есть ли кто правее
    while (node.right) {
      // если есть то перемещаемся к нему
      node = node.right;
    }
    // как дойдем до конца и найдем элемент - возвращаем
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};