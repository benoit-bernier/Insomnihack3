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
  post_well(data){
    return Api.post('/well/create', data)
  },
  put_well(data){
    return Api.put('well/update', data)
  },
  delete_well(id){
    return Api.put('well/delete/'+ id)
  }

}