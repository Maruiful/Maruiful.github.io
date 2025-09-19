---
title: 手撕LRU
order: 1
category:
  - 算法与手撕
tag:
  - 淘汰策略
  - 算法
  - 手撕
---

# 手撕LRU

## 什么是LRU

LRU 全称是 **Least Recently Used（最近最少使用）**，是一种经典的缓存淘汰策略和页面置换算法，核心逻辑是 “优先淘汰最久未被访问的数据”，因为它默认 “最近被访问过的数据，未来被访问的概率更高”。在操作系统的页面置换、redis的淘汰策略中均使用到了LRU。

## LRU的实现

比较经典的为双向链表+哈希表实现。

双向链表中的每一个节点存储着一个键值对，同时每个节点都有前向指针和后向指针，同时在双向链表的前后分别有一个头节点和尾节点，在双向链表变更期间，这两个位置是雷打不动的。

而哈希表中的key就是双向链表节点中的key，value则表示的节点。

下面是双向链表示意图

![双向链表示意图](https://typoraimagehosting.oss-cn-hangzhou.aliyuncs.com/img/image-20250919110529928.png)

下面是哈希表示意图

![哈希表示意图](https://typoraimagehosting.oss-cn-hangzhou.aliyuncs.com/img/image-20250919111652998.png)

下面是具体的实现

创建双向链表数据结构

```java
class DLinkedNode{
    int key;
    int value;
    DLinkedNode prev,next;

    public DLinkedNode() {
    }

    public DLinkedNode(int key, int value) {
        this.key = key;
        this.value = value;
    }
}
```

创建必要的变量以及初始化LRU

```java
class LRUCache{
	int size;
	int capacity;
	Map<Integer,DLinkedNode>cache=new HashMap<>();
	DLinkedNode head,tail;
	public LRUCache(int capacity){
		this.size=0;
		this.capacity=capacity;
		head.prev=null;
		head.next=tail;
		tail.next=null;
		tail.prev=head;
		
	}
}
```

从缓存当中获取数据

```java
public int get(int key){
	DLinkedNode node=cache.get(key);
    if(node==null){
		return -1;//此处规定没查到就返回-1就行了
    }
    moveToHead(node);//把当前节点放在链表最前面
    return node.value;
}
```



往缓存中放入数据，这一步就需要注意了，我们创建的数据结构是给了capacity，对于capacity，我们会想到去扩容或者去淘汰，那么对于LRU来说就是淘汰，也就是移除tail之前的那一个节点（head和tail相当于是边界，是不动的，元素的增删在他们之间进行）。这里的逻辑是LRU最复杂的，首先需要判断放入的元素是否已经存在，如果存在就修改key对应的value，然后把它从链表中间移到最前面，这就体现了LRU的特性，长此以往，未被修改的元素会越来越靠后，知道capacity被占满然后移出去；如果不存在就很简单，新创建节点并放在链表头。

![修改元素过程](https://typoraimagehosting.oss-cn-hangzhou.aliyuncs.com/img/image-20250919132356360.png)

```java
public void put(int key,int value){
    DLinkedNode node=cache.get(key);
    if(node==null){
        DLinkedNode newNode=new DLinkedNode(key,value);
        cache.put(key,newNode);
        addToHead(newNode);
        size++;
        if(size>capacity){
            DLinkedNode tail = removeTail();
            // 删除哈希表中对应的项
            cache.remove(tail.key);
            --size;
        }
    }else{
        node.value=value;
        moveToHead(node);
    }
}
//这里的两个方法，moveToHead和addToHead，分别用于将节点移到队头、在队头添加元素的情况。
public void moveToHead(DlinkedNode node){
    removeNode(node);
    addToHead(node);
}

public void addToHead(DLinkedNode newNode){
    newNode.prev=head;
    newNode.next=head.next;
    head.next.prev=newNode;
    head.next=newNode;
}

//removeNode用于删除元素
public void remoceNode(DLinkedNode node){
	node.next.prev=node.prev;
    node.prev.next=node.next;
}

//当size>capacity,要从尾部删除节点
public DLinkedNode removeTail(){
	DLinkedNode res=tail.prev;
    removeNode(res);
    return res;
}
```

完整代码

```java
class LRUCache {
    class DLinkedNode {
        int key;
        int value;
        DLinkedNode prev;
        DLinkedNode next;

        public DLinkedNode() {
        }

        public DLinkedNode(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private Map<Integer, DLinkedNode> cache = new HashMap<>();
    private int size;
    private int capacity;
    private DLinkedNode head, tail;

    public LRUCache(int capacity) {
        this.size = 0;
        this.capacity = capacity;
        head = new DLinkedNode();
        tail = new DLinkedNode();
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        DLinkedNode node = cache.get(key);
        if (node == null) {
            return -1;
        }
        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        DLinkedNode node = cache.get(key);
        if (node == null) {
            DLinkedNode newNode = new DLinkedNode(key, value);
            cache.put(key, newNode);
            addToHead(newNode);
            size++;
            if (size > capacity) {
                DLinkedNode tail = removeTail();
                // 删除哈希表中对应的项
                cache.remove(tail.key);
                --size;
            }
        } else {
            node.value = value;
            moveToHead(node);
        }
    }

    private void addToHead(DLinkedNode node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(DLinkedNode node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(DLinkedNode node) {
        removeNode(node);
        addToHead(node);

    }

    private DLinkedNode removeTail() {
        DLinkedNode res = tail.prev;
        removeNode(res);
        return res;
    }
}
```
