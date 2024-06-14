import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Fragment } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
interface InstrumentListProps {
  selected: string;
  instruments: string[];
}

export default function InstrumentList(props: InstrumentListProps) {
  return (
    <Paper
      sx={{
        maxHeight: "90vh",
        overflow: "auto",
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
        {props.instruments.map((instrumentName: string) => (
          <Fragment key={instrumentName}>
            <ListItem disablePadding>
              <ListItemButton
                selected={props.selected === instrumentName}
                href={`/specification/${instrumentName}`}
              >
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
