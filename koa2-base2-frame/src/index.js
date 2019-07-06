class Index {
    constructor(str) {
        this.str = str
    }
    say() {
        console.log(this.str)
    }
}
const index = new Index('hello 111')
index.say()
export default Index;