import { useState, useEffect } from 'react';
import Nav from "../Nav/Nav";
import "./Catalog.css";
import ModelCard from "../ModelCard/ModelCard";
import { ThreeCircles } from "react-loader-spinner";

function Catalog() {
  const [catalog, setCatalog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Items per page set to 20

  useEffect(() => {
    fetch('http://localhost:3000/api/catalog')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCatalog(data))
      .catch(error => console.error("There was an error fetching the catalog:", error));
  }, []);

  const totalPages = catalog ? Math.ceil(catalog.files.length / itemsPerPage) : 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = catalog ? catalog.files.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (!catalog) {
    return (
      <>
        <Nav />
        <div className='loaderContainer'>
          <ThreeCircles
            visible={true}
            height="200"
            width="200"
            color="#ffffff"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className='modelCardContainer'>
      {currentItems.map((file, index) => (
          <ModelCard key={index} fileName={file.name} id={file.id} />
        ))}
      </div>
      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, index) => (
          <a className='page-button' key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </a>
        ))}
      </div>
    </>
  );
}

export default Catalog;
