import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { Link, useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SubjectIcon from "@mui/icons-material/Subject";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { Button } from "@mui/material";
import { styled } from "@mui/material";
import ChangeLanguage from "../reusableUi/ChangeLanguage";
import logo from "../../images/logo.png";
import { useTranslation } from "react-i18next";
import { adminLogout } from "../../redux/adminSlice";
import { useDispatch } from "react-redux";
import BookIcon from "@mui/icons-material/Book";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import PercentIcon from "@mui/icons-material/Percent";

const drawerWidth = 240;

const Image = styled("img")({
  width: "90px",
  height: "40px",
});

function AdminLayout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = cookies.get("i18next") || "en";
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const topics = [
    {
      title: t("controlBoard"),
      icon: HomeIcon,
      link: "",
    },
    {
      title: t("studylevels"),
      icon: SchoolIcon,
      link: "/levels",
    },
    {
      title: t("studyyears"),
      icon: HourglassBottomIcon,
      link: "/years",
    },
    {
      title: t("studycurriculums"),
      icon: AssignmentIcon,
      link: "/curriculums",
    },
    {
      title: t("curriculumstoLevel"),
      icon: AddIcon,
      link: "/Curriculums_insert",
    },
    {
      title: t("subjects"),
      icon: SubjectIcon,
      link: "/subjects",
    },
    {
      title: t("categories"),
      icon: CategoryIcon,
      link: "/categories",
    },
    {
      title: t("teachersapprove"),
      icon: BeenhereIcon,
      link: "/teachers_approve",
    },
    {
      title: t("student_parent"),
      icon: SubjectIcon,
      link: "/parent-student",
    },
    {
      title: t("bookedLessons"),
      icon: BookIcon,
      link: "/booked-lessons",
    },
    {
      title: t("Balancechargeoperations"),
      icon: PaymentsIcon,
      link: "/payments",
    },
    {
      title: t("teachers"),
      icon: PersonIcon,
      link: "/teachers",
    },
    {
      title: t("students"),
      icon: PeopleAltIcon,
      link: "/students",
    },
    {
      title: t("social"),
      icon: ConnectWithoutContactIcon,
      link: "/social-media",
    },
    {
      title: t("add_profit"),
      icon: PercentIcon,
      link: "/add-profit",
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {topics.map((item, index) => (
          <Link to={`/admin${item.link}`}>
            <ListItem key={item.title + index + "o"} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ textAlign: "start" }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  function logout() {
    dispatch(adminLogout());
    navigate("/admin");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mr: { sm: lang === "en" && `${drawerWidth}px` },
          ml: { sm: lang === "ar" && `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              paddingY: "8px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 1, ml: 1, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                <Image src={logo} />
              </Typography>
            </Box>
            <Box>
              <ChangeLanguage lang={lang} />
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginLeft: "12px" }}
                onClick={logout}
              >
                {t("logout")}
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            borderLeft: "1px solid #0000001f",
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: "hidden",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

AdminLayout.propTypes = {
  window: PropTypes.func,
};

export default AdminLayout;
