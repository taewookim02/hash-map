import { LinkedList } from "./LinkedList/LinkedList.mjs";

export class HashSet {
  LOAD_FACTOR = 0.75;

  constructor(size = 16) {
    this.size = size;
    this.setLength = 0;
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

  set(key) {
    if (this.setLength / this.size >= this.LOAD_FACTOR) {
      this.#resize();
    }
    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode];

    bucket.append(key, null);
    this.setLength++;
  }

  get(key) {
    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode];

    // returns the key
    return bucket.head?.key ? bucket.head.key : null;
  }

  has(key) {
    // returns true if key in set
    if (this.get(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    if (!this.get(key)) {
      return false;
    }

    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode];

    bucket.remove(key);
    this.setLength--;
    return true;
  }

  #resize() {
    const newSize = Math.round(this.size * 2);
    const newBuckets = Array.from({ length: newSize }, () => new LinkedList());

    this.buckets.forEach((bucket) => {
      let current = bucket.head;
      while (current) {
        const hashCode = this.#hashWithSize(current.key, newSize);
        newBuckets[hashCode].append(current.key, null);
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

  length() {
    const hashCode = this.#hash(key);
  }

  clear() {
    this.buckets = Array.from({ length: this.size }, () => new LinkedList());
    this.setLength = 0;
  }

  keys() {
    // returns an array containing all the keys inside the hash set
    const arr = [];
    this.buckets.forEach((bucket) => {
      if (bucket.head !== null) {
        arr.push(bucket.head.key);
      }
    });
    return arr;
  }
}

const set = new HashSet();
set.set("hello");
set.set("hello2");
set.set("hello2");
set.set("12");
set.set("as");
set.set("fdf");
set.set("sd");
set.set("hegllo2");
set.set("hello2");
set.set("as");
set.set("aszx");
set.set("qwe");
set.set("helzxcvlo");
set.get("zxcv");
set.remove("bb");

console.log(set);
