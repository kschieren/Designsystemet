import React, { createContext, forwardRef, useContext, useState } from "react";
import cl from "classnames";
import { Fieldset, FieldsetProps, FieldsetContext } from "..";

export interface CheckboxGroupState {
  readonly defaultValue?: readonly any[];
  readonly value?: readonly any[];
  toggleValue(value: any): void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupState | null>(
  null
);

export interface CheckboxGroupProps
  extends Omit<
    FieldsetProps,
    "onChange" | "errorPropagation" | "defaultValue"
  > {
  /**
   * Checkboxes
   */
  children: React.ReactNode;
  /**
   * Controlled state for group
   */
  value?: any[];
  /**
   * Default checked checkboxes on render
   */
  defaultValue?: any[];
  /**
   * Returns current checked checkboxes in group
   */
  onChange?: (value: any[]) => void;
}

export const CheckboxGroup = forwardRef<
  HTMLFieldSetElement,
  CheckboxGroupProps
>(
  (
    { value, defaultValue, onChange = () => {}, children, className, ...rest },
    ref
  ) => {
    const fieldset = useContext(FieldsetContext);

    const [state, setState] = useState<any[]>(defaultValue ?? []);

    const toggleValue = (v: any) => {
      const newValue = value ?? state;
      const newState = newValue.includes(v)
        ? newValue.filter((x) => x !== v)
        : [...newValue, v];

      value === undefined && setState(newState);
      onChange(newState);
    };

    return (
      <Fieldset
        {...rest}
        ref={ref}
        className={cl(
          className,
          "navds-checkbox-group",
          `navds-checkbox-group--${rest.size ?? fieldset?.size ?? "medium"}`
        )}
      >
        <CheckboxGroupContext.Provider
          value={{
            value,
            defaultValue,
            toggleValue,
          }}
        >
          <div className="navds-checkboxes">{children}</div>
        </CheckboxGroupContext.Provider>
      </Fieldset>
    );
  }
);

export default CheckboxGroup;
