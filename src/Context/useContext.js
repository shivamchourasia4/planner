import axios from "axios";
import { useState } from "react";
import defaultNavLinks from "../utils/navigation";

export const useContextData = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [openSideBar, setOpenSideBar] = useState(false);
	const toggleSideBar = () => {
		setOpenSideBar((p) => !p);
	};

	const [sideBarLinks, setSideBarLinks] = useState(defaultNavLinks);

	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "light"
	);
	const toggleTheme = () => {
		document.body.classList = theme === "light" ? "dark" : "light";
		localStorage.setItem("theme", theme === "light" ? "dark" : "light");
		setTheme((p) => (p === "light" ? "dark" : "light"));
	};

	const [accentColor, setAccentColor] = useState("red");
	const handleAccentColor = (color) => {
		setAccentColor(color);
	};

	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const isLocalAuthenticated = localStorage.getItem("isAuthenticated");
	const [isAuthenticated, setIsAuthenticated] = useState(
		JSON.parse(isLocalAuthenticated) || false
	);
	const axiosInstance = axios.create({
		baseURL: "http://localhost:5000/",
		headers: {
			"x-auth-token": localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
	});

	const mediaQuerySm = window.matchMedia("(max-width: 672px)");
	const mediaQueryMd = window.matchMedia("(max-width: 880px)");
	const mediaQueryLg = window.matchMedia("(min-width: 880px)");
	const breakpoint = (device) => {
		if (device === "mobile") return mediaQuerySm.matches;
		else if (device === "tab") return mediaQueryMd.matches;
		else return mediaQueryLg.matches;
	};
	mediaQuerySm.addListener(breakpoint);
	mediaQueryMd.addListener(breakpoint);
	mediaQueryLg.addListener(breakpoint);

	return {
		theme,
		setTheme,
		accentColor,
		setAccentColor,
		handleAccentColor,
		toggleTheme,
		breakpoint,
		isLoading,
		setIsLoading,
		isAuthenticated,
		setIsAuthenticated,
		user,
		setUser,
		openSideBar,
		setOpenSideBar,
		toggleSideBar,
		sideBarLinks,
		setSideBarLinks,
		axiosInstance,
	};
};