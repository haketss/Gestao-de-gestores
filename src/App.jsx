import { Navigations } from './routes';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
    return (
        <ThemeProvider>
            <Navigations />
        </ThemeProvider>
    );
}
