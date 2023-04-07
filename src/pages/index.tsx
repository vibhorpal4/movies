import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "@/redux/slices/wishlistSlice";
import Modal from "@/components/Modal";

const Home = ({ data }: any) => {
  const [searchText, setSearchText] = useState<string>("");
  const [movies, setMovies] = useState<any[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<any>(null);

  useEffect(() => {
    setMovies(data.results);
  }, [data]);

  useEffect(() => {
    if (searchText.length === 0) {
      setMovies(data.results);
      router.push({
        pathname: "/",
      });
    }
  }, [searchText]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    router.push({
      pathname: "/",
      query: { title: searchText },
    });
  };

  const { items } = useSelector((state: any) => state.wishlist);

  const handleLikeAndUnlike = (id: number) => {
    if (items.includes(id)) {
      dispatch(remove(id));
    } else {
      dispatch(add(id));
    }
  };

  const showDetails = (id: number) => {
    setShowModal(true);
    const movie = movies.find((movie) => movie.id === id);
    setMovieDetails(movie);
  };

  return (
    <>
      <Head>
        <title>Movie DB</title>
        <meta name="description" content="Movie DB assignment project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="h-full w-full
     
      "
      >
        <div
          className="flex justify-between w-full mt-[2%] px-16
        xs:px-2 xs:mt-2 xs:justify-center xs:flex-col xs:items-center xs:space-y-2            

          
        "
        >
          <h1
            className="text-3xl font-bold text-blue-500 mx-2
          xs:text-2xl
          "
          >
            Movies
          </h1>
          <div
            className="flex justify-center flex-wrap xs:w-[20rem] xs:h-[2rem] xs:justify-center xs:mt-2 
          "
          >
            <SearchBar
              placeHolder={"Search for a movies..."}
              handleChange={(e: any) => setSearchText(e.target.value)}
              value={searchText}
              handleClick={handleSearch}
            />
          </div>
        </div>
        <div
          className="flex justify-center w-full mt-[2%] mx-2 flex-wrap
        xs:justify-center
        "
        >
          {movies.map((movie: any, index: number) => (
            <div className="mx-1 my-3" key={index}>
              <MovieCard
                title={movie.title}
                poster={movie.poster_path}
                description={movie.overview}
                isLiked={items.includes(movie.id)}
                onLike={() => handleLikeAndUnlike(movie.id)}
                onClick={() => showDetails(movie.id)}
              />
            </div>
          ))}
        </div>

        {movieDetails && (
          <Modal
            isOpen={showModal}
            setIsOpen={setShowModal}
            movie={movieDetails}
          />
        )}
      </main>
    </>
  );
};

export async function getServerSideProps(context: any) {
  let query = "";
  // const quy = Object.keys(context.query).map((key) => {
  //   return `${key}=${context.query[key]}`;
  // });
  // if (quy.length > 0) {
  //   query = `?${quy.join("&")}`;
  // }

  if (context.query.title) {
    query = `?query=${context.query.title}`;
  }

  let res: any = {};

  if (query.length > 0) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search/movie${query}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        method: "GET",
      }
    );
  } else {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        method: "GET",
      }
    );
  }

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Home;
