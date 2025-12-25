
const assert = (condition, msg) => {
    if (!condition) {
        console.error(`❌ Assertion Failed: ${msg}`);
        process.exit(1);
    } else {
        console.log(`✅ ${msg}`);
    }
};

const randomString = () => Math.random().toString(36).substring(7);
const testEmail = `test_${randomString()}@example.com`;

const register = async (userData) => {
    console.log(`\nAttempting Register with: ${userData.email}`);
    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    console.log(`Status: ${response.status}, Message: ${data.message}`);
    return { status: response.status, data };
};

const login = async (creds) => {
    console.log(`\nAttempting Login with: ${creds.email}`);
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds)
    });
    const data = await response.json();
    console.log(`Status: ${response.status}, Token: ${!!data.token}`);
    return { status: response.status, data };
};

(async () => {
    try {
        // 1. Valid Registration
        const user = {
            fullName: "Test User",
            email: testEmail,
            phone: "1234567890",
            dateOfBirth: "1990-01-01",
            placeOfBirth: "Test City",
            password: "password123",
            agreeToTerms: true
        };
        const reg1 = await register(user);
        assert(reg1.status === 201, "Registration should succeed");

        // 2. Duplicate Registration
        const reg2 = await register(user);
        assert(reg2.status === 400, "Duplicate registration should fail");
        assert(reg2.data.message === "User already exists", "Should return correct error message");

        // 3. Login
        const log1 = await login({ email: user.email, password: user.password });
        assert(log1.status === 200, "Login should succeed");
        assert(log1.data.token, "Login should return token");

        console.log("\n🎉 All Auth tests passed!");
    } catch (e) {
        console.error("\n❌ Test Suite Failed:", e);
    }
})();
