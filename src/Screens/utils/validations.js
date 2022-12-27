import validator from 'is_js';

const checkEmpty = (val, key) => {
  if (validator.empty(val.trim())) {
    return key;
  } else {
    return '';
  }
};

const checkMinLength = (val, minLength, key) => {
    if (val.trim().length < minLength) {
        return `Please enter valid ${key}`
    } else {
        return '';
    }
}

export default function (data) {
    const { name,businessName,phone, email, password } = data

    if (name !== undefined) {
        let emptyValidationText = checkEmpty(name, 'Please enter your name')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(name, 3, 'name')
            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }
    }

    if (businessName !== undefined) {
        let emptyValidationText = checkEmpty(businessName, 'Please enter your business name')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(businessName, 3, 'businessName')
            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }
    }

    if (phone !== undefined) {
        let emptyValidationText = checkEmpty(phone, 'Please enter your phone number')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            if (!(/^[0-9]{1,10}$/.test(phone))) {
                return 'Please enter valid phone'
            }
    if (phone.trim().length != 10) {
                return 'Please enter 10 Digit phone'
            }
        }
    }

    if (email !== undefined) {
        let emptyValidationText = checkEmpty(email, 'Please enter your email')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            if (!validator.email(email)) {
                return 'Please enter valid email'
            }
        }
    }


    if (password !== undefined) {
        let emptyValidationText = checkEmpty(password, 'Please enter your password')
        if (emptyValidationText !== '') {
            return emptyValidationText;
        } else {
            let minLengthValidation = checkMinLength(password, 2, 'password')
            if (minLengthValidation !== '') {
                return minLengthValidation
            }
        }
    }

}

