type ObjectFieldRuleType =
    | 'required'
    | 'min-length'
    | 'max-length'
    | 'min-value'
    | 'max-value'
    | 'pattern'
    | 'allowed'
    | 'disallowed';
export interface ObjectFieldRule {
    type: ObjectFieldRuleType;
    message: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    allowed?: any[];
    disallowed?: any[];
}
export interface ObjectValidationRules {
    [fieldName: string]: ObjectFieldRule | NestedArrayRule;
}
export interface NestedArrayRule {
    type: 'array';
    rules: ObjectValidationRules;
    message: string;
}
export interface ArrayObjectValidationResult {
    isValid: boolean;
    message: string;
}
const isEmpty = (value: any): boolean =>
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0);

const validateObjectFields = (
    obj: any,
    rules: ObjectValidationRules,
    rowIndex: number
): ArrayObjectValidationResult => {

    for (const key of Object.keys(rules)) {
        const rule = rules[key];
        const value = obj[key];

        // ✅ Case 1: Nested Array Rule
        if (rule.type === 'array') {
            // Wrong or missing array
            if (!Array.isArray(value)) {
                return { isValid: false, message: `Row ${rowIndex + 1}: ${rule.message}` };
            }
            // Child array empty
            if (value.length === 0) {
                return {
                    isValid: false,
                    message: `Row ${rowIndex + 1}: ${rule.message}`
                };
            }
           // Validate child objects
            // for (const nestedObj of value) {
                for (let i = 0; i < value.length; i++) {
                    const nestedObj = value[i];
                const nestedResult = validateObjectFields(
                    nestedObj,
                    rule.rules,
                    rowIndex
                );
                if (!nestedResult.isValid) return nestedResult;
            }
            continue;
        }

        // Parent Field Validations
        switch (rule.type) {
            case 'required':
                if (isEmpty(value)) return { isValid: false, message: `Row ${rowIndex + 1}: ${rule.message}` };
                break;

            case 'min-length':
                if (String(value).length < (rule.minLength ?? 0))
                    return { isValid: false, message: `Row ${rowIndex + 1}: ${rule.message}` };
                break;

            case 'max-length':
                if (String(value).length > (rule.maxLength ?? Infinity))
                    return { isValid: false, message: `Row ${rowIndex + 1}: ${rule.message}` };
                break;

            case 'min-value':
                if (Number(value) < (rule.min ?? 0))
                    return { isValid: false, message: `Row ${rowIndex + 1}: ${rule.message}` };
                break;

            case 'max-value':
                if (Number(value) > (rule.max ?? Infinity))
                    return { isValid: false, message: `Row ${rowIndex + 1}: ${rule.message}`};
                break;

            case 'pattern':
                if (!rule.pattern!.test(String(value)))
                    return { isValid: false, message: `Row ${rowIndex + 1}: ${rule.message}` };
                break;

            case 'allowed':
                if (!rule.allowed!.includes(value))
                    return { isValid: false, message: `Row ${rowIndex + 1}: ${rule.message}` };
                break;

            case 'disallowed':
                if (rule.disallowed!.includes(value))
                    return { isValid: false, message: `Row ${rowIndex + 1}: ${rule.message}` };
                break;
        }
    }

    return { isValid: true, message: "" };
};

// Main Array Validator
export const validateArrayObjects = (
    arr: any[],
    rules: ObjectValidationRules
): ArrayObjectValidationResult => {
  // Parent array empty
  if (!Array.isArray(arr) || arr.length === 0) {
    return {
        isValid: false,
        message: "Row 1: Main list cannot be empty."
    };
}
    // Validate each row
    for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
        const obj = arr[rowIndex];
        const result = validateObjectFields(obj, rules, rowIndex);

        if (!result.isValid) return result; // Already includes Row X
    }

    return { isValid: true, message: "" };
};