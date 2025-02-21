class ACTrieNode {
    constructor() {
        this.next = {}
        this.fail = null
        this.score = 0
    }
}
export class ACAutomaton {
    constructor(words) {
        this.root = new ACTrieNode()
        for (const word of words) {
            this.insert(word)
        }
        this.buildFail()
    }
    insert(word) {
        let p = this.root
        for (const s of word.str) {
            if (!p.next[s]) {
                p.next[s] = new ACTrieNode()
            }
            p = p.next[s]
        }
        p.score = word.score
    }
    buildFail() {
        let queue = []
        queue.push(this.root)
        let head = 0
        while (head < queue.length) {
            let father = queue[head++]
            for (const key in father.next) {
                if (father == this.root) {
                    father.next[key].fail = this.root
                } else {
                    let p = father.fail
                    while (p && !p.next[key]) {
                        p = p.fail
                    }
                    father.next[key].fail = p ? p.next[key] : this.root
                }
                queue.push(father.next[key])
            }
        }
    }
    buildQuickFail(characterSet) {
        let queue = []
        queue.push(this.root)
        let head = 0
        while (head < queue.length) {
            let cur = queue[head++]
            for (const char of characterSet) {
                if (cur.next[char]) {
                    queue.push(cur.next[char])
                } else {
                    cur.next[char] = cur.fail ? cur.fail.next[char] : this.root
                }
            }
        }
    }
    query(target, todo) {
        const n = target.length
        let cur = this.root
        for (let i = 0; i < n; i++) {
            const s = target[i]
            while (cur.fail && !cur.next[s]) {
                cur = cur.fail
                if (cur.score > 0) {
                    todo(cur.score)
                }
            }
            if (cur.next[s]) {
                cur = cur.next[s]
                if (cur.score > 0) {
                    todo(cur.score)
                }
            }
        }
    }
    quickQuery(target, todo) {
        const n = target.length
        let cur = this.root
        for (let i = 0; i < n; i++) {
            const s = target[i]
            cur = cur.next[s]
            if (cur.score > 0) {
                todo(cur.score)
            }
        }
    }
}