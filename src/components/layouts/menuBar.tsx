import { KeyboardArrowDown } from "@mui/icons-material";
import { Button } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

interface MenuProps {
    menuName: string;
    menuItems: string[];
}

const MenuBar = ({ menuName, menuItems}: any) => {
    const router: any = useRouter();
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState<boolean>(false);

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

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleClick = (
        value: string,
        event: Event | React.SyntheticEvent
    ) => {
        if (value === "Kategoriler") {
            router.push("/category", { scroll: false });
        } else if (value === "İş bul") {
            router.push("/find-work", { scroll: false });
            handleClose(event);
        }

        function handleListKeyDown(event: React.KeyboardEvent) {
            if (event.key === "Tab") {
                event.preventDefault();
                setOpen(false);
            } else if (event.key === "Escape") {
                setOpen(false);
            }
        }

        // return focus to the button when we transitioned from !open -> open

        return (
            <Stack direction="row" spacing={2}>
                <div>
                    <Button
                        id="demo-customized-button"
                        ref={anchorRef}
                        aria-controls={
                            open ? "demo-customized-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        // variant="contained"
                        disableElevation
                        className="nav-text"
                        onClick={handleToggle}
                        sx={{ textTransform: "none" }}
                        endIcon={<KeyboardArrowDown />}
                    >
                        {menuName}
                    </Button>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                        sx={{ width: "150px" }}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom-start"
                                            ? "left top"
                                            : "left bottom",
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener
                                        onClickAway={handleClose}
                                    >
                                        <MenuList
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            {menuItems.map((element:any, idx:any) => {
                                                return (
                                                    <MenuItem
                                                        key={element}
                                                        onClick={(e:any) =>
                                                            handleClick(
                                                                element,
                                                                e
                                                            )
                                                        }
                                                    >
                                                        {" "}
                                                        {element}
                                                    </MenuItem>
                                                );
                                            })}
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
};

export default MenuBar;
