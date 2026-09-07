function Sidebar({handleLogout}){

    return(

        <div className="w-64 h-screen bg-slate-900 p-5 border-r border-slate-700">

            <h1 className="text-3xl font-bold text-purple-400 mb-10">
                VaultNote
            </h1>

            <ul className="space-y-5">

                <li className="hover:text-purple-400 cursor-pointer">
                    Dashboard
                </li>

                <li className="hover:text-purple-400 cursor-pointer">
                    Uploads
                </li>

                <li className="hover:text-purple-400 cursor-pointer">
                    Profile
                </li>

            </ul>

            <button
                onClick={handleLogout}
                className="mt-10 bg-red-500 px-4 py-2 rounded-lg"
            >
                Logout
            </button>

        </div>
    )
}

export default Sidebar