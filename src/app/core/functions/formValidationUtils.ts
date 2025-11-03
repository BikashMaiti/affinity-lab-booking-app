type RuleType = 'required'
    | 'min-length'
    | 'max-length'
    | 'min-value'
    | 'max-value'
    | 'range-value'
    | 'email'
    | 'numeric'
    | 'integer'
    | 'no-spaces'
    | 'match-field'
    | 'custom-pattern';
// Represents the form data structure
interface FormDataModel {
    [fieldName: string]: any;
}
// Response returned after validation
interface FormValidationResult {
    isValid: boolean;
    message: string;
}
// Rules for each field inside the form
interface FieldValidationRule {
    message: string;
    type: RuleType;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    matchWith?: string;
    range?: [number, number];
}
// All validation rules mapped with field names
export interface FormValidationRules {
    [fieldName: string]: FieldValidationRule;
}
export const validateFormFields = (
    formData: FormDataModel,
    validationRules: FormValidationRules
): FormValidationResult => {
    const isEmptyValue = (value: any): boolean => {
        if (value === null || value === undefined || value === '') return true;
        if (Array.isArray(value) && value.length === 0) return true;
        return false;
    };

    for (const fieldName of Object.keys(validationRules)) {
        const rule = validationRules[fieldName];
        const fieldValue = formData[fieldName];
        let isFieldValid = true;
        switch (rule.type) {
            case 'required':
                isFieldValid = !isEmptyValue(fieldValue);
                break;
            case 'min-length':
                isFieldValid =
                    !isEmptyValue(fieldValue) &&
                    typeof fieldValue === 'string' &&
                    fieldValue.length >= (rule.minLength ?? Infinity);
                break;
            case 'max-length':
                isFieldValid =
                    !isEmptyValue(fieldValue) &&
                    typeof fieldValue === 'string' &&
                    fieldValue.length <= (rule.minLength ?? Infinity);
                break;
            case 'min-value':
                const numericMinValue = Number(fieldValue);
                isFieldValid = !isNaN(numericMinValue) && numericMinValue >= (rule.min ?? Infinity);
                break;
            case 'max-value':
                const numericMaxValue = Number(fieldValue);
                isFieldValid = !isNaN(numericMaxValue) && numericMaxValue <= (rule.max ?? Infinity);
                break;
            case 'range-value':
                const numericRangeValue = Number(fieldValue);
                isFieldValid =
                    !isNaN(numericRangeValue) &&
                    numericRangeValue >= (rule.range?.[0] ?? -Infinity) &&
                    numericRangeValue <= (rule.range?.[1] ?? Infinity);
                break;
            case 'numeric':
                isFieldValid =
                    !isEmptyValue(fieldValue) &&
                    !isNaN(Number(fieldValue));
                break;
            case 'integer':
                isFieldValid =
                    !isEmptyValue(fieldValue) &&
                    Number.isInteger(Number(fieldValue));
                break;
            case 'no-spaces':
                isFieldValid =
                    !isEmptyValue(fieldValue) &&
                    typeof fieldValue === 'string' &&
                    !/\s/.test(fieldValue);
                break;
            case 'match-field':
                isFieldValid =
                    !isEmptyValue(fieldValue) &&
                    fieldValue === formData[rule.matchWith ?? ''];
                break;
            case 'custom-pattern':
                isFieldValid =
                    !isEmptyValue(fieldValue) &&
                    !!rule.pattern &&
                    rule.pattern.test(String(fieldValue));
                break;
            default:
                break;
        }
        if (!isFieldValid) {
            return {
                isValid: false,
                message: rule.message
            };
        }
    }
    return {
        isValid: true,
        message: ""
    };
};