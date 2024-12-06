
document.addEventListener('DOM Content Loaded', function() {

    async function fetchProjects(params) {
        try {
            const response = await fetch('https://dbbp.ru/projects');
            if (!response.ok) {
                throw new Error('Failed to fetch projects')
            }
            const projects = await response.json();
            displayProjects(projects)
        }catch(error) {
            console.error('Error with fetching projects', err)
        }
    }
    
    function displayProjects(projects) {
        const projectsContainer = document.getElementById('project')
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');

            const imgElement = document.createElement('img');
            imgElement.src = project.image;
            
            const h2Element = document.createElement('h2');
            h2Element.textContent = project.Name;

            const pElement = document.createElement('p');
            pElement.textContent = project.description;

            const buttonElement = document.createElement('a');
            buttonElement.href = `/projects/${project.id}`;
            buttonElement.classList.add('project-button');
            buttonElement.textContent = 'Перейти'

            projectElement.appendChild(imgElement);
            projectElement.appendChild(h2Element);
            projectElement.appendChild(pElement);
            projectElement.appendChild(buttonElement);

            projectsContainer.appendChild(projectElement);
        })
    }
    fetchProjects();
});