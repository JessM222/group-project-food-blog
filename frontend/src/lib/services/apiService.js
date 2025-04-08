export function checkUserNameAvailabilityService(username) {
    const response = fetch(`http://localhost:3000/api/users/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response
}


export function registrationResponseService(payload) {
    const registrationResponse = fetch("http://localhost:3000/api/auth/register", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    return registrationResponse
}


export function loginService({ username,
    password, avatar }) {
    const response = fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password,
            avatar
        })
    });
    return response;
}

export function fetchUserDataService() {
    try {
        const response = fetch(`http://localhost:3000/api/users`, {
            credentials: "include"
        });

        return response;
    } catch (error) {
        // throw new Error("Error fetching user data", error);
    }
}


export function updateUserDataResponseService(userData) {
    const updateUserDataResponse = fetch("http://localhost:3000/api/users", {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
    return updateUserDataResponse;
}

export function handleDeleteService({ username }) {
    const response = fetch("http://localhost:3000/api/users", {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
        })
    });
    return response;
}


export function handleLogoutService(userData) {
    const response = fetch("http://localhost:3000/api/auth/logout", {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData

        )
    });
    return response;
}