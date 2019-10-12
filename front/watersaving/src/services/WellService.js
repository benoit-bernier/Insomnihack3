import Api from '@/services/Api'

export default {
  fetchAllWells () {
    return Api.get('/wells')
  },
  fetchOneWell (id) {
    return Api.get('/well/'+id)
  }
}