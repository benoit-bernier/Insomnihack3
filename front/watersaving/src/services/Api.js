import axios from 'axios'
import store from '../store'
import Router from '../router'

const axiosInstance = axios.create({
  baseURL: 'http://'+process.env.VUE_APP_SERVER_URL+':3000/'
})

axiosInstance.interceptors.response.use(response => response, error =>{
  console.log(response)
  if(error.response.status === 401){
    Router.push('/')
    store.dispatch('logout');
  }
})

export default axiosInstance