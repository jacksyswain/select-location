import React, { useEffect, useState } from 'react'


function SelectLocation() {
    const [selectCountry,setSelectCountry]= useState("");
    const [countries,setCountries]=useState([]);
    const [selectState,setSelectState]=useState("");
    const[states,setStstes]=useState([]);
    const [selectCity,setSelectCity]=useState("")
    const [cities,setCities]=useState([]);
    const countryApi= "https://crio-location-selector.onrender.com/countries";
    const stateApi=`https://crio-location-selector.onrender.com/country=${selectCountry}/states`;
    const citiesApi=`https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities

`;
    useEffect(()=>{
        const fetchCountry=async()=>{
            try{
            const response= await fetch(countryApi);
            const jsonData=await response.json();
            setCountries(jsonData);
            
            }catch(error){
               console.error("getting error in fetch part",error)
            }
        };
        fetchCountry()
    },[])
      
  useEffect(() => {
     

    const fetchStates = async () => {
        setSelectState('');
        setSelectCity('');
        
      try {
        const response = await fetch(stateApi);
        const jsonData = await response.json();
        setStstes(jsonData); // Assuming API returns { states: [...] }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
  }, [selectCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
   

    const fetchCities = async () => {
      try {
        const response = await fetch(citiesApi);
        const jsonData = await response.json();
        setCities(jsonData); 
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, [selectState, selectCountry]);

  return (
    <div>
      <h1> Select Your Location</h1>
      <select style={{padding:"20px" , margin:"10px"}} name='selectCountry'  value={selectCountry} 
      onChange ={(e)=>{
        setSelectCountry(e.target.value)
        setSelectState('');
          setSelectCity('');
          
      }}>
      <option value="" disable>
      Select cuntry
      </option>
      {countries.map((ele,idx)=>{
        return(<option value={ele} key={idx} >
            {ele}
            </option>);
      }
)}
      </select>
      <select style={{padding:"20px" , margin:"10px"}} name='selectstate' disabled= {selectCountry ?false:true} value={selectState} onChange={(e)=>{setSelectState(e.target.value)}}>
      <option value=""disabled>
      Select state
      </option>
      {states.map((ele,idx)=>{
        return(<option value={ele} key={idx} >
            {ele}
            </option>);
      }
)}
      </select>
      <select style={{padding:"20px" , margin:"10px"}} name='selectcity' disabled= {selectState ?false:true} value={selectCity} onChange={(e)=>{setSelectCity(e.target.value)}}>
      <option value=""disabled>
      Select city
      </option>
      {cities.map((ele,idx)=>{
        return(<option value={ele} key={idx} >
            {ele}
            </option>);
      }
)}
      </select>
     {selectCity?(<><p>
         You selected <strong>{selectCity}</strong>, <strong>{selectState}</strong>,{' '}
          <strong>{selectCountry}</strong>
        </p></>):(<></>)}
      
    </div>
  )
}

export default SelectLocation
