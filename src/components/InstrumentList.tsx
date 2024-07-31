import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Fragment } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import Paper from "@mui/material/Paper";
import Link from "next/link";
interface InstrumentListProps {
  selected: string;
  instruments: string[];
}

export default function InstrumentList(props: InstrumentListProps) {
  return (
    <Paper
      sx={{
        height: "95vh",
        overflow: "auto",
        bgcolor: "background.paper",
        minWidth: "15%",
      }}
    >
      <List
        sx={{ pt: 2 }}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Instruments
          </ListSubheader>
        }
      >
        <Divider />
        {props.instruments.map((instrumentName: string) => (
          <Fragment key={instrumentName}>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              href={`/specification/${instrumentName}`}
            >
              <ListItem disablePadding>
                <ListItemButton selected={props.selected === instrumentName}>
                  <ListItemText primary={instrumentName} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider component="li" />
          </Fragment>
        ))}
      </List>
    </Paper>
  );
}
