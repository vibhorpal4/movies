const SearchBar = ({
  handleChange = () => {},
  placeHolder = "Search for a movies...",
  value = "",
  handleClick = () => {},
}: any) => {
  return (
    <form onSubmit={handleClick}>
      <input
        className="w-[20rem]
    h-[2rem]
    border-2
    border-gray-300
    rounded-md
    px-4
    text-gray-600
    focus:outline-none
    focus:border-gray-500
    transition duration-500
    ease-in-out  
  
  "
        type="text"
        placeholder={placeHolder}
        onChange={handleChange}
        value={value}
      />
      <button
        className="w-[5rem] 
    h-[2rem]
    bg-blue-500
    text-white
    rounded-md
    ml-2
    hover:bg-blue-600
    transition duration-500
    ease-in-out
    
      "
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
