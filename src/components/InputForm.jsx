/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper,
    CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from "../api/api";

const InputForm = ({ setResponse }) => {
    const [jsonInput, setJsonInput] = useState("");
    const [response, setLocalResponse] = useState(null);
    const [error, setError] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (response) {
            document.title = response.roll_number;
        }
    }, [response]);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError("");
    
            if (!jsonInput.trim()) {
                setError("Please enter JSON data");
                return;
            }
    
            const parsedData = JSON.parse(jsonInput);
    
            if (!parsedData.data || !Array.isArray(parsedData.data)) {
                setError('JSON must contain a "data" array');
                return;
            }
    
            const res = await axios.post("/bfhl", parsedData);
    
            setLocalResponse(res.data);
            setResponse(res.data);
            setJsonInput(""); // Clear input after success
        } catch (err) {
            if (err instanceof SyntaxError) {
                setError("Invalid JSON format. Please check your input.");
            } else if (err.response) {
                setError(err.response.data.error || "Server error occurred.");
            } else {
                setError("Network error or server is not responding.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    

    const handleFilterChange = (event) => {
        setSelectedFilters(event.target.value);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Input Data
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Enter your JSON data in the format: {"{'data': ['A', '1', 'B', '2']}"}
            </Typography>

            <TextField
                fullWidth
                multiline
                rows={4}
                placeholder='Enter JSON: {"data": ["A","C","z"]}'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                variant="outlined"
                sx={{ mb: 2, fontFamily: 'monospace' }}
            />

            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
            >
                {isLoading ? 'Processing...' : 'Process Data'}
            </Button>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {response && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Filter Results
                    </Typography>
                    
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Select Data to Display</InputLabel>
                        <Select
                            multiple
                            value={selectedFilters}
                            onChange={handleFilterChange}
                            label="Select Data to Display"
                        >
                            <MenuItem value="alphabets">Alphabets</MenuItem>
                            <MenuItem value="numbers">Numbers</MenuItem>
                            <MenuItem value="highest_alphabet">Highest Alphabet</MenuItem>
                        </Select>
                    </FormControl>

                    {selectedFilters.map(filter => (
                        <Paper 
                            key={filter} 
                            variant="outlined"
                            sx={{ p: 2, mb: 2 }}
                        >
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                {filter.replace('_', ' ').charAt(0).toUpperCase() + 
                                 filter.replace('_', ' ').slice(1)}:
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontFamily: 'monospace',
                                    bgcolor: 'grey.100',
                                    p: 1,
                                    borderRadius: 1
                                }}
                            >
                                {JSON.stringify(response[filter])}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default InputForm;
