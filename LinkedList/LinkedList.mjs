import { Node } from "./Node.mjs";
export class LinkedList {
  constructor() {
    this.tail = null;
    this.head = null;
    this.size = 0;
  }

  append(key, value) {
    const newNode = new Node(key, value);
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
    this.size++;
  }

  prepend(key, value) {
    const newNode = new Node(key, value);
    if (!this.head) {
      return this.append(key, value);
    }

    newNode.nextNode = this.head;
    this.head = newNode;
    this.size++;
  }

  get(key) {
    let curr = this.head;
    while (curr !== null) {
      if (curr.key === key) {
        return curr.value;
      }
      curr = curr.next;
    }

    return null;
  }

  has(key) {
    let curr = this.head;
    while (curr !== null) {
      if (curr.key === key) {
        return true;
      }
    }
    return false;
  }

  toString() {
    let string = "";
    let currNode = this.head;
    while (currNode !== null) {
      string += `( ${currNode.key}:${currNode.value} ) -> `;
      currNode = currNode.next;
    }
    string += "null";
    console.log(string);
  }
}
