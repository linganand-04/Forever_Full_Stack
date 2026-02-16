function PolicyItem({ image, title, content }) {
  return (
    <>
      <div>
        <img className="w-12 m-auto mb-5 " src={image} alt="" />
        <p className="font-semibold">{title}</p>
        <p className="text-gray-400">{content}</p>
      </div>
    </>
  );
}

export default PolicyItem;
