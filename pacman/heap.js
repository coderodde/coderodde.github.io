var ds = {
    HeapNode: function(element, priority, index) {
        this.element = element;
        this.priority = priority;
        this.index = index;
    },
    
    Heap: function(hashFunction) {
        this.size  = 0;
        this.array = [];
        this.map   = {};
        this.hashFunction = hashFunction;
    }
};

function getParentNodeIndex(index) {
    return (index - 1) >>> 1;
}

ds.Heap.prototype.siftUp = function(index) {
    if (index <= 0) {
        return;
    }

    const targetNode = this.array[index];
    const targetNodePriority = targetNode.priority;
    var parentNodeIndex = getParentNodeIndex(index);
    
    while (true) {
        const parentNode = this.array[parentNodeIndex];
        const parentNodePriority = parentNode.priority;
        
        if (targetNodePriority < parentNodePriority) {
            this.array[index] = parentNode;
            parentNode.index = index;
            index = parentNodeIndex;  
            parentNodeIndex = getParentNodeIndex(index);
        } else {
            break;
        }
        
        if (index === 0) {
            break;
        }
    }
    
    this.array[index] = targetNode;
    targetNode.index = index;
};

function getLeftChildIndex(index) {
    return (index << 1) + 1;
}

function getRightChildIndex(index) {
    return getLeftChildIndex(index) + 1;
}

ds.Heap.prototype.siftDown = function(index) {
    
    var leftChildNodeIndex  = getLeftChildIndex(index);
    var rightChildNodeIndex = getRightChildIndex(index);
    var minChildNodeIndex   = index;
    
    const targetHeapNode = this.array[index];
    var leftChildNode = null;
    
    while (true) {
        if (leftChildNodeIndex < this.size) {
            leftChildNode = this.array[leftChildNodeIndex];
            
            if (leftChildNode.priority < targetHeapNode.priority) {
                minChildNodeIndex = leftChildNodeIndex;
            }
        } else {
            this.array[minChildNodeIndex] = targetHeapNode;
            targetHeapNode.index = minChildNodeIndex;
            return;
        }
        
        if (minChildNodeIndex === index) {
            if (rightChildNodeIndex < this.size) {
                const rightChildNode = this.array[rightChildNodeIndex];
                
                if (rightChildNode.priority < targetHeapNode.priority) {
                    minChildNodeIndex = rightChildNodeIndex;
                }
            }
        } else {
            if (rightChildNodeIndex < this.size) {
                const rightChildNode = this.array[rightChildNodeIndex];
                
                if (rightChildNode.priority < leftChildNode.priority) {
                    minChildNodeIndex = rightChildNodeIndex;
                }
            }
        }
        
        if (minChildNodeIndex === index) {
            this.array[minChildNodeIndex] = targetHeapNode;
            targetHeapNode.index = minChildNodeIndex;
            return;
        }
        
        this.array[index] = this.array[minChildNodeIndex];
        this.array[index].index = index;
        
        index = minChildNodeIndex;
        leftChildNodeIndex  = getLeftChildIndex (index);
        rightChildNodeIndex = getRightChildIndex(index); 
    }
};

ds.Heap.prototype.add = function(element, priority) {
    const mapKey = this.hashFunction(element);
    
    if (this.map[mapKey]) {
        // Already present, exit:
        return;
    }
    
    const node = new ds.HeapNode(element, 
                                 priority, 
                                 this.size);
                                 
    this.array.push(node);
    this.siftUp(this.size++);
    this.map[mapKey] = node;
};

ds.Heap.prototype.extractMinimum = function() {
    if (this.size <= 0) {
        throw "Extracting from an empty heap!";
    }

    var topNode = this.array[0];
    this.array[0] = this.array[--this.size];
    this.siftDown(0);
    this.array[this.size] = null;
    this.array.pop();
    const mapKey = this.hashFunction(topNode.element);
    delete this.map[mapKey];
    return topNode.element;
};

ds.Heap.prototype.decreasePriority = function(element,
                                              priority) {
    const mapKey = this.hashFunction(element);
    const node = this.map[mapKey];
    
    if (!node) {
        // 'element', no such datum in this heap!
        return false;
    }
    
    if (priority >= node.priority) {
        // Cannot lower the priority:
        return false;
    }
    
    node.priority = priority;
    this.siftUp(node.index);

    return true;
};