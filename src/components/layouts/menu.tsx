import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import * as React from "react";

const AccountMenu = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  const handleProfile = (e: Event | React.SyntheticEvent) => {
    router.push(`/profile`, { scroll: false });
    handleClose(e);
  };
  const handleLogout = (event: Event | React.SyntheticEvent) => {
    handleClose(event);
    localStorage.removeItem("accessToken");
    router.refresh();
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <IconButton
          ref={anchorRef}
          id="account-button"
          aria-controls={open ? "account-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar sx={{ width: 32, height: 32 }}>Y</Avatar>
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    sx={{ width: "170px" }}
                  >
                    <MenuItem onClick={(e: any) => handleProfile(e)}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          marginRight: "10px",
                        }}
                      />{" "}
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          marginRight: "10px",
                        }}
                      />{" "}
                      Hesabım
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Ayarlar
                    </MenuItem>
                    <MenuItem
                      onClick={(e: any) => {
                        handleLogout(e);
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Çıkış Yap
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
};

export default AccountMenu;
