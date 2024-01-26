document.addEventListener("DOMContentLoaded", async function () {
    async function fetchGitHubRepos() {
      try {
        const response = await fetch(
          "https://api.github.com/users/AaronFourie/repos"
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching GitHub repositories: ${response.statusText}`
          );
        }

        const repos = await response.json();
        return repos;
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    async function fetchRepoDetails(repo) {
      const { name, description, html_url, languages_url } = repo;

      try {
        // Fetch languages from the repository
        const response = await fetch(languages_url);

        if (!response.ok) {
          throw new Error(
            `Error fetching repository details: ${response.statusText}`
          );
        }

        const languages = await response.json();
        const repoDetails = {
          name,
          description,
          html_url,
          tags: Object.keys(languages), // Extract language names
        };

        return repoDetails;
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    async function renderGitHubProjects() {
        const projectContainer = document.getElementById("project-container");
        const repos = await fetchGitHubRepos();

        if (repos) {
          // Split the repositories into two columns
          const column1 = document.createElement("div");
          const column2 = document.createElement("div");
          column1.classList.add("column");
          column2.classList.add("column");

         // Iterate through the repositories
for (let i = 0; i < repos.length; i++) {
    const repo = repos[i];
    const repoDetails = await fetchRepoDetails(repo);
  
    if (repoDetails) {
      // Create a new card for each repository
      const card = document.createElement("div");
      card.classList.add("project-card");
      card.innerHTML = `
        <h3>${repoDetails.name}</h3>
        <p>${repoDetails.description}</p>
        <p><strong>Tags:</strong> ${repoDetails.tags.join(", ")}</p>
        <a href="${repoDetails.html_url}" target="_blank">View on GitHub</a>
      `;
  
      // Append the card to the appropriate column
      if (i % 2 === 0) {
        column1.appendChild(card);
      } else {
        column2.appendChild(card);
      }
    }
          }

          // Append columns to the project container
          projectContainer.appendChild(column1);
          projectContainer.appendChild(column2);
        } else {
          // Display an error message
          const errorMessage = document.createElement("p");
          errorMessage.textContent = "Error loading GitHub repositories.";
          projectContainer.appendChild(errorMessage);
        }
      }

      // Call the function to render GitHub projects
      renderGitHubProjects();
    });