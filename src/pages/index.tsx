import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { connect } from 'umi';

class Index extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch({   //dispatch为页面触发model中方法的函数
        type: 'index/getNameById',  //type：'命名空间/reducer或effects中的方法名'
        payload: {   //入参
          id: '666',
        },
        callback: res => {    //callback可以给model传入一个回调函数
          console.log(res + '666'); 
        },
      });
    }, 1000);
    setTimeout(() => {
      this.props.dispatch({       //dispatch为页面触发model中方法的函数
        type: 'index/setName',    //type：'命名空间/reducer或effects中的方法名'
        payload: {
          name: '蓝钜',   //入参
        },
        callback: res => {   //callback可以给model传入一个回调函数
          console.log(res + '666');
        },
      });
    }, 2000);
  }
  render() {
    return (
      <div>
        <h1 className={styles.title}>Page index {this.props.name}</h1>
      </div>
    );
  }
}

// 提取model中的状态为mapStateToProps
const mapStateToProps = state => {
  const { name } = state.index;
  return {
    name,
  };
};

//使用dva提供的connect方法绑定mapStateToProps与页面组件，绑定过后就可以在页面通过this.props使用state
export default connect(mapStateToProps)(Index);
