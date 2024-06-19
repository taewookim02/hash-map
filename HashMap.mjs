export class HashMap {
  constructor(size = 16) {
    this.size = size;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
    }
    return hashCode;
  }
}

const map = new HashMap();

const hashCode = map.hash("hello");
console.log(hashCode);
