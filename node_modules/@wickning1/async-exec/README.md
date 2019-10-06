# async-exec
Utility library for working with async/await instead of streams when executing commands with child-process

# Usage
```
const exec = require('@wickning1/async-exec')
async function main() {
  const { output, stdout, stderr } = await exec('ffmpeg', ['-i', 'inputpath'],
    ({ output, stdout, stderr}) => {
      if (stdout) console.log(`progress: ${stdout}`)
    }
  )
  console.log('Done!')
}
main()
```
`output` is the combination of `stdout` and `stderr` for extra simplicity.
