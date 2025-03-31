import { Box, Typography } from "@mui/material"


function HomePage () {
    return (
        <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh"
         }}>
            <Typography variant="h4" align="center" fontWeight={"bold"}>
                Welcome to Home!
            </Typography>
        </Box>
    );
};

export default HomePage