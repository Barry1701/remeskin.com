import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../NavBar';
import { CurrentUserProvider } from '../../contexts/CurrentUserContext';

test('Renders link to the user profile for a logged in user', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );
    
    // Sprawdza, czy avatar profilu pojawia się w NavBar po zalogowaniu
    const profileAvatar = await screen.findByText('Profile');
    expect(profileAvatar).toBeInTheDocument();
});
