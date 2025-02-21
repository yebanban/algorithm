/*
 * @Description: 
 * @Author: yebanban
 * @Date: 2025-02-19 17:54:21
 * @LastEditTime: 2025-02-21 23:05:46
 * @LastEditors: yebanban
 */
return class SegmentTree {
    constructor(arr, func) {
        this.arr = arr
        this.func = func
        this.tree = new Array(4 * arr.length)
        this.build(1, 0, arr.length - 1)
    }
    build(node, left, right) {
        this.tree[node] = { val: 0, lazy: 0 }
        if (left === right) {
            this.tree[node].val = this.arr[left]
            return
        }
        const mid = (left + right) >> 1
        this.build(2 * node, left, mid)
        this.build(2 * node + 1, mid + 1, right)
        this.tree[node].val = this.func(this.tree[2 * node].val, this.tree[2 * node + 1].val)
    }
    query(l, r) {
        return this.queryHandle(1, l, r, 0, this.arr.length - 1)
    }
    add(l, r, k) {
        return this.addHandle(1, l, r, k, 0, this.arr.length - 1)
    }
    queryHandle(node, left, right, l, r) {
        if (left <= l && right >= r) {
            return this.tree[node].val
        }
        if (this.tree[node].lazy !== 0) {
            this.pushDown(node, l, r)
        }
        const mid = (l + r) >> 1
        if (right <= mid) {
            return this.queryHandle(2 * node, left, right, l, mid)
        } else if (left > mid) {
            return this.queryHandle(2 * node + 1, left, right, mid + 1, r)
        }
        return this.func(this.queryHandle(2 * node, left, right, l, mid), this.queryHandle(2 * node + 1, left, right, mid + 1, r))
    }
    addHandle(node, left, right, k, l, r) {
        if (left <= l && right >= r) {
            this.tree[node].val += (r - l + 1) * k
            this.tree[node].lazy += k
            return
        }
        const mid = (l + r) >> 1
        if (right <= mid) {
            this.addHandle(2 * node, left, right, k, l, mid)
        } else if (left > mid) {
            this.addHandle(2 * node + 1, left, right, k, mid + 1, r)
        } else {
            this.addHandle(2 * node, left, right, k, l, mid)
            this.addHandle(2 * node + 1, left, right, k, mid + 1, r)
        }
        this.tree[node].val = this.func(this.tree[2 * node].val, this.tree[2 * node + 1].val)
    }
    pushDown(node, left, right) {
        this.tree[2 * node].lazy = this.tree[node].lazy
        this.tree[2 * node + 1].lazy = this.tree[node].lazy
        this.tree[node].lazy = 0
        const mid = (left + right) >> 1
        this.tree[2 * node].val += (mid - left + 1) * this.tree[2 * node].lazy
        this.tree[2 * node + 1].val += (right - mid) * this.tree[2 * node + 1].lazy
    }
} 