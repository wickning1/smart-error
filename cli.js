#!/usr/bin/env node
const exec = require('@wickning1/async-exec')

const [,, ...disks] = process.argv

async function main () {
  for (const disk of disks) {
    const { stdout } = await exec('/usr/sbin/smartctl', ['-j', '-H', disk])
    const diskinfo = JSON.parse(stdout)
    if (!diskinfo.smart_status.passed) {
      console.error(`Disk ${disk} is showing a failed SMART status.`)
    }
  }
}
main().catch(err => {
  const info = JSON.parse(err.stdout)
  if (info.smartctl.exit_status === 2) console.error('Access denied. Probably need to run as root.')
  else console.error(err)
})
