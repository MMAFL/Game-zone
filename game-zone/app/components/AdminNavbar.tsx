"use client"; // This tells Next.js it's a client component
import { useState } from "react";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import styles from "../style/Navbar.module.css"; // Correct import
import { useAuth } from "@/app/context/authContext";

interface User {
    role: "player" | "admin" | null;
}

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const scrollToGames = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault(); // Prevent default link behavior

        const section = document.getElementById("gamesSection");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <nav className={styles.navbar}>
            {/* Logo */}
            <div className={styles.logo}>
                <Link href="/">GameZone</Link>
            </div>

            {/* Navigation Links */}
            <ul className={styles.navLinks}>
                <li><Link href="/">Home</Link></li>
                {user?.role === "admin" && (
                   <>
                    <li><Link href="/dashboard/addGames">Add a Game</Link></li>
                    <li><Link href="/dashboard/categories/addCategory">Add a Category</Link></li>
                    </>
                    
                )}
                
            </ul>

            {/* User Icon with Dropdown */}
            <div
                className={styles.userMenu}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
            >
                <FaRegCircleUser className={styles.userIcon} />

                {dropdownOpen && (
                    <div className={styles.dropdown}>
                        {!isAuthenticated ? (
                            <>
                                <Link href="/login">Log In</Link>
                                <Link href="/register">Register</Link>
                            </>
                        ) : (
                            <>
                                {/* <span>Welcome, {user?.username}!</span> */}
                                {user?.role === "player" && (
                                    <button onClick={logout}>Log Out</button>
                                )}
                                {user?.role === "admin" && (
                                    <>
                                        <button onClick={logout}>Log Out</button>
                                        <Link href="/dashboard">dashboard</Link>

                                    </>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
