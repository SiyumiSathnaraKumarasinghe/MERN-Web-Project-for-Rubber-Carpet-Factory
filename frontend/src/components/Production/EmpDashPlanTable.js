import React from "react";
import { Box, Grid } from "@mui/material";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import PlaneTable from "./PlanTable";
import EmpPlaneTable from "./EmpPlanTable";
import EmpSidebar from "./EmpSideBar";



const EmpDashPlanTable = () => {
    return (
        <Grid container>
            <Grid item>
                <EmpSidebar/>
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
                    <EmpPlaneTable/>
                </Box>
            </Grid>
        </Grid>
    );
};

// Ensure the export statement matches the component name
export default EmpDashPlanTable;