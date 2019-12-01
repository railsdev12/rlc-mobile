/**
 * Class for defining API routes
 */
export class APIRoutes {
    // Use to build api routes
    static createRoute(route)           { return `/api/${route}` }
    static deviseRoute(route)           { return `/users/${route}` }

    // Login
    static signupPath()                 { return `/users` }
    static loginPath()                  { return APIRoutes.deviseRoute(`sign_in`) }

    // Reset Password
    static UserPasswordPath()        { return APIRoutes.deviseRoute(`password`) }
}