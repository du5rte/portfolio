// Copied from Path-js
// https://github.com/andreaferretti/paths-js/blob/9f38bae7ba68ef72450efe9d1a906ce9ff76f46e/src/path.js
// https://github.com/andreaferretti/paths-js/wiki/Low%20level%20API

export default function PathData(init) {
  let instructions = init || []

  let push = (arr, el) => {
    let copy = arr.slice(0, arr.length)
    copy.push(el)
    return copy
  }

  let areEqualPoints = ([a1, b1], [a2, b2]) =>
    (a1 === a2) && (b1 === b2)

  let trimZeros = (string, char) => {
    let l = string.length
    while (string.charAt(l - 1) === '0') {
      l = l - 1
    }
    if(string.charAt(l - 1) === '.') {
      l = l - 1
    }
    return string.substr(0, l)
  }

  let round = (number, digits) => {
    const str = number.toFixed(digits)
    return trimZeros(str)
  }

  let printInstrunction = ({ command, params }) => {
    let numbers = params.map((param) => round(param, 6))
    return `${ command } ${ numbers.join(' ') }`
  }

  let point = ({ command, params }, [prevX, prevY]) => {
    switch(command) {
      case 'm':
      case 'M':
        return [params[0], params[1]]
      case 'l':
      case 'L':
        return [params[0], params[1]]
      case 'H':
        return [params[0], prevY]
      case 'V':
        return [prevX, params[0]]
      case 'Z':
        return null
      case 'C':
        return [params[4], params[5]]
      case 'S':
        return [params[2], params[3]]
      case 'Q':
        return [params[2], params[3]]
      case 'T':
        return [params[0], params[1]]
      case 'A':
        return [params[5], params[6]]
    }
  }

  let verbosify = (keys, f) =>
    function(a) {
      let args = (typeof a === 'object') ? keys.map((k) => a[k]) : arguments
      return f.apply(null, args)
    }

  let plus = (instruction) =>
    PathData(push(instructions, instruction))

  return ({
    move: verbosify(['x', 'y'], (x, y) =>
      plus({
        command: 'm',
        params: [x, y]
      })
    ),
    moveTo: verbosify(['x', 'y'], (x, y) =>
      plus({
        command: 'M',
        params: [x, y]
      })
    ),
    line: verbosify(['x', 'y'], (x, y) =>
      plus({
        command: 'l',
        params: [x, y]
      })
    ),
    lineTo: verbosify(['x', 'y'], (x, y) =>
      plus({
        command: 'L',
        params: [x, y]
      })
    ),
    hline: verbosify(['x'], (x) =>
      plus({
        command: 'h',
        params: [x]
      })
    ),
    hlineTo: verbosify(['x'], (x) =>
      plus({
        command: 'H',
        params: [x]
      })
    ),
    vline: verbosify(['y'], (y) =>
      plus({
        command: 'v',
        params: [y]
      })
    ),
    vlineTo: verbosify(['y'], (y) =>
      plus({
        command: 'V',
        params: [y]
      })
    ),
    closepath: () =>
      plus({
        command: 'Z',
        params: []
      }),
    curve: verbosify(['x1', 'y1', 'x2', 'y2','x', 'y'], (x1, y1, x2, y2, x, y) =>
      plus({
        command: 'c',
        params: [x1, y1, x2, y2, x, y]
      })
    ),
    curveTo: verbosify(['x1', 'y1', 'x2', 'y2','x', 'y'], (x1, y1, x2, y2, x, y) =>
      plus({
        command: 'C',
        params: [x1, y1, x2, y2, x, y]
      })
    ),
    smoothcurve: verbosify(['x2', 'y2','x', 'y'], (x2, y2, x, y) =>
      plus({
        command: 's',
        params: [x2, y2,x, y]
      })
    ),
    smoothcurveTo: verbosify(['x2', 'y2','x', 'y'], (x2, y2, x, y) =>
      plus({
        command: 'S',
        params: [x2, y2,x, y]
      })
    ),
    qcurve: verbosify(['x1', 'y1', 'x', 'y'], (x1, y1, x, y) =>
      plus({
        command: 'q',
        params: [x1, y1, x, y]
      })
    ),
    qcurveTo: verbosify(['x1', 'y1', 'x', 'y'], (x1, y1, x, y) =>
      plus({
        command: 'Q',
        params: [x1, y1, x, y]
      })
    ),
    smoothqcurve: verbosify(['x', 'y'], (x, y) =>
      plus({
        command: 't',
        params: [x, y]
      })
    ),
    smoothqcurveTo: verbosify(['x', 'y'], (x, y) =>
      plus({
        command: 'T',
        params: [x, y]
      })
    ),
    arc: verbosify(['rx', 'ry', 'xrot', 'largeArcFlag', 'sweepFlag', 'x', 'y'],
      (rx, ry, xrot, largeArcFlag, sweepFlag, x, y) =>
      plus({
        command: 'a',
        params: [rx, ry, xrot, largeArcFlag, sweepFlag, x, y]
      })
    ),
    arcTo: verbosify(['rx', 'ry', 'xrot', 'largeArcFlag', 'sweepFlag', 'x', 'y'],
      (rx, ry, xrot, largeArcFlag, sweepFlag, x, y) =>
      plus({
        command: 'A',
        params: [rx, ry, xrot, largeArcFlag, sweepFlag, x, y]
      })
    ),

    toString: () => instructions.map(printInstrunction).join(' '),
  })
}
