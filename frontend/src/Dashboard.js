import {
  useEffect,
  useState,
  useCallback
} from "react"

import axios from "axios"

import Sidebar from "./components/Sidebar"

function Dashboard() {

  const [title, setTitle] = useState("")
  const [file, setFile] = useState(null)
  const [files, setFiles] = useState([])
  const [search, setSearch] = useState("")

  const token = localStorage.getItem("token")

  const user = JSON.parse(
    localStorage.getItem("user")
  )


  // FETCH FILES
  const fetchFiles = useCallback(async () => {

    try {

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/files`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setFiles(res.data)

    }
    catch (error) {
      console.log(error)
    }

  }, [token])


  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])



  // UPLOAD
  const handleUpload = async (e) => {

    e.preventDefault()

    if (!file) {
      alert("Select a file")
      return
    }

    const formData = new FormData()

    formData.append("title", title)
    formData.append("file", file)

    try {

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/files/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"multipart/form-data"
          }
        }
      )

      alert("File uploaded")

      setTitle("")
      setFile(null)

      fetchFiles()

    }
    catch (error) {
      console.log(error)
    }
  }



  // DELETE
  const handleDelete = async(id)=>{

    try{

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/files/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )

      fetchFiles()

    }
    catch(error){
      console.log(error)
    }
  }



  // LOGOUT
  const handleLogout = ()=>{

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    window.location.href="/login"
  }



  // SEARCH
  const filteredFiles = files.filter((item)=>

    item.title.toLowerCase().includes(
      search.toLowerCase()
    )
  )



  return (

    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar handleLogout={handleLogout} />


      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-3">
          Welcome {user?.name} 👋
        </h1>

        <p className="text-slate-400 mb-10">
          Manage your files securely
        </p>



        {/* UPLOAD */}
        <div className="bg-slate-900 p-6 rounded-2xl mb-10">

          <h2 className="text-2xl mb-5">
            Upload File
          </h2>

          <form
            onSubmit={handleUpload}
            className="space-y-5"
          >

            <input
              type="text"
              placeholder="File title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800"
            />

            <input
              type="file"
              onChange={(e)=>setFile(e.target.files[0])}
              className="w-full"
            />

            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded-lg"
            >
              Upload
            </button>

          </form>

        </div>



        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-900 mb-10"
        />



        {/* FILES */}
        <div className="grid md:grid-cols-3 gap-5">

          {
            filteredFiles.map((item)=>(

              <div
                key={item._id}
                className="bg-slate-900 p-5 rounded-2xl border border-slate-800"
              >

                <h2 className="text-xl font-bold mb-2">
                  {item.title}
                </h2>

                <p className="text-slate-400 mb-5">
                  {item.fileType}
                </p>

            <div className="space-y-4">

                {/* IMAGE PREVIEW */}
                {
                    item.fileType.startsWith("image") && (

                    <img
                        src={item.fileUrl}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-xl"
                    />
                    )
                }


                {/* VIDEO PREVIEW */}
                {
                    item.fileType.startsWith("video") && (

                    <video
                        controls
                        className="w-full rounded-xl"
                    >
                        <source src={item.fileUrl} />
                    </video>
                    )
                }


                {/* AUDIO PREVIEW */}
                {
                    item.fileType.startsWith("audio") && (

                    <audio controls className="w-full">
                        <source src={item.fileUrl} />
                    </audio>
                    )
                }


                {/* PDF */}
                {
                    item.fileType === "application/pdf" && (

                    <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-yellow-500 px-4 py-2 rounded-lg inline-block"
                    >
                        Open PDF
                    </a>
                    )
                }


                {/* DOWNLOAD */}
                <a
                    href={item.fileUrl}
                    download
                    className="bg-blue-500 px-4 py-2 rounded-lg inline-block"
                >
                    Download
                </a>


                {/* DELETE */}
                <button
                    onClick={() =>
                    handleDelete(item._id)
                    }
                    className="bg-red-500 px-4 py-2 rounded-lg ml-3"
                >
                    Delete
                </button>

            </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Dashboard
