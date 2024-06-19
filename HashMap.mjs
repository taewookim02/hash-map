import { LinkedList } from "./LinkedList/LinkedList.mjs";
import { Node } from "./LinkedList/Node.mjs";

export class HashMap {
  constructor(size = 16) {
    this.size = size;
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
  }

  get(key) {
    const hashCode = this.#hash(key);
    const bucket = this.buckets[hashCode];

    return bucket.get(key);
  }
}
const map = new HashMap();
map.set("hello", "world");
map.set("hello", "world223");
map.set("zz", "zz2323");

console.log(map.get("zz"));
