document.addEventListener('DOMContentLoaded', function() {
    const linksContainer = document.getElementById('links');
    const projectsContainer = document.getElementById('project')

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
        
        projects.forEach(project => {
            const buttonElement = document.createElement('div');
            buttonElement.classList.add('project-button');
            buttonElement.textContent = project.name;
            buttonElement.addEventListener('click', () => fetchLinks(project));
            projectsContainer.appendChild(buttonElement);
        });
    }
    async function fetchLinks(projectId) {
        try {
            const response = await fetch(`https://dbbp.ru/support/${projectId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch links');
            }
            const data = await response.json();
            displayLinks(data.documentation, data.software);
        } catch (error) {
            console.error('Error fetching links:', error);
            alert('Ошибка при загрузке ссылок. Пожалуйста, попробуйте позже.');
        }
    }

    function displayLinks(documentation, software) {
        linksContainer.innerHTML = '';
        linksContainer.style.display = 'flex';

        documentation.forEach(doc => {
            const docButton = document.createElement('a');
            docButton.href = doc.url;
            docButton.classList.add('links-button');
            docButton.textContent = "Скачать";
            docButton.target = '_blank';
            linksContainer.appendChild(docButton);
        });
        
        software.forEach(sof => {
            const sofButton = document.createElement('a');
            sofButton.href = sof.url;
            sofButton.classList.add('links-button');
            sofButton.target = '_blank';
            linksContainer.appendChild(sofButton);
        })
    }
    fetchProjects();
})