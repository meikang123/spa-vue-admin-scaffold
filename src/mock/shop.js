const defaultData = [{
  id: 1
}, {
  id: 2
}, {
  id: 3
}, {
  id: 4
}, {
  id: 5
}, {
  id: 6
}];


export default {
  'GET /api/shop': defaultData,

  'POST /api/shop'() {
    return defaultData;
  },
  'delete /api/shop/[1-9]'() {
    return defaultData;
  }
};
