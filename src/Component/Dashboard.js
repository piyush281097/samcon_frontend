import React from 'react';
import './styles.css';
import $ from 'jquery';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
const axios = require('axios');

const typelist = [
    { label: "a - z", value: 1 },
    { label: "z - a", value: 2 },
  ];

function Dashboard() {
    // const [user_id, setId] = useState(id)
    let history = useHistory();
    const [type ,settype] = useState(null)
    const [data ,setdata] = useState([])
    const [isshow, setisshow] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            $('#display').show();
            $('#loader').hide();
        }, 1000);

        axios.get('http://localhost:8000/getBooks')
          .then(function (response) {
            setdata(response.data.data);
          })
    },[data.length])

    function types(types) {
        console.log(types.value);
        settype(types.value)
        if (types.value == 1) {
            setdata(data.sort((a, b) => {
                if (a.name < b.name)
                  return -1;
                if (a.name > b.name)
                  return 1;
                return 0;
              }));
        }else {
            setdata(data.sort((a, b) => {
                if (a.name > b.name)
                  return -1;
                if (a.name < b.name)
                  return 1;
                return 0;
              }));
        }
          
    }

    function selectclass(id) {
        history.push('/bookinfo/'+id)
    }
    return (
        <>
                <div class="loader" id="loader"></div>
                <div className="container-fluid" id="display" style={{display:"none"}}>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            {isshow && <div className="mt-5">
                            <div className="row mt-3">
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-4 text-center" style={{alignItems:"center"}}>Type</div>
                                        <div className="col-md-8" style={{float:"left"}}><Select options={typelist} onChange={types} required/></div>
                                    </div>
                                </div>
                            </div>
                                { data.map((obj,index) =>  
                                    <div className="row mt-2">
                                        <div className="col-md-4 text-center" style={{backgroundColor:"white"}}>
                                            <span name="select" id="select" className="button" style={{color:'black'}}><label>{obj.name}</label></span>
                                        </div>
                                        <div className="col-md-4">
                                            <button type="button" id="submit-btn" className="btn btn-info btn-sm" style={{fontWeight: "bold"}} onClick={() => selectclass(obj._id)}>search</button>
                                        </div>
                                        <br></br>
                                 </div>
                                )}
                            </div>}
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            
            </>
    );
}

export default Dashboard;