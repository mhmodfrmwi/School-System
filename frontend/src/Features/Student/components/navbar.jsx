function Navbar() {
  return (
    <header className="bg-white shadow-md">
      {" "}
      <nav className="container mx-auto flex items-center justify-between px-4 py-2">
        <h1 className="text-2xl font-bold text-[#FD813DBF]">Grades</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-md border px-3 py-1 focus:outline-none"
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
