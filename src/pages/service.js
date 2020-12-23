

export function getNameById(id) {   //封装请求mock中数据的方法
  return fetch('/pengfei')
    .then(res => res.json())
    .then(resJson => {
      return resJson.message;                
    });
}
