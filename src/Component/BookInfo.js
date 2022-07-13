import React, { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import './styles.css'
const axios = require('axios');

function BookInfo(props) {
    let { id } = useParams();
    const [data ,setdata] = useState([])

    useEffect(() => {
        
        axios.get('http://localhost:8000/getBookById',{
                params : {
                    ids : id,
                }
        }).then(response => {
            console.log(response)
            if(response.data) {
                var arr = []
                arr.push(response.data.data)
                console.log(arr);
                setdata(arr)
            }else {
                alert("no data found")
            }
        }) .catch(function (error) {
            console.log(error);
          })
    },[])
    return (
        <>
         <div className="container-fluid" id="display">
            
            { data.map((obj,index) =>
                <>
                <div className='text-center book'>Book Details</div>
                <div className="row text-center">
                    <div className="col-md-12">Name:<spna>{obj.name}</spna></div>
                    <div className="col-md-12">auther:<spna>{obj.auther}</spna></div>
                    <div className="col-md-12">price:<spna>{obj.price}</spna></div>
                </div>
                {obj.user.length > 0 ? 
                <>

                    <div className="text-center book mt-5">UserDetails</div>
                    {obj.user.map((u,i) => {
                        return(
                            <>
                            <div className="col-md-12 text-center mt-3">Firstname:<spna>{u.firstname}</spna></div>
                            <div className="col-md-12 text-center">Lastname:<spna>{u.lastname}</spna></div>
                            <div className="col-md-12 text-center">Email:<spna>{u.email}</spna></div>
                            <div className="col-md-12 text-center">phone number:<spna>{u.phonenumber}</spna></div>
                            </>

                        )
                    })}
                    </>
                : ""}            
                </>
            )}
        </div>
        </>
    );
}

export default BookInfo;