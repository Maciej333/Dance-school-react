export const validate = (
    formData: { [key: string]: { value: any, error: string } },
    formDataVal: { [key: string]: ((value: any) => boolean)[] }
): boolean => {
    let isValid = true;

    Object.entries(formData)
        .filter(el => {
            if (formDataVal[el[0]]) {
                return true;
            }
            return false;
        }).forEach(el => {
            formDataVal[el[0]].forEach(val => {
                const valResult = val(el[1].value);
                isValid = isValid && valResult;
            });
        })
    return isValid;
}


export const validator = (msg: () => void) => (result: (value: any) => boolean) => (value: any): boolean => {
    let valid = result(value);
    if (!valid) {
        msg();
    }
    return valid;
}

export const notEmpty = (value: any): boolean => {
    return Boolean((value ?? false) || false);
}

export const stringLength = (min: number, max?: number) => (value: string): boolean => {
    let result = true;

    if (value.length >= min) {
        if (max) {
            if (value.length > max) {
                result = false;
            }
        }
    } else {
        result = false;
    }
    return result;
}

export const arrayLength = (min: number, max?: number) => (value: any[]): boolean => {
    let result = true;

    if (value.length >= min) {
        if (max) {
            if (value.length > max) {
                result = false;
            }
        }
    } else {
        result = false;
    }
    return result;
}

export const numberValue = (min: number, max?: number) => (value: number): boolean => {
    let result = true;

    if (value >= min) {
        if (max) {
            if (value > max) {
                result = false;
            }
        }
    } else {
        result = false;
    }
    return result;
}