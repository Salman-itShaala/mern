export function handleGetReq(req, res) {
    res.send("Got req to User router and we are handiling it from handler fn");
}


export function handleLoginReq(req, res) {
    res.send("Triying to login user");
}

export function handleSignupReq(req, res) {
    res.send("Trying to signup");
}