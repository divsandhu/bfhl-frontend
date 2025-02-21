import { useState } from "react";
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Container, 
    Paper, 
    Box,
    CssBaseline,
    ThemeProvider,
    createTheme
} from '@mui/material';
import InputForm from "./components/InputForm";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
    },
});

function App() {
    const [response, setResponse] = useState(null);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
                <AppBar position="static">
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" component="h1">
                                BFHL Challenge
                            </Typography>
                            <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                                JSON TOOL
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Paper elevation={3}>
                        <InputForm setResponse={setResponse} />
                    </Paper>

                    {response && (
                        <Paper elevation={3} sx={{ mt: 3, p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Full Response:
                            </Typography>
                            <Box
                                component="pre"
                                sx={{
                                    bgcolor: 'grey.100',
                                    p: 2,
                                    borderRadius: 1,
                                    overflow: 'auto',
                                    fontSize: '0.875rem'
                                }}
                            >
                                {JSON.stringify(response, null, 2)}
                            </Box>
                        </Paper>
                    )}
                </Container>

                <Box 
                    component="footer" 
                    sx={{ 
                        bgcolor: 'grey.900', 
                        color: 'grey.500',
                        py: 3,
                        mt: 'auto'
                    }}
                >
                    <Typography variant="body2" align="center">
                        © 2024 BFHL Challenge. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
