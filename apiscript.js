const apiKey = "2c0d063f";
const baseUrl = "http://www.omdbapi.com/";
  const movieListSection = document.getElementById("movieList");
  const paginationSection = document.getElementById("pagination");
  const searchInput = document.getElementById("searchInput");
 
  let currentPage = 1;
  let totalResults = 0;
  let currentSearchQuery = "";

  // Function to fetch movie data from the OMDB API based on a search query and page number
  async function fetchMovies(searchQuery, page) {
    const filtervalue = document.getElementById("mediaSelect").value;
    let url;
    if(filtervalue === "all"){
         url = `${baseUrl}?apikey=${apiKey}&s=${encodeURIComponent(
            searchQuery
          )}&page=${page}`;
    }
    else{
     url = `${baseUrl}?apikey=${apiKey}&s=${encodeURIComponent(
            searchQuery
          )}&page=${page}&type=${filtervalue}`;
    }
  

  //  const url1 = http://www.omdbapi.com/?apikey=2c0d063f&s=batman&type=series

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.Response === "True") {
        return {
          movies: data.Search, // Array of movie objects from the API response
          totalResults: parseInt(data.totalResults),
        };
      } else {
        throw new Error(
          data.Error || "Something went wrong while fetching movies."
        );
      }
    } catch (error) {
     console.log(error);
    }
  }

  // Function to display movie posters and names in the movie list section
  function renderMovies(movies) {
    movieListSection.innerHTML = "";

    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `
  <img src="${movie.Poster}" alt="${movie.Title}">
  <p>${movie.Title}</p>
`;
      movieElement.addEventListener("click", () =>
        showMovieDetails(movie.imdbID)
      );
      movieListSection.appendChild(movieElement);
    });
  }

  // Function to handle pagination
  function renderPagination(totalResults, currentPage) {
    paginationSection.innerHTML = "";

    const totalPages = Math.ceil(totalResults / 10);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.className = "pagibutton"
      pageButton.addEventListener("click", () => handlePaginationClick(i));
      if (i === currentPage) {
        pageButton.classList.add("active");
      }
      paginationSection.appendChild(pageButton);
    }
  }

  // Function to handle pagination button click
  function handlePaginationClick(page) {
    currentPage = page;
    fetchAndRenderMovies(currentSearchQuery, currentPage);
  }

  // Function to show movie details in a modal
  async function showMovieDetails(imdbID) {
    const url = `${baseUrl}?apikey=${apiKey}&i=${encodeURIComponent(
      imdbID
    )}`;

    try {
      const response = await fetch(url);
      const movieDetails = await response.json();

      // Create and display the modal with movie details
      // You can customize this part to display the details in a visually appealing way
    //   alert(
    //     `Title: ${movieDetails.Title}\nYear: ${movieDetails.Year}\nGenre: ${movieDetails.Genre}\nPlot: ${movieDetails.Plot}`
    //   );
    console.log("yes");
    openModal(imdbID,movieDetails.Title, movieDetails.Year, movieDetails.Genre, movieDetails.Plot);
    } catch (error) {
      console.log(error);
    }
  }

  // Function to fetch and render movies based on search query and current page
  async function fetchAndRenderMovies(searchQuery, page) {
    try {
      const { movies, totalResults } = await fetchMovies(searchQuery, page);
      renderMovies(movies);
      renderPagination(totalResults, currentPage);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Event listener for search button
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      currentSearchQuery = searchInput.value.trim();
      currentPage = 1;
      fetchAndRenderMovies(currentSearchQuery, currentPage);
    }
  });

const searchbutton = document.getElementById("searchbutton");

  searchbutton.addEventListener("onclick", (event) => {
    console.log("yes")
      currentSearchQuery = searchInput.value.trim();
      currentPage = 1;
      fetchAndRenderMovies(currentSearchQuery, currentPage);
  });

  function searchmovi(){
    currentSearchQuery = searchInput.value.trim();
    currentPage = 1;
    fetchAndRenderMovies(currentSearchQuery, currentPage);
  }

  // Initial loading of movies (you can load default movies if needed)
  fetchAndRenderMovies("", 1);


  const openModalBtn = document.getElementById("openModalBtn");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const body = document.querySelector("body");
    // Function to open the modal
