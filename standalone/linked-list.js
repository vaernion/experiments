class LinkNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const head = new LinkNode("abc");
head.next = new LinkNode(123);
head.next.next = new LinkNode([4, 5, 6]);
head.next.next.next = new LinkNode("asdfqwf");

const link4 = head.next.next.next;
link4.next = new LinkNode(99);

let node = head;
while (node) {
  console.log(node.data);
  node = node.next;
}

console.log(head);
console.log(link4);
