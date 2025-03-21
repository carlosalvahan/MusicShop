export const APIURL = {
    registerApi: '/authapi/api/auth/register',
    getRolesApi: '/authapi/api/auth/GetRoles',
    loginApi: '/authapi/api/auth/login',
    getUsers: '/authapi/api/auth/GetUsersAdmin',
    deleteUsers: '/authapi/api/auth/DeleteUser?id=',
    instrumentApi: '/instrumentapi/api/Instrument',
    instrumentById: '/instrumentapi/api/Instrument/${0}',
}


export const sessionKeys = {
    authToken: 'authToken',
    userPerm: 'userPermissions'
}