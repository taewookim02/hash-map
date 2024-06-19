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

  /**Prints the linked list in the following format:
   * ( value ) -> ( value ) -> ( value ) -> null*/
  toString() {
    let string = "";
    let currNode = this.head;
    console.log("currNode:", currNode.key); // hello
    console.log("currNode:", currNode.value); // world
    while (currNode !== null) {
      string += `( ${currNode.key}:${currNode.value} ) -> `;
      currNode = currNode.next;
    }
    string += "null";
    console.log(string);
  }
}
