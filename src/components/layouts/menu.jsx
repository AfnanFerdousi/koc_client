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
import { useDispatch, useSelector } from "react-redux";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Image from "next/image";
import { getNotifications, patchReadNotifications } from "../../axios/axios";
import { setLoading } from "../../redux/reducers/loadingSlice";
import { formatDistance } from "date-fns";
import { Badge } from "@mui/material";
import { MdAccountCircle, MdRefresh } from "react-icons/md";

const AccountMenu = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);
  const anchorRef1 = React.useRef(null);
  const handleToggle1 = () => {
    setOpen1((prevOpen1) => !prevOpen1);
    handleRefresh();
  };

  const handleClose1 = (event) => {
    if (anchorRef1.current && anchorRef1.current.contains(event.target)) {
      return;
    }

    setOpen1(false);
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

  function handleListKeyDown1(event) {
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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen1 = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen1.current === true && open === false) {
      if (anchorRef1.current) {
        anchorRef1.current.focus();
      }
    }

    prevOpen1.current = open;
  }, [open]);

  const userProfile = useSelector((state) => state.user?.data);

  const [notifications, setNotifications] = React.useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      const response = await dispatch(getNotifications(userProfile?.user?._id));
      setNotifications(response?.payload?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRefresh = async () => {
    await fetchData();
    // Mark notifications as read after refreshing
    dispatch(patchReadNotifications(userProfile?.user?._id));
  };

  React.useEffect(() => {
    fetchData();
  }, [dispatch, userProfile?.user?._id, router]);

  return (
    <Stack direction="row">
      <div>
        <IconButton
          ref={anchorRef1}
          id="account-button"
          aria-controls={open1 ? "account-menu" : undefined}
          aria-expanded={open1 ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle1}
        >
          <Badge
            badgeContent={notifications?.filter((item) => !item.read).length}
            color="success"
          >
            <CircleNotificationsIcon
              sx={{
                width: 32,
                height: 32,
                color: "white",
              }}
            />
          </Badge>
        </IconButton>
        <Popper
          open={open1}
          anchorEl={anchorRef1.current}
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
                <ClickAwayListener onClickAway={handleClose1}>
                  <MenuList
                    autoFocusItem={open1}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown1}
                    className="lg:w-[380px] w-[80vw] shadow bg-gray-50 rounded-3xl"
                  >
                    <div className="bg-gray-50  h-[50vh] w-full overflow-y-scroll p-3  absolute right-0">
                      <div className="flex items-center justify-between">
                        <p
                          tabIndex={0}
                          className="focus:outline-none mb-2 text-xl font-semibold leading-6 text-gray-800"
                        >
                          Notifications
                        </p>
                        <MdRefresh
                          className="w-6 h-6 cursor-pointer"
                          onClick={handleRefresh}
                        />
                      </div>
                      {!loading ? (
                        notifications?.map((item, index) => (
                          <div
                            className={`bg-gray-50 w-full hover:bg-gray-100 hover:rounded-lg cursor-pointer p-2  flex items-start gap-x-2 ${
                              !notifications?.length - 1 === index && "border-b"
                            }`}
                            key={index}
                            onClick={() => item.url && router.push(item.url)}
                          >
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: "#35B900",
                                color: "white",
                                fontSize: 16,
                                borderRadius: 8,
                                marginTop: 0.5,
                              }}
                              src={item?.img}
                            >
                              KOC
                            </Avatar>
                            <div>
                              <p className="">{item?.text}</p>
                              <p className="text-sm mt-1 leading-normal font-medium text-secondary">
                                {item?.createdAt &&
                                  (({ timestamp }) => (
                                    <span>
                                      {formatDistance(
                                        new Date(timestamp),
                                        new Date(),
                                        {
                                          addSuffix: true,
                                        }
                                      )}
                                    </span>
                                  ))({ timestamp: item?.createdAt ?? 0 })}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center col-span-1 lg:col-span-3 justify-center h-[30vh] mx-auto">
                          <div className="loader"></div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <hr className="w-full" />
                        <p
                          tabIndex={0}
                          className="focus:outline-none text-sm flex flex-shrink-0 leading-normal px-3 py-8 text-secondary"
                        >
                          {notifications?.length > 1
                            ? "That's it for now"
                            : "No notifications found"}
                        </p>
                        <hr className="w-full" />
                      </div>
                    </div>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
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
                    className="w-60  bg-gray-50 rounded-3xl"
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
                    <MenuItem onClick={() => router.push("/profile/me")}>
                      <ListItemIcon>
                        <MdAccountCircle className="w-6 h-6" />
                      </ListItemIcon>
                      Profile
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
