document.addEventListener('DOMContentLoaded', () => {
    const isFirst = !localStorage.getItem('lkzr_visited');
    if (isFirst) {
        runPreloader();
        localStorage.setItem('lkzr_visited', 'true');
    } else {
        document.getElementById('preloader').style.display = 'none';
        initApp();
    }

    function runPreloader() {
        const preloader = document.getElementById('preloader');
        const bar = document.getElementById('preloaderBar');
        const percent = document.getElementById('preloaderPercent');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                bar.style.width = '100%';
                percent.textContent = '100%';
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        initApp();
                    }, 500);
                }, 400);
            }
            bar.style.width = progress + '%';
            percent.textContent = progress + '%';
        }, 50);
    }

    function initApp() {
        // Данные (такие же, как в оригинале)
        const moviesData = {
            "Action": [
                { title: "Mad Max: Fury Road", year: 2015, rating: 8.1, overview: "В постапокалиптической пустоши женщина восстаёт против тирана.", description: "Безумный Макс — визуально ошеломляющий боевик с Шарлиз Терон.", poster: "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg" },
                { title: "John Wick", year: 2014, rating: 7.4, overview: "Наёмник выходит на тропу войны из-за убитой собаки.", description: "Стильный неонуар с Киану Ривзом.", poster: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_FMjpg_UX1000_.jpg" },
                { title: "Die Hard", year: 1988, rating: 8.2, overview: "Полицейский спасает заложников в небоскрёбе.", description: "Эталонный рождественский экшен.", poster: "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg" }
            ],
            "Drama": [
                { title: "The Shawshank Redemption", year: 1994, rating: 9.3, overview: "Дружба и надежда в тюремных стенах.", description: "Эпическая драма о надежде.", poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg" },
                { title: "The Green Mile", year: 1999, rating: 8.6, overview: "Сверхъестественное в блоке смертников.", description: "Мистическая драма.", poster: "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_FMjpg_UX1000_.jpg" },
                { title: "Fight Club", year: 1999, rating: 8.8, overview: "Подпольные бои и кризис идентичности.", description: "Культовый фильм Финчера.", poster: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg" }
            ],
            "Sci-Fi": [
                { title: "Interstellar", year: 2014, rating: 8.6, overview: "Путешествие через червоточину.", description: "Научная фантастика Нолана.", poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg" },
                { title: "Blade Runner 2049", year: 2017, rating: 8.0, overview: "Охотник на андроидов ищет Рика Декарда.", description: "Визуальный шедевр Вильнёва.", poster: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_FMjpg_UX1000_.jpg" },
                { title: "The Matrix", year: 1999, rating: 8.7, overview: "Хакер узнаёт правду о реальности.", description: "Революция в экшене.", poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg" }
            ],
            "Comedy": [
                { title: "The Mask", year: 1994, rating: 6.9, overview: "Скромный клерк находит маску.", description: "Джим Керри в ударе.", poster: "https://m.media-amazon.com/images/M/MV5BOWExYjI5MzktNTRhNi00Nzg2LThkZmQtYWVkYjRlYWI2MDQ4XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg" },
                { title: "Superbad", year: 2007, rating: 7.6, overview: "Старшеклассники хотят устроить вечеринку.", description: "Культовая молодёжная комедия.", poster: "https://m.media-amazon.com/images/M/MV5BMTc0NjIyMjA2OF5BMl5BanBnXkFtZTcwMzIxNDE1MQ@@._V1_FMjpg_UX1000_.jpg" },
                { title: "Home Alone", year: 1990, rating: 7.7, overview: "Малыш защищает дом от грабителей.", description: "Классика на Рождество.", poster: "https://m.media-amazon.com/images/M/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg" }
            ]
        };

        const featured = {
            madmax: { title: "Mad Max", year:2015, rating:8.1, description:"Безумный Макс: Дорога ярости", poster:"https://m.media-amazon.com/images/S/pv-target-images/e629b804d2a22f8dff121cc0d251d2d23f0689c83a0af9941fbd127a250c10eb._SX1080_FMjpg_.jpg", genre:"Action" },
            shawshank: { title:"Побег из Шоушенка", year:1994, rating:9.3, description:"Надежда умирает последней", poster:"https://haryantosatria.wordpress.com/wp-content/uploads/2013/06/shawshank.jpg", genre:"Drama" },
            interstellar: { title:"Интерстеллар", year:2014, rating:8.6, description:"Путешествие за грань", poster:"https://n1s1.hsmedia.ru/d5/dd/88/d5dd8844f16b3217d32fdb68babb826d/5000x2312_0xXG9AwvEa_2935154968444919576.jpg", genre:"Sci-Fi" },
            matrix: { title:"Матрица", year:1999, rating:8.7, description:"Добро пожаловать в реальность", poster:"https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABRS_jUYOWbmjz_3_glacL1IarASWYAztOFzX0njqwwp95OXcnPWms-8MHRv2YZh2FOFU0M0KFUI1L4NKpC15MRUTnQN8nMxQc7CH.jpg?r=032", genre:"Sci-Fi" }
        };

        let likes = JSON.parse(localStorage.getItem('lkzr_likes') || '[]');
        let favs = JSON.parse(localStorage.getItem('lkzr_favs') || '[]');
        let currentGenre = "Action";
        let currentFeatured = null;
        let userRated = localStorage.getItem('lkzr_rated') === 'true';

        let globalRating = { total:0, sum:0, avg:0 };

        // Элементы DOM
        const modal = document.getElementById('movieModal');
        const modalImg = document.getElementById('modalPosterImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalMeta = document.getElementById('modalMeta');
        const modalDesc = document.getElementById('modalDesc');
        const carousel = document.getElementById('carousel');
        const genreBtns = document.querySelectorAll('.genre-btn');
        const featuredTitle = document.getElementById('featuredTitle');
        const featuredDesc = document.getElementById('featuredDesc');
        const featuredPoster = document.getElementById('featuredPoster');
        const quickBtns = document.querySelectorAll('.quick-btn');
        const stars = document.querySelectorAll('.star');
        const globalSpan = document.getElementById('globalRatingValue');
        const votesSpan = document.getElementById('globalVotes');
        const searchInp = document.getElementById('searchInput');
        const sortSel = document.getElementById('sortSelect');
        const quizSubmit = document.getElementById('quizSubmit');
        const quizResult = document.getElementById('quizResult');
        const ratingMessage = document.getElementById('ratingMessage');

        function updateGlobals() {
            globalSpan.textContent = globalRating.avg.toFixed(1);
            votesSpan.textContent = globalRating.total;
        }

        function checkRating() {
            if (userRated) {
                ratingMessage.textContent = 'Вы уже оценили портал. Спасибо!';
                stars.forEach(s => s.classList.add('rated'));
            } else {
                ratingMessage.textContent = 'Оцените наш портал (один раз)';
            }
        }

        function filterAndSort(movies, query, sortBy) {
            let filtered = query ? movies.filter(m => m.title.toLowerCase().includes(query.toLowerCase()) || m.overview.toLowerCase().includes(query.toLowerCase())) : movies.slice();
            if (sortBy === 'name') filtered.sort((a,b)=> a.title.localeCompare(b.title));
            if (sortBy === 'year') filtered.sort((a,b)=> b.year - a.year);
            if (sortBy === 'rating') filtered.sort((a,b)=> b.rating - a.rating);
            return filtered;
        }

        function renderGenre(genre) {
            const list = moviesData[genre] || [];
            const query = searchInp.value;
            const sort = sortSel.value;
            const filtered = filterAndSort(list, query, sort);
            if (!filtered.length) return '<div style="padding:20px;color:gray">Ничего не найдено</div>';
            return filtered.map(m => `
                <div class="card show" data-movie='${JSON.stringify(m).replace(/'/g, "&#39;")}'>
                    <div class="card-poster"><img src="${m.poster}" alt="poster" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'300\'><rect fill=\'%23332f44\' width=\'100%\' height=\'100%\'/><text fill=\'white\' x=\'10\' y=\'150\'>Постер</text></svg>'"></div>
                    <div class="card-title-row"><span class="card-title">${m.title}</span><span class="card-meta">${m.year}</span></div>
                    <div class="card-desc">${m.overview}</div>
                    <div class="card-actions"><span class="pill">${genre}</span>
                    <button class="like-btn ${likes.includes(m.title)?'active':''}" onclick="event.stopPropagation(); window.toggleLike('${m.title.replace(/'/g, "\\'")}', this)">${likes.includes(m.title)?'❤️':'🤍'}</button>
                    <button class="fav-btn ${favs.includes(m.title)?'active':''}" onclick="event.stopPropagation(); window.toggleFav('${m.title.replace(/'/g, "\\'")}', this)">${favs.includes(m.title)?'⭐':'☆'}</button>
                    </div>
                </div>
            `).join('');
        }

        function rebuildCarousel() {
            let html = '';
            for (let g of Object.keys(moviesData)) {
                html += `<div class="panel-col"><h3 class="genre-title">${g}</h3><div class="grid">${renderGenre(g)}</div></div>`;
            }
            html += `<div class="panel-col"><h3 class="genre-title">Избранное</h3><div class="grid">`;
            if (favs.length) {
                favs.forEach(title => {
                    let movie = Object.values(moviesData).flat().find(m => m.title === title);
                    if (movie) {
                        html += `
                            <div class="card show" data-movie='${JSON.stringify(movie).replace(/'/g, "&#39;")}'>
                                <div class="card-poster"><img src="${movie.poster}"></div>
                                <div class="card-title-row"><span class="card-title">${movie.title}</span><span class="card-meta">${movie.year}</span></div>
                                <div class="card-desc">${movie.overview}</div>
                                <div class="card-actions"><span class="pill">Избранное</span>
                                <button class="like-btn active" onclick="event.stopPropagation(); window.toggleLike('${movie.title.replace(/'/g, "\\'")}', this)">❤️</button>
                                <button class="fav-btn active" onclick="event.stopPropagation(); window.toggleFav('${movie.title.replace(/'/g, "\\'")}', this)">⭐</button>
                                </div>
                            </div>
                        `;
                    }
                });
            } else html += '<p style="color:gray">Нет избранных</p>';
            html += '</div></div>';
            carousel.innerHTML = html;
            attachCardListeners();
        }

        function attachCardListeners() {
            document.querySelectorAll('.card').forEach(c => {
                c.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('like-btn') && !e.target.classList.contains('fav-btn')) {
                        const m = JSON.parse(c.getAttribute('data-movie'));
                        openModal(m);
                    }
                });
            });
        }

        function setFeatured(key) {
            const m = featured[key];
            if (!m) return;
            currentFeatured = m;
            featuredTitle.textContent = m.title;
            featuredDesc.textContent = m.description;
            featuredPoster.innerHTML = `<img src="${m.poster}" alt="">`;
            quickBtns.forEach(b => b.classList.remove('active'));
            document.querySelector(`.quick-btn[data-movie="${key}"]`)?.classList.add('active');
        }

        function randomFeatured() {
            const keys = Object.keys(featured);
            setFeatured(keys[Math.floor(Math.random()*keys.length)]);
        }

        function openModal(movie) {
            modalImg.src = movie.poster;
            modalTitle.textContent = movie.title;
            modalMeta.textContent = `${movie.year} • ${movie.rating}`;
            modalDesc.textContent = movie.description;
            document.getElementById('modalLike').innerHTML = likes.includes(movie.title) ? '❤️ Лайк' : '🤍 Лайк';
            document.getElementById('modalFav').innerHTML = favs.includes(movie.title) ? '⭐ В избранном' : '☆ В избранное';
            modal.setAttribute('data-current', JSON.stringify(movie));
            modal.classList.add('show');
        }

        window.toggleLike = (title, btn) => {
            if (likes.includes(title)) {
                likes = likes.filter(t => t !== title);
                btn.innerHTML = '🤍';
            } else {
                likes.push(title);
                btn.innerHTML = '❤️';
            }
            btn.classList.toggle('active');
            localStorage.setItem('lkzr_likes', JSON.stringify(likes));
            if (modal.classList.contains('show')) {
                let cur = JSON.parse(modal.getAttribute('data-current'));
                if (cur.title === title) document.getElementById('modalLike').innerHTML = likes.includes(title)?'❤️ Лайк':'🤍 Лайк';
            }
        };

        window.toggleFav = (title, btn) => {
            if (favs.includes(title)) {
                favs = favs.filter(t => t !== title);
                btn.innerHTML = '☆';
            } else {
                favs.push(title);
                btn.innerHTML = '⭐';
            }
            btn.classList.toggle('active');
            localStorage.setItem('lkzr_favs', JSON.stringify(favs));
            if (modal.classList.contains('show')) {
                let cur = JSON.parse(modal.getAttribute('data-current'));
                if (cur.title === title) document.getElementById('modalFav').innerHTML = favs.includes(title)?'⭐ В избранном':'☆ В избранное';
            }
            if (currentGenre === 'Favorites') showGenre('Favorites');
        };

        function showGenre(genre) {
            genreBtns.forEach(b => b.classList.remove('active'));
            document.querySelector(`.genre-btn[data-genre="${genre}"]`)?.classList.add('active');
            const index = Object.keys(moviesData).indexOf(genre);
            if (index >= 0) {
                carousel.style.transform = `translateX(-${index * 100}%)`;
            } else if (genre === 'Favorites') {
                carousel.style.transform = `translateX(-${Object.keys(moviesData).length * 100}%)`;
            }
            currentGenre = genre;
        }

        // Инициализация
        rebuildCarousel();
        randomFeatured();

        // События
        genreBtns.forEach(b => b.addEventListener('click', () => showGenre(b.dataset.genre)));
        quickBtns.forEach(b => b.addEventListener('click', () => setFeatured(b.dataset.movie)));
        document.getElementById('featuredRandom').addEventListener('click', randomFeatured);
        document.getElementById('featuredOpen').addEventListener('click', ()=>{
            if (currentFeatured) openModal(currentFeatured); else randomFeatured();
        });
        searchInp.addEventListener('input', rebuildCarousel);
        sortSel.addEventListener('change', rebuildCarousel);
        document.getElementById('modalClose').addEventListener('click', ()=> modal.classList.remove('show'));
        document.getElementById('modalLike').addEventListener('click', function(){
            let cur = JSON.parse(modal.getAttribute('data-current'));
            if (cur) window.toggleLike(cur.title, this);
        });
        document.getElementById('modalFav').addEventListener('click', function(){
            let cur = JSON.parse(modal.getAttribute('data-current'));
            if (cur) window.toggleFav(cur.title, this);
        });
        document.getElementById('modalTrailer').addEventListener('click', ()=>{
            let cur = JSON.parse(modal.getAttribute('data-current'));
            if (cur) window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(cur.title + ' trailer')}`);
        });
        stars.forEach(s => {
            s.addEventListener('click', ()=>{
                if (userRated) return;
                let val = parseInt(s.dataset.value);
                stars.forEach((st, idx) => {
                    if (idx < val) { st.classList.add('active'); st.textContent = '★'; }
                    else { st.classList.remove('active'); st.textContent = '☆'; }
                });
                globalRating.total++;
                globalRating.sum += val;
                globalRating.avg = globalRating.sum / globalRating.total;
                localStorage.setItem('lkzr_rated', 'true');
                userRated = true;
                ratingMessage.textContent = 'Спасибо за оценку!';
                updateGlobals();
            });
        });
        quizSubmit.addEventListener('click', ()=>{
            let checked = document.querySelectorAll('.quiz-option input:checked');
            if (!checked.length) { quizResult.textContent = 'Выберите хоть что-то'; return; }
            let genres = [...checked].map(c => c.dataset.target);
            let recs = [];
            genres.forEach(g => { if (moviesData[g]) recs.push(...moviesData[g]); });
            recs = recs.filter((v,i,a)=> a.findIndex(t=>t.title===v.title)===i).slice(0,3);
            if (recs.length) quizResult.innerHTML = 'Рекомендуем: ' + recs.map(r=>r.title).join(', ');
            else quizResult.textContent = 'Нет совпадений';
        });

        // Глобальный рейтинг по умолчанию
        globalRating.total = 0; globalRating.sum = 0; globalRating.avg = 0;
        checkRating();
        updateGlobals();
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });
    }
});