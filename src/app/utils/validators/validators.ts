export const validate = (
    formData: { [key: string]: { value: any, error: string } },
    formDataVal: { [key: string]: ((value: any) => boolean)[] }
): boolean => {
    let isValid = true;
    Object.entries(formData).forEach(el => {
        formDataVal[el[0]].forEach(val => {
            isValid && val(el[1].value);
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
    return (value ?? false) || false;
}

export const stringLength = (min: number, max?: number) => (value: string) => {
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