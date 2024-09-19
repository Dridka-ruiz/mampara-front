// BasicPopover.js
import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { SlOptionsVertical } from "react-icons/sl";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
/* import { AiOutlineFileDone } from "react-icons/ai";
import ExtrusionFormDialog from "../../../productoExtruidoPrueba2/ExtrusionFormDialog";
 */
export default function BasicPopover({
  onDeleteClick,
  onEstadoChange,
  onEditClick,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick();
    }
    handleClose();
  };

  const handleEditClick = () => {
    if (onEditClick) {
      onEditClick();
    }
    handleClose();
  };

  const handleEstadoChangeClick = () => {
    if (onEstadoChange) {
      onEstadoChange();
    }
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-label="Option"
        aria-describedby={id}
        onClick={handleClick}
      >
        <SlOptionsVertical />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div
          style={{
            display: "grid",
          }}
        >
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon style={{ color: "red" }} />
          </IconButton>
          <IconButton onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleEstadoChangeClick}>
            <CheckCircleIcon style={{ color: "5DBF00" }} />
          </IconButton>
          {/*  <IconButton onClick={() => setOpenDialog(true)}>
            <AiOutlineFileDone color="#8D31F7" />
          </IconButton>  */}
        </div>
      </Popover>
      {/* Agregar el componente del formulario */}
      {/* <ExtrusionFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      /> */}
    </div>
  );
}
