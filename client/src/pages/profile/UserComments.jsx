import React,{useState, useEffect} from 'react'
import up from '../../assets/angle-up.svg'
import down from '../../assets/angle-down.svg'
import { getUserComments } from '../../apiClient/posts';


const UserComments = () => {
    const [expand,setExpand] = useState(false);
    const [comments, setComments] = useState([]);
    let hgt = expand === true ? 200: 50;

    useEffect(()=>{
      const fetchComments = async () => {
        const res = await getUserComments();
        setComments(res.data.userComments);
        console.log('comdh',comments);
      }
      fetchComments();
    },[])

  return (
    <div className='w-[400px] h-full'>
        <div className={`w-full h-[${hgt}px] bg-gray-100 border rounded-3xl`}
        >   
          <div className='flex justify-between'>
            <div className='h-[50px] pt-1 pl-2'>
              <div 
                  className='px-3 py-2'
              >Your Comments</div>
            </div>
            <div className='h-[50px] w-[100px] flex justify-center items-center'><img src={expand == true ? up : down} className='w-4 h-4 hover:cursor-pointer' onClick={()=> setExpand(!expand)} /></div>
          </div>
          <div className='block'>
            {
              expand ? 
              <div className='pl-4'>
                {
                  comments?.map((commPost) =>(
                    commPost?.map((comment) => (
                      <li>{comment?.text}</li>
                    ))
                  ))
                }
              </div> : <></>
            }
          </div>
        </div>
    </div>
  )
}

export default UserComments