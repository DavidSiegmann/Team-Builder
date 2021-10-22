const inquirer = require('inquirer');
const fs = require('fs');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const genHTML = require('./util/generateHtml');
const team = []

// builds team array
function createTeam() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'questions',
            message: 'What would you like to do?',
            choices: ['Create Team', 'Exit']
        }
    ]).then(answers => {
        switch (answers.questions) {
            case 'Create Team':
                console.log('Lets get started!');
                createManager();
                break;
        
            default:
                console.log('If you would like to restart, please re-run the process!');
                break;
        }
    })
}

function teamAddition() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'addition',
            message: 'What would you like to add to your team?',
            choices: ['Add Engineer','Add Intern','Create HTML']
        }
    ]).then(answers => {
        switch (answers.addition) {
            case 'Add Engineer':
                console.log('Add Engineer');
                createEngineer();
                break;
            case 'Add Intern':
                console.log('Add Intern');
                createIntern();
                break;
            
            default:
                fs.writeFileSync('index.html', genHTML(team));
                break;
        }
    })
}

// helper functions to create different team members
function createManager() {
    inquirer.prompt([
       {
           type: 'input',
           name: 'name',
           message: 'Who is the Project Manager?'
       },
       {
           type: 'input',
           name: 'id',
           message: 'What is their ID number?'
       },
       {
           type: 'input',
           name: 'officeNumber',
           message: 'What is their office number?'
       },
       {
           type: 'input',
           name: 'email',
           message: 'What is their email address?'
       }
    ]).then(({name, id, officeNumber, email}) => {
       const manager = new Manager(name, id, email, officeNumber);
       team.push(manager);
       console.log(team);
       teamAddition();
   })     

}

function createEngineer() {
    inquirer.prompt([
       {
           type: 'input',
           name: 'name',
           message: 'Who is the Engineer?'
       },
       {
           type: 'input',
           name: 'id',
           message: 'What is their ID number?'
       },
       {
           type: 'input',
           name: 'github',
           message: 'What is their GitHub account name?'
       },
       {
           type: 'input',
           name: 'email',
           message: 'What is their email address?'
       }
    ]).then(({name, id, github, email}) => {
       const engineer = new Engineer(name, id, email, github);
       team.push(engineer);
       console.log(team);
       teamAddition();
   })     

}

function createIntern() {
    inquirer.prompt([
       {
           type: 'input',
           name: 'name',
           message: 'Who is the Intern?'
       },
       {
           type: 'input',
           name: 'id',
           message: 'What is their ID number?'
       },
       {
           type: 'input',
           name: 'school',
           message: 'What school did they go to?'
       },
       {
           type: 'input',
           name: 'email',
           message: 'What is their address?'
       }
    ]).then(({name, id, school, email}) => {
       const intern = new Intern(name, id, email, school);
       team.push(intern);
       console.log(team);
       teamAddition();
   })     

}

createTeam()