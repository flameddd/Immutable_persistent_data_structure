const Immutable = require('immutable')
const SeamImmutable = require("seamless-immutable").static;
const { produce } = require("immer")

const testData = Array
  .from({ length: 5000 }, (v, i) => i)
  .reduce((acc ,cur) => Object.assign(
    {},
    acc,
    {[cur]: `${Math.floor(Math.random() * 99999) + 1}` }
  ), {})

const immutableTestData = Immutable.fromJS(testData)
const seamImmutableTestData = SeamImmutable(testData);

console.time('1.測試_Object_Assign')
const test1 = Object.assign(
  {},
  testData,
  { '99': '測試 Object Assign' }
)
console.timeEnd('1.測試_Object_Assign')
console.log(test1['99'])

console.time('2.測試ImmutableJS_set')
const setImmutableData = immutableTestData.set('99', '測試 immutableJS set')
console.timeEnd('2.測試ImmutableJS_set')
console.log(setImmutableData.get('99'))


console.time('3.測試Seamless-Immutable_set')
const setSeamImmutableData = SeamImmutable
  .set(seamImmutableTestData, "99", "測試 Seamless-Immutable set");
console.timeEnd('3.測試Seamless-Immutable_set')
console.log(setSeamImmutableData['99'])



console.time('4.測試 immer produce update')
const updatedTodosObj = produce(testData, draft => {
  draft["99"] = '測試 immer update'
})
console.timeEnd('4.測試 immer produce update')
console.log(updatedTodosObj['99'])