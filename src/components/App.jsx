import { useState, useEffect } from "react";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "components/Modal/Modal";
import { Loader } from 'components/Loader/Loader';
import { Button } from "components/Button/Button"
import imageApiService from "services/image-service";

import { GalleryApp, ErrorMessage } from './App.styled';

export const App = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');


  const handleSearchFormSubmit = searchQuery=> {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
    };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

   const handleImageClick = event =>{
    setCurrentImageUrl(event.currentTarget.dataset.image);
    toggleModal();
   }

   const toggleModal = () => {
    setShowModal(prevState => !prevState);
   };

   useEffect(() => {
    if(!searchQuery) {
      return;
    }; 
  
    async function getImage () {
     try{
      setIsLoading(true);
      const images = await imageApiService.fetchImages(searchQuery, page);
      if (images.hits.length === 0){
        setImages([]);
        setTotalImages(0);
        setError("🦄 Unfortunately there are no such images");
      } else {
        setImages(prevImages => [...prevImages,...images.hits]);    
        setError(null);
      }
      setIsLoading(false);
      setTotalImages(images.total);
    
    } catch (error) {
      setError(error);
      setIsLoading(false);
    };

   };

    getImage();

   },[searchQuery, page]);

  return (
    <GalleryApp>
      <Searchbar onSubmit={handleSearchFormSubmit}/>
      {isLoading && <Loader/>}
      {images.length ===  0 ? <ErrorMessage><p>{error}</p></ErrorMessage> : 
      <ImageGallery 
      images={images}
      onClick={handleImageClick}/>
       } 
      {images.length < totalImages && <Button 
      onClick={handleLoadMore} 
      />}
      { showModal && <Modal imageURL={currentImageUrl} onClose={toggleModal}/>}
      <ToastContainer/>
    </GalleryApp>    
  );

};

