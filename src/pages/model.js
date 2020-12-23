import { getNameById } from './service';

export default {
  namespace: 'index', //命名空间
  state: {
    name: 'null',
  },
  reducers: {
    //同步改变state， state为原来的状态 ， action中包含dispatch传过来的入参和回调函数 
    setName(state, action) {
      const callback = action.callback;  //结构出回调函数
      callback && callback(action.payload.name);
      return {
        ...state,   //展开旧状态
        name: action.payload.name, //新状态替换
      };
    },
  },
  effects: {
   //* + yield 写法为ES5 Generator写法  
    *getNameById(action, dvaMethods) {
      const { call, put } = dvaMethods;  //dvaMethods为effects中提供的一些方法，详情看dva
      const id = action.payload.id;   //从aciton中获取入参字段id
      const callback = action.callback; //从action中获取回调方法
      const res = yield call(getNameById, id); //用call方法调用请求方法getNameById，  call（方法名，入参） 
    
      //put方法是effects中提供的可以调用reducers中的方法的函数
      yield put({               
        type: 'setName',    //触发reducers中的改变state的方法setName    
        payload: {         //此处入参与dispatch中相同 
          name: res,        
        },                
      });                     
      callback && callback(res);     //传入的回调方法
    },
  },
};
