const fs = require("fs");
const inquirer = require("inquirer");
const starterHTML = `
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
    <style>
      .header {
        background: linear-gradient(to right, #5b2c6f, #2575fc);
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        font-family: "Playfair Display", serif;
        color: #fff;
      }
      .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        margin: 20px;
        border-radius: 10px;
      }
      .card-header {
        background-color: #0077be;
        color: #fff;
        font-weight: bold;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 10px;
      }
      .card-body {
        border: 1px solid #ddd;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 20px;
        margin: 10px;
      }
    </style>
  </head>
  <body>
    <div class="header">My Team</div>
    <div class="container cardholder">
    </div>
  </body>
</html>
`;

class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    console.log(`Name: ${this.name}`);
  }

  getId() {
    console.log(`ID: ${this.id}`);
  }

  getEmail() {
    console.log(`Email: ${this.email}`);
  }

  getRole() {
    return `Employee`;
  }
}

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getGithub() {
    console.log(this.github);
  }

  getRole() {
    return "Engineer";
  }
}
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getRole() {
    return `Manager`;
  }

  getOfficeNumber() {
    console.log(`Office Number: ${this.officeNumber}`);
  }
}
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getSchool() {
    console.log(`School: ${this.school}`);
  }

  getRole() {
    return "Intern";
  }
}

function fork() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["Add Engineer", "Add Intern", "Finish"],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "Add Engineer":
          engiPrompt();
          break;
        case "Add Intern":
          intePrompt();
          break;
        case "Finish":
          end();
          break;
      }
    });
}
//Manager

fs.writeFile("./team.html", starterHTML, (err) => {
  if (err) throw err;
  console.log("team.html has been successfuly generated.");
});

function manGen() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the manager's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the manager's email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
      },
    ])
    .then((answers) => {
      // access the answers using the names given to the prompts
      const newMan = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      console.log(newMan);
      let endCard = `
          <div class="card">
          <div class="card-header">
            <div>${newMan.name} --- ${newMan.getRole()}}</div>
          </div>
          <div class="card-body">
            <div>ID: ${newMan.id}</div>
            <div>Email:<a href="mailto:${newMan.email}">${
        newMan.email
      }</a></div>
            <div>Office Number: ${newMan.officeNumber} </div>
          </div>
        </div>`;
      fs.readFile("./team.html", "utf-8", (err, data) => {
        if (err) throw err;

        let indexOfDiv = data.indexOf('<div class="container cardholder">');
        let newData =
          data.slice(0, indexOfDiv) + endCard + data.slice(indexOfDiv);

        fs.writeFile("./team.html", newData, (err) => {
          if (err) throw err;
          fork();
        });
      });
    });
}

//Engi
function engiPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the Engineer's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the Engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is the Engineer's Github username?",
      },
    ])
    .then((answers) => {
      // access the answers using the names given to the prompts
      const newEngi = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      console.log(newEngi);

      let endCard = `
        <div class="card">
        <div class="card-header">
          <div>${newEngi.name} --- ${newEngi.getRole()}}</div>
        </div>
        <div class="card-body">
          <div>ID: ${newEngi.id}</div>
          <div>Email:<a href="mailto:${newEngi.email}">${
        newEngi.email
      }</a></div>
          <div>GitHub:<a href="https://www.github.com/${newEngi.github}">${
        newEngi.github
      }</a> </div>
        </div>
      </div>`;

      fs.readFile("./team.html", "utf-8", (err, data) => {
        if (err) throw err;

        let indexOfDiv = data.indexOf('<div class="container cardholder">');
        let newData =
          data.slice(0, indexOfDiv) + endCard + data.slice(indexOfDiv);

        fs.writeFile("./team.html", newData, (err) => {
          if (err) throw err;
          fork();
        });
      });
    });
}
//Intern
function intePrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the Intern's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the Intern's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the Intern's email?",
      },
      {
        type: "input",
        name: "school",
        message: "What school does the Intern attend?",
      },
    ])
    .then((answers) => {
      // access the answers using the names given to the prompts
      const newInt = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      console.log(newInt);

      let endCard = `
        <div class="card">
        <div class="card-header">
          <div>${newInt.name} --- ${newInt.getRole()}}</div>
        </div>
        <div class="card-body">
          <div>ID: ${newInt.id}</div>
          <div>Email:<a href="mailto:${newInt.email}">${newInt.email}</a></div>
          <div>School: ${newInt.school} </div>
        </div>
      </div>`;

      fs.readFile("./team.html", "utf-8", (err, data) => {
        if (err) throw err;

        let indexOfDiv = data.indexOf('<div class="container cardholder">');
        let newData =
          data.slice(0, indexOfDiv) + endCard + data.slice(indexOfDiv);

        fs.writeFile("./team.html", newData, (err) => {
          if (err) throw err;
          fork();
        });
      });
    });
}

function end() {
  console.log("Finished Making Custom HTML Profile");
}
manGen();
