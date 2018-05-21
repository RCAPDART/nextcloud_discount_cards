'use strict';
import {find, orderBy} from 'lodash';
import {CommonService} from "./commonService";
import { MockService } from "./MockService";

export class TagsService {
    tags = [];
    commonService = new CommonService();

    GetTagsFromApi() {
        return MockService.GetTagsPlaceholder();
    }

    GetTags() {
        this.tags = this.GetTagsFromApi();
        return this.tags;
    }

    GetTagById(id) {
        const foundTag = find(this.tags, {id});
        foundTag
    }
}