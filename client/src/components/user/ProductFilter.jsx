import React from "react";
import { filterOptions } from "../config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((item) => (
          <div>
            <div>
              <h3 className="text-base font-semibold">{item}</h3>
              <div>
                {filterOptions[item].map((option) => (
                  <div className="flex items-center gap-2 ">
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[item] &&
                        filters[item].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(item, option.id)}
                    />
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
