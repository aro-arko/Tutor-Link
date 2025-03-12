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
        // Handle filter for authorId
        if (queryObj.filter) {
            queryObj.author = queryObj.filter; // Assign filter to `author` field
            delete queryObj.filter; // Remove original filter field
        }
        // Parse ObjectId fields if present
        if (queryObj.author) {
            queryObj.author = new mongoose_1.Types.ObjectId(queryObj.author);
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        const sortBy = this.query.sortBy || 'createdAt';
        const sortOrder = this.query.sortOrder === 'asc' ? '' : '-';
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
        var _a, _b;
        const fields = (_b = (_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(',')) === null || _b === void 0 ? void 0 : _b.join(' ');
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
