class RBTreeNode {
    constructor(val, id, parent = null, color = 'red', left = null, right = null) {
        this.val = val
        this.left = left
        this.right = right
        this.parent = parent
        this.color = color
        this.id = id
    }
}
class RBTree {
    constructor() {
        this.root = null
        this.n = 0
    }
    search(val) {
        let p = this.root
        while (p) {
            if (val < p.val) {
                p=p.left
            } else if (val > p.val) {
                p=p.right
            } else {
                return true
            }
        }
        return false
    }
    searchMinOfMore(val) {
        let p = this.root
        let num
        while (p) {
            if (p.val > val) {
                num = p.val
                p=p.left
            } else {
                p=p.right
            }
        }
        return num
    }
    searchMaxOfLess(val) {
        let p = this.root
        let num
        while (p) {
            if (p.val < val) {
                num = p.val
                p=p.right
            } else {
                p=p.left
            }
        }
        return num
    }
    searchValOrMinOfMore(val) {
        let p = this.root
        let num
        while (p) {
            if (p.val < val) {
                p=p.right
            } else if (p.val > val) {
                num=p.val
                p=p.left
            } else {
                return p.val
            }
        }
        return num
    }
    searchValOrMaxOfLess(val) {
        let p = this.root
        let num
        while (p) {
            if (p.val > val) {
                p=p.left
            } else if (p.val < val) {
                num=p.val
                p=p.right
            } else {
                return p.val
            }
        }
        return num
    }
    leftRotate(node) {
        const right = node.right
        node.right = right.left
        if (node.right) {
            node.right.parent = node
        }
        right.left = node
        right.parent = node.parent
        if (right.parent == null) {
            this.root = right
        } else {
            if (right.parent.left == node) {
                right.parent.left = right
            } else {
                right.parent.right = right
            }
        }
        node.parent = right
    }
    rightRotate(node) {
        const left = node.left
        node.left = left.right
        if (node.left) {
            node.left.parent = node
        }
        left.right = node
        left.parent = node.parent
        if (left.parent == null) {
            this.root = left
        } else {
            if (left.parent.right == node) {
                left.parent.right = left
            } else {
                left.parent.left = left
            }
        }
        node.parent = left
    }
    insertHandle(node) {
        if (!node.parent && node.color == 'red') {
            node.color = 'black'
            return
        }
        if (node.parent.color == 'black') {
            return
        }
        const parent = node.parent, grandParent = node.parent.parent
        let uncle
        if (grandParent.left == parent) {
            uncle = grandParent.right
        } else {
            uncle = grandParent.left
        }
        if (uncle && uncle.color == 'red') {
            parent.color = 'black'
            uncle.color = 'black'
            grandParent.color = 'red'
            this.insertHandle(grandParent)
        } else {
            let style
            if (grandParent.left == parent) {
                if (parent.left == node) {
                    style = 'LL'
                } else {
                    style = 'LR'
                }
            } else {
                if (parent.left == node) {
                    style = 'RL'
                } else {
                    style = 'RR'
                }
            }
            switch (style) {
                case 'LL': {
                    this.rightRotate(grandParent)
                    grandParent.color = 'red'
                    parent.color = 'black'
                    break
                }
                case 'LR': {
                    this.leftRotate(parent)
                    this.rightRotate(grandParent)
                    grandParent.color = 'red'
                    node.color = 'black'
                    break
                }
                case 'RL': {
                    this.rightRotate(parent)
                    this.leftRotate(grandParent)
                    grandParent.color = 'red'
                    node.color = 'black'
                    break
                }
                case 'RR': {
                    this.leftRotate(grandParent)
                    grandParent.color = 'red'
                    parent.color = 'black'
                    break
                }
            }
        }

    }
    insert(val) {
        this.n++
        if (!this.root) {
            this.root = new RBTreeNode(val,this.n, null, 'black')
            return
        }
        let p = this.root
        while (p) {
            if (val <= p.val) {
                if (p.left) {
                    p = p.left
                } else {
                    p.left = new RBTreeNode(val,this.n, p)
                    p = p.left
                    break
                }
            } else {
                if (p.right) {
                    p = p.right
                } else {
                    p.right = new RBTreeNode(val,this.n, p)
                    p = p.right
                    break
                }
            }
        }
        this.insertHandle(p)
        
    }
    setDoubleBlack(node, isNull) {
        if (node == this.root) {
            return
        }
        if (!isNull && node.color == 'red') {
            node.color = 'black'
            return
        }

        const parent = node.parent
        let brotherLeftOrRight, nodeLeftOrRight
        if (parent.left == node) {
            brotherLeftOrRight = 'right'
            nodeLeftOrRight = 'left'
        } else {
            brotherLeftOrRight = 'left'
            nodeLeftOrRight = 'right'
        }
        const brother = parent[brotherLeftOrRight]
        if (brother.color == 'red') {
            brother.color = 'black'
            parent.color = 'red'
            if (nodeLeftOrRight == 'left') {
                this.leftRotate(parent)
            } else {
                this.rightRotate(parent)
            }
            this.setDoubleBlack(node, isNull)
        } else {
            if (brother.left && brother.left.color == 'red' || brother.right && brother.right.color == 'red') {
                let style
                if (brotherLeftOrRight == 'left') {
                    if (brother.left && brother.left.color == 'red') {
                        style = 'LL'
                    } else {
                        style = 'LR'
                    }
                } else {
                    if (brother.right && brother.right.color == 'red') {
                        style = 'RR'
                    } else {
                        style = 'RL'
                    }
                }
                switch (style) {
                    case 'LL': {
                        brother.left.color = 'black'
                        brother.color = parent.color
                        parent.color = 'black'
                        this.rightRotate(parent)
                        break
                    }
                    case 'LR': {
                        brother.right.color = parent.color
                        parent.color = 'black'
                        this.leftRotate(brother)
                        this.rightRotate(parent)
                        break
                    }
                    case 'RR': {
                        brother.right.color = 'black'
                        brother.color = parent.color
                        parent.color = 'black'
                        this.leftRotate(parent)
                        break
                    }
                    case 'RL': {
                        brother.left.color = parent.color
                        parent.color = 'black'
                        this.rightRotate(brother)
                        this.leftRotate(parent)
                        break
                    }
                }
                if (isNull) {
                    parent[nodeLeftOrRight] = null
                }
            } else {
                brother.color = 'red'
                if (isNull) {
                    parent[nodeLeftOrRight] = null
                }
                this.setDoubleBlack(parent, false)

            }
        }
    }
    delelteHandle(node) {
        if (node.left || node.right) {
            node.val = node.left ? node.left.val : node.right.val
            node.left = null
            node.right = null
            return
        }
        if (this.root == node) {
            this.root = null
            return
        }
        const parent = node.parent
        let leftOrRight
        if (parent.left == node) {
            leftOrRight = 'left'
        } else {
            leftOrRight = 'right'
        }
        if (node.color == 'red') {
            parent[leftOrRight] = null
        } else {
            this.setDoubleBlack(parent[leftOrRight], true)
        }
    }
    delete(val) {
        let p = this.root
        while (p) {
            if (val < p.val) {
                p = p.left
            } else if (val > p.val) {
                p = p.right
            } else {
                let cur = p.left
                if (!cur) {
                    this.delelteHandle(p)
                } else {
                    while (cur.right) {
                        cur = cur.right
                    }
                    p.val = cur.val
                    this.delelteHandle(cur)
                }
                return
            }
        }
    }
}