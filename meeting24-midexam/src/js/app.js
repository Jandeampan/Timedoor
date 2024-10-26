import { app } from './../index';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded!');
    initializeApp();
});

function initializeApp() {
    try {
        console.log('App initialization started...');
        
        // Check if the app instance is valid
        if (!app || typeof app.listen !== 'function') {
            throw new Error('Invalid app instance');
        }

        // Check if the port is set and valid
        const port = app.get('port');
        if (!port || isNaN(port)) {
            throw new Error('Invalid port configuration');
        }

        app.listen(port, () => {
            console.log(`App is running on http://localhost:${port}`);
        });

        // Additional checks can be added here if needed

        console.log('App started successfully!');
    } catch (err) {
        console.error('Error initializing the app:', err.message);
    }
}