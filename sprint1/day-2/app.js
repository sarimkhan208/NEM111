
// CJS IMPORT AND EXPORT

const [add,subs,mul] = require('./index')

add(1,1)
subs(2,2)
mul(6,6)


const os = require("os")

// check CPU
console.log(os.cpus())


// check laptop version
console.log(os.version())


// check free space in laptop
console.log(os.freemem())

// check userInfo of laptop
console.log(os.userInfo())
