let input = document.getElementsByTagName("pre")[0]
let modules = input.textContent.split("\n")
modules.pop()
let totalFuel = modules.map(s => {
    let mass = parseInt(s)
    return calcRec(mass, 0)
}).reduce((a,b) => a+b)

console.log(totalFuel)

function calcRec(mass, acc) {
    let fuel = Math.floor(mass / 3) - 2
    if (fuel < 0) return acc
    return calcRec(fuel, acc + fuel)
}

