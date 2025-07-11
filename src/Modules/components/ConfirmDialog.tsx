import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import { Button } from "react-bootstrap";

import ClearIcon from "@mui/icons-material/Clear";

export const ConfirmDialog = (props: any): ReactElement => {
  const { title, subTitle, showConfirm, onClose, actionOnDelete } = props;

  // UI Elements
  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={showConfirm}>
        <Box>
          <DialogTitle>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{title}</Typography>
              <IconButton onClick={onClose}>
                <ClearIcon />
              </IconButton>
            </Box>
            <Divider />
          </DialogTitle>
          <DialogContent className="dialog-content-container ">
            <Typography className="white">{subTitle}</Typography>
          </DialogContent>
          <Divider />
          <DialogActions className="mb-2 mx-2">
            <Button onClick={() => onClose()}>Cancel</Button>
            <Button onClick={() => actionOnDelete()}>Confirm</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
