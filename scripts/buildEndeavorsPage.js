const fs = require("fs");
const projects = JSON.parse(fs.readFileSync("data/projects.json", "utf8"));
const employers = JSON.parse(fs.readFileSync("data/employers.json", "utf8"));
const projectTemplate = fs.readFileSync("templates/project.html", "utf8");
const employerTemplate = fs.readFileSync("templates/employer.html", "utf8");
const projectsPageTemplate = fs.readFileSync(
  "templates/projectsPage.html",
  "utf8"
);

const newLineConcat = (accumulator, currentValue) =>
  accumulator + "\n" + currentValue;

console.info(projects.length, " projects found");

const projectsArray = projects.map(project => {
  let template = projectTemplate.slice(0);
  Object.keys(project).forEach(key => {
    const regex = new RegExp("{{ " + key + " }}", "g");
    template = template.replace(regex, project[key]);
  });
  return template;
});

const projectListText = projectsArray.reduce(newLineConcat, "");

console.info(employers.length, " employers found");

const employersArray = employers.map(employer => {
  let template = employerTemplate.slice(0);
  Object.keys(employer).forEach(key => {
    const regex = new RegExp("{{ " + key + " }}", "g");
    template = template.replace(regex, employer[key]);
  });
  return template;
});

const employerListText = employersArray.reduce(newLineConcat, "");

fs.writeFileSync(
  "projects.html",
  projectsPageTemplate
    .replace(/{{projects-list}}/g, projectListText)
    .replace(/{{employers-list}}/g, employerListText)
);
