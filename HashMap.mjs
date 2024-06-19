import { LinkedList } from "./LinkedList/LinkedList.mjs";
import { Node } from "./LinkedList/Node.mjs";

export class HashMap {
  constructor(size = 16) {
    this.size = size;
    this.mapLength = 0;
    this.buckets = Array.from({ length: this.size }, () => new LinkedList());
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
    }
    return hashCode;
  }

  set(key, value) {
    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode];

    bucket.prepend(key, value);
    this.mapLength++;
  }

  get(key) {
    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode];

    return bucket.get(key);
  }

  has(key) {
    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode];

    return bucket.has(key);
  }

  remove(key) {
    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode];

    this.mapLength--;
    return bucket.remove(key);
  }

  length() {
    return this.mapLength;
  }

  clear() {
    this.buckets = Array.from({ length: this.size }, () => new LinkedList());
    this.mapLength = 0;
  }

  keys() {
    // return an array containing all the keys inside the hash map
    const arr = [];
    this.buckets.forEach((bucket) => {
      const node = bucket.head;
      if (node !== null) {
        arr.push(node.key);
      }
    });
    return arr;
  }

  values() {
    // returns an array containing all the values
    const arr = [];
    this.buckets.forEach((bucket) => {
      const node = bucket.head;
      if (node !== null) {
        arr.push(node.value);
      }
    });

    return arr;
  }

  entries() {
    // returns an array that contains each key, value pair
    const arr = [];
    this.buckets.forEach((bucket) => {
      const node = bucket.head;
      if (node !== null) {
        const entry = [];
        entry.push(node.key);
        entry.push(node.value);
        arr.push(entry);
      }
    });

    return arr;
  }
}

const map = new HashMap();
map.set("hello", "world");
map.set("hello", "world223");
map.set("zz", "zz2323");
map.remove("hello");
console.log(map.length());
console.log(map.get("hello"));
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
// console.log(map.buckets[2]);
