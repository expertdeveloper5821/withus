import { updateItemQuantity } from 'components/cart/actions';
import { CartItem } from "lib/shopify/types";
import { useActionState } from "react";

export function EditItemQuantityDropdown({
    item,
    optimisticUpdate
  }: {
    item: CartItem;
    optimisticUpdate: (merchandiseId: string, quantity: any) => void;
  }) {
    const [message, formAction] = useActionState(updateItemQuantity, null);
  
    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = Number(e.target.value);
      const payload = {
        merchandiseId: item.merchandise.id,
        quantity
      };
      optimisticUpdate(payload.merchandiseId, quantity);
      await formAction(payload);
    };
  
    return (
      <div className="flex items-center text-black space-x-2">
        <label htmlFor="quantity" className="text-sm font-medium">
          Qty
        </label>
        <select
          id="quantity"
          name="quantity"
          defaultValue={item.quantity}
          onChange={handleChange}
          className="border rounded px-2 py-1 text-sm"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    );
  }
  