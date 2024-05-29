import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState({
        textSize: 'medium',
        color: 'black',
        isLeft: false,
    });

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme');
                if (savedTheme) {
                    setTheme(JSON.parse(savedTheme));
                }
            }
            catch (error) {
                console.error("Error loading theme:", error);
            }
        }
        loadTheme();
    }, []);

    const saveTheme = async (newTheme) => {
        try {
          await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
          setTheme(newTheme);
        } catch (e) {
          console.error(e);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, saveTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}