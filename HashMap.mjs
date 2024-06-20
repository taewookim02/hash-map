import { LinkedList } from "./LinkedList/LinkedList.mjs";

export class HashMap {
  LOAD_FACTOR = 0.75;

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
    if (this.mapLength / this.size >= this.LOAD_FACTOR) {
      this.#resize();
    }

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

  #resize() {
    const newSize = Math.round(this.size * 2);
    const newBuckets = Array.from({ length: newSize }, () => new LinkedList());

    this.buckets.forEach((bucket) => {
      let current = bucket.head;
      while (current) {
        const hashCode = this.#hashWithSize(current.key, newSize);
        newBuckets[hashCode].append(current.key, current.value);
        current = current.next;
      }
    });

    this.size = newSize;
    this.buckets = newBuckets;
  }

  #hashWithSize(key, size) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
    }

    return hashCode;
  }
}

const map = new HashMap();
map.set("hello", "world");
map.set("hello", "world223");
map.set("hello", "world223");
map.set("hel123lo", "worasdfld223");
map.set("hasdello", "world2adsf23");
map.set("hqweello", "world223");
map.set("heasdfllo", "worldadsf223");
map.set("hegdaslasdlo", "worasdfld223");
map.set("hello", "worldxczv223");
map.set("hevczxr321llo", "wo123rld223");
map.set("hello", "worldasdf223");
map.set("heldsalo", "worldsd223");
map.set("helasdflo", "worlxczvd223");
map.set("zz", "zz2323");
map.remove("hello");
console.log(map.length());
console.log(map.get("hello"));
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
// console.log(map.buckets[2]);

console.log(map);
