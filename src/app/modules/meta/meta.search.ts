export function buildSearchQuery(fields: string[], searchTerm?: string) {
    if (!searchTerm) return {}
  
    const escapedSearchTerm = searchTerm
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .trim()
      .toLowerCase()
  
    // Normalize the search term by removing non-alphanumeric characters
    const normalizedSearchTerm = escapedSearchTerm.replace(/[^a-z0-9]/gi, "")
  
    return {
      $or: fields.map((field) => {
        if (field.includes(".")) {
          // Handle nested fields like vehicles.fullRegNum
          const [parent, child] = field.split(".")
          return {
            [parent]: {
              $elemMatch: {
                [child]: { $regex: normalizedSearchTerm, $options: "i" },
              },
            },
          }
        } else {
          // Handle direct fields
          return { [field]: { $regex: normalizedSearchTerm, $options: "i" } }
        }
      }),
    }
  }