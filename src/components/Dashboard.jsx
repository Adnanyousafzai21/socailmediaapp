import React, { useState } from 'react';
import Profileimg from './Profileimg';
import { MdOutlineInsertPhoto } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Modalmessage from './Modal';

import cloudinaryUpload from './cloudinay';
const Dashboard = ({ setUpdate }) => {
    const Navigate = useNavigate()
    const data = JSON.parse(localStorage.getItem('User'));
    const User = data?.user ? data?.user : ""

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsloading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(selectedFile)
    const createObjectURL = (file) => {
        return file ? URL.createObjectURL(file) : null;
    };

    const handleFileChange = (event) => {
        const file = event.target?.files[0];
        setSelectedFile(file);
        const preview = createObjectURL(file);
        setPreviewUrl(preview);
    };
    const [description, setDescription] = useState("")
    const update = (e) => {
        setDescription(e.target.value)

    }
    const isPostButtonVisible = selectedFile || description.trim().length > 0;
    const handleForm = async () => {
        try {
            if (!data) {
                setIsModalOpen(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                    Navigate("/login");
                }, 5000);
                return;
            }

            setIsloading(true);
            const file = await cloudinaryUpload(selectedFile);
            console.log("Cloudinary upload result:", file);
            if (!file) {
                console.error("File upload failed");
                return;
            }

            const postData = {
                description,
                file: file,
                user: User._id
            };

            const response = await fetch("https://socailmediaappapi.vercel.app/api/v1/posts/Posting", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            if (response.ok) {
                const resData = await response.json();
                console.log("Your post was successfully uploaded:", resData);
                setDescription("");
                setSelectedFile(null);
                setUpdate((prev) => !prev);
            } else {
                console.error("Failed to post data:", response.statusText);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        } finally {
            setIsloading(false);
        }
    };


    return (
        <div title={`!! Donn't Upload Uncompressed or large-File/Videos\nit's take tooMuch time and can be rejected so donn't `} className='py-5 px-5 rounded background bg-customwhite w-full'>
            <div className='w-full flex justify-between items-center gap-4'>
                <div className="w-[15%]">
                    <Profileimg avater={User.avater} />
                </div>

                <div className='py-1 pt-3 w-[70%]' >
                    <input
                        onChange={update}
                        name="description"
                        value={description}
                        type='text'
                        placeholder='Write here...'
                        className='w-full py-1 px-1 text-base outline-none   focus:border-b focus:border-sky-500'
                    />
                </div>
                <div className='w-[15%] h-9 overflow-hidden rounded-md border-sky-500 border flex justify-center  items-center '>
                    <label title='UploadImage' htmlFor="fileInput" className="cursor-pointer text-blue-500 text-2xl  " disabled>
                        <MdOutlineInsertPhoto />
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            </div>

            {selectedFile && (
                <div className='duration-1000 w-full text-center h-[350px]' >
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Selected File Preview"
                            className="max-w-full  my-2  rounded w-[80%] h-full  m-auto "
                        />
                    )}   <p className='text-skyblue-500'>{(selectedFile.name).slice(0, 15)}</p>
                </div>
            )}
            {
                isPostButtonVisible && (<div className='tex-center py-3 flex justify-center w-full' >
                    <button onClick={handleForm} className='px-3  w-[65%] mx-auto bg-sky-500 outline-none rounded text-customwhite'>{isLoading ? "file is upLoading..." : "Post"}</button>
                </div>)
            }
            {isModalOpen && (
                <Modalmessage isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={"It's  need Longin frist your are redirected to loin page"} />
            )}
        </div>
    );
}

export default Dashboard;
