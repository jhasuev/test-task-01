const FIELDS_DESC = {
  AcctNum: {
    label: "Номер счета",
    regExp: /^[0-9]{20}$/,
    invalidText: "Номер счета должно содержать ровно 20 цифр",
  },
  Balance: {
    label: "Остаток",
    regExp: /^-?[0-9]{1,}$/,
    invalidText: "Остаток может содержать только число",
    type: Number,
  },
  OpDate: {
    label: "Дата",
    regExp: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
    invalidText: "Дата должна содержать только числа в формате ггг-мм-дд (напр. 2017-07-27)",
  },
  Amount: {
    label: "Сумма",
    regExp: /^[0-9]{1,}$/,
    invalidText: "Сумма может содержать только число",
    type: Number,
  },
}
FIELDS_DESC.AcctNumDb = FIELDS_DESC.AcctNum
FIELDS_DESC.AcctNumCr = FIELDS_DESC.AcctNum

export default {
  FIELDS_DESC,
}