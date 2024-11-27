import { Grid2, Paper } from "@mui/material"
import { Logo } from "../logo/Logo"
import { Menu } from "./menu/Menu"
import { Account } from "./account/Account"
import theme from "../../services/theme"
import { PageContainer } from "../PageContainer/PageContainer"

export const Navbar = () => {
    return (
        <Paper sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: 0
        }}>
            <PageContainer>
                <Grid2 container sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1em 0',

                }}>
                    <Grid2 size="auto">
                        <Logo />
                    </Grid2>
                    <Grid2 size="grow" sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        padding: '0 2em'
                    }}>
                        <Menu />
                    </Grid2>
                    <Grid2 size="auto">
                        <Account />
                    </Grid2>
                    {/* dropdown */}
                </Grid2>
            </PageContainer>
        </Paper>

    )
}

Navbar.Menu = Menu  