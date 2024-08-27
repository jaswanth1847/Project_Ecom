
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Ct from "./Ct"
import { useNavigate } from "react-router-dom"


const Home = () => {
    let [prod,setprod]=useState([])
    let obj=useContext(Ct)
    let navigate=useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:5001/getprod").then((res)=>{
            setprod(res.data)
        })

    },[])
    let addcart=(item)=>{
        let prodobj={"pid":item._id,"uid":obj.usercon._id,"qty":1,"pimg":item.pimg,"name":item.name,"cat":item.cat,"dct":item.dct,"price":item.price}
        axios.post("http://localhost:5001/addcart",prodobj).then(()=>{
            navigate("/cart")

        })
    }
  return (
    <div className="prodcon">
        {
            prod.map((item)=>{
                return(<div className="prod">
                    <div className="pimg">
                        <img src={`http://localhost:5001/imgs/${item.pimg}`}/>
                    </div>
                    <p>Name:{item.name}</p>
                    <p>Cat:{item.cat}</p>
                    <p>Price:{item.price}</p>
                    <p>Discount:{item.dct}</p>
                    <button>Know more...</button>
                { obj.usercon.token!=""&&   <button onClick={()=>addcart(item)}>Addcart</button>}
                  { obj.usercon.token!=""&&obj.usercon.role=="admin"&&<button>Edit</button>}
                  { obj.usercon.token!=""&&obj.usercon.role=="admin"&&   <button>Delete</button>}
                </div>)
            })
        }
    </div>
  )
}

export default Home
