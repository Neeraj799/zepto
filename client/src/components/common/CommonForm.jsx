import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  bottomText,
  isBtnDisabled,
}) => {
  const types = {
    INPUT: "input",
    SELECT: "select",
    TEXTAREA: "textarea",
  };

  const renderInputByComponentType = (item) => {
    let element = null;
    const value = formData[item.name] || "";
    switch (item.componentType) {
      case types.INPUT:
        element = (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={item.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [item.name]: e.target.value,
              })
            }
          />
        );

        break;

      case types.SELECT:
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [item.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={item.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {item.options && item.options.length > 0
                ? item.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;

      case types.TEXTAREA:
        element = (
          <Textarea
            name={item.name}
            placeholder={item.placeholder}
            id={item.id}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [item.name]: e.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={item.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [item.name]: e.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          {formControls.map((item) => (
            <div className="grid w-full gap-1.5" key={item.name}>
              <Label className="mb-1">{item.label}</Label>
              {renderInputByComponentType(item)}
            </div>
          ))}
        </div>

        {bottomText && (
          <div className="mt-2 text-start text-sm">{bottomText}</div>
        )}

        <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
          {buttonText || "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default CommonForm;
