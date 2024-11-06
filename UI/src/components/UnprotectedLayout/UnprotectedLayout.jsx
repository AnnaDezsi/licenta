import { useNavigate } from "react-router-dom"

export const UnprotectedLayout = ({children}) => {
  const navigate = useNavigate();

  
  return (
    <div>
        <button onClick={() => navigate("/")}>Login</button>
        <button onClick={() => navigate("/signup")}>Inregistrare</button>
        {children}
    </div>
  )
}
