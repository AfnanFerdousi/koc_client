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

const AccountMenu = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const router = useRouter();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleProfile = (e) => {
    router.push(`/profile/me`, { scroll: false });
    handleClose(e);
  };
  const handleLogout = (event) => {
    handleClose(event);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    router.refresh();
  };

  function handleListKeyDown(event) {
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
      if (anchorRef.current) {
        anchorRef.current.focus();
      }
    }

    prevOpen.current = open;
  }, [open]);
  const userProfile = useSelector((state) => state.user?.data);

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
                    className="w-60  bg-white rounded-3xl"
                  >
                    <MenuItem
                      onClick={(e) => handleProfile(e)}
                      className="flex flex-col "
                    >
                      {userProfile?.user?.profile_picture ? (
                        <div className="w-[120px] h-[120px] border rounded-full ">
                          <img
                            src={userProfile?.user?.profile_picture}
                            alt="profile picture"
                            className="object-cover rounded-full w-full h-full"
                          />
                        </div>
                      ) : (
                        <Avatar
                          sx={{
                            width: 120,
                            height: 120,
                            backgroundColor: "#35B900",
                            color: "white",
                            fontSize: 16,
                          }}
                        >
                          {(userProfile?.user?.first_name?.slice(0, 1) ?? "") +
                            (userProfile?.user?.lastName?.slice(0, 1) ?? "")}
                        </Avatar>
                      )}

                      <p className="text-secondary text-xl my-1 font-medium">
                        {userProfile?.user?.first_name +
                          " " +
                          userProfile?.user?.lastName}
                      </p>
                    </MenuItem>
                    <MenuItem onClick={() => router.push("/profile/settings")}>
                      <ListItemIcon>
                        <Settings />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleLogout(e);
                      }}
                    >
                      <ListItemIcon>
                        <Logout />
                      </ListItemIcon>
                      Logout
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
