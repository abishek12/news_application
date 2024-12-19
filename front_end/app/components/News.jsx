


const News = ({data}) => {
 
  return (
    <div className="flex flex-col items-center bg-white z-10  my-2 max-w-[1140px] mx-auto font-extrabold text-4xl">
      <h1 className="p-4">{data[0].title}</h1>
      <img src={data[0].urlToImage} alt=""  className="w-full max-w-[1000px]  " />
    </div>
  );
};
export default News;
