import Z from "zod"

const loginSchema = Z.object({
    email:Z.email("invalid email"),
    password:Z.string("password required").min(6,"password at least 6 digit").max(30,"password can't more then 30 digit"),
    rememberMe:Z.boolean()
})

export default loginSchema