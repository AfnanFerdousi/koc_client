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
import { useSelector } from "react-redux";

interface User {
  first_name: string;
  lastName: string;
  // Add other properties as needed
}

interface RootState {
  state: User | undefined;
  auth: {
    data: {
      user: User | undefined; // User or undefined, depending on whether it's loaded
      // Add other properties if present in your Redux state
    };
  };
}

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
    router.push(`/profile/me`, { scroll: false });
    handleClose(e);
  };
  const handleLogout = (event: Event | React.SyntheticEvent) => {
    handleClose(event);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
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
  const userProfile: any = useSelector((state: RootState) => state.auth?.data);

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
          {userProfile?.user?.profile_picture ? (
            <div className="w-[32px] h-[32px] border rounded-full ">
              <img
                src={userProfile?.user?.profile_picture}
                // width={32}
                // height={32}
                alt="profile picture"
                className="object-cover rounded-full w-full h-full"
              />
            </div>
          ) : (
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "#35B900",
                color: "white",
                fontSize: 16,
              }}
            >
              {(userProfile?.user?.first_name?.slice(0, 1) ?? "") +
                (userProfile?.user?.lastName?.slice(0, 1) ?? "")}
            </Avatar>
          )}
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
