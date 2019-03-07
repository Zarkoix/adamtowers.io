const fs = require("fs");
const projects = JSON.parse(fs.readFileSync('data/projectsData.json', 'utf8'));
const projectTemplate = fs.readFileSync('templates/projectTemplate.html', 'utf8');
const projectsPageTemplate = fs.readFileSync('templates/projectsPageTemplate.html', 'utf8');

const templateArray = projects.map(project => {
    let template = projectTemplate.slice(0);
    Object.keys(project).forEach(key => {
        const regex = new RegExp("{{" + key + "}}", "g");
        template = template.replace(regex, project[key]);
    })
    return template;
})

const reducer = (accumulator, currentValue) => accumulator + "\n" + currentValue;
const templateText = templateArray.reduce(reducer, "");

const regex = new RegExp("{{projects-list}}", "g");
const projectsPage = projectsPageTemplate.replace(regex, templateText);
fs.writeFileSync('projects.html', projectsPage);
