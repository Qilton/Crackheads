import React from 'react'

const community = () => {

    const HandleCode=async()=>{
        const userId=localStorage.getItem("id")
        const token=localStorage.getItem("token")
        const communityId=localStorage.getItem("communityId")
        const response=await axios.post("http://localhost:8080/community/code",{
           userId, communityId
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(response.status===200){
            alert(response.data.message)
            localStorage.setItem("code",response.data.code)
        }else{
            alert(response.data.message)
        }
        

    }
  return (
    <div>
      
    </div>
  )
}

export default community
