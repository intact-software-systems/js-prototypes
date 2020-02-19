const grades = [3.5, 3, 2, 6, 4]

const filterGrades = threshold => grade => {
    return grade >= threshold
}
const filterUpAnd4 = filterGrades(4)

// console.log(grades.filter(filterUpAnd4))
// console.log(grades.filter(grade => grade >= 4))

const filter = thresholdB => thresholdA => grade => {
    return grade >= thresholdB - thresholdA
}

const filterAB = filter(10)(6)

console.log(grades.filter(filterAB))

const compose = (...fs) => {
    return x => {
        return fs.reduceRight((acc, f) => {
            return f(acc)
        }, x)
    }
}

console.log(compose(
    average => average >= 4,
    student => {
        const gradesNb = student.grades.length
        return gradesNb === 0 ? 0 : student.grades.reduce((acc, grade) => acc + grade, 0) / gradesNb
    })({name: 'Thomas', grades: [3, 3]})) // false


function currying() {
    const student = {name: 'Lia', grades: [4, 6, 5]}
// WITHOUT CURRYING
    const add = (x, y) => x + y
    const min = (x, y) => x < y ? x : y
    const newStudent0 = {
        ...student,
        grades: student.grades.map((grade) => min(6, add(grade, 1)))
    }
    console.log(newStudent0) // {name: 'Lia', grades: [5,6,6]};

// WITH CURRYING
    const addCurried = x => y => x + y
    const minCurried = x => y => x < y ? x : y
    const add1 = addCurried(1) // this is a partial application
    const min6 = minCurried(6) // this is a partial application
    const compose =
        (...fs) => (x) => fs.reduceRight((acc, f) => f(acc), x)
    const newStudent1 = {
        ...student,
        grades: student.grades.map(compose(min6, add1))
    }
    console.log(newStudent1) // {name: 'Lia', grades: [5,6,6]};
}


function semicolontest() {
    const hey = 'hey'
    const you = 'hey'
    const heyYou = hey + ' ' + you;

    ['h', 'e', 'y'].forEach((letter) => console.log(letter))
}


semicolontest()


currying()