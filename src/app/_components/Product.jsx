export const Product = (props) => {
  const image = props.images;
  const name = props.title;
  return (
    <div className="w-[300px] h-[200px]">
      <img src={image} className="w-full h-full" />
      <div>{name}</div>
    </div>
  );
};