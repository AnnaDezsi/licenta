import { Box, Button } from "@mui/material"
import { protectedRoutes } from "../../../services/router"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const Menu = () => {
    const navigate = useNavigate()
    const handleChangePage = useCallback((path) => {
        navigate(path)
    }, [])

    return (
        <Box sx={{
            display: 'flex'
        }}>
            {protectedRoutes.map(route => {
                return (
                    <div key={route.name}>
                        <Button style={{
                            color: 'white'
                        }} variant="text" onClick={() => handleChangePage(route.path)}>{route.name}</Button>
                    </div>
                )
            })}
        </Box>
    )
}
