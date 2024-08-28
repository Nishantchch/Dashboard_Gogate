import { errorMessages } from "./common_messages"

export const Fun_SetDataToState = (setState, data) => {
  setState((preval) => ({
    ...preval,
    ...data
  }))
}
export const Fun_NestedTernaryOprator = (condition = false, first = "", second = "") => {
  return condition ? first : second
}

export const Fun_NestedTernaryFunction = (condition, errorMsg, val, errorMessageReq, second = null) => {
  return !!condition ? assignError(errorMsg, val, errorMessageReq) : second
}

const assignError = (errorMsg, key, value) => {
  errorMsg[key] = value
}

export const Fun_subError = (condition) => {
  return condition ? true : false
}

export const Fun_DrawOptions = (optionsValue) => {
  return optionsValue.map((e) => {
    return {
      ...e,
      label: e.name,
    };
  })
}

export const Fun_RemoveAllSpace = (value) => {
  return value ? value.replaceAll(' ', '') : ''
}
export const Fun_setRequiredValidation = (value) => {
  return !value ? errorMessages.required : ""

}
export const Fun_checkOrCondition = (...conditions) => {
  let result = false
  conditions.forEach((condition) => {
    result = result || condition
  })
  return result
}
export const Fun_checkAndCondition = (...conditions) => {
  let result = true
  conditions.forEach((condition) => {
    result = result && condition
  })
  return result
}

export const Fun_IfElseCondition = (...conditions) => {
  conditions.every((condition) => {
    const [cond, callback] = condition
    if (cond) {
      callback()
      return false
    }
    return true
  })
}