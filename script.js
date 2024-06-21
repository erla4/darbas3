document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const href = event.target.getAttribute('href');
            loadPage(href);
        });
    });
});

function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const main = doc.querySelector('main');
            document.querySelector('main').innerHTML = main.innerHTML;
            window.history.pushState({}, '', url);
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    const ratingElements = document.querySelectorAll('.rating');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const href = event.target.getAttribute('href');
            loadPage(href);
        });
    });

    ratingElements.forEach(ratingElement => {
        const stars = ratingElement.querySelectorAll('.star');
        let rating = parseInt(ratingElement.dataset.rating);
        const maxRating = parseInt(ratingElement.dataset.maxRating);

        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                rating = index + 1;
                ratingElement.dataset.rating = rating;
                updateStarRating(stars, rating, maxRating);
            });
        });

        updateStarRating(stars, rating, maxRating);
    });
});

function loadPage(url) {
    // ... (existing code)
}

function updateStarRating(stars, rating, maxRating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    const ratingElements = document.querySelectorAll('.rating');
    const learnMoreButtons = document.querySelectorAll('.service-item button');
  
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        loadPage(href);
      });
    });
  
    ratingElements.forEach(ratingElement => {
      // ... (existing rating code)
    });
  
    learnMoreButtons.forEach(button => {
      button.addEventListener('click', () => {
        const service = button.dataset.service;
        storeServiceEvent(service);
      });
    });
  });
  
  function loadPage(url) {
    // ... (existing code)
  }
  
  function updateStarRating(stars, rating, maxRating) {
    // ... (existing code)
  }
  
  async function storeServiceEvent(service) {
    try {
      const response = await fetch('/api/service-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ service, timestamp: new Date().toISOString() })
      });
  
      if (response.ok) {
        console.log(`Service event for "${service}" stored successfully.`);
      } else {
        console.error(`Error storing service event for "${service}".`);
      }
    } catch (error) {
      console.error('Error storing service event:', error);
    }
  }