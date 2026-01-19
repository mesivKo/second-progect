import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { SearchIcon } from '../icons/icons';


const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
  color: #475569;
  padding: 6px;
  border-radius: 8px;
  transition: background .2s ease;
  
  &:hover {
    background: #f5f7fb;
  }
`;

const SearchInput = styled.input`
  height: 36px;
  min-width: 220px;
  padding: 0 10px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  background: #fff;
  
  &:focus {
    border-color: #0e73f6;
    box-shadow: 0 0 0 3px rgba(14,115,246,.15);
  }
`;

interface TestSearchProps {
  placeholder?: string;
}

export default function TestSearch({ placeholder = "Поиск" }: TestSearchProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);
  
  // Автофокус 
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);
  
  const handleSearchClick = () => {
    setSearchOpen(true);
  };
  
  // Потеря фокуса
  const handleInputBlur = () => {
    setSearchOpen(false);
  };
  
  return (
    <>
      {searchOpen ? (
        <SearchInput
          ref={searchInputRef}
          type="text"
          placeholder={placeholder}
          aria-label="Строка поиска по тестам"
          onBlur={handleInputBlur}
        />
      ) : (
        <SearchButton
          onClick={handleSearchClick}
          aria-label="Поиск"
          title="Открыть поиск"
        >
          <SearchIcon />
        </SearchButton>
      )}
    </>
  );
}