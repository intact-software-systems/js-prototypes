const fs = require('fs')
const Future = require('fluture')

const getPackageName = function (file) {
    return Future
        .node(done => fs.readFile(file, 'utf8', done))
        .pipe(Future.chain(Future.encase(JSON.parse)))
        .pipe(Future.map(x => x.name))
}

getPackageName('../package.json')
    .pipe(Future.fork(console.error)(console.log))
