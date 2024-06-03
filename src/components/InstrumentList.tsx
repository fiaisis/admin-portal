import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Fragment } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";

const instruments = [
  "ALF",
  "ARGUS",
  "CHIPLR",
  "CHRONUS",
  "CRISP",
  "EMU",
  "ENGINX",
  "GEM",
  "HET",
  "HIFI",
  "HRPD",
  "IMAT",
  "INES",
  "INTER",
  "IRIS",
  "LAD",
  "LARMOR",
  "LET",
  "LOQ",
  "MAPS",
  "MARI",
  "MERLIN",
  "MUSR",
  "NILE",
  "NIMROD",
  "OFFSPEC",
  "OSIRIS",
  "PEARL",
  "PEARL (HIPR)",
  "POLARIS",
  "POLREF",
  "PRISMA",
  "ROTAX",
  "SANDALS",
  "SANS2D",
  "SURF",
  "SXD",
  "TFXA",
  "TOSCA",
  "VESUVIO",
  "WISH",
  "ZOOM",
];

export default function InstrumentList() {
  return (
    <Paper
      sx={{
        maxHeight: "90vh",
        overflow: "auto",
        // width: "20vw",
        bgcolor: "background.paper",
      }}
    >
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Instruments
          </ListSubheader>
        }
      >
        <Divider />
        {instruments.map((instrumentName) => (
          <Fragment key={instrumentName}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={instrumentName} />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
          </Fragment>
        ))}
      </List>
    </Paper>
  );
}
