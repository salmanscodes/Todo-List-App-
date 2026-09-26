function Navbar(){
    return(
        <div className="flex justify-between bg-purple-900 text-white font-bold px-5 py-2 sticky">
            TaskManager
            <ul className="flex gap-5">
                <li>Home</li>
                <li>About</li>
            </ul>
        </div>
    )
}

export default Navbar