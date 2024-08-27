import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'

const Cart = () => {
  let obj=useContext(Ct)
  let [cart,setCart]=useState([])
  let [f,setF]=useState(true)
  let [ctotal,settotal]=useState(0)
  useEffect(()=>{
    axios.get(`http://localhost:5001/getcart/${obj.usercon._id}`).then((res)=>{
      setCart(res.data)
      obj.updcon({"nofitems":res.data.length})
      let t=0
      for(let item of res.data)
      {
        t=t+(item.price*(100-item.dct)/100)*item.qty
      }
      settotal(t)
      
    })
  },[f])
  let dec=(id,qty)=>{
    if(qty>1)
    {
axios.put("http://localhost:5001/dec",{"_id":id}).then(()=>{
  setF((f)=>!f)

})
    }
    else{
      del(id)
    }
  }
  let del=(id)=>{
    axios.delete(`http://localhost:5001/delcart/${id}`).then(()=>{
      setF(!f)
    })
  }
  let inc=(id)=>{
    axios.put("http://localhost:5001/inc",{"_id":id}).then(()=>{
    
      
      setF(!f)
    
    })
      }
  return (<>
{cart.length==0&&<div className='msg'>You cart was Empty</div>}
   {cart.length>0&& <div className="prodcon">
        {
            cart.map((item)=>{
                return(<div className="prod">
                    <div className="pimg">
                        <img src={`http://localhost:5001/imgs/${item.pimg}`}/>
                    </div>
                    <p>Name:{item.name}</p>
                    <p>Cat:{item.cat}</p>
                    <p><del>Price:{item.price}</del></p>
                    <p>Discount:{item.dct}</p>
                    <p>
                      <button onClick={()=>dec(item._id,item.qty)}>-</button>
                      {item.qty}
                      <button onClick={()=>inc(item._id)}>+</button>
                    </p>
                    <p>Discount Price:{(item.price*(100-item.dct)/100)*item.qty}</p>
                   
                    
                    <button onClick={()=>del(item._id)}>Delete</button>


                </div>)
            })
        }
     <div className='msg'>Total:{ctotal}</div>  
    </div>}
    </>)
}

export default Cart
