document.addEventListener('DOMContentLoaded', () => {
    // Check If This Is The User's First Visit
    const isFirstVisit = !localStorage.getItem('lkzr_visited');
    
    if (isFirstVisit) {
        // Show Enhanced Preloader For First-Time Visitors
        runPreloader();
        localStorage.setItem('lkzr_visited', 'true');
    } else {
        // Hide Preloader Immediately For Returning Visitors
        document.getElementById('preloader').style.display = 'none';
        initializeApplication();
    }

    // Creative Preloader Animation Sequence
    function runPreloader() {
        const preloader = document.getElementById('preloader');
        const progressBar = document.getElementById('preloaderBar');
        const percentageDisplay = document.getElementById('preloaderPercent');
        
        let currentProgress = 0;
        const totalDuration = 5000; // 5 Seconds Loading Experience
        const updateInterval = 50;
        const steps = totalDuration / updateInterval;
        const incrementValue = 100 / steps;
        
        const loadingMessages = [
            "Initializing Movie Database...",
            "Loading High-Quality Posters...",
            "Preparing Personalized Recommendations...",
            "Almost Ready To Explore...",
            "Welcome To Your Cinema Journey!"
        ];
        
        const progressInterval = setInterval(() => {
            currentProgress += incrementValue;
            
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(progressInterval);
                
                progressBar.style.width = '100%';
                percentageDisplay.textContent = '100%';
                
                // Gracefully Hide Preloader
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        initializeApplication();
                    }, 600);
                }, 600);
            } else {
                progressBar.style.width = currentProgress + '%';
                percentageDisplay.textContent = Math.floor(currentProgress) + '%';
                
                // Update Loading Message Based On Progress
                const messageIndex = Math.floor(currentProgress / 20);
                if (messageIndex < loadingMessages.length) {
                    document.querySelector('.preloader__subtitle').textContent = loadingMessages[messageIndex];
                }
            }
        }, updateInterval);
    }

    // Main Application Initialization
    function initializeApplication() {
        // Comprehensive Movie Database
        const moviesDatabase = {
            "Action": [
                { 
                    title: "Mad Max: Fury Road", 
                    year: 2015, 
                    rating: 8.1, 
                    overview: "In A Post-Apocalyptic Wasteland, A Woman Rebels Against A Tyrannical Ruler In Search For Her Homeland.", 
                    description: "Mad Max: Fury Road Is A Visually Stunning Masterpiece That Redefined Action Cinema. Director George Miller Creates An Exhilarating 2-Hour Chase Sequence Filled With Practical Effects, Feminist Themes, And Incredible World-Building. Charlize Theron's Imperator Furiosa Became An Iconic Character Representing Strength And Redemption.",
                    poster: "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg"
                },
                { 
                    title: "John Wick", 
                    year: 2014, 
                    rating: 7.4, 
                    overview: "An Ex-Hitman Comes Out Of Retirement To Track Down The Gangsters That Killed His Dog And Took Everything From Him.", 
                    description: "John Wick Revolutionized Action Choreography With Its Unique Blend Of Gun-Fu And Stylish Neo-Noir Aesthetics. Keanu Reeves Delivers A Career-Defining Performance As The Legendary Assassin, Creating An Entire Cinematic Universe Built On Respect, Revenge, And The Power Of A Man With Nothing Left To Lose.",
                    poster: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_FMjpg_UX1000_.jpg"
                },
                { 
                    title: "Die Hard", 
                    year: 1988, 
                    rating: 8.2, 
                    overview: "A New York City Police Officer Tries To Save His Estranged Wife And Several Others Taken Hostage By Terrorists During A Christmas Party.", 
                    description: "Die Hard Set The Gold Standard For Action Films And Created The Everyman Hero Archetype. Bruce Willis's John McClane Proved That Heroes Could Be Vulnerable, Witty, And Relatable. The Film's Perfect Balance Of Tension, Humor, And Explosive Action Makes It The Ultimate Christmas Movie That Never Gets Old.",
                    poster: "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg"
                }
            ],
            "Drama": [
                { 
                    title: "The Shawshank Redemption", 
                    year: 1994, 
                    rating: 9.3, 
                    overview: "Two Imprisoned Men Bond Over A Number Of Years, Finding Solace And Eventual Redemption Through Acts Of Common Decency.", 
                    description: "The Shawshank Redemption Stands As Cinema's Greatest Testament To Hope And Human Dignity. Based On Stephen King's Novella, Frank Darabont Crafts A Story About Andy Dufresne's Twenty-Year Journey Through Prison's Brutality While Maintaining His Spirit. Tim Robbins And Morgan Freeman Deliver Career-Best Performances In This Timeless Classic About Friendship That Transcends All Barriers.",
                    poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg"
                },
                { 
                    title: "The Green Mile", 
                    year: 1999, 
                    rating: 8.6, 
                    overview: "The Lives Of Guards On Death Row Are Affected By One Of Their Charges: A Black Man Accused Of Murder, Who Has A Mysterious Gift.", 
                    description: "The Green Mile Blends Magical Realism With Heartbreaking Drama As It Explores Miracles, Injustice, And Human Cruelty. Set On A 1930s Death Row, The Film Follows Paul Edgecomb's Encounters With John Coffey, A Gentle Giant With Supernatural Powers. Tom Hanks Leads An Ensemble Cast In This Emotional Journey That Questions The Nature Of Justice And Mercy.",
                    poster: "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_FMjpg_UX1000_.jpg"
                },
                { 
                    title: "Fight Club", 
                    year: 1999, 
                    rating: 8.8, 
                    overview: "An Insomniac Office Worker And A Devil-May-Care Soapmaker Form An Underground Fight Club That Evolves Into Something Much, Much More.", 
                    description: "Fight Club Remains One Of Cinema's Most Provocative And Misunderstood Masterpieces. David Fincher's Adaptation Of Chuck Palahniuk's Novel Dissects Consumer Culture, Masculinity, And Identity With Brutal Honesty. Edward Norton And Brad Pitt Deliver Iconic Performances In A Film That's Equal Parts Social Satire, Psychological Thriller, And Underground Rebellion.",
                    poster: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg"
                }
            ],
            "Sci-Fi": [
                { 
                    title: "Interstellar", 
                    year: 2014, 
                    rating: 8.6, 
                    overview: "A Team Of Explorers Travel Through A Wormhole In Space In An Attempt To Ensure Humanity's Survival.", 
                    description: "Interstellar Is Christopher Nolan's Ambitious Epic That Marries Hard Scientific Accuracy With Profound Human Emotion. When Earth Becomes Uninhabitable, A Group Of Astronauts Ventures Through A Wormhole Near Saturn To Find A New Home. Matthew McConaughey Delivers A Heart-Wrenching Performance About Love Transcending Time And Space, Backed By Hans Zimmer's Legendary Score.",
                    poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg"
                },
                { 
                    title: "Blade Runner 2049", 
                    year: 2017, 
                    rating: 8.0, 
                    overview: "Young Blade Runner K's Discovery Of A Long-Buried Secret Leads Him To Track Down Former Blade Runner Rick Deckard.", 
                    description: "Blade Runner 2049 Expands Ridley Scott's Vision Into A Philosophical Meditation On Memory, Identity, And What It Means To Be Human. Denis Villeneuve Creates A Visually Stunning World Where Replicant K Questions His Reality While Hunting For A Mystery That Could Change Society Forever. Roger Deakins' Oscar-Winning Cinematography Makes Every Frame A Work Of Art.",
                    poster: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_FMjpg_UX1000_.jpg"
                },
                { 
                    title: "The Matrix", 
                    year: 1999, 
                    rating: 8.7, 
                    overview: "A Computer Hacker Learns From Mysterious Rebels About The True Nature Of His Reality And His Role In The War Against Its Controllers.", 
                    description: "The Matrix Changed Cinema Forever With Its Revolutionary Bullet-Time Effects And Cyberpunk Philosophy. The Wachowskis Created A World Where Reality Is An Illusion And One Man Must Choose Between The Blue Pill Of Comfort Or The Red Pill Of Truth. Keanu Reeves' Neo Embodies The Hero's Journey In The Digital Age, Influencing Countless Films That Followed.",
                    poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg"
                }
            ],
            "Comedy": [
                { 
                    title: "The Mask", 
                    year: 1994, 
                    rating: 6.9, 
                    overview: "Bank Clerk Stanley Ipkiss Is Transformed Into A Manic Superhero When He Wears A Mysterious Mask.", 
                    description: "The Mask Showcased Jim Carrey At His Physical Comedy Peak, Combining Live-Action With Groundbreaking CGI. Based On The Darker Comics, The Film Transforms Stanley Ipkiss From A Timid Banker Into A Green-Faced Trickster Who Can Bend Reality. Cameron Diaz's Film Debut And Carrey's Rubber-Faced Antics Created A Perfect Blend Of Cartoon Chaos And Romantic Comedy.",
                    poster: "https://m.media-amazon.com/images/M/MV5BOWExYjI5MzktNTRhNi00Nzg2LThkZmQtYWVkYjRlYWI2MDQ4XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg"
                },
                { 
                    title: "Superbad", 
                    year: 2007, 
                    rating: 7.6, 
                    overview: "Two Co-Dependent High School Seniors Are Forced To Deal With Separation Anxiety After Their Plan To Stage A Booze-Soaked Party Goes Awry.", 
                    description: "Superbad Captures The Awkwardness Of Teenage Friendship With Unflinching Honesty And Hilarious Dialogue. Written By Seth Rogen And Evan Goldberg, The Film Follows Seth And Evan's Desperate Attempt To Buy Alcohol For A Party Before They Graduate. Michael Cera And Jonah Hill's Chemistry, Along With Christopher Mintz-Plasse's Iconic McLovin, Created An Instant Comedy Classic.",
                    poster: "https://m.media-amazon.com/images/M/MV5BMTc0NjIyMjA2OF5BMl5BanBnXkFtZTcwMzIxNDE1MQ@@._V1_FMjpg_UX1000_.jpg"
                },
                { 
                    title: "Home Alone", 
                    year: 1990, 
                    rating: 7.7, 
                    overview: "An Eight-Year-Old Troublemaker Must Protect His House From A Pair Of Burglars When He Is Accidentally Left Home Alone By His Family.", 
                    description: "Home Alone Has Become An Unskippable Holiday Tradition For Generations Of Viewers. Macaulay Culkin's Kevin McCallister Uses Ingenious Booby Traps To Defend His Suburban Home Against Joe Pesci And Daniel Stern's Bumbling Thieves. John Williams' Score And John Hughes' Script Create Heartwarming Moments Between The Chaos, Reminding Us That Family Matters Most During The Holidays.",
                    poster: "https://m.media-amazon.com/images/M/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg"
                }
            ]
        };

        // Curated Featured Movies Collection
        const featuredMovies = {
            madmax: { 
                title: "Mad Max: Fury Road", 
                year: 2015, 
                rating: 8.1, 
                description: "A Post-Apocalyptic Action Masterpiece Where Furiosa Teams With Max To Escape A Tyrant. Director George Miller Creates Non-Stop Thrills With Practical Effects And Feminist Themes That Redefined The Genre.",
                poster: "https://m.media-amazon.com/images/S/pv-target-images/e629b804d2a22f8dff121cc0d251d2d23f0689c83a0af9941fbd127a250c10eb._SX1080_FMjpg_.jpg", 
                genre: "Action" 
            },
            shawshank: { 
                title: "The Shawshank Redemption", 
                year: 1994, 
                rating: 9.3, 
                description: "Tim Robbins And Morgan Freeman Star In This Powerful Story Of Hope And Friendship Inside Prison Walls. Frank Darabont's Direction Creates An Unforgettable Journey About Maintaining Human Dignity Against All Odds.",
                poster: "https://haryantosatria.wordpress.com/wp-content/uploads/2013/06/shawshank.jpg", 
                genre: "Drama" 
            },
            interstellar: { 
                title: "Interstellar", 
                year: 2014, 
                rating: 8.6, 
                description: "Christopher Nolan's Sci-Fi Epic About Astronauts Traveling Through A Wormhole To Save Humanity. Featuring Stunning Visuals, Hans Zimmer's Score, And A Heartbreaking Performance From Matthew McConaughey About Love Transcending Time.",
                poster: "https://n1s1.hsmedia.ru/d5/dd/88/d5dd8844f16b3217d32fdb68babb826d/5000x2312_0xXG9AwvEa_2935154968444919576.jpg", 
                genre: "Sci-Fi" 
            },
            matrix: { 
                title: "The Matrix", 
                year: 1999, 
                rating: 8.7, 
                description: "Keanu Reeves Discovers Reality Is An Illusion In This Revolutionary Sci-Fi Action Film. The Wachowskis' Vision Changed Cinema Forever With Bullet-Time Effects And Deep Philosophical Questions About Choice And Destiny.",
                poster: "https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABRS_jUYOWbmjz_3_glacL1IarASWYAztOFzX0njqwwp95OXcnPWms-8MHRv2YZh2FOFU0M0KFUI1L4NKpC15MRUTnQN8nMxQc7CH.jpg?r=032", 
                genre: "Sci-Fi" 
            }
        };

        // Application State Management
        let likedMovies = JSON.parse(localStorage.getItem('lkzr_likes') || '[]');
        let favoriteMovies = JSON.parse(localStorage.getItem('lkzr_favs') || '[]');
        let currentSelectedGenre = "Action";
        let currentFeaturedMovie = null;
        let userHasRated = localStorage.getItem('lkzr_rated') === 'true';

        // Global Rating Statistics
        let globalRatingStats = { 
            totalVotes: 0, 
            totalSum: 0, 
            averageRating: 0 
        };

        // DOM Element References
        const modalElement = document.getElementById('movieModal');
        const modalPosterImage = document.getElementById('modalPosterImg');
        const modalTitleElement = document.getElementById('modalTitle');
        const modalMetaElement = document.getElementById('modalMeta');
        const modalDescriptionElement = document.getElementById('modalDesc');
        const carouselElement = document.getElementById('carousel');
        const genreButtonElements = document.querySelectorAll('.genre-btn');
        const featuredTitleElement = document.getElementById('featuredTitle');
        const featuredDescriptionElement = document.getElementById('featuredDesc');
        const featuredPosterElement = document.getElementById('featuredPoster');
        const quickButtonElements = document.querySelectorAll('.quick-btn');
        const starElements = document.querySelectorAll('.star');
        const globalRatingSpan = document.getElementById('globalRatingValue');
        const globalVotesSpan = document.getElementById('globalVotes');
        const searchInputElement = document.getElementById('searchInput');
        const sortSelectElement = document.getElementById('sortSelect');
        const quizSubmitButton = document.getElementById('quizSubmit');
        const quizResultElement = document.getElementById('quizResult');
        const ratingMessageElement = document.getElementById('ratingMessage');

        // Update Global Rating Display
        function updateGlobalRatingDisplay() {
            globalRatingSpan.textContent = globalRatingStats.averageRating.toFixed(1);
            globalVotesSpan.textContent = globalRatingStats.totalVotes;
        }

        // Check And Display Rating Status
        function checkUserRatingStatus() {
            if (userHasRated) {
                ratingMessageElement.textContent = '✨ Thank You For Contributing To Our Global Community! ✨';
                starElements.forEach(star => star.classList.add('rated'));
            } else {
                ratingMessageElement.textContent = '🎬 Share Your Experience - Rate Our Portal Once';
            }
        }

        // Filter And Sort Movies Based On User Input
        function filterAndSortMovies(moviesToFilter, searchQuery, sortMethod) {
            let filteredResults = searchQuery 
                ? moviesToFilter.filter(movie => 
                    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    movie.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    movie.description.toLowerCase().includes(searchQuery.toLowerCase())
                  ) 
                : [...moviesToFilter];
            
            switch(sortMethod) {
                case 'name':
                    filteredResults.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'year':
                    filteredResults.sort((a, b) => b.year - a.year);
                    break;
                case 'rating':
                    filteredResults.sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    break;
            }
            
            return filteredResults;
        }

        // Render Movie Cards For Specific Genre
        function renderMoviesByGenre(genreName) {
            const genreMovies = moviesDatabase[genreName] || [];
            const searchTerm = searchInputElement.value;
            const selectedSort = sortSelectElement.value;
            const filteredMovies = filterAndSortMovies(genreMovies, searchTerm, selectedSort);
            
            if (filteredMovies.length === 0) {
                return '<div class="no-results">🎥 No Movies Found Matching Your Search</div>';
            }
            
            return filteredMovies.map(movie => `
                <div class="card show" data-movie='${JSON.stringify(movie).replace(/'/g, "&#39;")}'>
                    <div class="card-poster">
                        <img src="${movie.poster}" alt="${movie.title} Poster" 
                             onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'400\'><rect fill=\'%232a2538\' width=\'100%\' height=\'100%\'/><text fill=\'white\' x=\'50\' y=\'200\' font-size=\'16\' text-anchor=\'middle\'>${movie.title}</text></svg>'">
                    </div>
                    <div class="card-title-row">
                        <span class="card-title">${movie.title}</span>
                        <span class="card-meta">${movie.year} ★${movie.rating}</span>
                    </div>
                    <div class="card-desc">${movie.overview}</div>
                    <div class="card-actions">
                        <span class="pill">${genreName}</span>
                        <button class="like-btn ${likedMovies.includes(movie.title) ? 'active' : ''}" 
                                onclick="event.stopPropagation(); window.toggleLike('${movie.title.replace(/'/g, "\\'")}', this)">
                            ${likedMovies.includes(movie.title) ? '❤️ Liked' : '🤍 Like'}
                        </button>
                        <button class="fav-btn ${favoriteMovies.includes(movie.title) ? 'active' : ''}" 
                                onclick="event.stopPropagation(); window.toggleFav('${movie.title.replace(/'/g, "\\'")}', this)">
                            ${favoriteMovies.includes(movie.title) ? '⭐ In Favorites' : '☆ Add To Favorites'}
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Rebuild Complete Carousel With All Sections
        function rebuildCarouselContent() {
            let carouselHTML = '';
            
            // Generate Genre Sections
            for (let genre of Object.keys(moviesDatabase)) {
                carouselHTML += `
                    <div class="panel-col">
                        <h3 class="genre-title">${genre} Collection</h3>
                        <div class="grid">
                            ${renderMoviesByGenre(genre)}
                        </div>
                    </div>
                `;
            }
            
            // Generate Favorites Section
            carouselHTML += `
                <div class="panel-col">
                    <h3 class="genre-title">⭐ Your Personal Favorites Collection</h3>
                    <div class="grid">
            `;
            
            if (favoriteMovies.length > 0) {
                favoriteMovies.forEach(movieTitle => {
                    // Find Movie In Database
                    let foundMovie = null;
                    for (let genre in moviesDatabase) {
                        const match = moviesDatabase[genre].find(m => m.title === movieTitle);
                        if (match) {
                            foundMovie = match;
                            break;
                        }
                    }
                    
                    if (foundMovie) {
                        carouselHTML += `
                            <div class="card show" data-movie='${JSON.stringify(foundMovie).replace(/'/g, "&#39;")}'>
                                <div class="card-poster"><img src="${foundMovie.poster}" alt="${foundMovie.title}"></div>
                                <div class="card-title-row">
                                    <span class="card-title">${foundMovie.title}</span>
                                    <span class="card-meta">${foundMovie.year} ★${foundMovie.rating}</span>
                                </div>
                                <div class="card-desc">${foundMovie.overview}</div>
                                <div class="card-actions">
                                    <span class="pill">Favorite</span>
                                    <button class="like-btn active" 
                                            onclick="event.stopPropagation(); window.toggleLike('${foundMovie.title.replace(/'/g, "\\'")}', this)">❤️ Liked</button>
                                    <button class="fav-btn active" 
                                            onclick="event.stopPropagation(); window.toggleFav('${foundMovie.title.replace(/'/g, "\\'")}', this)">⭐ In Favorites</button>
                                </div>
                            </div>
                        `;
                    }
                });
            } else {
                carouselHTML += '<p class="no-favorites">✨ Your Favorites Collection Is Empty. Start Adding Movies You Love!</p>';
            }
            
            carouselHTML += '</div></div>';
            carouselElement.innerHTML = carouselHTML;
            attachCardClickListeners();
        }

        // Attach Click Listeners To Movie Cards
        function attachCardClickListeners() {
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', (event) => {
                    // Prevent Triggering When Clicking Buttons
                    if (!event.target.classList.contains('like-btn') && 
                        !event.target.classList.contains('fav-btn')) {
                        const movieData = JSON.parse(card.getAttribute('data-movie'));
                        openMovieModal(movieData);
                    }
                });
            });
        }

        // Set Featured Movie Display
        function setFeaturedMovie(movieKey) {
            const movie = featuredMovies[movieKey];
            if (!movie) return;
            
            currentFeaturedMovie = movie;
            featuredTitleElement.textContent = movie.title;
            featuredDescriptionElement.textContent = movie.description;
            featuredPosterElement.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;
            
            // Update Active Button State
            quickButtonElements.forEach(btn => btn.classList.remove('active'));
            const activeButton = document.querySelector(`.quick-btn[data-movie="${movieKey}"]`);
            if (activeButton) activeButton.classList.add('active');
        }

        // Select Random Featured Movie
        function selectRandomFeaturedMovie() {
            const movieKeys = Object.keys(featuredMovies);
            const randomKey = movieKeys[Math.floor(Math.random() * movieKeys.length)];
            setFeaturedMovie(randomKey);
        }

        // Open Detailed Movie Modal
        function openMovieModal(movie) {
            modalPosterImage.src = movie.poster;
            modalTitleElement.textContent = movie.title;
            modalMetaElement.textContent = `${movie.year} • ★ ${movie.rating} Rating`;
            modalDescriptionElement.textContent = movie.description;
            
            // Update Modal Button States
            document.getElementById('modalLike').innerHTML = likedMovies.includes(movie.title) ? '❤️ Liked' : '🤍 Like';
            document.getElementById('modalFav').innerHTML = favoriteMovies.includes(movie.title) ? '⭐ In Favorites' : '☆ Add To Favorites';
            
            modalElement.setAttribute('data-current-movie', JSON.stringify(movie));
            modalElement.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        // Close Movie Modal
        function closeMovieModal() {
            modalElement.classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        // Toggle Like Status For A Movie
        window.toggleLike = (movieTitle, buttonElement) => {
            if (likedMovies.includes(movieTitle)) {
                likedMovies = likedMovies.filter(title => title !== movieTitle);
                buttonElement.innerHTML = '🤍 Like';
                buttonElement.classList.remove('active');
            } else {
                likedMovies.push(movieTitle);
                buttonElement.innerHTML = '❤️ Liked';
                buttonElement.classList.add('active');
            }
            
            localStorage.setItem('lkzr_likes', JSON.stringify(likedMovies));
            
            // Update Modal Button If Open
            if (modalElement.classList.contains('show')) {
                const currentMovie = JSON.parse(modalElement.getAttribute('data-current-movie'));
                if (currentMovie.title === movieTitle) {
                    document.getElementById('modalLike').innerHTML = likedMovies.includes(movieTitle) ? '❤️ Liked' : '🤍 Like';
                }
            }
        };

        // Toggle Favorite Status For A Movie
        window.toggleFav = (movieTitle, buttonElement) => {
            if (favoriteMovies.includes(movieTitle)) {
                favoriteMovies = favoriteMovies.filter(title => title !== movieTitle);
                buttonElement.innerHTML = '☆ Add To Favorites';
                buttonElement.classList.remove('active');
            } else {
                favoriteMovies.push(movieTitle);
                buttonElement.innerHTML = '⭐ In Favorites';
                buttonElement.classList.add('active');
            }
            
            localStorage.setItem('lkzr_favs', JSON.stringify(favoriteMovies));
            
            // Update Modal Button If Open
            if (modalElement.classList.contains('show')) {
                const currentMovie = JSON.parse(modalElement.getAttribute('data-current-movie'));
                if (currentMovie.title === movieTitle) {
                    document.getElementById('modalFav').innerHTML = favoriteMovies.includes(movieTitle) ? '⭐ In Favorites' : '☆ Add To Favorites';
                }
            }
            
            // Refresh Carousel If On Favorites Page
            if (currentSelectedGenre === 'Favorites') {
                rebuildCarouselContent();
                switchToGenre('Favorites');
            }
        };

        // Switch Between Genres
        function switchToGenre(genreName) {
            genreButtonElements.forEach(btn => btn.classList.remove('active'));
            const targetButton = document.querySelector(`.genre-btn[data-genre="${genreName}"]`);
            if (targetButton) targetButton.classList.add('active');
            
            const genreIndex = Object.keys(moviesDatabase).indexOf(genreName);
            if (genreIndex >= 0) {
                carouselElement.style.transform = `translateX(-${genreIndex * 100}%)`;
            } else if (genreName === 'Favorites') {
                carouselElement.style.transform = `translateX(-${Object.keys(moviesDatabase).length * 100}%)`;
            }
            
            currentSelectedGenre = genreName;
        }

        // Handle Portal Rating
        function handlePortalRating(ratingValue) {
            if (userHasRated) {
                document.getElementById('ratingFeedback').textContent = '✨ You Have Already Rated Our Portal. Thank You For Your Contribution! ✨';
                return;
            }

            // Update Star Display
            starElements.forEach((star, index) => {
                if (index < ratingValue) {
                    star.classList.add('active');
                    star.textContent = '★';
                } else {
                    star.classList.remove('active');
                    star.textContent = '☆';
                }
            });

            // Update Global Statistics
            globalRatingStats.totalVotes += 1;
            globalRatingStats.totalSum += ratingValue;
            globalRatingStats.averageRating = globalRatingStats.totalSum / globalRatingStats.totalVotes;

            // Save User Rating
            localStorage.setItem('lkzr_rated', 'true');
            userHasRated = true;

            // Display Thank You Message
            document.getElementById('ratingFeedback').textContent = `🌟 Thank You For Your ${ratingValue}-Star Rating! Your Voice Matters In Our Global Community! 🌟`;
            ratingMessageElement.textContent = "💫 Your Rating Has Been Added To Our Worldwide Community Score!";
            
            updateGlobalRatingDisplay();
        }

        // Handle Quiz Submission
        function handleQuizSubmission() {
            const selectedCheckboxes = document.querySelectorAll('.quiz-option input:checked');
            
            if (selectedCheckboxes.length === 0) {
                quizResultElement.textContent = '🎯 Please Select At Least One Movie Preference To Get Personalized Recommendations';
                return;
            }

            const selectedGenres = [...selectedCheckboxes].map(checkbox => checkbox.dataset.target);
            
            // Collect Recommendations
            let recommendedMovies = [];
            selectedGenres.forEach(genre => {
                if (moviesDatabase[genre]) {
                    recommendedMovies = recommendedMovies.concat(moviesDatabase[genre]);
                }
            });

            // Remove Duplicates
            recommendedMovies = recommendedMovies.filter((movie, index, selfArray) => 
                index === selfArray.findIndex(m => m.title === movie.title)
            );

            // Display Top 3 Recommendations
            if (recommendedMovies.length > 0) {
                const topPicks = recommendedMovies.slice(0, 3);
                const recommendationsHTML = topPicks.map(movie => 
                    `<div class="recommendation-item">
                        <strong>${movie.title}</strong> (${movie.year}) — ★ ${movie.rating}
                    </div>`
                ).join('');
                
                quizResultElement.innerHTML = `
                    <div class="recommendations-title">🎬 Based On Your Preferences, We Recommend:</div>
                    ${recommendationsHTML}
                `;
            } else {
                quizResultElement.textContent = '📽️ No Specific Recommendations Found. Try Different Combinations!';
            }
        }

        // ===== EVENT LISTENERS SETUP =====

        // Genre Button Listeners
        genreButtonElements.forEach(button => {
            button.addEventListener('click', () => switchToGenre(button.dataset.genre));
        });

        // Featured Movie Quick Buttons
        quickButtonElements.forEach(button => {
            button.addEventListener('click', () => setFeaturedMovie(button.dataset.movie));
        });

        // Random Featured Movie Button
        document.getElementById('featuredRandom').addEventListener('click', selectRandomFeaturedMovie);

        // Open Featured Movie Button
        document.getElementById('featuredOpen').addEventListener('click', () => {
            if (currentFeaturedMovie) {
                openMovieModal(currentFeaturedMovie);
            } else {
                selectRandomFeaturedMovie();
                setTimeout(() => {
                    if (currentFeaturedMovie) openMovieModal(currentFeaturedMovie);
                }, 100);
            }
        });

        // Search Input Listener
        searchInputElement.addEventListener('input', rebuildCarouselContent);

        // Sort Select Listener
        sortSelectElement.addEventListener('change', rebuildCarouselContent);

        // Modal Close Button
        document.getElementById('modalClose').addEventListener('click', closeMovieModal);

        // Modal Like Button
        document.getElementById('modalLike').addEventListener('click', function() {
            const currentMovie = JSON.parse(modalElement.getAttribute('data-current-movie'));
            if (currentMovie) {
                window.toggleLike(currentMovie.title, this);
            }
        });

        // Modal Favorite Button
        document.getElementById('modalFav').addEventListener('click', function() {
            const currentMovie = JSON.parse(modalElement.getAttribute('data-current-movie'));
            if (currentMovie) {
                window.toggleFav(currentMovie.title, this);
            }
        });

        // Modal Trailer Button - Search YouTube
        document.getElementById('modalTrailer').addEventListener('click', () => {
            const currentMovie = JSON.parse(modalElement.getAttribute('data-current-movie'));
            if (currentMovie) {
                const searchQuery = encodeURIComponent(currentMovie.title + ' official trailer');
                window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
            }
        });

        // Rating Stars Listeners
        starElements.forEach(star => {
            star.addEventListener('click', () => {
                const ratingValue = parseInt(star.dataset.value);
                handlePortalRating(ratingValue);
            });
        });

        // Quiz Submit Button
        quizSubmitButton.addEventListener('click', handleQuizSubmission);

        // Close Modal When Clicking Outside
        modalElement.addEventListener('click', (event) => {
            if (event.target === modalElement) {
                closeMovieModal();
            }
        });

        // ===== INITIALIZATION =====
        rebuildCarouselContent();
        switchToGenre('Action');
        selectRandomFeaturedMovie();
        
        // Initialize Rating Display
        globalRatingStats.totalVotes = 0;
        globalRatingStats.totalSum = 0;
        globalRatingStats.averageRating = 0;
        checkUserRatingStatus();
        updateGlobalRatingDisplay();

        // Make Toggle Functions Globally Available
        window.toggleLike = window.toggleLike;
        window.toggleFav = window.toggleFav;
    }
});