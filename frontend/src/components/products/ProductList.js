import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchProducts, fetchCategories } from '../../store/slices/productsSlice';
import ProductCard from './ProductCard';

const ProductsContainer = styled.div`
  padding: 1rem 0;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  background-color: ${props => props.active ? '#007bff' : '#fff'};
  color: ${props => props.active ? '#fff' : '#333'};
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover {
    background-color: ${props => props.active ? '#007bff' : '#f8f9fa'};
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
`;

const NoProductsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { products, categories, loading, count, next, previous } = useSelector(state => state.products);
  
  // Extract query parameters
  const searchParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('price_range') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort_by') || '');
  const searchQuery = searchParams.get('search') || '';

  // Calculate total pages
  const pageSize = 10;
  const totalPages = Math.ceil(count / pageSize);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const params = {
      page: currentPage,
      ...(selectedCategory && { category: selectedCategory }),
      ...(searchQuery && { search: searchQuery }),
    };
    
    // Add price range parameters
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      if (min) params.min_price = min;
      if (max) params.max_price = max;
    }
    
    // Add sorting parameters
    if (sortBy) {
      params.ordering = sortBy;
    }
    
    dispatch(fetchProducts(params));
    
    // Update URL with current filters
    const newSearchParams = new URLSearchParams();
    if (currentPage > 1) newSearchParams.set('page', currentPage.toString());
    if (selectedCategory) newSearchParams.set('category', selectedCategory);
    if (searchQuery) newSearchParams.set('search', searchQuery);
    if (priceRange) newSearchParams.set('price_range', priceRange);
    if (sortBy) newSearchParams.set('sort_by', sortBy);
    
    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString()
    }, { replace: true });
    
  }, [dispatch, currentPage, selectedCategory, priceRange, sortBy, searchQuery, navigate, location.pathname]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  if (loading && products.length === 0) {
    return <LoadingSpinner>Loading products...</LoadingSpinner>;
  }

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    
    // Previous button
    buttons.push(
      <PaginationButton 
        key="prev" 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={!previous}
      >
        Previous
      </PaginationButton>
    );
    
    // Page number buttons
    // Show max 5 page buttons, centered around current page
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PaginationButton 
          key={i} 
          active={i === currentPage} 
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }
    
    // Next button
    buttons.push(
      <PaginationButton 
        key="next" 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={!next}
      >
        Next
      </PaginationButton>
    );
    
    return buttons;
  };

  return (
    <ProductsContainer>
      <ProductsHeader>
        <Title>
          {searchQuery ? `Search results for "${searchQuery}"` : 
          selectedCategory ? `${categories.find(c => c.id.toString() === selectedCategory)?.name || 'Products'}` : 
          'All Products'}
        </Title>
        
        <FiltersContainer>
          <FilterSelect value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </FilterSelect>
          
          <FilterSelect value={priceRange} onChange={handlePriceRangeChange}>
            <option value="">Price (any)</option>
            <option value="0-50">Under $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200-500">$200 - $500</option>
            <option value="500-">$500 & Above</option>
          </FilterSelect>
          
          <FilterSelect value={sortBy} onChange={handleSortChange}>
            <option value="">Sort By</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="-created_at">Newest First</option>
            <option value="name">Name: A to Z</option>
            <option value="-name">Name: Z to A</option>
          </FilterSelect>
        </FiltersContainer>
      </ProductsHeader>
      
      {loading ? (
        <LoadingSpinner>Loading products...</LoadingSpinner>
      ) : products.length > 0 ? (
        <>
          <ProductsGrid>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsGrid>
          
          {totalPages > 1 && (
            <PaginationContainer>
              {renderPaginationButtons()}
            </PaginationContainer>
          )}
        </>
      ) : (
        <NoProductsMessage>
          No products found. Try adjusting your filters or search terms.
        </NoProductsMessage>
      )}
    </ProductsContainer>
  );
};

export default ProductList;
