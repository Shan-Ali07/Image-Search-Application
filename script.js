var API_URL = 'https://api.unsplash.com/search/photos';
var ACCESS_KEY = 'https://api.unsplash.com/search/photos?query=QUERY&client_id=Wgt_UnmtwnUFa2wiiQP662NTCAb50d1Yb-Vmp5RWNBw'; 

var form = document.getElementById('search-form');
var input = document.getElementById('search-input');
var gallery = document.getElementById('gallery');
var loader = document.getElementById('loader');
var errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  var query = input.value.trim();
  if (query !== '') {
    searchImages(query);
  }
});

function searchImages(query) {
  clearResults();
  showLoader(true);

  fetch(API_URL + '?query=' + query + '&per_page=30&client_id=' + "Wgt_UnmtwnUFa2wiiQP662NTCAb50d1Yb-Vmp5RWNBw")
    .then(function(response) {
      if (!response.ok) {
        throw new Error('API Error');
      }
      return response.json();
    })
    .then(function(data) {
      displayImages(data.results);

      if (data.results.length === 0) {
        gallery.innerHTML = '<p style="text-align:center;">No images found.</p>';
      }
    })
    .catch(function() {
      showError(true);
    })
    .finally(function() {
      showLoader(false);
    });
}

function displayImages(images) {
  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    var card = document.createElement('div');
    card.className = 'image-card';

    card.innerHTML = 
      '<img src="' + img.urls.small + '" alt="' + (img.alt_description || 'Unsplash Image') + '" loading="lazy">' +
      '<div class="card-info">' +
      '<p>' + (img.alt_description || 'No description') + '</p>' +
      '<p class="photographer">📸 ' + img.user.name + '</p>' +
      '</div>';

    gallery.appendChild(card);
  }
}

function clearResults() {
  gallery.innerHTML = '';
  showError(false);
}

function showLoader(show) {
  if (show) {
    loader.classList.remove('hidden');
  } else {
    loader.classList.add('hidden');
  }
}

function showError(show) {
  if (show) {
    errorMessage.classList.remove('hidden');
  } else {
    errorMessage.classList.add('hidden');
  }
}
