/**
 * @param {string} json
 * @returns {object} linkedList
 */

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  len = 0;
  constructor() {
    this.tail = new Node("tail", null);
    this.head = new Node("head", this.tail);
  }

  insert(value) {
    const newNode = new Node(value);

    const prevNode = this.head.next;
    this.head.next = newNode;
    newNode.next = prevNode;
    this.len++;
  }
}

const makeLinkedList = (json) => {
  const objectsFromJson = JSON.parse(json);

  const linkedList = new LinkedList();

  for (const object of objectsFromJson) {
    linkedList.insert(object);
  }

  return linkedList;
};
