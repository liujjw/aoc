let input = document.getElementsByTagName("pre")[0].textContent
let instructions = input.split(',').map(Number)
// take every fourth element k
// take k+1 and k+2 and perform the operation on them
// get k+3 and then use that to index into position k+3

// target is 19690720 at [0]
// change address 1 and 2 and run to check
// brute force on 10000 possibilities
function find(instr) {
    let i = 0;
    let cp = instr.slice(0)
    while(i <= 99) {
        cp[1] = i
        let j = 0;
        while (j <= 99) {
            cp[2] = j
            run(cp)
            if (cp[0] === 19690720) {
                return {one: i, two: j}
            }
            cp = instr.slice(0)
            cp[1] = i
            j++
        } 
        i++
    }
    throw Error("Could not find.")
}

function run(instr) {
    for (let i = 0; i < instr.length; i += 4) {
        let opcode = instr[i]
        let op;
        if (opcode === 1) {
            op = (a,b) => a+b
        } else if (opcode === 2) {
            op = (a,b) => a*b 
        } else if (opcode === 99) {
            break
        } else {
            console.log("error")
            break;
        }
        let l = instr[instr[i+1]]
        let r = instr[instr[i+2]]
        instr[instr[i+3]] = op(l,r)
    }
}

let r = find(instructions)
console.log(100 * r.one + r.two)