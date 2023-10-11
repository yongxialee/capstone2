import React ,{useState} from 'react';
// import { useNavigate } from 'react-router-dom';
/**
 * search form that allows user to search for products
 *
 */
function SearchForm({SearchFunc}) {
    const [searchTerm,setSearchTerm]=useState({search:""})
    // const navigate = useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setSearchTerm(data=>({...data,[name]:value}))
    }

    async function handleSubmit(e){
        e.preventDefault();
        
        try{
            await SearchFunc(searchTerm.search);
        }catch(e){
            console.log(e)
        }   
        //  navigate(`/home`); 
      
    }
  return (
    
        <div className="collapse navbar-collapse" id="navbarSupportedContent">        
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search" 
                name="search"
                // value={searchTerm}
                onChange={handleChange}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    
  )
}
export default SearchForm;