function openModal(imdbID, title, year, genre, plot ) {
const modalcontent = document.getElementById("modalcontent");
body.style.overflow = "hidden";
const anewdiv = document.createElement("div");
anewdiv.innerHTML = `
 <h2>${title}</h2>
 <p><strong>Year</strong> : ${year}</p> 
 <p><strong>Genre</strong> : ${genre}</p>
 <p><strong>Plot</strong> : ${plot}</p>
 `
var ar = [];
console.log(localStorage[imdbID])
 if(imdbID in localStorage){
 ar = JSON.parse(localStorage[imdbID]);
 }

const comments = document.createElement("div");
for(let i=0; i<ar.length; i++){
const paele = document.createElement('p');
paele.innerHTML =  (i+1)  + ")  <strong>Rating:</strong>" + ar[i]['rating'] + `<span class="gold-star">&#9733;</span>` + "   <strong>Feedback:</strong>" + ar[i]['feedback'];
comments.appendChild(paele);
}
anewdiv.appendChild(comments);

const arcomme = document.createElement("div");
arcomme.className = "commentdiv";
arcomme.innerHTML = `<label for="ratingSelect" >Select a rating from 1 to 5:   </label>
<select id="ratingSelect">
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>
<div>
<label for='feedback' >Comment:   </label>
<input id="feedback" placeholder="Enter your feedback here..."></input>
</div>`

anewdiv.appendChild(arcomme);
//  const ratingStars = document.creat("ratingStars");
//       for (let i = 1; i <= 5; i++) {
//         const star = document.createElement("span");
//         star.setAttribute("onclick", "rate(" + i + ")");
//         ratingStars.appendChild(star);
//       }

//       anewdiv.appendChild(ratingStars);
// const atextarea = document.createElement("textarea");
// atextarea.className = "textarea";
// atextarea.placeholder = "Enter your feedback here";

const btndiv = document.createElement("div");
btndiv.className='buttonsdiv';
const submitbutton = document.createElement("button");
submitbutton.innerHTML = "Submit";
submitbutton.className = "save-btn";
submitbutton.onclick = function(){
    submitcomment(imdbID,title, year, genre, plot);
}

const cancelbtn = document.createElement("button");
cancelbtn.innerHTML = "Close";
cancelbtn.className = "close-btn";
cancelbtn.onclick = function(){
    closeModal();
}

btndiv.appendChild(submitbutton);
btndiv.appendChild(cancelbtn);

// anewdiv.appendChild(alabel);
// anewdiv.appendChild(atextarea);
 anewdiv.appendChild(btndiv);

 modalcontent.appendChild(anewdiv);
 console.log("error");
      modal.style.display = "block";
    }

    let selectedRating = 0;

    function submitcomment(imdbID,title, year, genre, plot){
        const rating = document.getElementById('ratingSelect').value;
        const feedback = document.getElementById('feedback').value;

        var moviereview = {
            "rating" : rating,
            'feedback' : feedback,
        }
        var a = [];
        a = JSON.parse(localStorage.getItem(imdbID)) || [];
        a.push(moviereview);
        console.log(moviereview);
        localStorage[imdbID]= JSON.stringify(a);
closeModal();
    }
    function rate(rating) {
      selectedRating = rating;
      highlightStars();
    }

    function highlightStars() {
      const stars = document.querySelectorAll(".rating > span");
      stars.forEach((star, index) => {
        if (index < selectedRating) {
          star.style.color = "gold";
        } else {
          star.style.color = "gray";
        }
      });
    }

    // Function to close the modal
    function closeModal() {
        document.getElementById("modalcontent").innerHTML = "";
      modal.style.display = "none";
      body.style.overflow = "auto";
    }

    // Event listeners