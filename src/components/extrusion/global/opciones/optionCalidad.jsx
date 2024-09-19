import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { SlOptionsVertical } from "react-icons/sl";
import EditIcon from "@mui/icons-material/Edit";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { AiFillAlert } from "react-icons/ai";
import Comentario from "../../../global/alerta";
import { FiAlertOctagon } from "react-icons/fi";

import PermisoValidator from "../../../Login/PermisoValidator";
import { SiLivechat } from "react-icons/si";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { MdMarkUnreadChatAlt } from "react-icons/md";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#D7E1FA",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "100%",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export default function BasicPopover({
  onDeleteClick,
  onEstadoChange,
  onEditClick,
  onExtrudeClick,
  onUrgenciaChange,
  onComentarioClick,
  id, // Agregar id como una propiedad
}) {
  const [anchorEl, setAnchorEl] = useState(null);

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

  //sentencia para guardar un comentario

  const handleComnentarioClick = () => {
    if (onComentarioClick) {
      onComentarioClick();
    }
    handleClose();
  };

  const handleEstadoChangeClick = () => {
    if (onEstadoChange) {
      onEstadoChange();
    }
    handleClose();
  };

  const handleEditClick2 = () => {
    if (onExtrudeClick) {
      onExtrudeClick();
    }
    handleClose();
  };

  const handleUrgenciaChangeClick = () => {
    if (onUrgenciaChange) {
      onUrgenciaChange();
    }
    handleClose();
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton
        aria-label="Opción"
        aria-describedby={popoverId}
        onClick={handleClick}
      >
        <SlOptionsVertical />
      </IconButton>
      <Popover
        id={popoverId}
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
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">Urgente</Typography>
              </React.Fragment>
            }
          >
            <IconButton onClick={handleUrgenciaChangeClick}>
              <AiFillAlert color="#E03802" />
            </IconButton>
          </HtmlTooltip>

          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">
                  Observaciones del producto
                </Typography>
              </React.Fragment>
            }
          >
            <IconButton onClick={handleComnentarioClick}>
              <MdMarkUnreadChatAlt color="#FAB700" />
            </IconButton>
          </HtmlTooltip>
        </div>
      </Popover>
    </>
  );
}
