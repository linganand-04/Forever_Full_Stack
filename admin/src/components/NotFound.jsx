import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound(token) {
  const navigate = useNavigate();

  useEffect(() => {
    if (token.token === "") navigate("/");
  }, [token, navigate]);

  return (
    <>
      <h1 className="text-3xl text-center mt-5">Page Not Found</h1>
    </>
  );
}

export default NotFound;
