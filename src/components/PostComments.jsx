import React, { useState } from 'react'
import { FaRegComment } from "react-icons/fa";
import { GoThumbsup } from "react-icons/go";
import { LuSendHorizonal } from "react-icons/lu";
import Profileimg from './Profileimg'; import { BiSolidLike } from "react-icons/bi";
import ProfileTitle from './ProfileTitle';
import { BiLike } from 'react-icons/bi';
import { TiDeleteOutline } from "react-icons/ti";
const PostComments = ({ comments, setUpdate, postId }) => {
    const user = JSON.parse(localStorage.getItem("User"))
    const userId = user.user._id


    const [hide, setHide] = useState(false)
    const deletcomment = async (commentId) => {
        try {
            console.log(commentId)
            console.log(postId)

            const response = await fetch(`http://localhost:8000/api/v1/posts/deleteComment/${postId}/${commentId}`, {
                method: "delete"
            })
            if (response.ok) {
                console.log("the comments id deleted succesfully")
                setUpdate((preve) => !preve)
            }
        } catch (error) {
            console.log("there is error while deleting ")
        }

    }
    const [comment, setComment] = useState("")

    const postCommet = async() => {
        try {
            console.log("you hit the post commet")
            const response =await fetch(`http://localhost:8000/api/v1/posts/addcomment/${postId}/comment`, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, text: comment }),
            });
            if(response.ok){
               const resdata=await response.json()
                setComment("")
                setUpdate((preve) => !preve)
            }
    }catch (error) {
console.log("error while posting comoment", error)
    }
}
return (
    <div className=''>
        <div className='flex justify-between mx-2 pb-1'>
            <div className='flex gap-2'>
                <span className='text-sm text-sky-500 curser-pointer'>
                    <BiSolidLike />
                </span>
            </div>
            < div className='flex gap-2 items-center'>
                <span className='text-sm hover:text-sky-500 pointer' onClick={() => setHide((prive) => !prive)}>{comments && comments.length > 0 ? comments.length : ""} comments
                </span>
            </div>
        </div>
        <div className='flex justify-between border border-y-slate-300 border-x-0 py-1  px-4'>
            <div className='flex gap-2'>
                <span className='text-2xl hover:text-sky-500 curser-pointer'> <GoThumbsup /> </span>
            </div>
            < div className='flex gap-2 items-center'>
                <span className='text-2xl hover:text-sky-500 pointer'><FaRegComment onClick={() => setHide((prive) => !prive)} />
                </span>
            </div>
        </div>
        <div className={`tranniii ${hide ? 'block' : 'hidden'} transition ease-in-out delay-150`}>
            {comments.map((comment) => {
                return <div className="" key={comment._id} >
                    <div className=' my-1 flex justify-between items-center'>
                        <ProfileTitle avater={comment?.user?.avater} fullname={comment.user.fullname} time={comment.createdAt} classname={"h-6 w-6"} />
                        {userId === comment.user._id ? <TiDeleteOutline className='text-red-500 hover:bg-red-500 hover:text-white rounded-full m-2' onClick={() => deletcomment(comment._id)} />
                            : ""}                   </div>
                    <p className='px-4 mx-6 py-1 text-sm bg-slate-50 rounded-md'>{comment.text}</p>
                </div>
            })
            }
        </div>
        <div className='descrition flex   gap-3 border px-3 mt-2 mb-2 py-1  flex-1 w-full rounded-3xl bg-[#F5F7FA] items-center justify-center'>
            <input type="text" placeholder=' ✍ type comment.' onChange={(e) => setComment(e.target.value)} value={comment} className='w-full outline-none   bg-[#F5F7FA]' />
            <span className="text-xl hover:text-sky-500 duration-1000 text-[#999999]"> <LuSendHorizonal onClick={postCommet} /></span>
        </div>
    </div>
)
}

export default PostComments
