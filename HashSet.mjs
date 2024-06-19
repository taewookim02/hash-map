import { LinkedList } from "./LinkedList/LinkedList.mjs";

export class HashSet {
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
    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode];

    bucket.append(key, null);
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
    this.setLength++;
    return true;
  }

  length() {
    const hashCode = this.#hash(key);
  }
}

const set = new HashSet();
set.set("hello");
set.set("hello2");
set.set("hello2");
set.set("hello");
set.get("hello2");
console.log(set.has("af"));
console.log(set.remove("hello"));
console.log(set.remove("hello"));
console.log(set);
