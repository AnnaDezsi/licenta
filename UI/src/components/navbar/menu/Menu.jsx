import { Box, Button } from "@mui/material"
import { protectedRoutes } from "../../../services/router"

export const Menu = () => {
  return (    
    <Box sx={{
        display: 'flex'
    }}>
        {protectedRoutes.map(route => {
            return (
                <div key={route.name}>
                    <Button style={{
                        color: 'white'
                    }} variant="text">{route.name}</Button>
                </div>
            )
        })}
    </Box>
  )
}
