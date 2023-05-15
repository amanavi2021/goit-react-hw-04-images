import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

import { FcSearch } from 'react-icons/fc';
import { SearchBar, SearchForm, SearchFormButton, SearchFormLabel, SearchFormInput} from "./Searchbar.styled";

export const Searchbar = ({ onSubmit }) => {
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = event=> {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if(searchQuery.trim() === ''){
      return toast('🦄 Please enter text to search images');  
       };
      
      onSubmit(searchQuery);
  };

  return (
    <SearchBar>
    <SearchForm onSubmit={handleSubmit}>
      <SearchFormButton type="submit">
      <FcSearch size="32" />
        <SearchFormLabel>Search</SearchFormLabel>
      </SearchFormButton>          
      <SearchFormInput
        type="text"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={searchQuery}
        onChange={handleNameChange}
      />
    </SearchForm>
  </SearchBar> 
)
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
}