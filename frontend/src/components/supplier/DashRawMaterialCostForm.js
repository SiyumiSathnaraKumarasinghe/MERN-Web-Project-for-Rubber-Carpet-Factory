import React from "react";
import { Box, Grid } from "@mui/material";
import RawMaterialCostForm from "./RawMaterialCostForm";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";



const DashRawMaterialCostForm = () => {
    return (
        <Grid container>
            <Grid item>
                <Sidebar />
            </Grid>
            <Grid item xs>
                <Navbar />
                <Box 
                    sx={{ 
                        padding: "20px", 
                        backgroundColor: "#e0e0e0", 
                        minHeight: "100vh" 
                    }}
                >
                    <RawMaterialCostForm />
                </Box>
            </Grid>
        </Grid>
    );
};

// Ensure the export statement matches the component name
export default DashRawMaterialCostForm;