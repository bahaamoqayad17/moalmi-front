import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { Button, Dialog } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import UpdateSocial from "./UpdateSocial";
import { useSelector } from "react-redux";
import { useSocialMedia } from "../../hooks/useSocialMedia";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function GetSocial() {
  const { t } = useTranslation();

  const { data } = useSocialMedia();

  /** handle open dialog */
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{t("link_name")}</TableCell>
            <TableCell>{t("link")}</TableCell>
            <TableCell align="center">{t("update")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {t(row.type)}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.link}
              </TableCell>
              <TableCell align="center">
                <Button>
                  <ModeEditOutlineIcon onClick={() => setOpen(row.id)} />
                  <Dialog open={open === row.id} onClose={handleClose}>
                    <UpdateSocial social={row} handleClose={handleClose} />
                  </Dialog>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
