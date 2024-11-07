document.addEventListener('DOMContentLoaded', () => {
    let allJobs = []; // To store all jobs for easy filtering
  
    fetch('jobs_with_categories.json') // Adjusted to your updated JSON file
      .then(response => response.json())
      .then(data => {
        allJobs = data; // Store jobs data
        renderJobs(allJobs); // Initial render of all jobs
      })
      .catch(error => console.error('Error loading jobs:', error));
  
    // Function to render jobs
    function renderJobs(jobs) {
      const jobList = document.getElementById('job-list');
      jobList.innerHTML = ''; // Clear previous jobs
      jobs.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.className = 'job';
  
        // Split categories and create a label for each
        const categoryLabels = job.category.split(',').map(category => {
          const categoryClass = `category-${category.trim().toLowerCase().replace(/\s+/g, '')}`;
          return `<span class="category-label ${categoryClass}">${category.trim()}</span>`;
        }).join(' ');
  
        jobDiv.innerHTML = `
          <h2>${job.companyName}</h2>
          <p><strong>Website:</strong> <a href="${job.companyWebsite}" target="_blank">${job.companyWebsite}</a></p>
          <p><strong>Careers Page:</strong> <a href="${job.careersPage}" target="_blank">Apply Here</a></p>
          ${job.notes ? `<p><strong>Notes:</strong> ${job.notes}</p>` : ''}
          ${categoryLabels}
        `;
        jobList.appendChild(jobDiv);
      });
    }
  
    // Event listener for search
    document.getElementById('searchBar').addEventListener('input', (event) => {
      const query = event.target.value.toLowerCase();
      const filteredJobs = allJobs.filter(job =>
        job.companyName.toLowerCase().includes(query)
      );
      renderJobs(filteredJobs); // Re-render jobs based on search query
    });
  });
  