#!/usr/bin/env node

import { execSync } from 'child_process'
import { blue, cyan, green, red, yellow } from 'colorette'
import fs from 'fs'
import inquirer from 'inquirer'
import path from 'path'

const currentNodeVersion = process.versions.node
const semver = currentNodeVersion.split('.')
const major = parseInt(semver[0], 10)

const defaultProjectName = process.argv[2]
const currentPath = process.cwd()
const originGitRepo = 'https://github.com/masb0ymas'

/**
 * Log formatted message
 * @param {string} message
 * @param {Function} colorFn
 * @returns {string}
 */
function logMessage(message, colorFn = green) {
  const prefix = blue('expressjs-cli:')
  const coloredMessage = colorFn(message)
  return `${prefix} ${coloredMessage}`
}

/**
 * Validate Node.js version
 */
function validateNodeVersion() {
  if (major < 18) {
    console.error(
      red(
        `You are running Node ${currentNodeVersion}.\n` +
          'Create Expressjs Starterkit requires Node 18 or higher.\n' +
          'Please update your version of Node.'
      )
    )
    process.exit(1)
  }

  if (major < 22) {
    console.log(logMessage('Recommendation using node version 22', yellow))
  }
}

/**
 * Validate command line arguments
 */
function validateArgs() {
  if (process.argv.length < 3) {
    console.log('You have to provide a name to your app.')
    console.log('For example:')
    console.log(cyan('    npx create-expressjs-starterkit my-app'))
    process.exit(1)
  }
}

/**
 * Create project directory
 * @param {string} projectPath
 * @param {string} projectName
 */
function createProjectDirectory(projectPath, projectName) {
  try {
    fs.mkdirSync(projectPath)
  } catch (err) {
    if (err.code === 'EEXIST') {
      const message = `The file ${projectName} already exists in the current directory, please give it another name.`
      console.log(logMessage(message, red))
    } else {
      console.log(red(err))
    }
    process.exit(1)
  }
}

/**
 * Install project dependencies
 * @param {string} packageManager
 */
function installDependencies(packageManager) {
  console.log(logMessage('Installing dependencies...'))

  switch (packageManager) {
    case 'yarn':
      execSync('yarn')
      break
    case 'pnpm':
      execSync('pnpm install')
      break
    default:
      execSync('npm install')
  }
}

/**
 * Setup project
 * @param {string} templateChoice
 * @param {string} projectPath
 * @param {string} packageManager
 */
function setupProject(templateChoice, projectPath, packageManager) {
  try {
    const repoURL = `${originGitRepo}/${templateChoice}`

    console.log(logMessage('Cloning repository...'))
    execSync(`git clone --depth 1 ${repoURL} ${projectPath}`)

    process.chdir(projectPath)

    installDependencies(packageManager)

    console.log(logMessage('Removing useless files'))
    execSync('npx rimraf ./.git')

    console.log(logMessage('The installation is done, this is ready to use!'))
  } catch (err) {
    console.log(red(err))
    process.exit(1)
  }
}

// Main execution
validateNodeVersion()
validateArgs()

inquirer
  .prompt([
    {
      name: 'templateChoice',
      type: 'list',
      message: 'What project template would you like to generate?',
      choices: ['express-api', 'express-api-typeorm', 'express-api-sequelize'],
    },
    {
      name: 'projectName',
      type: 'input',
      message: 'Project name:',
      validate: function (input) {
        return (
          /^([A-Za-z\-\_\d\.]+)$/.test(input) ||
          'Project name may only include letters, numbers, underscores and hashes.'
        )
      },
      default: defaultProjectName,
    },
    {
      name: 'packageManager',
      type: 'list',
      message: 'Prefer to install dependencies with:',
      choices: ['npm', 'yarn', 'pnpm'],
    },
  ])
  .then((answers) => {
    const { templateChoice, projectName, packageManager } = answers
    const projectPath = path.join(currentPath, projectName)

    createProjectDirectory(projectPath, projectName)
    setupProject(templateChoice, projectPath, packageManager)
  })
  .catch((error) => {
    console.error(red('An error occurred:'), error)
    process.exit(1)
  })
