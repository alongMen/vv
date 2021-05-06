import request from '../utils/request'


export function registerMember(data) {
    return request.post('users/insertnoexistUsers',data)
}
export function login(data) {
    return request.post('users/Login',data)
}
export function getShopList(data) {
    return request.post('shop/selectAll',data)
}
export function toPre(data) {
    return request.post('appointment/insertAppointment',data)
}
export function toCar(data) {
    return request.post('shoppingcart/insertShoppingcart',data)
}
export function orderCar(data) {
    return request.post('shoppingcartinfo/selectAll',data)
}
export function orderPre(data) {
    return request.post('appointmentinfo/selectAll',data)
}
export function getUserinfo(data) {
    return request.post('users/updateUsers',data)
}
export function changeUserinfo(data) {
    return request.post('users/updateUsers',data)
}


