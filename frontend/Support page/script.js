document.addEventListener('DOMContentLoaded', function() {

    async function fetchProjects() {
        try {
            const response = await fetch('https://dbbp.ru/support')
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const projects = await response.json();
            displayProjectsButton(projects);
        }catch (error) {
           console.error('Error with fetching projects', error)
        }
    }

    function displayProjectsButton(projects) {
        const projectsContainer = document.getElementById('project')
        projects.forEach(project => {
            const buttonElement = document.createElement('div');
            buttonElement.classList.add('project-button');
            buttonElement.textContent = project.name;
            buttonElement.addEventListener('click', () => displayLinks(project));
            projectsContainer.appendChild(buttonElement);
        });
    }
})