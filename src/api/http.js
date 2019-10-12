import axios from 'axios'
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
let url = "/api"
function post(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, JSON.stringify(params)
        )
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err.data)
        })
    })
  }
// 退出登陆
export function getlogout (data) {
  return post(`${url}/site/logout`,data)
}
export function getadd (data) {
  return post(`${url}/site/achievement`,data)
}
export function getlists (data) {
  return post(`${url}/site/show`,data)
}
// 公司成就修改
export function getmodification (data) {
  return post(`${url}/site/update`,data)
}
// 公司成就修改
export function getdelete (data) {
    return post(`${url}/site/dele`,data)
}
// 店铺诊断
export function getdiagnose (data) {
    return post(`${url}/site/diagnosis`,data)
}
// 店铺诊断删除
export function getdpdelete (data) {
    return post(`${url}/site/delete`,data)
}
// 轮播
export function getbanner (data) {
    return post(`${url}/show/ashow`,data)
}
// 轮播删除接口
export function getbannerdelete (data) {
    return post(`${url}/show/dele`,data)
}
// 添加轮播
export function getbanneradd (data) {
    return post(`${url}/show/add`,data)
}
// 修改轮播
export function getbannerup (data) {
    return post(`${url}/show/update`,data)
}
// 企业动态
export function getdynamic (data) {
  return post(`${url}/consulting/dynamic`,data)
}
// 企业添加
export function getdynamicadd (data) {
  return post(`${url}/consulting/add`,data)
}
// 企业删除
export function getdynamicdel (data) {
  return post(`${url}/consulting/delete`,data)
}
// 企业修改展示
export function getdynamicux (data) {
  return post(`${url}/consulting/d_show`,data)
}
// 企业修改
export function getdynamicup (data) {
  return post(`${url}/consulting/update`,data)
}
// 新闻动态
export function getnewslist (data) {
  return post(`${url}/consulting/nshow`,data)
}
// 新闻删除
export function getnewsdelete (data) {
  return post(`${url}/consulting/n_dele`,data)
}
// 新闻添加
export function getnewsadd (data) {
  return post(`${url}/consulting/n_add`,data)
}
// 新闻修改返回
export function getnewsux (data) {
  return post(`${url}/consulting/shows`,data)
}
// 新闻修改
export function getnewsup (data) {
  return post(`${url}/consulting/modify`,data)
}
// 开课列表
export function getshlist (data) {
  return post(`${url}/course/courseshows`,data)
}
// 开课修改
export function getshlistup (data) {
  return post(`${url}/course/modifythe`,data)
}
// 开课添加
export function getshlistadd (data) {
  return post(`${url}/course/courseadd`,data)
}
// 开课删除
export function getshlistdelete (data) {
  return post(`${url}/course/m_dele`,data)
}
// 预约人员
export function getmakelist (data) {
  return post(`${url}/course/make`,data)
}
// 预约人员删除
export function getmakedelete (data) {
  return post(`${url}/course/delete`,data)
}
// 教师信息
export function getteacherlist (data) {
  return post(`${url}/course/teacher`,data)
}
// 教师删除
export function getteacherdelete (data) {
  return post(`${url}/course/dele`,data)
}
// 教师添加
export function getteacheradd (data) {
  return post(`${url}/course/add`,data)
}
// 教师添加
export function getteacherup (data) {
  return post(`${url}/course/information`,data)
}
// 教师修改
export function getteacherupx (data) {
  return post(`${url}/course/update`,data)
}
// 视频上传
export function getvideoup (data) {
  return post(`${url}/course/video`,data)
}
// 首页导航
export function getnavlist (data) {
  return post(`${url}/course/h_show`,data)
}
// 首页导航添加
export function getnavadd (data) {
  return post(`${url}/course/home`,data)
}
// 首页导航修改
export function getnavup (data) {
  return post(`${url}/course/h_update`,data)
}
// 首页导航删除
export function getnavdel (data) {
  return post(`${url}/course/h_delete`,data)
}
// 课程列表
export function getcourselist (data) {
  return post(`${url}/course/a_show`,data)
}
// 课程添加
export function getcourseadd (data) {
  return post(`${url}/course/a_course`,data)
}
// 课程修改
export function getcourseup (data) {
  return post(`${url}/course/c_update`,data)
}
// 课程修改
export function getcoursedel (data) {
  return post(`${url}/course/a_dele`,data)
}
// 优秀店铺
export function getexcellent (data) {
  return post(`${url}/course/asa`,data)
}
// 课程分类
export function getcoursecn (data) {
  return post(`${url}/course/comprehensive`,data)
}
// 课程分类添加
export function getcoursecnadd (data) {
  return post(`${url}/course/mcourses`,data)
}
// 课程分类修改
export function getcoursecnup (data) {
  return post(`${url}/course/modified`,data)
}
// 课程分类删除
export function getcoursecndel (data) {
  return post(`${url}/course/mo_dele`,data)
}
// 分类添加
export function getcladd(data) {
  return post(`${url}/course/mcourses`,data)
}
// 分类列表
export function getcllist(data) {
  return post(`${url}/course/type`,data)
}
// 公益资讯 
export function getcglist(data) {
  return post(`${url}/consulting/list`,data)
}
// 公益资讯删除
export function getcglistdel(data) {
  return post(`${url}/consulting/del`,data)
}
// 公益资讯数据返回
export function getcglistup(data) {
  return post(`${url}/consulting/welfare`,data)
}
// 公益资讯数据修改
export function getcglistupdata(data) {
  return post(`${url}/consulting/i_update`,data)
}
// 公益资讯数据添加
export function getcglistupadd(data) {
  return post(`${url}/consulting/information`,data)
}
// 点击统计
export function getdatanum(data) {
  return post(`${url}/show/pv`,data)
}
// 成功案例
export function getcgallist(data) {
  return post(`${url}/course/caselist`,data)
}
// 成功案例tianjia
export function getcgallistadd(data) {
  return post(`${url}/course/case`,data)
}
// 成功案例返回
export function getcgallistup(data) {
  return post(`${url}/course/shows`,data)
}
// 成功案例修改
export function getcgallistupdata(data) {
  return post(`${url}/course/modification`,data)
}
// 成功案例删除
export function getcgallistdel(data) {
  return post(`${url}/course/c_dele`,data)
}
// 电商资源列表
export function getchannellist(data) {
  return post(`${url}/course/list`,data)
}
// 电商资源删除
export function getchanneldel(data) {
  return post(`${url}/course/deleted`,data)
}
// 电商资源添加
export function getchanneladd(data) {
  return post(`${url}/course/channel`,data)
}
// 电商资源修改返回
export function getchannelup(data) {
  return post(`${url}/course/c_show`,data)
}
// 电商资源修改
export function getchannelupdata(data) {
  return post(`${url}/course/changes`,data)
}
// 教师反馈
export function getproblem(data) {
  return post(`${url}/consulting/problem`,data)
}
// 教师删除
export function getproblemdel(data) {
  return post(`${url}/consulting/p_dele`,data)
}
// 渠道分类父级标题
export function getparent(data) {
  return post(`${url}/course/parent`,data)
}
// 渠道分类添加
export function getqchanneladd(data) {
  return post(`${url}/course/channeladd`,data)
}
// 渠道分类修改
export function getC_changes(data) {
  return post(`${url}/course/c_changes`,data)
}
// 渠道分类删除
export function getqdlistdel(data) {
  return post(`${url}/course/parentdele`,data)
}
// 渠道小类删除
export function getchdel(data) {
  return post(`${url}/course/s_dele`,data)
}
// 渠道轮播图
export function getbannerqlist(data) {
  return post(`${url}/course/clist`,data)
}
// 渠道轮播图添加
export function getbannerqadd(data) {
  return post(`${url}/show/banner`,data)
}
// 渠道轮播图修改
export function getbannerqundate(data) {
  return post(`${url}/show/b_update`,data)
}
// 渠道轮播图删除
export function getbannerqdel(data) {
  return post(`${url}/course/bdele`,data)
}
// 渠道
export function getson(data) {
  return post(`${url}/course/son`,data)
}
// 角色列表
export function getrole_list(data) {
  return post(`${url}/show/role_list`,data)
}
// 角色权限列表
export function getpermissions(data) {
  return post(`${url}/show/permissions`,data)
}
// 角色权限添加
export function getrole_add(data) {
  return post(`${url}/show/role_add`,data)
}
// 角色修改显示
export function getrole_show(data) {
  return post(`${url}/show/role_show`,data)
}
// 角色修改
export function getrole_update(data) {
  return post(`${url}/show/role_update`,data)
}
// 角色删除
export function getrole_dele(data) {
  return post(`${url}/show/role_dele`,data)
}
// 管理员列表
export function getperm_list(data) {
  return post(`${url}/show/perm_list`,data)
}
// 管理员添加
export function getperm_add(data) {
  return post(`${url}/show/perm_add`,data)
}
// 管理员修改
export function getperm_update(data) {
  return post(`${url}/show/perm_update`,data)
}
// 管理员删除
export function getperm_dele(data) {
  return post(`${url}/show/perm_dele`,data)
}
// 权限列表
export function getlander(data) {
  return post(`${url}/show/lander`,data)
}
// 注册列表
export function getregister(data) {
  return post(`${url}/show/registered`,data)
}
// 注册列表删除
export function getuser_dele(data) {
  return post(`${url}/show/user_dele`,data)
}