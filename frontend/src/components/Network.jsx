function Network({ children }) {
  return (
    <>
      <p
        className={`fixed bottom-0 ${navigator.onLine ? "bg-green-500" : `bg-red-500`} text-sm text-white text-center w-full py-1`}
      >
        {children}
      </p>
    </>
  );
}

export default Network;
