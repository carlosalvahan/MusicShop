export const APIURL = {
    registerApi: '/authapi/api/auth/register',
    getRolesApi: '/authapi/api/auth/GetRoles',
    loginApi: '/authapi/api/auth/login',
    getUsers: '/authapi/api/auth/GetUsersAdmin',
    restAuthApi: '/authapi/api/auth',
    updateUser: '/authapi/api/auth/UpdateUser',
    deleteUsers: '/authapi/api/auth/DeleteUser?id=',
    instrumentApi: '/instrumentapi/api/Instrument',
    instrumentById: '/instrumentapi/api/Instrument/${0}',
    getCart: '/instrumentapi/api/Cart/GetByUser/${0}',
    restCartApi: '/instrumentapi/api/Cart',
    removeFromCart: '/instrumentapi/api/Cart/RemoveFromCart/${0}',
    restOrderApi: '/orderapi/api/Order',
    getOrdersByUser: '/orderapi/api/Order/${0}'
}


export const sessionKeys = {
    authToken: 'authToken',
    userPerm: 'userPermissions'
}