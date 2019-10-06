const childprocess = require('child_process')
module.exports = (command, argumentarray, progress) => {
  return new Promise((resolve, reject) => {
    const final = { output: '', stdout: '', stderr: '' }
    const child = childprocess.spawn(command, argumentarray || [])
    child.stdout.on('data', chunk => {
      const line = chunk.toString('utf8')
      final.output += line
      final.stdout += line
      if (progress) progress({ output: line, stdout: line })
    })
    child.stderr.on('data', chunk => {
      const line = chunk.toString('utf8')
      final.output += line
      final.stderr += line
      if (progress) progress({ output: line, stderr: line })
    })
    let error
    child.on('error', err => {
      error = err
    })
    child.on('close', code => {
      if (code) {
        const finalerror = error || new Error(`Execution of ${command} returned failure code.\n${final.stderr}`)
        finalerror.output = final.output
        finalerror.stdout = final.stdout
        finalerror.stderr = final.stderr
        reject(finalerror)
      } else resolve(final)
    })
  })
}
