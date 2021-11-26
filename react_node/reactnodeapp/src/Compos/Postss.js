import React,{useEffect} from 'react'
import { getPosts } from '../Config/Myservice'

export default function Postss() {

useEffect(()=>{
    getPosts()
    .then(res=>{
        console.log(res.data);
    })
},[])
    return (
        <div>
        <section className="container">
            <h2>latest posts</h2>
        </section>
        </div>
    )
}
