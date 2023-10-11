import React ,{useState} from 'react';
import { useHistory } from 'react-router-dom';

export default function SearchForm({SearchFunc}) {
    const [formData,setFormData]=useState({name:""})
    const history=useHistory();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData(data=>({...data,[name]:value}))
    }

    async function handleSubmit(e){
        e.preventDefault();
        
        try{
            await SearchFunc(formData.name);
            history.push('/product'); 
        }catch(e){
            console.log(e)
        }   
        
      
    }
  return (
    <div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">        
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" 
                type="text" placeholder="Search" 
                aria-label="Search" 
                onChange={handleChange}
                    name="search"
                    value={formData.name }
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </div>
  )
}
