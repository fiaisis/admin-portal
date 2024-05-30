import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function AdminPortalAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Box display="left" justifyContent="flex-start">
          <Toolbar sx={{ padding: "4px" }}>
            <Image
              src={"/fia-icon-32.png"}
              alt="FIA admin portal icon"
              width={134}
              height={134}
              style={{
                padding: "4px",
                width: "5%",
                height: "auto",
              }}
            />
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontSize: "2vw",
                ml: 0.5,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "0.05rem",
                color: "inherit",
                textDecoration: "none",
                wordSpacing: ".3rem",
              }}
            >
              {" "}
              FIA-ADMIN-PORTAL
            </Typography>
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
}
