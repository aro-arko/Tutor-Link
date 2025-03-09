import { FilterQuery, Query, Types } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.search as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      "search",
      "sortBy",
      "sortOrder",
      "limit",
      "page",
      "fields",
    ];
    excludeFields.forEach((field) => delete queryObj[field]);

    // Handle filter for authorId
    if (queryObj.filter) {
      queryObj.author = queryObj.filter; // Assign filter to `author` field
      delete queryObj.filter; // Remove original filter field
    }

    // Parse ObjectId fields if present
    if (queryObj.author) {
      queryObj.author = new Types.ObjectId(queryObj.author as string);
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    const sortBy = (this.query.sortBy as string) || "createdAt";
    const sortOrder = (this.query.sortOrder as string) === "asc" ? "" : "-";
    const sortString = `${sortOrder}${sortBy}`;
    this.modelQuery = this.modelQuery.sort(sortString);
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields = (this.query.fields as string)?.split(",")?.join(" ");
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
