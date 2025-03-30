import { FilterQuery, Query, Types } from 'mongoose';

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
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      'search',
      'sortBy',
      'sortOrder',
      'limit',
      'page',
      'fields',
    ];
    excludeFields.forEach((field) => delete queryObj[field]);

    // Handle filtering for specific fields
    const filterQuery: FilterQuery<T> = {};

    // Filter by multiple subjects
    if (queryObj.subjects) {
      const subjectIds = (queryObj.subjects as string)
        .split(',')
        .map((id) => new Types.ObjectId(id));
      (filterQuery as Record<string, unknown>)['subject'] = { $in: subjectIds };
    }

    // Filter by minimum rating
    if (queryObj.rating) {
      (filterQuery as Record<string, unknown>)['rating'] = {
        $gte: Number(queryObj.rating),
      };
    }

    // Filter by maximum hourly rate
    if (queryObj.maxRate) {
      (filterQuery as Record<string, unknown>)['hourlyRate'] = {
        $lte: Number(queryObj.maxRate),
      };
    }

    // Filter by availability (day of the week)
    if (queryObj.availability) {
      (filterQuery as Record<string, unknown>)['availability.day'] =
        queryObj.availability;
    }

    // Merge the filterQuery with the existing query
    this.modelQuery = this.modelQuery.find(filterQuery);
    return this;
  }

  sort() {
    const sortBy = (this.query.sortBy as string) || 'createdAt';
    const sortOrder = (this.query.sortOrder as string) === 'asc' ? '' : '-';
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
    const fields = (this.query.fields as string)?.split(',')?.join(' ');
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
