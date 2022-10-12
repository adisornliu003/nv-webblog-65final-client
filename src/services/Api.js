import axios from 'axios'
export default () => {
 return axios.create({ 
 baseURL: 'http://10.31.27.240:8081/',
 headers:{
}
 })
}