
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsApiService from './js/api-service';
import getRefs from '../src/js/getRefs';
import LoadMoreBtn from '../src/js/load-more-btn';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import listOfPhotos from '../src/templates/listOfPhotos.hbs';

import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";


// ====================================================


const refs = getRefs();
const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({selector: '.load-more'});

const gallery = new SimpleLightbox('.gallery a', {captionPosition: 'top',});

refs.form.addEventListener('submit', onFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);


loadMoreBtn.disable();

async function onSerchQuery() {
    
    try {
        newsApiService.searchQuery = refs.input.value;
        newsApiService.resetPage();
        loadMoreBtn.show();
        loadMoreBtn.disable();

        const { data } = await newsApiService.fetchSerchQuery()
        
     if (data.total === 0) {
        onFetchNull();
     } else {
         Notify.success(`Hooray! We found ${data.totalHits} images.`, { position: 'left-top', distance: '20px', }) 
         loadMoreBtn.enable();
    }
          
      data.hits.map(getRenderQuery).join('');
        
     gallery.refresh() ;
        // gallery.open('.gallery a');
        console.dir(gallery)
     
      } catch (error) {
        onFetchError()  
        console.dir(error)
      }          
}

async function onLoadMore() {
    try {
        const data = await newsApiService.fetchSerchQuery()
     if (data.data.hits.length === 0) {
         Notify.failure('The End!!!')
         loadMoreBtn.disable();
     }
       
        data.data.hits.map(getRenderQuery).join('');
        scrollSmooth();

    } catch (error) {
        console.dir(error.response.data)
        if (error.response.data === "[ERROR 400] \"page\" is out of valid range.") {
            Notify.info("We're sorry, but you've reached the end of search results.");
            loadMoreBtn.hide();
        }
    }
    
}

function onFormSubmit(e) {
    e.preventDefault();
    clearGalleryPage()
    onSerchQuery();
}

function getRenderQuery(items) {
    let markup = '';
    markup = listOfPhotos(items);
    refs.galleryBox.insertAdjacentHTML('beforeend', markup);
    
}

function onFetchNull() {
     Notify.failure("Sorry, there are no images matching your search query. Please try again.") ; 
}

function onFetchError() {
   Notify.failure("Sorry, there is crush!") ; 
}

function clearGalleryPage() {
refs.galleryBox.innerHTML = '';
}

function scrollSmooth() {
     const { height: cardHeight } = document.querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();
        window.scrollBy({top: cardHeight * 2, behavior: "smooth",});
}


           
        