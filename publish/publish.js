const fs = require("fs")
const packageJSON = "./package.json"
const forDevMain = "src/index.ts"
const forPublishMain = "build/main/index.js"
const forDevType = "src/index.ts"
const forPublishType = "build/main/index.d.ts"


function checkout(to) {
    let content = JSON.parse(fs.readFileSync(packageJSON).toString())
    if (to === "publish") {
        content.main = forPublishMain
        const currentVersion = +content.version.split("-")[0].split(".")[2]
        content.version = `0.1.${currentVersion + 1}`
        content.typings = forPublishType
    } else if (to === "dev") {
        content.main = forDevMain
        content.typings = forDevType
    }
    fs.writeFileSync(packageJSON, JSON.stringify(content, null, 4) + "\n")
}

module.exports = checkout
