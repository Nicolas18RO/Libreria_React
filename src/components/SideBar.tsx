import * as React from 'react';
import { Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar } from '@mui/material';
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";  // ✅ Fixed missing import
import { useNavigate } from 'react-router-dom';
import { Savings } from '@mui/icons-material';

export default function SideBar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const menuItems = [
    { Text: 'Autor', Icon: <PersonIcon />, path: "/autor" },
    { Text: 'Editorial', Icon: <MenuBookIcon />, path: "/editorial" },
    { Text: 'Libro', Icon: <BusinessIcon />, path: "/libro" },
    { Text: 'Miembro', Icon: <GroupIcon />, path: "/miembro" },
    { Text: 'Prestamo', Icon: <Savings/>, path: "/prestamo" },
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map(({ Text, Icon, path }) => (
          <ListItem key={Text} disablePadding>
            <ListItemButton onClick={() => navigate(path)}>
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText primary={Text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button 
            startIcon={<MenuIcon />} 
            color="inherit"
            onClick={toggleDrawer(true)} 
          >
            Menu
          </Button>
          <Button 
            startIcon={<HomeIcon />} 
            onClick={() => navigate("/")} 
            color="inherit"
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
