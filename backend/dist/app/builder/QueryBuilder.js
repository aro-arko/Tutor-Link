"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        const searchTerm = this.query.search;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
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
        const filterQuery = {};
        // Filter by multiple subjects
        if (queryObj.subjects) {
            const subjectIds = queryObj.subjects
                .split(',')
                .map((id) => new mongoose_1.Types.ObjectId(id));
            filterQuery['subject'] = { $in: subjectIds };
        }
        // Filter by minimum rating
        if (queryObj.rating) {
            filterQuery['rating'] = {
                $gte: Number(queryObj.rating),
            };
        }
        // Filter by maximum hourly rate
        if (queryObj.maxRate) {
            filterQuery['hourlyRate'] = {
                $lte: Number(queryObj.maxRate),
            };
        }
        // Filter by availability (day of the week)
        if (queryObj.availability) {
            filterQuery['availability.day'] =
                queryObj.availability;
        }
        // Merge the filterQuery with the existing query
        this.modelQuery = this.modelQuery.find(filterQuery);
        return this;
    }
    sort() {
        const sortBy = this.query.sortBy || 'rating'; // Default to 'rating'
        const sortOrder = this.query.sortOrder === 'asc' ? '' : '-'; // Default to descending order
        const sortString = `${sortOrder}${sortBy}`;
        this.modelQuery = this.modelQuery.sort(sortString);
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 9;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b;
        const fields = (_b = (_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(',')) === null || _b === void 0 ? void 0 : _b.join(' ');
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
