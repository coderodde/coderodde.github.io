function DynamicCircularQueue(initialCapacity = 128) {
  let capacity = initialCapacity;
  let items = new Array(capacity);
  let head = 0;
  let tail = 0;
  let size = 0;

  function _resize() {
    const newCapacity = capacity * 2;
    const newItems = new Array(newCapacity);
    // Copy elements from old buffer to new buffer in order
    for (let i = 0; i < size; i++) {
      newItems[i] = items[(head + i) % capacity];
    }
    items = newItems;
    capacity = newCapacity;
    head = 0;
    tail = size;
  }

  return {
    enqueue(item) {
      if (size === capacity) {
        _resize();
      }
      items[tail] = item;
      tail = (tail + 1) % capacity;
      size++;
    },

    dequeue() {
      if (size === 0) {
        return undefined;
      }
      
      const item = items[head];
      head = (head + 1) % capacity;
      size--;
      return item;
    },

    peek() {
      return size === 0 ? undefined : items[head];
    },

    isEmpty() {
      return size === 0;
    },

    getSize() {
      return size;
    },

    getCapacity() {
      return capacity;
    }
  };
}
