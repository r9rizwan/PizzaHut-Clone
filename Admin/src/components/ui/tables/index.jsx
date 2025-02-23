export const Table = ({ data, columns }) => {
  const headers = columns.map((column) => column.header);

  return (
    <div className="w-full rounded-lg border border-border max-h-[600px] overflow-auto">
      <table className="w-full table-auto divide-y divide-border">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 align-middle text-start bg-background text-base font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((item, index) => {
            // Check if the item has options (nested data)
            if (item.options) {
              return item.options.map((option, optionIndex) => (
                <tr
                  className="even:bg-secondary"
                  key={`${index}-${optionIndex}`}>
                  {columns.map((column) => {
                    if (column.key === "size")
                      return <td className="px-4 py-2">{option.size}</td>;
                    if (column.key === "slices")
                      return <td className="px-4 py-2">{option.slices}</td>;
                    if (column.key === "serves")
                      return <td className="px-4 py-2">{option.serves}</td>;
                    if (column.key === "price")
                      return (
                        <td className="px-4 py-2">{`$${option.price.toFixed(
                          2
                        )}`}</td>
                      );
                    return <td className="px-4 py-2">{column.render(item)}</td>;
                  })}
                </tr>
              ));
            }
            // Handle flat data (no nested options)
            return (
              <tr className="even:bg-secondary" key={index}>
                {columns.map((column) => (
                  <td className="px-4 py-2" key={column.key}>
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
