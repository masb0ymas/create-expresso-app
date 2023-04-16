#!/usr/bin/env node

import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { execSync } from 'child_process'

const currentNodeVersion = process.versions.node
const semver = currentNodeVersion.split('.')
const major = semver[0]

const defaultProjectName = process.argv[2]

const currentPath = process.cwd()
const originGitRepo = 'https://github.com/masb0ymas'

if (major < 14) {
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'Create Expresso App requires Node 14 or higher. \n' +
      'Please update your version of Node.'
  )
  process.exit(1)
}

if (major < 18) {
  console.log('Recommendation using node version 18')
}

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.')
  console.log('For example :')
  console.log(chalk.cyan('    npx create-expresso-app my-app'))
  process.exit(1)
}

/**
 * Log Server
 * @param {string} message
 * @returns
 */
function logServer(message) {
  const newType = chalk.blue('Create Expresso App :')
  const newMessage = chalk.green(message)

  const result = `${newType} ${newMessage}`

  return result
}

/**
 * Validate Directory
 * @param {string} projectPath
 */
function validateDir(projectPath) {
  try {
    fs.mkdirSync(projectPath)
  } catch (err) {
    if (err.code === 'EEXIST') {
      const message = `The file ${projectName} already exist in the current directory, please give it another name.`
      console.log(logServer(message))
    } else {
      console.log(err)
    }
    process.exit(1)
  }
}

/**
 * Main
 * @param {string} templateChoice
 * @param {string} projectPath
 * @param {string} installDeps
 */
function main(templateChoice, projectPath, installDeps) {
  try {
    const repoURL = `${originGitRepo}/${templateChoice}`

    console.log(logServer('Downloading repo...'))
    execSync(`git clone --depth 1 ${repoURL} ${projectPath}`)

    process.chdir(projectPath)

    console.log(logServer('Installing dependencies...'))

    if (installDeps === 'yarn') {
      execSync('yarn')
    } else if (installDeps === 'pnpm') {
      execSync('pnpm install')
    } else if (installDeps === 'npm') {
      execSync('npm install')
    } else {
      execSync('npm install')
    }

    console.log(logServer('Removing useless files'))
    execSync('npx rimraf ./.git')

    // fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true })
    console.log(logServer('The installation is done, this is ready to use !'))
  } catch (err) {
    console.log(err)
  }
}

inquirer
  .prompt([
    {
      name: 'templateChoice',
      type: 'list',
      message: 'What project template would you like to generate ?',
      choices: ['expresso-typeorm', 'expresso-sequelize'],
    },
    {
      name: 'projectName',
      type: 'input',
      message: 'Project name:',
      validate: function (input) {
        if (/^([A-Za-z\-\_\d\.])+$/.test(input)) return true
        else
          return 'Project name may only include letters, numbers, underscores and hashes.'
      },
      default: defaultProjectName,
    },
    {
      name: 'installDeps',
      type: 'list',
      message: 'Prefer to install dependencies with :',
      choices: ['yarn', 'pnpm', 'npm'],
    },
  ])
  .then((answers) => {
    const templateChoice = answers.templateChoice
    const projectName = answers.projectName
    const installDeps = answers.installDeps
    const projectPath = path.join(currentPath, projectName)

    // validate
    validateDir(projectPath)

    // run clone git
    main(templateChoice, projectPath, installDeps)
  })
