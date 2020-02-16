export default class Stack {
    items = [];

    push(obj) {
        this.items.push(obj);
    }
    pop() {
        return this.items.pop();
    }
    isEmpty() {
        return this.items.length === 0;
    }
}