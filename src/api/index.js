// 统一请求路径前缀在libs/axios.js中修改
import { getRequest, postRequest, putRequest, deleteRequest, uploadFileRequest } from '@/libs/axios';

export const host = "http://localhost:7001/api/v1"
export const getMenuList = "/permission/menu"
export const uploadFile = "/xboot/upload/file"

// 登陆
export const login = (params) => {
    return postRequest('/passport/token/by/code', params)
}
// 获取用户登录信息
export const userInfo = (params) => {
    return getRequest('/account/info', params)
}
// 注册
export const regist = (params) => {
    return postRequest('/account/register', params)
}
// 初始化验证码
export const initCaptcha = (params) => {
    return getRequest('/common/captcha/init', params)
}
// 发送短信验证码
export const sendSms = (phone, params) => {
    return getRequest(`/common/captcha/sendSms/${phone}`, params)
}
// 短信验证码登录
export const smsLogin = (params) => {
    return postRequest('/user/smsLogin', params)
}
// 个人中心编辑
export const userInfoEdit = (params) => {
    return postRequest('/user/edit', params)
}
// 个人中心修改密码
export const changePass = (params) => {
    return postRequest('/user/modifyPass', params)
}
// 解锁
export const unlock = (params) => {
    return postRequest('/user/unlock', params)
}

// 获取JWT
export const getJWT = (params) => {
    return getRequest('/social/getJWT', params)
}



// 获取绑定账号信息
export const relatedInfo = (username, params) => {
    return getRequest(`/relate/getRelatedInfo/${username}`, params)
}
// 解绑账号
export const unRelate = (params) => {
    return postRequest('/relate/delByIds', params)
}
// 分页获取绑定账号信息
export const getRelatedListData = (params) => {
    return getRequest('/relate/findByCondition', params)
}



// 获取用户数据 多条件
export const getUserListData = (params) => {
    return getRequest('/permission/user/admin', params)
}
// 获取全部用户数据
export const getAllUserData = (params) => {
    return getRequest('/user/getAll', params)
}
// 添加用户
export const addUser = (params) => {
    return postRequest('/permission/user/admin', params)
}
// 编辑用户
export const editUser = (params) => {
    return postRequest('/user/admin/edit', params)
}
// 启用用户
export const enableUser = (id, params) => {
    return putRequest(`/permission/user/admin/enable/${id}`, params)
}
// 禁用用户
export const disableUser = (id, params) => {
    return putRequest(`/permission/user/admin/disable/${id}`, params)
}
// 删除用户
export const deleteUser = (ids, params) => {
    return deleteRequest(`/permission/user/admin/${ids}`)
}



// 获取一级部门
export const initDepartment = (params) => {
    return getRequest('/permission/department/by/parent/0', params)
}
// 加载部门子级数据
export const loadDepartment = (id, params) => {
    return getRequest(`/permission/department/by/parent/${id}`, params)
}
// 添加部门
export const addDepartment = (params) => {
    return postRequest('/permission/department', params)
}
// 编辑部门
export const editDepartment = (params) => {
    return putRequest('/permission/department', params)
}
// 删除部门
export const deleteDepartment = (ids, params) => {
    return deleteRequest(`/department/delByIds/${ids}`, params)
}
// 搜索部门
export const searchDepartment = (params) => {
    return getRequest('/department/search', params)
}



// 获取全部角色数据
export const getAllRoleList = (params) => {
    return getRequest('/permission/role/all', params)
}
// 分页获取角色数据
export const getRoleList = (params) => {
    return getRequest('/permission/role', params)
}
// 添加角色
export const addRole = (params) => {
    return postRequest('/permission/role', params)
}
// 编辑角色
export const editRole = (params) => {
    return putRequest('/permission/role', params)
}
// 设为或取消注册角色
export const setDefaultRole = (params) => {
    return putRequest('/permission/role/default', params)
}
// 分配角色权限
export const editRolePerm = (params) => {
    return postRequest('/permission/role/menu', params)
}
// 分配角色数据权限
export const editRoleDep = (params) => {
    return postRequest('/permission/role/department', params)
}
// 删除角色
export const deleteRole = (ids) => {
    return deleteRequest(`/permission/role/${ids}`)
}



// 获取全部权限数据
export const getAllPermissionList = (params) => {
    return getRequest('/permission/menu/all', params)
}
// 添加权限
export const addPermission = (params) => {
    return postRequest('/permission/menu', params)
}
// 编辑权限
export const editPermission = (params) => {
    return putRequest('/permission/menu', params)
}
// 删除权限
export const deletePermission = (ids) => {
    return deleteRequest(`/permission/menu/${ids}`)
}
// 搜索权限
export const searchPermission = (params) => {
    return getRequest('/permission/menu/search', params)
}