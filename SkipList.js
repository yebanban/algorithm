class Node {
    constructor(num, right, down) {
        this.num = num
        this.right = right
        this.down = down
    }
}
return class SkipList {
    constructor() {
        this.head = new Node(-1, null, null)
    }
    has(num) {
        let p = this.head
        while (p) {
            while (p.right && p.right.num < num) {
                p = p.right
            }
            if (!p.right || p.right.num > num) {
                p = p.down
            } else {
                return true
            }
        }
        return false
    }
    searchSmaller(num) {
        let p = this.head
        while (p) {
            while (p.right && p.right.num < num) {
                p = p.right
            }
            if (p.down) {
                p = p.down
            } else {
                return p.num
            }
        }
        return -1
    }
    searchBigger(num) {
        let p = this.head
        while (p) {
            while (p.right && p.right.num <= num) {
                p = p.right
            }
            if (p.down) {
                p = p.down
            } else {
                return p.right.num
            }
        }
        return -1
    }
    insert(num) {
        let pathList = []
        let p = this.head
        while (p) {
            while (p.right && p.right.num < num) {
                p = p.right
            }
            pathList.push(p)
            p = p.down
        }
        let insertUp = true
        let downNode = null
        while (insertUp && pathList.length) {
            let insertNode = pathList.pop()
            insertNode.right = new Node(num, insertNode.right, downNode)
            downNode = insertNode.right
            insertUp = Math.floor(Math.random() * 2) == 0
        }
        if (insertUp) {
            this.head = new Node(-1, new Node(num, null, downNode), this.head)
        }
    }
    delete(num) {
        let p = this.head
        while (p) {
            while (p.right && p.right.num < num) {
                p = p.right
            }
            if (!p.right || p.right.num > num) {
                p = p.down
            } else {
                p.right = p.right.right
                p = p.down
            }
        }
    }
    
}