import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export interface MovieCardProps {
  title: string;
  description: string;
  poster: string;
  onLike?: () => void;
  isLiked?: boolean;
  onClick?: () => void;
}

const MovieCard = ({
  title = "Movie Title",
  description = "Movie Description",
  poster = "https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg",
  onLike,
  isLiked = false,
  onClick,
}: MovieCardProps) => {
  return (
    <div
      className="w-[20rem] h-[25rem] bg-gray-100 rounded-md shadow-md
      hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105
    "
    >
      <button
        onClick={onLike}
        className="w-[2rem] h-[2rem] bg-white rounded-full shadow-md
        absolute top-2 right-2 flex justify-center items-center
      "
      >
        <FontAwesomeIcon icon={faHeart} color={isLiked ? "red" : "black"} />
      </button>
      <div className="w-full h-[25rem] bg-gray-200 ">
        <Image
          width={500}
          height={750}
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${poster}`}
          alt="movie poster"
          className="w-full h-full object-cover rounded-md"
          priority // This will load the image first
        />
      </div>

      <div className="w-full h-[10rem]  mt-[-5rem] mx-2">
        <button type="button" onClick={onClick}>
          <h1 className="text-lg font-bold text-white pointer">{title}</h1>
        </button>
        <p className="text-sm text-gray-200 w-[90%]">
          {description.substring(0, 50)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
