import Api from '@/services/Api'

export default {
  get_all_last(){
    return Api.get('/well/data/last')
  },
  get_last(id){
    return Api.get('/well/data/last/' + id)
  },
  get_all_data(id){
    return Api.get('/well/data/all/' + id)
  },
  get_all_name(){
    return Api.get('/well/data/name/all')
  },
  get_all_detail(){
    return Api.get('/well/data/nameLatLong/all')
  },
  post_well(data){
    return Api.post('/well/create', data)
  },
  put_well(data){
    return Api.put('well/update', data)
  },
  delete_well(id){
    return Api.delete('well/delete/'+ id)
  }
  /*,
  get_all_history(id){
    return Api.get('well/info/all/' + id)
  },
  post_history(data){
    return Api.post('well/info/add', data)
  }
*/
}