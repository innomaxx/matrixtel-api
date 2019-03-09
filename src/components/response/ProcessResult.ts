
type Primitive = number | string | boolean

type DTObject = object | object[] | Primitive[] | null

type ProcessResult = Primitive | DTObject

export default ProcessResult
export { ProcessResult, Primitive }

/* https://learn.javascript.ru/json

* JavaScript-объекты { ... }          -> DTObject.object
* Массивы [ ... ]                     -> DTObject.Primitive[]
* Значения одного из типов:
  * строки в двойных кавычках,        -> Primitive.string
  * число,                            -> Primitive.number
  * логическое значение true/false,   -> Primitive.boolean
  * null.                             -> DTObject.null

*/
