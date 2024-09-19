import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { SlOptionsVertical } from "react-icons/sl";
import EditIcon from "@mui/icons-material/Edit";
import { AiOutlineFileDone } from "react-icons/ai";
import { AiFillAlert } from "react-icons/ai";
import PermisoValidator from "../../../Login/PermisoValidator";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { MdIncompleteCircle } from "react-icons/md";

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
  onPausadoClick,

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

  const handleEditClick3 = () => {
    if (onPausadoClick) {
      onPausadoClick();
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
                <Typography color="inherit">Eliminar</Typography>
              </React.Fragment>
            }
          >
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
          </HtmlTooltip>
          <PermisoValidator permiso="extrusores.editar">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Editar</Typography>
                </React.Fragment>
              }
            >
              <IconButton onClick={handleEditClick}>
                <EditIcon style={{ color: "#F57000" }} />
              </IconButton>
            </HtmlTooltip>
          </PermisoValidator>

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
          {id === 1 && ( // Renderizar AiOutlineFileDone solo para id 1
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Terminado de Extruir</Typography>
                </React.Fragment>
              }
            >
              <IconButton onClick={handleEditClick2}>
                <AiOutlineFileDone color="#47B20F" />
              </IconButton>
            </HtmlTooltip>
          )}
          {id === 1 && (
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Producto Incompleto</Typography>
                </React.Fragment>
              }
            >
              <IconButton onClick={handleEditClick3}>
                <MdIncompleteCircle color="#3c93f5" />
              </IconButton>
            </HtmlTooltip>
          )}
        </div>
      </Popover>
    </>
  );
}
