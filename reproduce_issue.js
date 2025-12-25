
const test = async () => {
    try {
        // Intentionally adding newlines to simulate the user's error
        const url = 'http://localhost:5000/api/auth/register%0A%0A';
        console.log(`Hitting: ${url}`);

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: "Test User",
                email: "test_clean@example.com",
                password: "password123",
                agreeToTerms: true
            })
        });

        const text = await response.text();
        console.log('Status:', response.status);
        console.log('Response:', text);
    } catch (e) {
        console.error('Error:', e.message);
    }
};

test();
